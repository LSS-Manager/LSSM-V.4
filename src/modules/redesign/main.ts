import { ModuleMainFunction } from 'typings/Module';
import { VehicleWindow } from './parsers/vehicle';

type types = 'vehicle';
interface Results {
    vehicle: VehicleWindow;
}

const routeChecks = {
    '^/vehicles/\\d+/?$': 'vehicle',
} as Record<string, types>;

const getIdFromEl = (el: HTMLAnchorElement | null): number =>
    parseInt(el?.href?.match(/\d+\/?$/)?.[0] ?? '-1');

export default (LSSM => {
    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxOpen',
            abortOnFalse: true,
            callback(href: string) {
                const type = Object.entries(routeChecks).find(([regex]) =>
                    new URL(href, window.location.href).pathname.match(regex)
                )?.[1];

                if (!type) return true;

                LSSM.$store
                    .dispatch('api/request', {
                        url: href,
                        feature: `redesign-${type}`,
                    })
                    .then((res: Response) => res.text())
                    .then(html =>
                        import(
                            /*webpackChunkName: "modules/redesign/parsers/[request]"*/ `./parsers/${type}`
                        ).then(parser => {
                            const result: Results[typeof type] = parser.default(
                                html,
                                getIdFromEl
                            );
                            console.log(result);
                        })
                    );
                return false;
            },
        })
        .then();
}) as ModuleMainFunction;
