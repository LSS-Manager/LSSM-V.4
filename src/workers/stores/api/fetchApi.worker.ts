import TypedWorker from '@workers/TypedWorker';

import type { StorageAPIKey, StorageAPIs } from 'typings/store/api/State';

export default new TypedWorker(
    'api/fetch.worker',
    async (
        api: StorageAPIKey,
        init: RequestInit
    ): Promise<StorageAPIs[StorageAPIKey]> => {
        const headers = new Headers(init.headers);

        // CAVEAT: headers are stored lowercase
        // if the LSSM-Header is not set, abort the request!
        if (!headers.has('x-lss-manager')) {
            return Promise.reject(
                new Error(
                    'No X-LSS-Manager Header has been set. Aborting the request!'
                )
            );
        }

        // TODO: Add support for paged API (/api/v2) for supported APIs (vehicles)

        return fetch(new URL(`/api/${api}`, location.origin), init).then(res =>
            res.json()
        );
    }
);
