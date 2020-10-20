import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <returnType>(settingId: string): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    (
        await import(
            /* webpackChunkName: "modules/generalExtensions/inputMaxLen" */ './assets/inputMaxLen'
        )
    ).default(LSSM);

    if (await getSetting<boolean>('browserTitle'))
        (
            await import(
                /* webpackChunkName: "modules/generalExtensions/browserTitle" */ './assets/browserTitle'
            )
        ).default(LSSM);

    if (await getSetting<boolean>('emojiPicker'))
        await (
            await import(
                /* webpackChunkName: "modules/generalExtensions/emojiPicker" */ './assets/emojiPicker'
            )
        ).default(LSSM);

    if (
        !window.location.pathname.match(/^\/note\/?$/) &&
        (await getSetting<boolean>('clickableLinks'))
    )
        (
            await import(
                /* webpackChunkName: "modules/generalExtensions/clickableLinks" */ './assets/clickableLinks'
            )
        ).default(LSSM, await getSetting('showImg'));
    const linkPreviewSetting = await getSetting<string[]>('linkPreviews');
    if (linkPreviewSetting.length)
        await (
            await import(
                /* webpackChunkName: "modules/generalExtensions/linkPreviews" */ './assets/linkPreviews'
            )
        ).default(LSSM, linkPreviewSetting);
    if (
        window.location.pathname === '/' &&
        !LSSM.$store.state.mapkit &&
        (await getSetting<boolean>('mapUndo'))
    )
        await (
            await import(
                /* webpackChunkName: "modules/generalExtensions/mapUndo" */ './assets/mapUndo'
            )
        ).default(LSSM);
}) as ModuleMainFunction;
