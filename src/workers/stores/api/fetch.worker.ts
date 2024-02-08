import TypedWorker from '@workers/TypedWorker';

export default new TypedWorker('fetch.worker', (...args: unknown[]) => {
    console.log('Hello from worker', self, ...args);
    return { args };
});
