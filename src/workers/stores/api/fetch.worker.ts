import TypedWorker from '@workers/TypedWorker';

export default new TypedWorker(
    'fetch.worker',
    (inputOrUrl: Request | URL | string, init: RequestInit) => {
        const headers = new Headers(init.headers);

        // CAVEAT: headers are stored lowercase
        // if the LSSM-Header is not set, abort the request!
        if (!headers.has('x-lss-manager')) {
            // TODO: How to correctly report errors?
            return Promise.reject(
                new Error(
                    'No X-LSS-Manager Header has been set. Aborting the request!'
                )
            );
        }

        if (inputOrUrl instanceof URL || typeof inputOrUrl === 'string') {
            const url = new URL(inputOrUrl, self.location.origin);
            return fetch(url, init);
        }
        return fetch(inputOrUrl, init);
    }
);
