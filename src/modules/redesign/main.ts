import { ModuleMainFunction } from 'typings/Module';

type types = 'vehicle';

const routeChecks = {
    '^/vehicles/\\d+/?$': 'vehicle',
} as Record<string, types>;

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
                        ).then(parser => parser.default(html))
                    );
                return false;
            },
        })
        .then();
}) as ModuleMainFunction;
