import TypedWorker from '@workers/TypedWorker';

import type { StorageAPIKey, StorageAPIs } from 'typings/store/api/State';

class FetchApiWorker extends TypedWorker<
    [api: StorageAPIKey, init: RequestInit],
    Promise<Exclude<StorageAPIs[StorageAPIKey], null>>
> {
    constructor() {
        super(
            'api/fetch.worker',
            async (
                api: StorageAPIKey,
                init: RequestInit
            ): Promise<Exclude<StorageAPIs[StorageAPIKey], null>> => {
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

                return fetch(
                    new URL(`/api/${api}`, location.origin),
                    init
                ).then(res => res.json());
            }
        );
    }

    // we're overriding the run method so that we can have a better and more explicit return type
    run<Api extends StorageAPIKey>(
        api: Api,
        init: RequestInit
    ): Promise<Exclude<StorageAPIs[Api], null>> {
        // we unfortunately have to cast here explicitly
        return super.run(api, init) as Promise<Exclude<StorageAPIs[Api], null>>;
    }
}

export default new FetchApiWorker();
