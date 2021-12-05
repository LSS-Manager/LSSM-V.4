import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const getSetting = async <Type = boolean>(setting: string): Promise<Type> =>
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: setting,
        });

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
});
