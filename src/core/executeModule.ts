import type { SettingsGet } from 'typings/store/settings/Actions';
import type { $m, $mc, ModuleMainFunction } from 'typings/Module';

export default (LSSM: Vue, moduleId: string, $m: $m, $mc: $mc) =>
    import(
        /* webpackChunkName: "modules/mains/[request]" */
        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+main\.ts/ */
        /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
        `../modules/${moduleId}/main`
    ).then(module =>
        (module.default as ModuleMainFunction)({
            LSSM,
            MODULE_ID: moduleId,
            $m,
            $mc,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore idk why TS doesn't like this
            getSetting: <T = boolean, Unit extends string = ''>(
                settingId: string,
                defaultValue: T | undefined,
                addUnit: Unit extends '' ? false | undefined : true
            ) =>
                addUnit
                    ? LSSM.$stores.settings.getSetting<T, Unit>({
                          moduleId,
                          settingId,
                          defaultValue,
                          addUnit,
                      } as SettingsGet<T, Unit>)
                    : LSSM.$stores.settings.getSetting<T>({
                          moduleId,
                          settingId,
                          defaultValue,
                      }),
            setSetting: (settingId, value) =>
                LSSM.$stores.settings.setSetting({
                    moduleId,
                    settingId,
                    value,
                }),
        })
    );
