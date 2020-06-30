import clickableLinks from './assets/clickableLinks';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            clickableLinks: {
                type: 'toggle',
                default: true,
            },
            showImg: {
                type: 'toggle',
                default: true,
                dependsOn: '.clickableLinks',
            },
        },
    });

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (await getSetting('clickableLinks'))
        clickableLinks(LSSM, await getSetting('showImg'));
})(window[PREFIX] as Vue);
