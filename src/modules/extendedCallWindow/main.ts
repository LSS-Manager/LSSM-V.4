import generationDate from './assets/generationDate';
import enhancedMissingVehicles from './assets/enhancedMissingVehicles';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            generationDate: {
                type: 'toggle',
                default: true,
            },
            enhancedMissingVehicles: {
                type: 'toggle',
                default: false,
            },
        },
    });

    if (
        !window.location.pathname.match(/^\/missions\/\d+$/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (await getSetting('generationDate')) generationDate();
    if (await getSetting('enhancedMissingVehicles'))
        enhancedMissingVehicles(LSSM);
})(window[PREFIX] as Vue);
