export default (LSSM: Vue, moduleId: string, locale: string) =>
    import(
        /* webpackChunkName: "modules/i18n/[request]" */
        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+/ */
        /* webpackExclude: /(telemetry|releasenotes|support)|\.root\./ */
        `../modules/${moduleId}/i18n/${locale}`
    )
        .then(({ default: i18n }) =>
            LSSM.$i18n.mergeLocaleMessage(locale, {
                modules: {
                    [moduleId]: i18n,
                },
            })
        )
        .catch(() => {
            // if no i18n exists, do nothing
        });
