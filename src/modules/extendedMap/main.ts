import type { Complex } from './assets/buildingComplexes';
import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async ({
    MODULE_ID,
    LSSM,
    getSetting,
    $m,
}) => {
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

    const buildingComplexesSettings = (
        await getSetting<{
            value: Complex[];
            enabled: boolean;
        }>('buildingComplexes')
    ).value;

    if (buildingComplexesSettings.length) {
        import(
            /* webpackChunkName: "modules/extendedMap/buildingComplexes" */ './assets/buildingComplexes'
        ).then(({ default: buildingComplexes }) =>
            buildingComplexes(MODULE_ID, LSSM, buildingComplexesSettings, $m)
        );
    }
});
