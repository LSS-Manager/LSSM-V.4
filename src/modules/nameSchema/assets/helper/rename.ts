import type { ModuleMainFunction } from 'typings/Module';

export default class RenameHelper {
    constructor(
        private readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {}

    private async request(url: URL, feature: string) {
        const { LSSM, MODULE_ID } = this.moduleParams;

        url.searchParams.append('_method', 'put');
        url.searchParams.append('utf8', '✓');
        url.searchParams.append(
            'authenticity_token',
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || ''
        );

        try {
            await LSSM.$stores.api.request({
                url: url.pathname,
                feature: `${MODULE_ID}-${feature}`,
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
        } catch (e: unknown) {
            if (e instanceof Response && e.type === 'opaqueredirect') {
                // expected redirect
                return;
            }

            // rethrow error
            throw e;
        }
    }

    public async renameVehicle(vehicleId: number, newCaption: string) {
        const url = new URL(`/vehicles/${vehicleId}`, window.location.origin);

        url.searchParams.append('vehicle[caption]', newCaption);

        return this.request(url, 'rename-vehicle');
    }
    public async renameBuilding(buildingId: number, newCaption: string) {
        const url = new URL(`/buildings/${buildingId}`, window.location.origin);

        url.searchParams.append('building[name]', newCaption);

        return this.request(url, 'rename-building');
    }
}
