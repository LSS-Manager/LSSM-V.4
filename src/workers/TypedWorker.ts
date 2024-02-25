import LSSMStorage from '../importableScripts/indexedDB';

type ImportableScript = 'LSSMStorage';

export default class TypedWorker<Args extends unknown[] = [], Return = void> {
    readonly #function: (...args: Args) => Return;
    readonly #workerName: string;
    readonly #importableScripts: Set<ImportableScript>;
    readonly #importableScriptsUrls = new Map<ImportableScript, string>();

    #worker: SharedWorker | null = null;

    // it is a good idea to use the topmost window to create the object URL as that allows the worker to exist as long as possible
    readonly #top = window.top ?? window.parent ?? window;

    constructor(
        workerName: string,
        fn: (...args: Args) => Return,
        importableScripts: Set<ImportableScript> = new Set<ImportableScript>()
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
        return Array.from(this.#importableScriptsUrls.values())
            .map(url => JSON.stringify(url))
            .join(', ');
    }

    #getBlob() {
        if (this.#blob) return this.#blob;

        const blob = new Blob(
            [
                `
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
            )(...data);
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
        for (const script of this.#importableScripts) {
            if (this.#importableScriptsUrls.has(script)) continue;
            let textContent = '';

            switch (script) {
                case 'LSSMStorage':
                    textContent = `
${LSSMStorage.toString()}

// make the class available in workers
self.LSSMStorage = ${LSSMStorage.name};
`;
                    break;
            }

            if (!textContent) continue;
            const blob = new Blob([textContent.trim()], {
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
