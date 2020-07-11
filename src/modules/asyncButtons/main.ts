import asyncBuildings from './assets/buildings';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            buildingTax: {
                type: 'toggle',
                default: true,
            },
        },
    });

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const buildings = ['buildingTax'].filter(async s => await getSetting(s));

    if (
        window.location.pathname.match(/^\/buildings\/\d+$/) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    )
        asyncBuildings(LSSM, buildings);
})((window[PREFIX] as unknown) as Vue);
