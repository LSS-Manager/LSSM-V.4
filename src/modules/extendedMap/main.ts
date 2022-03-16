import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async ({ LSSM, getSetting }) => {
    if (await getSetting('mapScale')) {
        import(
            /* webpackChunkName: "modules/extendedMap/mapScale" */ './assets/mapScale'
        ).then(async ({ default: mapScale }) =>
            mapScale(
                await getSetting<
                    'bottomleft' | 'bottomright' | 'topleft' | 'topright'
                >('mapScalePosition')
            )
        );
    }

    if (await getSetting('centerMap')) {
        import(
            /* webpackChunkName: "modules/extendedMap/centerMap" */ './assets/centerMap'
        ).then(({ default: centerMap }) => centerMap(LSSM, getSetting));
    }

    if (await getSetting('markerNewWindow')) {
        import(
            /* webpackChunkName: "modules/extendedMap/markerNewWindow" */ './assets/markerNewWindow'
        ).then(({ default: markerNewWindow }) => markerNewWindow(LSSM));
    }
});
