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
            memberlistManageUser: {
                type: 'toggle',
                default: false,
            },
            deleteForumPost: {
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

    if (
        window.location.pathname.match(/^\/buildings\/\d+\/?$/) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    )
        (
            await import(
                /* webpackChunkName: "asyncButtons/buildings" */ './assets/buildings'
            )
        ).default(LSSM, buildings);

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?$/) &&
        missions.length
    )
        import(
            /* webpackChunkName: "asyncButtons/missions" */ './assets/missions'
        ).then(a => a.default(LSSM, missions));

    if (
        window.location.pathname.match(/^\/verband\/mitglieder(\/\d+)?\/?$/) &&
        (await getSetting('memberlistManageUser'))
    )
        (
            await import(
                /* webpackChunkName: "asyncButtons/memberlist" */ './assets/memberlist'
            )
        ).default(LSSM);
    if (
        window.location.pathname.match(
            /^\/alliance_threads\/\d+\/?(\?page=\d+)?$/
        ) &&
        (await getSetting('deleteForumPost'))
    )
        import(
            /* webpackChunkName: "asyncButtons/forumpost" */ './assets/forumpost'
        ).then(a => a.default(LSSM));
})((window[PREFIX] as unknown) as Vue);
