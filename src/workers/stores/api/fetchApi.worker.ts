import TypedWorker from '@workers/TypedWorker';

import type { Vehicle } from 'typings/Vehicle';
import type { APIKey, APIs } from '@stores/newApi';

interface ApiFetchResults extends APIs {
    vehicles: Vehicle[];
}

class FetchApiWorker extends TypedWorker<
    [api: APIKey, init: RequestInit],
    Promise<APIs[APIKey]>
> {
    constructor() {
        super(
            'api/fetch.worker',
            async <Api extends APIKey>(
                api: Api,
                init: RequestInit
            ): Promise<APIs[Api]> => {
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

                return fetch(new URL(`/api/${api}`, location.origin), init)
                    .then(res => res.json())
                    .then((res: ApiFetchResults[Api]) => {
                        if (api === 'vehicles') {
                            const vehiclesById: APIs['vehicles'] = {};
                            for (const vehicle of res)
                                vehiclesById[vehicle.id] = vehicle;
                            return vehiclesById;
                        }

                        return res;
                    });
            }
        );
    }

    // we're overriding the run method so that we can have a better and more explicit return type
    run<Api extends APIKey>(
        api: Api,
        init: RequestInit
    ): Promise<Exclude<APIs[Api], null>> {
        // we unfortunately have to cast here explicitly
        return super.run(api, init) as Promise<Exclude<APIs[Api], null>>;
    }
}

export default new FetchApiWorker();
