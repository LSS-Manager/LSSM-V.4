export default (LSSM: Vue, locale: string) =>
    Promise.allSettled(
        LSSM.$stores.modules.coreModuleIds.map(moduleId =>
            import(
                /* webpackChunkName: "modules/i18n/[request]" */
                /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+.*?\.root/ */
                `../modules/${moduleId}/i18n/${locale}.root`
            ).then(({ default: translation }) =>
                LSSM.$i18n.mergeLocaleMessage(locale, {
                    modules: {
                        [moduleId]: translation,
                    },
                })
            )
        )
    );
