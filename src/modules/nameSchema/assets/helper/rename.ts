import type { ModuleMainFunction } from 'typings/Module';

export default class RenameHelper {
    constructor(
        private readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {}

    public async renameVehicle(vehicleId: number, newCaption: string) {
        const { LSSM, MODULE_ID } = this.moduleParams;
        const url = new URL(`/vehicles/${vehicleId}`, window.location.origin);

        url.searchParams.append('_method', 'put');
        url.searchParams.append('utf8', '✓');
        url.searchParams.append(
            'authenticity_token',
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || ''
        );
        url.searchParams.append('vehicle[caption]', newCaption);

        try {
            await LSSM.$stores.api.request({
                url: `/vehicles/${vehicleId}`,
                feature: `${MODULE_ID}-rename-vehicle`,
                dialogOnError: false,
                init: {
                    redirect: 'manual',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Upgrade-Insecure-Requests': '1',
                    },
                    referrer: window.location.href,
                    body: url.searchParams.toString(),
                    method: 'POST',
                    mode: 'cors',
                },
            });

            return {
                newCaption,
            };
        } catch (e: unknown) {
            if (e instanceof Response && e.type === 'opaqueredirect') {
                // expected redirect
                return {
                    newCaption,
                };
            }

            // rethrow error
            throw e;
        }
    }
}
