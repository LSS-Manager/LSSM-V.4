import type { Games } from './Game';
import type { RegisterSettings } from './Setting';
import type VueI18n from 'vue-i18n';

export type Module = Partial<{
    active: boolean;
    alpha: boolean;
    dev: boolean;
    github: number;
    locales: (keyof Games)[] | null;
    collisions: (keyof Modules)[] | null;
    noapp: boolean;
    noMapkit: boolean;
    settings: boolean;
    location: RegExp;

    // being generated in AppStore
    description: string;
}> & { location: RegExp | string };

export type Modules = Record<string, Module>;

export type $m = (
    key: string,
    args?: Record<string, unknown>
) => VueI18n.TranslateResult;

export type $mc = (
    key: string,
    amount: number,
    args?: Record<string, unknown>
) => VueI18n.TranslateResult;

export type ModuleMainFunction = (parameters: {
    LSSM: Vue;
    MODULE_ID: string;
    $m: $m;
    $mc: $mc;
    getSetting<T = boolean>(settingId: string, defaultValue?: T): Promise<T>;
}) => Promise<void> | void;

export type ModuleSettingFunction =
    | ((
          MODULE_ID: string,
          LSSM: Vue
      ) => Promise<RegisterSettings> | RegisterSettings)
    | ((
          MODULE_ID: string,
          LSSM: Vue,
          $m: $m
      ) => Promise<RegisterSettings> | RegisterSettings)
    | ((MODULE_ID: string) => Promise<RegisterSettings> | RegisterSettings);
