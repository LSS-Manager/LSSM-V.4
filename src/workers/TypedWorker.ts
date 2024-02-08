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
    console.log('Connected to worker', event.ports);
    const port = event.ports[0];
    port.addEventListener('message', event => {
        console.log('Message received', event.data);
        const data = event.data;
        const result = (${this.function.toString()})(...data);
        port.postMessage(result);
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

    run(...args: Args): Promise<Return> {
        if (!this.worker) this.worker = new SharedWorker(this.getBlob());

        return new Promise<Return>((resolve, reject) => {
            if (!this.worker)
                return reject(new Error('Worker not initialized'));
            this.worker.port.addEventListener(
                'message',
                event => {
                    resolve(event.data);
                },
                {
                    once: true,
                }
            );
            this.worker.port.start();
            this.worker.port.postMessage(args);
        });
    }
}
