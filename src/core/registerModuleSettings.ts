import type { $m, ModuleSettingFunction } from 'typings/Module';

export default (LSSM: Vue, moduleId: string, $m: $m) =>
    import(
        /* webpackChunkName: "modules/settings/[request]" */
        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+settings\.ts/ */
        /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
        `../modules/${moduleId}/settings`
    )
        .then(({ default: register }: { default: ModuleSettingFunction }) =>
            register(moduleId, LSSM, $m)
        )
        .then(settings =>
            LSSM.$stores.settings.registerModule({ moduleId, settings })
        );
