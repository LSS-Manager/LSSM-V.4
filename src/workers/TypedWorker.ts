import { useConsoleStore } from '@stores/console';

type WorkerExtraPropertiesType = Record<never, never>;

export type WorkerSelf<
    ExtraProperties extends WorkerExtraPropertiesType =
        WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
> = ExtraProperties & Scripts & WindowOrWorkerGlobalScope;

type WorkerFunction<
    ExtraProperties extends WorkerExtraPropertiesType =
        WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
    Args extends unknown[] = [],
    Return = void,
> = (self: WorkerSelf<ExtraProperties, Scripts>, ...args: Args) => Return;

// region messages between windows and workers
interface RunMessage<Args extends unknown[]> {
    type: 'run';
    uuid: string;
    args: Args;
}
interface ReadyMessage {
    type: 'ready';
    instance: string;
    startedAt: number;
}
interface ResultMessage<Return> {
    type: 'result';
    uuid: string;
    result: Awaited<Return>;
}
interface ErrorMessage {
    type: 'error';
    uuid: string;
    error: unknown;
}
type WorkerMessage<Return> =
    ErrorMessage | ReadyMessage | ResultMessage<Return>;
// endregion

/**
 * If this key is set to `'true'` in localStorage, all TypedWorkers run their function in the window instead of a SharedWorker.
 * Meant for debugging and as an emergency switch.
 */
export const DISABLE_SHARED_WORKER_KEY = `${PREFIX}_disableSharedWorker`;

// how long a window waits for a worker to confirm a connection before running in the window instead
const READY_TIMEOUT = 10_000;

declare global {
    interface Uint8Array<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the type parameter must match the declaration in TypeScript's lib for merging
        TArrayBuffer extends ArrayBufferLike = ArrayBufferLike,
    > {
        /**
         * Returns the bytes as a hexadecimal string.
         * Supported by all browsers in our browserslist, but not yet typed by TypeScript.
         */
        toHex(): string;
    }
}

/**
 * Returns the topmost window if it is accessible (same origin), the current window otherwise.
 * Using the topmost window allows the worker and its URL to exist as long as possible.
 * @returns The topmost accessible window.
 */
const getTopWindow = (): Window & typeof globalThis => {
    try {
        const top = window.top;
        // accessing the origin of a cross-origin window throws
        if (top && top.location.origin === window.location.origin)
            return top as Window & typeof globalThis;
    } catch {
        // top is cross-origin, we cannot use it
    }
    return window;
};

/**
 * This is the runtime of each TypedWorker. It runs inside the SharedWorker.
 * CAVEAT: This function is stringified, so it must not reference anything outside its own body!
 * @param self - The global scope of the SharedWorker.
 * @param workerFunction - The function this worker executes.
 */
const workerRuntime = (
    self: {
        name: string;
        navigator: Navigator;
        crypto: Crypto;
        addEventListener(
            type: 'connect',
            listener: (event: MessageEvent) => void
        ): void;
    },
    workerFunction: (scope: typeof self, ...args: unknown[]) => unknown
) => {
    const instance = self.crypto.randomUUID().slice(0, 8);
    const startedAt = Date.now();

    // hold a lock as long as this worker lives, so windows can check whether this worker is still alive
    const lockHeld = new Promise<void>(resolve => {
        if (!self.navigator.locks) return resolve();
        self.navigator.locks.request(`${self.name}:alive`, () => {
            resolve();
            // never release the lock
            return new Promise<void>(() => void 0);
        });
    });
    // Usually, the lock is acquired within milliseconds. If another worker with the same name holds it
    // (which should not happen), this worker still has to be usable, so it does not wait forever.
    const readyToConnect = Promise.race([
        lockHeld,
        new Promise<void>(resolve => setTimeout(resolve, 1000)),
    ]);

    self.addEventListener('connect', event => {
        const port = event.ports[0];

        const post = (
            message:
                | { type: 'error'; uuid: string; error: unknown }
                | { type: 'result'; uuid: string; result: unknown }
        ) => {
            try {
                port.postMessage(message);
            } catch (error) {
                // the result or error could not be cloned, report this instead of letting the call hang
                port.postMessage({
                    type: 'error',
                    uuid: message.uuid,
                    error: new Error(
                        `TypedWorker could not transfer the message: ${error}`
                    ),
                });
            }
        };

        port.addEventListener('message', async ({ data }) => {
            if (data?.type !== 'run') return;
            const { uuid, args } = data as { uuid: string; args: unknown[] };
            try {
                const result = await workerFunction(self, ...args);
                post({ type: 'result', uuid, result });
            } catch (error) {
                post({ type: 'error', uuid, error });
            }
        });

        // we've used addEventListener, so we need to explicitly start the port
        port.start();

        // tell the window that this worker is ready and which instance it is
        readyToConnect.then(() =>
            port.postMessage({ type: 'ready', instance, startedAt })
        );
    });
};

export default class TypedWorker<
    WorkerExtraProperties extends WorkerExtraPropertiesType,
    Args extends unknown[] = [],
    Return = void,
    Scripts extends Record<string, object> = Record<never, never>,
