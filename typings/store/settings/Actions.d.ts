/**
 * @file - Types for the actions of settings store.
 */

import type { ModuleSettings, RegisterSettings } from '../../Setting';

export interface SettingsRegister {
    moduleId: string;
    settings: RegisterSettings;
}

export interface SettingsSet<SettingType> {
    moduleId: string;
    settingId: string;
    value: SettingType;
}

export type SettingsGet<SettingType, Unit extends string = ''> = Unit extends ''
    ? {
          moduleId: string;
          settingId: string;
          defaultValue?: SettingType;
          addUnit?: false;
      }
    : {
          moduleId: string;
          settingId: string;
          defaultValue?: SettingType;
          addUnit: true;
      };

export type SettingsGetType<SettingType, Unit extends string> = Promise<
    Unit extends ''
        ? SettingType
        : `${SettingType extends
              | bigint
              | boolean
              | number
              | string
              | null
              | undefined
              ? SettingType
              : string}${Unit}`
>;

export interface SettingsSave {
    settings: ModuleSettings;
}
