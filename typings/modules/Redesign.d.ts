import Vue from 'vue';
import { AllianceAvatarWindow } from '../../src/modules/redesign/parsers/alliance_avatar';
import { AllianceListWindow } from '../../src/modules/redesign/parsers/alliances';
import { AvatarWindow } from '../../src/modules/redesign/parsers/avatar';
import { CoinsListWindow } from '../../src/modules/redesign/parsers/coins/list';
import { CreditsDailyWindow } from '../../src/modules/redesign/parsers/credits/daily';
import { CreditsListWindow } from '../../src/modules/redesign/parsers/credits/list';
import { CreditsOverviewWindow } from '../../src/modules/redesign/parsers/credits/overview';
import { ProfileWindow } from '../../src/modules/redesign/parsers/profile';
import { ProfileEditWindow } from '../../src/modules/redesign/parsers/profile/edit';
import { TopListWindow } from '../../src/modules/redesign/parsers/toplist';
import { VehicleWindow } from '../../src/modules/redesign/parsers/vehicle';
import { VerbandHomeWindow } from '../../src/modules/redesign/parsers/verband/home';
import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';
import VueI18n from 'vue-i18n';
import { CombinedVueInstance } from 'vue/types/vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type types =
    | 'alliance_avatar'
    | 'alliances'
    | 'avatar'
    | 'default'
    | 'coins/list'
    | 'credits/daily'
    | 'credits/list'
    | 'credits/overview'
    | 'profile'
    | 'profile/edit'
    | 'toplist'
    | 'vehicle'
    | 'vehicle/nextfms'
    | 'verband/home';
type windows =
    | AllianceAvatarWindow
    | AllianceListWindow
    | AvatarWindow
    | CoinsListWindow
    | CreditsDailyWindow
    | CreditsListWindow
    | CreditsOverviewWindow
    | ProfileWindow
    | ProfileEditWindow
    | TopListWindow
    | VehicleWindow
    | VerbandHomeWindow;
export type routeChecks = Record<string, types>;

interface Data<T, D> {
    faSyncAlt: IconDefinition;
    type: T;
    data: D;
    html: string;
    urlProp: string;
    loading: boolean;
    errors: Error[];
}

export interface RedesignLightbox<
    Type extends types | '' = types | '',
    Window extends windows | null = windows | null
> {
    Data: Data<Type, Window>;
    Methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        getIdFromEl(el: HTMLAnchorElement | null): number;
        getSetting(): <T>(setting: string, defaultValue: T) => Promise<T>;
        setSetting(): <T>(settingId: string, value: T) => Promise<void>;
        finishLoading(text?: string): void;
    };
    Computed: DefaultComputed;
    Props: {
        url: string;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        routeChecks: routeChecks;
        noModal: boolean;
        creation: string;
    };
}

export type RedesignParser<Window extends windows> = (
    source: string,
    href: string,
    getIdFromEl: (el: HTMLAnchorElement | null) => number
) => Window;

export type RedesignParserNoIDFun<Window extends windows> = (
    source: string,
    href: string
) => Window;

export type RedesignParserSrcOnly<Window extends windows> = (
    source: string
) => Window;

export type RedesignLightboxVue<
    Type extends types,
    Window extends windows
> = CombinedVueInstance<
    Vue,
    RedesignLightbox<Type, Window>['Data'],
    RedesignLightbox<Type, Window>['Methods'],
    RedesignLightbox<Type, Window>['Computed'],
    RedesignLightbox<Type, Window>['Props']
>;

export type RedesignComponent<
    DataName extends string,
    Type extends types,
    Window extends windows,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps
> = {
    Data: Data;
    Methods: Methods;
    Computed: Computed;
    Props: Props &
        Record<DataName, Window> & {
            url: string;
            lightbox: RedesignLightboxVue<Type, Window>;
            getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
            setSetting: <T>(settingId: string, value: T) => Promise<void>;
        };
};

export type RedesignSubComponent<
    DataName extends string,
    Type extends types,
    Window extends windows,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps
> = {
    Data: Data;
    Methods: Methods;
    Computed: Computed;
    Props: Props &
        Record<DataName, Window> & {
            url: string;
            lightbox: RedesignLightboxVue<Type, Window>;
            $m(
                key: string,
                args?: {
                    [key: string]: unknown;
                }
            ): VueI18n.TranslateResult;
            $mc(
                key: string,
                amount: number,
                args?: {
                    [key: string]: unknown;
                }
            ): VueI18n.TranslateResult;
            getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
            setSetting: <T>(settingId: string, value: T) => Promise<void>;
        };
};
