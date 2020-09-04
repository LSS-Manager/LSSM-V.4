import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
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

    (
        await import(
            /* webpackChunkName: "generalExtensions/inputMaxLen" */ './assets/inputMaxLen'
        )
    ).default(LSSM);

    if (
        !window.location.pathname.match(/^\/note\/?$/) &&
        (await getSetting<boolean>('clickableLinks'))
    )
        (
            await import(
                /* webpackChunkName: "generalExtensions/clickableLinks" */ './assets/clickableLinks'
            )
        ).default(LSSM, await getSetting('showImg'));
    const linkPreviewSetting = await getSetting<string[]>('linkPreviews');
    if (linkPreviewSetting.length)
        await (
            await import(
                /* webpackChunkName: "generalExtensions/linkPreviews" */ './assets/linkPreviews'
            )
        ).default(LSSM, linkPreviewSetting);
    if (
        window.location.pathname === '/' &&
        !LSSM.$store.state.mapkit &&
        (await getSetting<boolean>('mapUndo'))
    )
        await (
            await import(
                /* webpackChunkName: "generalExtensions/mapUndo" */ './assets/mapUndo'
            )
        ).default(LSSM);
}) as ModuleMainFunction;
