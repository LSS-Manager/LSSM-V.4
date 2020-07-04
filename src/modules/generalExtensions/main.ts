import clickableLinks from './assets/clickableLinks';
import linkPreviews from './assets/linkPreviews';

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
            linkPreviews: {
                type: 'multiSelect',
                default: [],
                values: ['buildings', 'missions', 'vehicles', 'profile'],
            },
        },
    });

    const getSetting = <returnType>(settingId: string): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (await getSetting<boolean>('clickableLinks'))
        clickableLinks(LSSM, await getSetting('showImg'));
    const linkPreviewSetting = await getSetting<string[]>('linkPreviews');
    if (linkPreviewSetting.length) await linkPreviews(LSSM, linkPreviewSetting);
})(window[PREFIX] as Vue);
