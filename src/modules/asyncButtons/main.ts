import asyncBuildings from './assets/buildings';
import asyncMissions from './assets/missions';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            buildingTax: {
                type: 'toggle',
                default: true,
            },
            missionReply: {
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
    const missions = ['missionReply'].filter(async s => await getSetting(s));

    if (
        window.location.pathname.match(/^\/buildings\/\d+$/) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    )
        asyncBuildings(LSSM, buildings);

    // if (window.location.pathname.match(/^\/missions\/\d+$/) && missions.length)
    //     asyncMissions(LSSM, missions);
})((window[PREFIX] as unknown) as Vue);
