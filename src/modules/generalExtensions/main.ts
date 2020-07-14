import inputMaxLen from './assets/inputMaxLen';
import clickableLinks from './assets/clickableLinks';
import linkPreviews from './assets/linkPreviews';
import mapUndo from './assets/mapUndo';

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
            mapUndo: {
                type: 'toggle',
                default: false,
                noMapkit: true,
            },
        },
    });

    const getSetting = <returnType>(settingId: string): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    inputMaxLen(LSSM);

    if (await getSetting<boolean>('clickableLinks'))
        clickableLinks(LSSM, await getSetting('showImg'));
    const linkPreviewSetting = await getSetting<string[]>('linkPreviews');
    if (linkPreviewSetting.length) await linkPreviews(LSSM, linkPreviewSetting);
    if (
        window.location.pathname === '/' &&
        !LSSM.$store.state.mapkit &&
        (await getSetting<boolean>('mapUndo'))
    )
        await mapUndo(LSSM);
})(window[PREFIX] as Vue);
