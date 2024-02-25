import TypedWorker from '@workers/TypedWorker';

import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';
import type { APIKey, APIs } from '@stores/newApi';

interface ApiFetchResults extends APIs {
    vehicles: Vehicle[];
    buildings: Building[];
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
                        // we want to store vehicles and buildings by ID for easier access
                        // TODO: Remove Array.isArray check when Typescript extends oneof is available
                        if (
                            Array.isArray(res) &&
                            (api === 'vehicles' || api === 'buildings')
                        ) {
                            // @ts-expect-error unfortunately, typescript doesn't understand that we're filtering here (we need the extends oneof!)
                            const byId: APIs[Api] = {};
                            for (const item of res) byId[item.id] = item;
                            return byId;
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
