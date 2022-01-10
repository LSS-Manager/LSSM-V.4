import Vue from 'vue';

import { AAOsWindow } from '../../src/modules/redesign/parsers/aaos';
import { AllianceAvatarWindow } from '../../src/modules/redesign/parsers/alliance_avatar';
import { AllianceListWindow } from '../../src/modules/redesign/parsers/alliances';
import { AvatarWindow } from '../../src/modules/redesign/parsers/avatar';
import { AwardsWindow } from '../../src/modules/redesign/parsers/awards';
import { BewerbungenWindow } from '../../src/modules/redesign/parsers/bewerbungen';
import { CoinsListWindow } from '../../src/modules/redesign/parsers/coins/list';
import { CreditsDailyWindow } from '../../src/modules/redesign/parsers/credits/daily';
import { CreditsListWindow } from '../../src/modules/redesign/parsers/credits/list';
import { CreditsOverviewWindow } from '../../src/modules/redesign/parsers/credits/overview';
import { EinsaetzeWindow } from '../../src/modules/redesign/parsers/einsaetze';
import { EinsatzWindow } from '../../src/modules/redesign/parsers/einsatz';
import { FahrzeugfarbeWindow } from '../../src/modules/redesign/parsers/fahrzeugfarbe';
import { FreundeWindow } from '../../src/modules/redesign/parsers/freunde';
import { NextFMSWindow } from '../../src/modules/redesign/parsers/vehicle/nextfms';
import { NoteWindow } from '../../src/modules/redesign/parsers/note';
import { ProfileEditWindow } from '../../src/modules/redesign/parsers/profile/edit';
import { ProfileWindow } from '../../src/modules/redesign/parsers/profile';
import { SchoolingsWindow } from '../../src/modules/redesign/parsers/schoolings';
import { TopListWindow } from '../../src/modules/redesign/parsers/toplist';
import { VehicleGroupWindow } from 'modules/redesign/parsers/vehicle_group';
import { VehicleStatsWindow } from '../../src/modules/redesign/parsers/vehicle/stats';
import { VehicleWindow } from '../../src/modules/redesign/parsers/vehicle';
import { VerbandBSRWindow } from '../../src/modules/redesign/parsers/verband/bsr';
import { VerbandChatWindow } from '../../src/modules/redesign/parsers/chat';
import { VerbandEditNameWindow } from '../../src/modules/redesign/parsers/verband/edit_name';
import { VerbandEditTextWindow } from '../../src/modules/redesign/parsers/verband/edit_text';
import { VerbandGebaeudeWindow } from '../../src/modules/redesign/parsers/verband/gebauede';
import { VerbandHomeWindow } from '../../src/modules/redesign/parsers/verband/home';
import { VerbandMitgliederWindow } from '../../src/modules/redesign/parsers/verband/mitglieder';
import { VerbandNewsEditWindow } from '../../src/modules/redesign/parsers/verband/news/edit';
import { VerbandProtokollWindow } from '../../src/modules/redesign/parsers/verband/protokoll';
import { VerbandRegelnWindow } from '../../src/modules/redesign/parsers/verband/regeln';
import { VerbandskasseWindow } from '../../src/modules/redesign/parsers/verband/kasse';

import { CombinedVueInstance } from 'vue/types/vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import VueI18n from 'vue-i18n';
import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

interface Redesigns {
    'aaos': AAOsWindow;
    'alliance_avatar': AllianceAvatarWindow;
    'alliances': AllianceListWindow;
    'avatar': AvatarWindow;
    'awards': AwardsWindow;
    'bewerbungen': BewerbungenWindow;
    'chat': VerbandChatWindow;
    'coins/list': CoinsListWindow;
    'credits/daily': CreditsDailyWindow;
    'credits/list': CreditsListWindow;
    'credits/overview': CreditsOverviewWindow;
    'einsaetze': EinsaetzeWindow;
    'einsatz': EinsatzWindow;
    'fahrzeugfarbe': FahrzeugfarbeWindow;
    'freunde': FreundeWindow;
    'profile': ProfileWindow;
    'profile/edit': ProfileEditWindow;
    'note': NoteWindow;
    'schoolings': SchoolingsWindow;
    'toplist': TopListWindow;
    'vehicle_group': VehicleGroupWindow;
    'vehicle': VehicleWindow;
    'vehicle/nextfms': NextFMSWindow;
    'vehicle/stats': VehicleStatsWindow;
    'verband/bsr': VerbandBSRWindow;
    'verband/edit_name': VerbandEditNameWindow;
    'verband/edit_text': VerbandEditTextWindow;
    'verband/gebauede': VerbandGebaeudeWindow;
    'verband/home': VerbandHomeWindow;
    'verband/kasse': VerbandskasseWindow;
    'verband/mitglieder': VerbandMitgliederWindow;
    'verband/news/edit': VerbandNewsEditWindow;
    'verband/protokoll': VerbandProtokollWindow;
    'verband/regeln': VerbandRegelnWindow;
}

type RedesignKey = keyof Redesigns;

type RedesignWindow = Redesigns[RedesignKey];

export type routeChecks = Record<string, RedesignKey>;

interface Data<T extends RedesignKey | 'default' | ''> {
    faSyncAlt: IconDefinition;
    clipboardIconId: string;
    type: T;
    data: (T extends keyof Redesigns ? Redesigns[T] : never) & {
        authenticity_token: string;
    };
    html: string;
    urlProp: string;
    loading: boolean;
    errors: Error[];
    clickableLinks: {
        enabled: boolean;
        pictures: boolean;
    };
    windows: Record<
        Exclude<
            RedesignKey,
            | 'coins/list'
            | 'credits/daily'
            | 'credits/list'
            | 'credits/overview'
            | 'vehicle/nextfms'
            | 'verband/bsr'
            | 'verband/edit_name'
            | 'verband/edit_text'
            | 'verband/gebauede'
            | 'verband/home'
            | 'verband/kasse'
            | 'verband/mitglieder'
            | 'verband/news/edit'
            | 'verband/protokoll'
            | 'verband/regeln'
        >,
        {
            component: () => Promise<unknown>;
            data: string;
        }
    >;
}

export interface RedesignLightbox<
    Type extends RedesignKey | 'default' | '' = RedesignKey | 'default' | ''
> {
    Data: Data<Type>;
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
        copyUrl(): void;
    };
    Computed: {
        loaderOffset: number;
        fullUrl: string;
        src: string;
    };
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
        size: number;
    };
}

interface ParserParam {
    doc: Document;
    href?: string;
    getIdFromEl?: (el: HTMLAnchorElement | null) => number;
    LSSM: Vue;
}

export type RedesignParser<Window extends RedesignWindow = RedesignWindow> = (
    data: ParserParam
) => Window | Promise<Window>;

export type RedesignLightboxVue<Type extends RedesignKey> = CombinedVueInstance<
    Vue,
    RedesignLightbox<Type>['Data'],
    RedesignLightbox<Type>['Methods'],
    RedesignLightbox<Type>['Computed'],
    RedesignLightbox<Type>['Props']
>;

export type RedesignComponent<
    DataName extends string,
    Type extends RedesignKey,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps
> = {
    Data: Data;
    Methods: Methods;
    Computed: Computed;
    Props: Props &
        Record<DataName, Redesigns[Type] & { authenticity_token: string }> & {
            url: string;
            lightbox: RedesignLightboxVue<Type>;
            getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
            setSetting: <T>(settingId: string, value: T) => Promise<void>;
        };
};

export type RedesignSubComponent<
    DataName extends string,
    Type extends RedesignKey,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps
> = RedesignComponent<
    DataName,
    Type,
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
