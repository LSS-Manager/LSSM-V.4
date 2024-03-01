type WorkerExtraPropertiesType = Record<never, never>;

export type WorkerSelf<
    ExtraProperties extends
        WorkerExtraPropertiesType = WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
> = ExtraProperties & Scripts & WindowOrWorkerGlobalScope;

type WorkerFunction<
    ExtraProperties extends
        WorkerExtraPropertiesType = WorkerExtraPropertiesType,
    Scripts extends Record<string, unknown> = Record<never, never>,
    Args extends unknown[] = [],
    Return = void,
> = (self: WorkerSelf<ExtraProperties, Scripts>, ...args: Args) => Return;

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
    readonly #importableScriptsUrls = new Map<keyof Scripts, string>();

    #worker: SharedWorker | null = null;

    // it is a good idea to use the topmost window to create the object URL as that allows the worker to exist as long as possible
    readonly #top = window.top ?? window.parent ?? window;

    constructor(
        workerName: string,
        fn: WorkerFunction<WorkerExtraProperties, Scripts, Args, Return>,
        importableScripts: Scripts
    ) {
        this.#workerName = `${PREFIX}:worker:${workerName}`;
        this.#function = fn;
        this.#importableScripts = importableScripts;

        if (this.#blob) {
            fetch(this.#blob)
                .then(res => {
                    if (!res.ok) this.#revokeBlob();
                })
                .catch(() => this.#revokeBlob());
        }
    }

    get #blob() {
        return localStorage.getItem(this.#workerName) ?? '';
    }

    set #blob(value) {
        localStorage.setItem(this.#workerName, value);
    }

    #revokeBlob() {
        if (this.#blob) this.#top.URL.revokeObjectURL(this.#blob);

        this.#worker = null;
        localStorage.removeItem(this.#workerName);
    }

    get #importScriptsExpression() {
        return Array.from(this.#importableScriptsUrls.entries())
            .map(
                ([name, url]) =>
                    `/* ${name.toString()} */ ${JSON.stringify(url)}`
            )
            .join(', ');
    }

    #getBlob() {
        if (this.#blob) return this.#blob;

        const blob = new Blob(
            [
                `
// this is the TypedWorker ${this.#workerName}

                ${
                    this.#importScriptsExpression
                        ? `
// import scripts for this worker
self.importScripts(${this.#importScriptsExpression});
`
                        : ''
                }

// a connection is opened
self.addEventListener('connect', event => {
    const port = event.ports[0];
    // once a message is received, call the worker function, await it and post the result back
    port.addEventListener('message', async event => {
        const [uuid, data] = event.data;
        try {
            const result = await (
${this.#function.toString()}
            )(self, ...data);
            port.postMessage({uuid, result});
        } catch (error) {
            // has an error been thrown? post it back to the main thread, the TypedWorker class will cause the promise to reject
            port.postMessage({uuid, error});
        }
    });
    // we've used addEventListener, so we need to explicitly start the port
    port.start();
});
`.trim(),
            ],
            { type: 'text/javascript' }
        );
        this.#blob = this.#top.URL.createObjectURL(blob);

        this.#top.addEventListener('beforeunload', () => this.#revokeBlob());
        this.#top.addEventListener('unload', () => this.#revokeBlob());

        return this.#blob;
    }

    public async run(...args: Args): Promise<Awaited<Return>> {
        // import importable scripts if they are not yet imported
        for (const script in this.#importableScripts) {
            if (this.#importableScriptsUrls.has(script)) continue;

            const exported = this.#importableScripts[script];

            const textContent = `
// this is ${script} (being imported into ${this.#workerName})
self.${script} = (${exported.toString()});
`.trim();

            if (!textContent) continue;
            const blob = new Blob([textContent], {
                type: 'text/javascript',
            });
            const url = URL.createObjectURL(blob);
            this.#importableScriptsUrls.set(script, url);
        }

        // create a new SharedWorker if the worker doesn't exist yet
        if (!this.#worker) {
            this.#worker = new this.#top.SharedWorker(
                this.#getBlob(),
                this.#workerName
            );
        }

        return new Promise<Awaited<Return>>((resolve, reject) => {
            // this is a backup for the case the worker is not initialized (anymore)
            if (!this.#worker)
                return reject(new Error('Worker not initialized'));

            const uuid = crypto.randomUUID();

            type MessageType =
                | { uuid: typeof uuid; error: Error }
                | { uuid: typeof uuid; result: Awaited<Return> };

            const listener = (event: MessageEvent<MessageType>) => {
                if (event.data.uuid !== uuid) return;
                if ('error' in event.data) reject(event.data.error);
                else resolve(event.data.result);
                this.#worker?.port.removeEventListener('message', listener);
            };

            // once a message is received, resolve or reject the promise based on if the message is an error or not
            this.#worker.port.addEventListener('message', listener);

            // we've used addEventListener, so we need to explicitly start the port
            this.#worker.port.start();

            // let's send the arguments to the worker
            this.#worker.port.postMessage([uuid, args]);
        });
    }
}
