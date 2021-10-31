import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const getSetting = async <Type = boolean>(setting: string): Promise<Type> =>
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: setting,
        });

    if (await getSetting('mapScale')) {
        (
            await import(
                /* webpackChunkName: "modules/extendedMap/mapScale" */ './assets/mapScale'
            )
        ).default(
            await getSetting<
                'bottomleft' | 'bottomright' | 'topleft' | 'topright'
            >('mapScalePosition')
        );
    }
});