> {
    readonly #function: WorkerFunction<
        WorkerExtraProperties,
        Scripts,
        Args,
        Return
    >;
    readonly #workerName: string;
    readonly #importableScripts: Scripts;

    #source: string | null = null;
    #nameCache: string | null = null;
    #connection: Promise<SharedWorker | null> | null = null;
    #instance: string | null = null;
    #fallbackSelf: WorkerSelf<WorkerExtraProperties, Scripts> | null = null;

    readonly #pending = new Map<
        string,
        {
            resolve(result: Awaited<Return>): void;
            reject(reason: unknown): void;
        }
    >();

    readonly #top = getTopWindow();

    constructor(
        workerName: string,
        fn: WorkerFunction<WorkerExtraProperties, Scripts, Args, Return>,
        importableScripts: Scripts
    ) {
        this.#workerName = workerName;
        this.#function = fn;
        this.#importableScripts = importableScripts;
    }

    /**
     * The source code of the worker. It is deterministic for the same build, so it can be used for the worker's identity.
     * @returns The source code of the worker.
     */
    get #workerSource() {
        if (this.#source) return this.#source;

        const scripts = Object.entries(this.#importableScripts)
            .map(
                ([name, exported]) =>
                    `// importable script: ${name}\nself[${JSON.stringify(name)}] = (${exported.toString()});`
            )
            .join('\n\n');

        this.#source = `
// this is the TypedWorker ${this.#workerName}
'use strict';

${scripts}

// the runtime of TypedWorkers
(${workerRuntime.toString()})(
    self,
    // the function of this worker
    (${this.#function.toString()})
);
`.trim();

        return this.#source;
    }

    /**
     * All keys of this worker for the current user and locale start with this prefix.
     * @returns The prefix of the storage keys of this worker.
     */
    get #namePrefix() {
        return `${PREFIX}:worker:${this.#workerName}:${window.user_id ?? 'unknown'}:${window.I18n?.locale ?? 'unknown'}:`;
    }

    /**
     * Computes the name of the SharedWorker once. It is also the localStorage key storing the URL of the worker.
     * Windows only share a worker if they use the same code for the same user and locale.
     * @returns A promise that resolves to the name of the worker.
     */
    async #computeName() {
        if (this.#nameCache) return this.#nameCache;
        const digest = await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(this.#workerSource)
        );
        // the first 16 hex characters (64 bits) of the SHA-256 are enough to tell versions of the code apart
        this.#nameCache = `${this.#namePrefix}${new Uint8Array(digest).toHex().slice(0, 16)}`;
        return this.#nameCache;
    }

    /**
     * The name of the SharedWorker, see #computeName.
     * @returns The name of the worker.
     * @throws Error If the name has not been computed yet.
     */
    get #name() {
        if (!this.#nameCache) {
            throw new Error(
                'The name of the worker has not been computed yet.'
            );
        }
        return this.#nameCache;
    }

    /**
     * Logs a message prefixed with the name of this worker.
     * @param level - The console level to use.
     * @param messages - The messages to log.
     */
    #log(level: 'error' | 'info' | 'warn', ...messages: unknown[]) {
        useConsoleStore()[level]({
            messages: [
                `[TypedWorker ${this.#workerName}${this.#instance ? `#${this.#instance}` : ''}]`,
                ...messages,
            ],
        });
    }

    /**
     * Removes localStorage keys of outdated versions of this worker for the current user and locale.
     * Also removes the key used by older versions of TypedWorker.
     */
    #removeOutdatedKeys() {
        const legacyKey = `${PREFIX}:worker:${this.#workerName}`;
        const currentKey = this.#name;
        for (const key of Object.keys(localStorage)) {
            if (
                key === legacyKey ||
                (key.startsWith(this.#namePrefix) && key !== currentKey)
            )
                localStorage.removeItem(key);
        }
    }

    /**
     * Checks whether a worker with the current name is alive. A living worker holds a lock.
     * @returns A promise that resolves to true if the worker is alive or if this cannot be checked.
     */
    #isWorkerAlive() {
        const locks = this.#top.navigator.locks;
        if (!locks) return Promise.resolve(true);
        // if we can get the lock, nobody (no worker) is holding it
        return locks.request(
            `${this.#name}:alive`,
            { ifAvailable: true },
            lock => lock === null
        );
    }

    /**
     * Tries to connect to a worker at the given URL and waits for it to confirm the connection.
     * @param url - The (blob) URL of the worker.
     * @returns A promise that resolves to the connected worker or null if the connection failed.
     */
    #tryConnect(url: string) {
        return new Promise<SharedWorker | null>(resolve => {
            let worker: SharedWorker;
            try {
                worker = new this.#top.SharedWorker(url, this.#name);
            } catch (error) {
                this.#log('warn', 'Could not create SharedWorker:', error);
                return resolve(null);
            }

            const finish = (result: SharedWorker | null) => {
                window.clearTimeout(timeout);
                worker.removeEventListener('error', onError);
                worker.port.removeEventListener('message', onMessage);
                if (!result) worker.port.close();
                resolve(result);
            };
            const onError = () => finish(null);
            const onMessage = (event: MessageEvent<WorkerMessage<Return>>) => {
                if (event.data?.type !== 'ready') return;
                this.#instance = event.data.instance;
                finish(worker);
            };
            const timeout = window.setTimeout(
                () => finish(null),
                READY_TIMEOUT
            );

            // a dead URL causes an error event if there is no worker anymore (at least in Chrome, Firefox needs the timeout)
            worker.addEventListener('error', onError);
            worker.port.addEventListener('message', onMessage);
            // we've used addEventListener, so we need to explicitly start the port
            worker.port.start();
        });
    }

    /**
     * Handles all messages of a connected worker.
     * @param worker - The connected worker.
     */
    #listen(worker: SharedWorker) {
        worker.port.addEventListener(
            'message',
            (event: MessageEvent<WorkerMessage<Return>>) => {
                const message = event.data;
                if (message?.type !== 'result' && message?.type !== 'error')
                    return;
                const pending = this.#pending.get(message.uuid);
                if (!pending) return;
                this.#pending.delete(message.uuid);
                if (message.type === 'error') {
                    this.#log(
                        'error',
                        'An error has been thrown in the worker:',
                        message.error
                    );
                    pending.reject(message.error);
                } else {
                    pending.resolve(message.result);
                }
            }
        );
        // this should not happen after the worker has been ready, but let's be safe and not let calls hang
        worker.addEventListener('error', event => {
            this.#log('error', 'The worker reported an error:', event);
            this.#pending.forEach(({ reject }) => reject(event));
            this.#pending.clear();
            this.#connection = null;
        });
    }

    /**
     * Connects to the SharedWorker of this TypedWorker or starts it if it is not alive.
     * Starting is done while holding a lock, so that multiple windows do not start multiple workers.
     * @returns A promise that resolves to the connected worker or null if the function should run in the window.
     */
    async #establishConnection(): Promise<SharedWorker | null> {
        if (localStorage.getItem(DISABLE_SHARED_WORKER_KEY) === 'true') {
            this.#log(
                'info',
                `SharedWorkers are disabled via localStorage key ${DISABLE_SHARED_WORKER_KEY}, running in the window.`
            );
            return null;
        }
        if (typeof this.#top.SharedWorker !== 'function') {
            this.#log(
                'info',
                'SharedWorkers are not supported, running in the window.'
            );
            return null;
        }

        let name: string;
        try {
            name = await this.#computeName();
        } catch (error) {
            // e.g. the Web Crypto API is not available
            this.#log(
                'warn',
                'Could not name the worker, running in the window:',
                error
            );
            return null;
        }

        const connect = async () => {
            this.#removeOutdatedKeys();

            const storedUrl = localStorage.getItem(name);
            // a dead URL still connects to a living worker, so we can use it as long as the worker is alive
            if (storedUrl && (await this.#isWorkerAlive())) {
                const worker = await this.#tryConnect(storedUrl);
                if (worker) return worker;
            }

            const url = this.#top.URL.createObjectURL(
                new Blob([this.#workerSource], { type: 'text/javascript' })
            );
            localStorage.setItem(name, url);
            return this.#tryConnect(url);
        };

        try {
            const locks = this.#top.navigator.locks;
            const worker = await (locks
                ? locks.request(`${name}:bootstrap`, connect)
                : connect());
            if (worker) this.#listen(worker);
            else this.#log('warn', 'Could not connect, running in the window.');
            return worker;
        } catch (error) {
            this.#log(
                'warn',
                'Could not connect, running in the window:',
                error
            );
            return null;
        }
    }

    /**
     * Runs the function of this worker in the window. This is the fallback if SharedWorkers cannot be used.
     * Arguments and results are cloned to behave the same as in a worker.
     * @param args - The arguments to pass to the function.
     * @returns A promise that resolves with the result of the function.
     */
    async #runInWindow(args: Args): Promise<Awaited<Return>> {
        // the fallback scope mimics the global scope of the worker: it contains the importable scripts and keeps state between calls
        this.#fallbackSelf ??= {
            ...this.#importableScripts,
        } as unknown as WorkerSelf<WorkerExtraProperties, Scripts>;
        try {
            const result = await this.#function(
                this.#fallbackSelf,
                ...structuredClone(args)
            );
            return structuredClone(result);
        } catch (error) {
            this.#log(
                'error',
                'An error has been thrown in the window fallback:',
                error
            );
            throw error;
        }
    }

    public async run(...args: Args): Promise<Awaited<Return>> {
        this.#connection ??= this.#establishConnection();
        const worker = await this.#connection;

        if (!worker) return this.#runInWindow(args);

        return new Promise<Awaited<Return>>((resolve, reject) => {
            const uuid = crypto.randomUUID();
            this.#pending.set(uuid, { resolve, reject });
            try {
                worker.port.postMessage({
                    type: 'run',
                    uuid,
                    args,
                } satisfies RunMessage<Args>);
            } catch (error) {
                // e.g. the arguments could not be cloned
                this.#pending.delete(uuid);
                reject(error);
            }
        });
    }
}
