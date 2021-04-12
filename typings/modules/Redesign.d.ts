import Vue from 'vue';
import { AAOsWindow } from '../../src/modules/redesign/parsers/aaos';
import { AllianceAvatarWindow } from '../../src/modules/redesign/parsers/alliance_avatar';
import { AllianceListWindow } from '../../src/modules/redesign/parsers/alliances';
import { AvatarWindow } from '../../src/modules/redesign/parsers/avatar';
import { CoinsListWindow } from '../../src/modules/redesign/parsers/coins/list';
import { CreditsDailyWindow } from '../../src/modules/redesign/parsers/credits/daily';
import { CreditsListWindow } from '../../src/modules/redesign/parsers/credits/list';
import { CreditsOverviewWindow } from '../../src/modules/redesign/parsers/credits/overview';
import { FreundeWindow } from '../../src/modules/redesign/parsers/freunde';
import { NextFMSWindow } from '../../src/modules/redesign/parsers/vehicle/nextfms';
import { ProfileWindow } from '../../src/modules/redesign/parsers/profile';
import { ProfileEditWindow } from '../../src/modules/redesign/parsers/profile/edit';
import { TopListWindow } from '../../src/modules/redesign/parsers/toplist';
import { VehicleWindow } from '../../src/modules/redesign/parsers/vehicle';
import { VerbandEditNameWindow } from '../../src/modules/redesign/parsers/verband/edit_name';
import { VerbandEditTextWindow } from '../../src/modules/redesign/parsers/verband/edit_text';
import { VerbandHomeWindow } from '../../src/modules/redesign/parsers/verband/home';
import { VerbandMitgliederWindow } from '../../src/modules/redesign/parsers/verband/mitglieder';
import { VerbandNewsEditWindow } from '../../src/modules/redesign/parsers/verband/news/edit';
import { VerbandRegelnWindow } from '../../src/modules/redesign/parsers/verband/regeln';
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
    | 'aaos'
    | 'alliance_avatar'
    | 'alliances'
    | 'avatar'
    | 'default'
    | 'coins/list'
    | 'credits/daily'
    | 'credits/list'
    | 'credits/overview'
    | 'freunde'
    | 'profile'
    | 'profile/edit'
    | 'toplist'
    | 'vehicle'
    | 'vehicle/nextfms'
    | 'verband/edit_name'
    | 'verband/edit_text'
    | 'verband/home'
    | 'verband/mitglieder'
    | 'verband/news/edit'
    | 'verband/regeln';
type windows =
    | AAOsWindow
    | AllianceAvatarWindow
    | AllianceListWindow
    | AvatarWindow
    | CoinsListWindow
    | CreditsDailyWindow
    | CreditsListWindow
    | CreditsOverviewWindow
    | FreundeWindow
    | NextFMSWindow
    | ProfileWindow
    | ProfileEditWindow
    | TopListWindow
    | VehicleWindow
    | VerbandEditNameWindow
    | VerbandEditTextWindow
    | VerbandHomeWindow
    | VerbandMitgliederWindow
    | VerbandNewsEditWindow
    | VerbandRegelnWindow;
export type routeChecks = Record<string, types>;

interface Data<T, W> {
    faSyncAlt: IconDefinition;
    type: T;
    data: W & {
        authenticity_token: string;
    };
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

interface ParserParam {
    doc: Document;
    href: string;
    getIdFromEl: (el: HTMLAnchorElement | null) => number;
}

export type RedesignParser<Window extends windows> = (
    data: ParserParam
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
        Record<DataName, Window & { authenticity_token: string }> & {
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
> = RedesignComponent<
    DataName,
    Type,
    Window,
    Data,
    Methods,
    Computed,
    Props & {
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
    }
>;
