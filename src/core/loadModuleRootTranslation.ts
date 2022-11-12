export default (LSSM: Vue, moduleId: string, locale: string) =>
    import(
        /* webpackChunkName: "modules/i18n/[request]" */
        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+.*?\.root/ */
        `../modules/${moduleId}/i18n/${locale}.root`
    )
        .then(({ default: i18n }) =>
            LSSM.$i18n.mergeLocaleMessage(locale, {
                modules: {
                    [moduleId]: i18n,
                },
            })
        )
        .catch(() =>
            LSSM.$stores.console.warn(
                `[core] root translation »${moduleId}/${locale}.root« could not be imported. The file is probably nonexistent`
            )
        );
