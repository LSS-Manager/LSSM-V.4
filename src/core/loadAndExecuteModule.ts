import executeModule from './executeModule';
import loadModuleRootTranslation from './loadModuleRootTranslation';
import loadModuleTranslation from './loadModuleTranslation';
import registerModuleSettings from './registerModuleSettings';

import type { $m, $mc } from 'typings/Module';

export default (
    LSSM: Vue,
    filteredActiveModules: string[],
    locale: string,
    moduleId: string,
    location: RegExp | string,
    settings?: boolean
) =>
    loadModuleRootTranslation(LSSM, moduleId, locale)
        .then(async () => {
            if (!filteredActiveModules.includes(moduleId)) return;
            LSSM.$stores.modules.setActive(moduleId);

            const $m = (key: string, args?: Record<string, unknown>) =>
                LSSM.$t(`modules.${moduleId}.${key}`, args);
            const $mc = (
                key: string,
                amount?: number,
                args?: Record<string, unknown>
            ) => LSSM.$tc(`modules.${moduleId}.${key}`, amount, args);

            if (settings) await registerModuleSettings(LSSM, moduleId, $m);

            if (!window.location.pathname.match(location)) return;

            if (moduleId === 'redesign') {
                document
                    .querySelector<HTMLButtonElement>('#lightbox_close_inside')
                    ?.remove();
            }

            await loadModuleTranslation(LSSM, moduleId, locale);

            return { $m, $mc };
        })
        .then(($t: { $m: $m; $mc: $mc } | undefined) => {
            // if $t is undefined, do not load module
            if (!$t) return;
            const { $m, $mc } = $t;
            return executeModule(LSSM, moduleId, $m, $mc);
        });
