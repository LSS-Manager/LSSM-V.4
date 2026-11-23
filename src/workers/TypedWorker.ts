import { useConsoleStore } from '@stores/console';

import type { parseExpressionAt as ParseExpressionAt } from 'acorn';

type WorkerExtraPropertiesType = Record<never, never>;
// an object type (e.g. an interface) mapping event names to the type of their data
export type WorkerEventsType = object;

export type WorkerSelf<
    ExtraProperties extends WorkerExtraPropertiesType =
        WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
    Events extends WorkerEventsType = Record<never, never>,
> = ExtraProperties &
    Scripts &
    WindowOrWorkerGlobalScope & {
        /**
         * Sends an event to all windows that subscribed to it.
         * When running in the window (fallback), only the current window receives it.
         */
        publish<Event extends string & keyof Events>(
            event: Event,
            data: Events[Event]
        ): void;
        /**
         * Whether any window currently listens to an event, e.g. To only refresh data that is still needed.
         * Frozen pages in the back/forward cache do not count.
         */
        hasSubscribers(event: string & keyof Events): boolean;
    };

type WorkerFunction<
    ExtraProperties extends WorkerExtraPropertiesType =
        WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
    Args extends unknown[] = [],
    Return = void,
    Events extends WorkerEventsType = Record<never, never>,
> = (
    self: WorkerSelf<ExtraProperties, Scripts, Events>,
    ...args: Args
) => Return;

// region messages between windows and workers
interface RunMessage<Args extends unknown[]> {
    type: 'run';
    uuid: string;
    args: Args;
}
interface HelloMessage {
    type: 'hello';
    clientId: string;
    // whether the window holds a lock as long as it lives
    lock: boolean;
}
interface SubscriptionMessage {
    type: 'subscribe' | 'unsubscribe';
    events: string[];
}
type WindowMessage<Args extends unknown[]> =
    HelloMessage | RunMessage<Args> | SubscriptionMessage;

interface ReadyMessage {
    type: 'ready';
    instance: string;
    startedAt: number;
    // the number of windows connected to this worker (for debugging)
    clients: number;
}
interface EventMessage {
    type: 'event';
    event: string;
    data: unknown;
}
interface UncaughtErrorMessage {
    type: 'uncaughtError';
    error: unknown;
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
    | ErrorMessage
    | EventMessage
    | ReadyMessage
    | ResultMessage<Return>
    | UncaughtErrorMessage;
// endregion

/**
 * Functions and classes are transferred to the worker via toString(), so their source must be a single expression:
 * an arrow function, a function expression or a class. This excludes method shorthands such as `{ foo() {} }`.
 * @param parseExpressionAt - The parser of acorn.
 * @param exported - The function or class to check.
 * @returns True if the function or class can be transferred.
 */
const isTransferable = (
    parseExpressionAt: typeof ParseExpressionAt,
    exported: object
) => {
    const source = exported.toString();
    try {
        const expression = parseExpressionAt(source, 0, {
            ecmaVersion: 'latest',
        });
        return (
            [
                'ArrowFunctionExpression',
                'ClassExpression',
                'FunctionExpression',
            ].includes(expression.type) &&
            // nothing may follow the expression (e.g. the body of a method shorthand)
            source.slice(expression.end).trim() === ''
        );
    } catch {
        return false;
    }
};

/**
 * If this key is set to `'true'` in localStorage, all TypedWorkers run their function in the window instead of a SharedWorker.
 * Meant for debugging and as an emergency switch.
 */
export const DISABLE_SHARED_WORKER_KEY = `${PREFIX}_disableSharedWorker`;

export interface TypedWorkerOptions {
    // names of workers this worker replaces, so that their localStorage keys can be cleaned up
    replaces?: string[];
}

// how long a window waits for a worker to confirm a connection before running in the window instead
const READY_TIMEOUT = 10_000;
// after starting a worker failed, windows run in the window for this long instead of waiting for a worker again
const FAILED_RETRY_AFTER = 60_000;

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
        publish?(event: string, data: unknown): void;
        hasSubscribers?(event: string): boolean;
        addEventListener(
            type: 'connect',
            listener: (event: MessageEvent) => void
        ): void;
        addEventListener(
            type: 'error',
            listener: (event: ErrorEvent) => void
        ): void;
        addEventListener(
            type: 'unhandledrejection',
            listener: (event: PromiseRejectionEvent) => void
        ): void;
    },
    workerFunction: (scope: typeof self, ...args: unknown[]) => unknown
) => {
    const instance = self.crypto.randomUUID().slice(0, 8);
    const startedAt = Date.now();

    // the windows that said hello and the events they subscribed to
    const clients = new Map<
        string,
        { port: MessagePort; events: Set<string> }
    >();

    self.publish = (event, data) => {
        clients.forEach(({ port, events }) => {
            if (events.has(event))
                port.postMessage({ type: 'event', event, data });
        });
    };
    self.hasSubscribers = event =>
        Array.from(clients.values()).some(({ events }) => events.has(event));

    // errors outside of calls (e.g. in timers or unhandled promises) would otherwise only be visible in the worker's console
    const reportUncaughtError = (error: unknown) =>
        clients.forEach(({ port }) => {
            try {
                port.postMessage({ type: 'uncaughtError', error });
            } catch {
                port.postMessage({ type: 'uncaughtError', error: `${error}` });
            }
        });
    self.addEventListener('error', event =>
        reportUncaughtError(event.error ?? event.message)
    );
    self.addEventListener('unhandledrejection', event =>
        reportUncaughtError(event.reason)
    );

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

        // the id of the window using this port, set once the window said hello
        let clientId: string | null = null;

        port.addEventListener('message', async ({ data }) => {
            if (data?.type === 'hello') {
                const hello = data as { clientId: string; lock: boolean };
                const id = hello.clientId;
                clientId = id;
                clients.set(id, { port, events: new Set() });
                // the window holds this lock as long as it lives (also in iframes). Once we get it, the window is gone.
                if (hello.lock && self.navigator.locks) {
                    self.navigator.locks.request(
                        `${self.name}:client:${id}`,
                        () => {
                            clients.delete(id);
                            port.close();
                        }
                    );
                }
                return;
            }
            if (data?.type === 'subscribe' || data?.type === 'unsubscribe') {
                const client = clientId ? clients.get(clientId) : null;
                if (!client) return;
                (data as { events: string[] }).events.forEach(event =>
                    data.type === 'subscribe'
                        ? client.events.add(event)
                        : client.events.delete(event)
                );
                return;
            }
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
            port.postMessage({
                type: 'ready',
                instance,
                startedAt,
                clients: clients.size,
            })
        );
    });
};

