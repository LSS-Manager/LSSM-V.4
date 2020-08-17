import asyncBuildings from './assets/buildings';
import asyncMissions from './assets/missions';
import asyncMemberlist from './assets/memberlist';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            buildingTax: {
                type: 'toggle',
                default: true,
            },
            missionPrisoners: {
                type: 'toggle',
                default: true,
            },
            missionReply: {
                type: 'toggle',
                default: false,
                disabled: () => true,
            },
            caption: {
                type: 'toggle',
                default: false,
                disabled: () => true,
            },
            ranks: {
                type: 'toggle',
                default: false,
                disabled: () => true,
            },
            kick: {
                type: 'toggle',
                default: false,
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
    const missions = ['missionPrisoners', 'missionReply'].filter(
        async s => await getSetting(s)
    );
    const memberlist = ['caption', 'ranks', 'kick'].filter(
        async s => await getSetting(s)
    );

    if (
        window.location.pathname.match(/^\/buildings\/\d+\/?$/) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    )
        asyncBuildings(LSSM, buildings);

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?$/) &&
        missions.length
    )
        asyncMissions(LSSM, missions);

    if (window.location.pathname.match(/^\/verband\/mitglieder\/\d+\/?$/))
        asyncMemberlist(LSSM, memberlist);
})((window[PREFIX] as unknown) as Vue);
