import { Games } from './Game';
import VueI18n from 'vue-i18n';
import { RegisterSettings } from './Setting';

export interface Module {
    active: boolean;
    alpha: boolean;
    location: RegExp | string;
    locales: null | (keyof Games)[];
    collisions: null | (keyof Modules)[];
    noapp: boolean;
    noMapkit: boolean;
    description: string;
    settings: boolean;
}

export interface Modules {
    [moduleId: string]: Module;
}

export type $m = (
    key: string,
    args?: { [key: string]: unknown }
) => VueI18n.TranslateResult;

export type $mc = (
    key: string,
    amount?: number,
    args?: { [key: string]: unknown }
) => string;

export type ModuleMainFunction = (
    LSSM: Vue,
    MODULE_ID: string,
    $m: $m,
    $mc: $mc
) => void | Promise<void>;

export type ModuleSettingFunction =
    | ((
          MODULE_ID: string,
          LSSM: Vue,
          $m: $m
      ) => RegisterSettings | Promise<RegisterSettings>)
    | ((
          MODULE_ID: string,
          LSSM: Vue
      ) => RegisterSettings | Promise<RegisterSettings>)
    | ((MODULE_ID: string) => RegisterSettings | Promise<RegisterSettings>);