export default class TypedWorker<
    WorkerExtraProperties extends WorkerExtraPropertiesType,
    Args extends unknown[] = [],
    Return = void,
    Scripts extends Record<string, object> = Record<never, never>,
    Events extends WorkerEventsType = Record<never, never>,
> {
    readonly #function: WorkerFunction<
        WorkerExtraProperties,
        Scripts,
        Args,
        Return,
        Events
    >;
    readonly #workerName: string;
    readonly #importableScripts: Scripts;
    // names of workers this worker replaces, their localStorage keys are removed once they are not alive anymore
    readonly #replaces: string[];

    #source: string | null = null;
    #nameCache: string | null = null;
    #connection: Promise<SharedWorker | null> | null = null;
    #instance: string | null = null;
    #fallbackSelf: WorkerSelf<WorkerExtraProperties, Scripts, Events> | null =
        null;

    // identifies this window towards the worker
    readonly #clientId = crypto.randomUUID();
    // resolves to true once this window holds its client lock (only requested once, as it is never released)
    #clientLock: Promise<boolean> | null = null;
    #currentWorker: SharedWorker | null = null;
    #pageLifecycleHandled = false;
    readonly #listeners = new Map<string, Set<(data: unknown) => void>>();
    readonly #resumeCallbacks = new Set<() => void>();

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
        fn: WorkerFunction<
            WorkerExtraProperties,
            Scripts,
            Args,
            Return,
            Events
        >,
        importableScripts: Scripts,
        options: TypedWorkerOptions = {}
    ) {
        this.#workerName = workerName;
        this.#function = fn;
        this.#importableScripts = importableScripts;
        this.#replaces = options.replaces ?? [];
    }

    /**
     * Makes sure that the function and all importable scripts can be transferred to the worker via toString().
     * Acorn is loaded on demand to keep it out of the core bundle. If it cannot be loaded, the check is skipped:
     * a worker with code that cannot be transferred fails to start and the function runs in the window anyway.
     * @returns A promise that resolves once all of them have been checked.
     * @throws Error If the function or an importable script cannot be transferred.
     */
    async #assertTransferable() {
        let parseExpressionAt: typeof ParseExpressionAt;
        try {
            ({ parseExpressionAt } = await import(
                /* webpackChunkName: "acorn" */ 'acorn'
            ));
        } catch (error) {
            this.#log(
                'warn',
                'Could not load acorn, skipping the check whether all functions can be transferred:',
                error
            );
            return;
        }
        const notTransferable = Object.entries({
            ...this.#importableScripts,
            '[worker function]': this.#function,
        })
            .filter(
                ([, exported]) => !isTransferable(parseExpressionAt, exported)
            )
            .map(([name]) => name);
        if (notTransferable.length) {
            throw new Error(
                `These functions cannot be transferred to the worker, use arrow functions, function expressions or classes instead: ${notTransferable.join(', ')}`
            );
        }
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
     * The localStorage key storing when starting this worker failed the last time.
     * @returns The localStorage key.
     */
    get #failedKey() {
        return `${this.#name}:failed`;
    }

    /**
     * Removes localStorage keys of outdated versions of this worker for the current user and locale
     * and keys of the workers this worker replaces.
     * Keys of other versions are kept while their worker is still alive, for example if a tab still uses an older build.
     * Also removes the keys used by older versions of TypedWorker.
     * @returns A promise that resolves once all outdated keys have been removed.
     */
    #removeOutdatedKeys() {
        const legacyKeys = [this.#workerName, ...this.#replaces].map(
            name => `${PREFIX}:worker:${name}`
        );
        const replacedPrefixes = this.#replaces.map(
            name => `${PREFIX}:worker:${name}:`
        );
        const failedSuffix = ':failed';

        // group the keys by worker, as checking the same lock concurrently would make a dead worker look alive
        const keysByWorker = new Map<string, string[]>();
        for (const key of Object.keys(localStorage)) {
            if (legacyKeys.includes(key)) {
                localStorage.removeItem(key);
                continue;
            }
            const isOutdatedVersion =
                key.startsWith(this.#namePrefix) &&
                key !== this.#name &&
                key !== this.#failedKey;
            const isReplaced = replacedPrefixes.some(prefix =>
                key.startsWith(prefix)
            );
            if (!isOutdatedVersion && !isReplaced) continue;
            const workerName = key.endsWith(failedSuffix)
                ? key.slice(0, -failedSuffix.length)
                : key;
            keysByWorker.set(workerName, [
                ...(keysByWorker.get(workerName) ?? []),
                key,
            ]);
        }

        return Promise.all(
            Array.from(keysByWorker, async ([workerName, keys]) => {
                if (!(await this.#isWorkerAlive(workerName)))
                    keys.forEach(key => localStorage.removeItem(key));
            })
        );
    }

    /**
     * Checks whether a worker is alive. A living worker holds a lock.
     * @param name - The name of the worker to check. Defaults to the name of this worker.
     * @returns A promise that resolves to true if the worker is alive or if this cannot be checked.
     */
    #isWorkerAlive(name = this.#name) {
        const locks = this.#top.navigator.locks;
        if (!locks) return Promise.resolve(true);
        // if we can get the lock, nobody (no worker) is holding it
        return locks.request(
            `${name}:alive`,
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
                if (message?.type === 'event')
                    return this.#emit(message.event, message.data);
                if (message?.type === 'uncaughtError') {
                    return this.#log(
                        'error',
                        'An uncaught error occurred in the worker:',
                        message.error
                    );
                }
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
            this.#currentWorker = null;
        });
    }

    /**
     * Sends a message to the worker. Messages to a closed port are ignored by the browser.
     * @param worker - The connected worker.
     * @param message - The message to send.
     */
    #post(worker: SharedWorker, message: WindowMessage<Args>) {
        worker.port.postMessage(message);
    }

    /**
     * Introduces this window to the worker, so that it can receive events.
     * The window holds a lock as long as it lives, so the worker notices when the window is gone.
     * The lock is held by this frame (not the top window), so closed iframes are noticed as well.
     * @param worker - The connected worker.
     */
    async #registerClient(worker: SharedWorker) {
        const locks = window.navigator.locks;
        // after reconnecting, this window already holds its lock, requesting it again would never resolve
        this.#clientLock ??= locks
            ? new Promise<boolean>(resolve => {
                  locks
                      .request(`${this.#name}:client:${this.#clientId}`, () => {
                          resolve(true);
                          // never release the lock
                          return new Promise<void>(() => void 0);
                      })
                      .catch(() => resolve(false));
              })
            : Promise.resolve(false);
        const lock = await this.#clientLock;
        this.#post(worker, { type: 'hello', clientId: this.#clientId, lock });
        // events may have been subscribed before the connection was established
        if (this.#listeners.size) {
            this.#post(worker, {
                type: 'subscribe',
                events: Array.from(this.#listeners.keys()),
            });
        }
    }

    /**
     * Pages in the back/forward cache are frozen but stay connected.
     * To avoid events piling up for them, they unsubscribe when hidden and subscribe again when shown.
     * The listeners are added once and always use the currently connected worker.
     */
    #handlePageLifecycle() {
        if (this.#pageLifecycleHandled) return;
        this.#pageLifecycleHandled = true;
        window.addEventListener('pagehide', () => {
            const worker = this.#currentWorker;
            if (worker && this.#listeners.size) {
                this.#post(worker, {
                    type: 'unsubscribe',
                    events: Array.from(this.#listeners.keys()),
                });
            }
        });
        window.addEventListener('pageshow', event => {
            if (!event.persisted) return;
            const worker = this.#currentWorker;
            if (worker && this.#listeners.size) {
                this.#post(worker, {
                    type: 'subscribe',
                    events: Array.from(this.#listeners.keys()),
                });
            }
            // events may have been missed while the page was frozen
            this.#resumeCallbacks.forEach(callback => callback());
        });
    }

    /**
     * Calls all listeners of an event in this window.
     * @param event - The name of the event.
     * @param data - The data of the event.
     */
    #emit(event: string, data: unknown) {
        this.#listeners.get(event)?.forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                this.#log(
                    'error',
                    `A listener of event ${event} threw an error:`,
                    error
                );
            }
        });
    }

    /**
     * Establishes the connection to the worker (or decides to run in the window) and registers this window.
     * @returns A promise that resolves to the connected worker or null if the function should run in the window.
     */
    async #establishConnection(): Promise<SharedWorker | null> {
        const worker = await this.#connectToWorker();
        if (worker) {
            this.#listen(worker);
            await this.#registerClient(worker);
        }
        this.#currentWorker = worker;
        this.#handlePageLifecycle();
        return worker;
    }

    /**
     * Connects to the SharedWorker of this TypedWorker or starts it if it is not alive.
     * Starting is done while holding a lock, so that multiple windows do not start multiple workers.
     * @returns A promise that resolves to the connected worker or null if the function should run in the window.
     */
    async #connectToWorker(): Promise<SharedWorker | null> {
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
            await this.#removeOutdatedKeys();

            const storedUrl = localStorage.getItem(name);
            // a dead URL still connects to a living worker, so we can use it as long as the worker is alive
            if (storedUrl && (await this.#isWorkerAlive())) {
                const worker = await this.#tryConnect(storedUrl);
                if (worker) return worker;
            }

            // if starting the worker failed recently, don't let every window wait for the timeout again
            const failedAt = Number(localStorage.getItem(this.#failedKey));
            if (failedAt > Date.now() - FAILED_RETRY_AFTER) {
                this.#log(
                    'warn',
                    `Starting the worker failed at ${new Date(failedAt).toLocaleTimeString()}, not retrying yet.`
                );
                return null;
            }

            // windows connecting to a living worker use the same (already checked) code, so only check before starting one
            try {
                await this.#assertTransferable();
            } catch (error) {
                this.#log('error', 'Running in the window:', error);
                return null;
            }

            const url = this.#top.URL.createObjectURL(
                new Blob([this.#workerSource], { type: 'text/javascript' })
            );
            localStorage.setItem(name, url);
            const worker = await this.#tryConnect(url);
            if (worker) localStorage.removeItem(this.#failedKey);
            else localStorage.setItem(this.#failedKey, Date.now().toString());
            return worker;
        };

        try {
            const locks = this.#top.navigator.locks;
            const worker = await (locks
                ? locks.request(`${name}:bootstrap`, connect)
                : connect());
            if (!worker)
                this.#log('warn', 'Could not connect, running in the window.');
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
            // without a worker, only this window can receive events. Data is cloned like it would be by the worker.
            publish: (event: string, data: unknown) => {
                const clonedData = structuredClone(data);
                queueMicrotask(() => this.#emit(event, clonedData));
            },
            hasSubscribers: (event: string) => this.#listeners.has(event),
        } as unknown as WorkerSelf<WorkerExtraProperties, Scripts, Events>;
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

    /**
     * Listens to an event the worker publishes via `self.publish`.
     * When running in the window (fallback), only events published by this window are received.
     * @param event - The name of the event.
     * @param listener - The function to call with the data of the event.
     * @returns A function to stop listening.
     */
    public subscribe<Event extends string & keyof Events>(
        event: Event,
        listener: (data: Events[Event]) => void
    ): () => void {
        const listeners =
            this.#listeners.get(event) ?? new Set<(data: unknown) => void>();
        const isFirstListener = listeners.size === 0;
        listeners.add(listener as (data: unknown) => void);
        this.#listeners.set(event, listeners);

        this.#connection ??= this.#establishConnection();
        if (isFirstListener) {
            this.#connection.then(worker => {
                if (worker && this.#listeners.has(event))
                    this.#post(worker, { type: 'subscribe', events: [event] });
            });
        }

        return () => {
            listeners.delete(listener as (data: unknown) => void);
            if (listeners.size || this.#listeners.get(event) !== listeners)
                return;
            this.#listeners.delete(event);
            this.#connection?.then(worker => {
                if (worker && !this.#listeners.has(event)) {
                    this.#post(worker, {
                        type: 'unsubscribe',
                        events: [event],
                    });
                }
            });
        };
    }

    /**
     * Registers a callback for when this page is restored from the back/forward cache.
     * Events published while the page was frozen have not been received, so consumers may want to fetch the current state.
     * @param callback - The function to call.
     * @returns A function to remove the callback.
     */
    public onResume(callback: () => void): () => void {
        this.#resumeCallbacks.add(callback);
        return () => this.#resumeCallbacks.delete(callback);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the arguments of each method are inferred individually
type WorkerMethod<Self> = (self: Self, ...args: any[]) => unknown;

type MethodArgs<Method> = Method extends (
    self: never,
    ...args: infer Args
) => unknown
    ? Args
    : never;

/**
 * A TypedWorker that provides multiple methods instead of a single function.
 * Like the function of a TypedWorker, each method is transferred via toString(),
 * so it must be an arrow function or function expression and must not reference anything outside its own body.
 * Methods can publish events to all subscribed windows via `self.publish`.
 */
export class TypedMultiWorker<
    WorkerExtraProperties extends WorkerExtraPropertiesType,
    Methods extends Record<
        string,
        WorkerMethod<WorkerSelf<WorkerExtraProperties, Scripts, Events>>
    >,
    Events extends WorkerEventsType = Record<never, never>,
    Scripts extends Record<string, object> = Record<never, never>,
> extends TypedWorker<
    WorkerExtraProperties,
    [method: string, ...args: unknown[]],
    unknown,
    Scripts,
    Events
> {
    constructor(
        workerName: string,
        methods: Methods,
        importableScripts: Scripts,
        options: TypedWorkerOptions = {}
    ) {
        super(
            workerName,
            // dispatches a call to the requested method, which is stored in the worker's scope like an importable script
            // CAVEAT: This function is stringified, so it must not reference anything outside its own body!
            (self, method, ...args) =>
                (
                    self as unknown as Record<
                        string,
                        (...methodArgs: unknown[]) => unknown
                    >
                )[`method:${method}`](self, ...args),
            {
                ...importableScripts,
                ...Object.fromEntries(
                    Object.entries(methods).map(([name, method]) => [
                        `method:${name}`,
                        method,
                    ])
                ),
            } as Scripts,
            options
        );
    }

    /**
     * Calls a method of this worker.
     * @param method - The name of the method.
     * @param args - The arguments to pass to the method.
     * @returns A promise that resolves with the result of the method.
     */
    public call<Method extends string & keyof Methods>(
        method: Method,
        ...args: MethodArgs<Methods[Method]>
    ): Promise<Awaited<ReturnType<Methods[Method]>>> {
        return this.run(method, ...args) as Promise<
            Awaited<ReturnType<Methods[Method]>>
        >;
    }
}
