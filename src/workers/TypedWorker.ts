export default class TypedWorker<Args extends unknown[] = [], Return = void> {
    private readonly function: (...args: Args) => Return;
    private readonly workerName: string;

    private blob: string = '';
    private worker: SharedWorker | null = null;

    constructor(workerName: string, fn: (...args: Args) => Return) {
        this.workerName = `${PREFIX}:worker:${workerName}`;
        this.function = fn;
    }

    private getBlob() {
        if (this.blob) return this.blob;

        const storageName = this.workerName;
        const storedBlob = localStorage.getItem(storageName);
        if (storedBlob) {
            this.blob = storedBlob;
            return this.blob;
        }

        const blob = new Blob(
            [
                `
// a connection is opened
self.addEventListener('connect', event => {
    const port = event.ports[0];
    // once a message is received, call the worker function, await it and post the result back
    port.addEventListener('message', async event => {
        const data = event.data;
        try {
            const result = await (
${this.function.toString()}
            )(...data);
            port.postMessage(result);
        } catch (error) {
            // has an error been thrown? post it back to the main thread, the TypedWorker class will cause the promise to reject
            port.postMessage(error);
        }
    });
    // we've used addEventListener, so we need to explicitly start the port
    port.start();
});`,
            ],
            { type: 'application/javascript' }
        );

        this.blob = URL.createObjectURL(blob);

        localStorage.setItem(storageName, this.blob);
        window.addEventListener('beforeunload', () =>
            localStorage.removeItem(storageName)
        );

        return this.blob;
    }

    run(...args: Args): Promise<Awaited<Return>> {
        // create a new SharedWorker if the worker doesn't exist yet
        if (!this.worker)
            this.worker = new SharedWorker(this.getBlob(), this.workerName);

        return new Promise<Awaited<Return>>((resolve, reject) => {
            // this is a backup for the case the worker is not initialized (anymore)
            if (!this.worker)
                return reject(new Error('Worker not initialized'));

            // once a message is received, resolve or reject the promise based on if the message is an error or not
            this.worker.port.addEventListener(
                'message',
                event => {
                    if (event.data instanceof Error) reject(event.data);
                    else resolve(event.data);
                },
                {
                    once: true,
                }
            );

            // we've used addEventListener, so we need to explicitly start the port
            this.worker.port.start();

            // let's send the arguments to the worker
            this.worker.port.postMessage(args);
        });
    }
}
