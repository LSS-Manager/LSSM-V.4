import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID, $m, getSetting, setSetting }) => {
    import(
        /* webpackChunkName: "modules/generalExtensions/inputMaxLen" */ './assets/inputMaxLen'
    ).then(({ default: inputMaxLen }) => inputMaxLen(LSSM));

    if (await getSetting<boolean>('browserTitle')) {
        import(
            /* webpackChunkName: "modules/generalExtensions/browserTitle" */ './assets/browserTitle'
        ).then(({ default: browserTitle }) => browserTitle(LSSM));
    }

    if (await getSetting<boolean>('emojiPicker')) {
        import(
            /* webpackChunkName: "modules/generalExtensions/emojiPicker" */ './assets/emojiPicker'
        ).then(({ default: emojiPicker }) => emojiPicker(LSSM));
    }

    const isNotePage = window.location.pathname.match(/^\/note\/?/u);
    if (
        (await getSetting<boolean>('clickableLinks')) &&
        (!isNotePage || (await getSetting('notePreview')))
    ) {
        import(
            /* webpackChunkName: "modules/generalExtensions/clickableLinks" */ './assets/clickableLinks'
        ).then(async ({ default: clickableLinks }) =>
            clickableLinks(LSSM, await getSetting('showImg'))
        );
    }
    const linkPreviewSetting = await getSetting<string[]>('linkPreviews');
    if (linkPreviewSetting.length) {
        import(
            /* webpackChunkName: "modules/generalExtensions/linkPreviews" */ './assets/linkPreviews'
        ).then(({ default: linkPreviews }) =>
            linkPreviews(LSSM, linkPreviewSetting, MODULE_ID)
        );
    }
    const mapUndo = await getSetting<boolean>('mapUndo');
    const ownMapMarkers = await getSetting<boolean>('ownMapMarkers');
    if (
        window.location.pathname === '/' &&
        !LSSM.$stores.root.mapkit &&
        (mapUndo || ownMapMarkers)
    ) {
        import(
            /* webpackChunkName: "modules/generalExtensions/mapMarkers" */ './assets/mapMarkers'
        ).then(({ default: mapMarkers }) =>
            mapMarkers(
                LSSM,
                mapUndo,
                ownMapMarkers,
                getSetting,
                setSetting,
                MODULE_ID
            )
        );
    }
    if (
        window.location.pathname === '/' &&
        (await getSetting<boolean>('extensionCloseCall'))
    ) {
        import(
            /* webpackChunkName: "modules/generalExtensions/extensionCloseCall" */ './assets/extensionCloseCall'
        ).then(({ default: extensionCloseCall }) => extensionCloseCall());
    }
    const saveLastBuildingType = await getSetting<boolean>(
        'saveLastBuildingType'
    );
    const saveLastDispatchCenter = await getSetting<boolean>(
        'saveLastDispatchCenter'
    );
    if (window.location.pathname === '/') {
        import(
            /* webpackChunkName: "modules/generalExtensions/newBuilding" */ './assets/newBuilding'
        ).then(({ default: newBuilding }) =>
            newBuilding(
                saveLastBuildingType,
                saveLastDispatchCenter,
                getSetting,
                setSetting
            )
        );
    }

    const addToPanelHeading = !!window.location.pathname.match(
        /^\/(verband\/(bereitstellungsraume|gebauede|location)|buildings\/\d+\/move)\/?$/u
    );
    const isDispatchCenter =
        !!window.location.pathname.match(/^\/buildings\/\d+\/?$/u) &&
        !!document.querySelector<HTMLDivElement>('#tab_projected_missions');

    const mapSearchOnMap = await getSetting<boolean>('mapSearchOnMap');

    import(
        /* webpackChunkName: "modules/generalExtensions/mapSearches" */ './assets/mapSearches'
    ).then(async ({ default: mapSearches }) =>
        mapSearches(
            LSSM.$t('mapSearch').toString(),
            addToPanelHeading,
            mapSearchOnMap,
            await getSetting<
                'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
            >('mapSearchOnMapPosition'),
            LSSM
        )
    );

    if (isDispatchCenter) {
        import(
            /* webpackChunkName: "modules/generalExtensions/protocolDeletionConfirmation" */ './assets/protocolDeletionConfirmation'
        ).then(async ({ default: protocolDeletionConfirmation }) =>
            protocolDeletionConfirmation(
                LSSM,
                t => $m(`protocolDeletionConfirmation.${t}`),
                await getSetting('deleteSingleProtocolEntry'),
                MODULE_ID,
                setSetting
            )
        );
    }

    if (window.location.pathname.match(/\/aao_exports\/?$/u)) {
        import(
            /* webpackChunkName: "modules/generalExtensions/aaoExportQr" */ './assets/aaoExportQr'
        ).then(({ default: aaoExportQr }) => aaoExportQr());
    }
}) as ModuleMainFunction;
