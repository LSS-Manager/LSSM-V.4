export default class TypedWorker<Args extends unknown[] = [], Return = void> {
    private readonly function: (...args: Args) => Return;
    private readonly workerName: string;

    private blob: string = '';
    private worker: SharedWorker | null = null;

    constructor(workerName: string, fn: (...args: Args) => Return) {
        this.workerName = workerName;
        this.function = fn;
    }

    private getBlob() {
        if (this.blob) return this.blob;

        const storageName = `${PREFIX}:worker:${this.workerName}`;
        const storedBlob = localStorage.getItem(storageName);
        if (storedBlob) {
            this.blob = storedBlob;
            return this.blob;
        }

        const blob = new Blob(
            [
                `
self.addEventListener('connect', event => {
    const port = event.ports[0];
    port.addEventListener('message', async event => {
        const data = event.data;
        try {
            const result = await (
${this.function.toString()}
            )(...data);
            port.postMessage(result);
        } catch (error) {
            throw error;
        }
    });
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
        if (!this.worker) this.worker = new SharedWorker(this.getBlob());

        return new Promise<Awaited<Return>>((resolve, reject) => {
            if (!this.worker)
                return reject(new Error('Worker not initialized'));
            this.worker.port.addEventListener(
                'message',
                event => resolve(event.data),
                {
                    once: true,
                }
            );
            // TODO: Doesn't work yet
            this.worker.port.addEventListener('error', event => reject(event), {
                once: true,
            });
            this.worker.port.start();
            this.worker.port.postMessage(args);
        });
    }
}
