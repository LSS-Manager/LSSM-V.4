import type Vue from 'vue';

import type { AAOsWindow } from '../../src/modules/redesign/parsers/aaos';
import type { AllianceAvatarWindow } from '../../src/modules/redesign/parsers/alliance_avatar';
import type { AllianceListWindow } from '../../src/modules/redesign/parsers/alliances';
import type { AvatarWindow } from '../../src/modules/redesign/parsers/avatar';
import type { AwardsWindow } from '../../src/modules/redesign/parsers/awards';
import type { BewerbungenWindow } from '../../src/modules/redesign/parsers/bewerbungen';
import type { CoinsListWindow } from '../../src/modules/redesign/parsers/coins/list';
import type { ConversationWindow } from '../../src/modules/redesign/parsers/messages/conversation';
import type { CreditsDailyWindow } from '../../src/modules/redesign/parsers/credits/daily';
import type { CreditsListWindow } from '../../src/modules/redesign/parsers/credits/list';
import type { CreditsOverviewWindow } from '../../src/modules/redesign/parsers/credits/overview';
import type { EinsaetzeWindow } from '../../src/modules/redesign/parsers/einsaetze';
import type { EinsatzWindow } from '../../src/modules/redesign/parsers/einsatz';
import type { FahrzeugfarbeWindow } from '../../src/modules/redesign/parsers/fahrzeugfarbe';
import type { FreundeWindow } from '../../src/modules/redesign/parsers/freunde';
import type { NewMessageWindow } from '../../src/modules/redesign/parsers/messages/new';
import type { NextFMSWindow } from '../../src/modules/redesign/parsers/vehicle/nextfms';
import type { NoteWindow } from '../../src/modules/redesign/parsers/note';
import type { ProfileEditWindow } from '../../src/modules/redesign/parsers/profile/edit';
import type { ProfileWindow } from '../../src/modules/redesign/parsers/profile';
import type { SchoolingsWindow } from '../../src/modules/redesign/parsers/schoolings';
import type { SystemMessageWindow } from '../../src/modules/redesign/parsers/messages/system_message';
import type { TasksWindow } from '../../src/modules/redesign/parsers/tasks';
import type { TopListWindow } from '../../src/modules/redesign/parsers/toplist';
import type { VehicleGroupWindow } from 'modules/redesign/parsers/vehicle_group';
import type { VehicleStatsWindow } from '../../src/modules/redesign/parsers/vehicle/stats';
import type { VehicleWindow } from '../../src/modules/redesign/parsers/vehicle';
import type { VerbandBSRWindow } from '../../src/modules/redesign/parsers/verband/bsr';
import type { VerbandChatWindow } from '../../src/modules/redesign/parsers/chat';
import type { VerbandEditNameWindow } from '../../src/modules/redesign/parsers/verband/edit_name';
import type { VerbandEditTextWindow } from '../../src/modules/redesign/parsers/verband/edit_text';
import type { VerbandGebaeudeWindow } from '../../src/modules/redesign/parsers/verband/gebauede';
import type { VerbandHomeWindow } from '../../src/modules/redesign/parsers/verband/home';
import type { VerbandMitgliederWindow } from '../../src/modules/redesign/parsers/verband/mitglieder';
import type { VerbandNewsEditWindow } from '../../src/modules/redesign/parsers/verband/news/edit';
import type { VerbandProtokollWindow } from '../../src/modules/redesign/parsers/verband/protokoll';
import type { VerbandRegelnWindow } from '../../src/modules/redesign/parsers/verband/regeln';
import type { VerbandskasseWindow } from '../../src/modules/redesign/parsers/verband/kasse';
// workaround comment to allow custom group for parser imports
import type { CombinedVueInstance } from 'vue/types/vue';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RootScopeWithoutAll } from '../../src/modules/hotkeys/main';
import type { useAPIStore } from '@stores/api';
import type { useBroadcastStore } from '@stores/broadcast';
import type { useConsoleStore } from '@stores/console';
import type { useEventStore } from '@stores/event';
import type { useModulesStore } from '@stores/modules';
import type { useNotificationStore } from '@stores/notifications';
import type { useRootStore } from '@stores/index';
import type { useSettingsStore } from '@stores/settings';
import type { useStorageStore } from '@stores/storage';
import type { useTranslationStore } from '@stores/translationUtilities';
import type VueI18n from 'vue-i18n';
import type { $m, $mc } from 'typings/Module';
import type {
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
    'messages/conversation': ConversationWindow;
    'messages/new': NewMessageWindow;
    'messages/system_message': SystemMessageWindow;
    'note': NoteWindow;
    'profile': ProfileWindow;
    'profile/edit': ProfileEditWindow;
    'schoolings': SchoolingsWindow;
    'tasks': TasksWindow;
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

interface Data<T extends RedesignKey | '' | 'default'> {
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
    existingHotkeys: string[];
    apiStore: ReturnType<typeof useAPIStore>;
    broadcastStore: ReturnType<typeof useBroadcastStore>;
    consoleStore: ReturnType<typeof useConsoleStore>;
    eventStore: ReturnType<typeof useEventStore>;
    modulesStore: ReturnType<typeof useModulesStore>;
    notificationsStore: ReturnType<typeof useNotificationStore>;
    rootStore: ReturnType<typeof useRootStore>;
    settingsStore: ReturnType<typeof useSettingsStore>;
    storageStore: ReturnType<typeof useStorageStore>;
    translationStore: ReturnType<typeof useTranslationStore>;
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
            component(): Promise<unknown>;
            data: string;
        }
    >;
}

export interface RedesignLightbox<
    Type extends RedesignKey | '' | 'default' = RedesignKey | '' | 'default',
> {
    Data: Data<Type>;
    Methods: {
        $sm(
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        getIdFromEl(el: HTMLAnchorElement | null): number;
        getSetting(): <S extends string, T>(
            setting: S,
            defaultValue: T
        ) => Promise<T>;
        setSetting(): <S extends string, T>(
            settingId: S,
            value: T
        ) => Promise<void>;
        finishLoading(text?: string): void;
        copyUrl(): void;
        setHotkeyRedesignParam<
            Component extends RedesignComponent<string, RedesignKey>,
            VueInstance extends
                RedesignVueInstance<Component> = RedesignVueInstance<Component>,
        >(
            scope:
                | `${RootScopeWithoutAll}.${string}`
                | `${RootScopeWithoutAll}`,
            extras: {
                component: VueInstance;
                data: Partial<VueInstance['Data']>;
                methods: Partial<VueInstance['Methods']>;
                computed: Partial<VueInstance['Computed']>;
            }
        ): void;
        unsetHotkeyRedesignParam(
            scope: `${RootScopeWithoutAll}.${string}` | `${RootScopeWithoutAll}`
        ): void;
    };
    Computed: {
        lightbox: Type extends keyof Redesigns
            ? RedesignLightboxVue<Type>
            : null;
        loaderOffset: number;
        fullUrl: string;
        src: string;
        modalName: string;
    };
    Props: {
        url: string;
        $m: $m;
        $mc: $mc;
        routeChecks: routeChecks;
        noModal: boolean;
        creation: string;
        size: number;
    };
}

interface ParserParam<Type extends RedesignKey = RedesignKey> {
    doc: Document;
    href?: string;
    getIdFromEl?(el: HTMLAnchorElement | null): number;
    LSSM: RedesignLightboxVue<Type>;
    $m: $m;
    $sm: $m;
    $mc: $mc;
    $smc: $mc;
}

export type RedesignParser<
    Window extends RedesignWindow = RedesignWindow,
    Type extends RedesignKey = RedesignKey,
> = (data: ParserParam<Type>) => Promise<Window> | Window;

export type RedesignLightboxVue<Type extends RedesignKey> = CombinedVueInstance<
    Vue,
    RedesignLightbox<Type>['Data'],
    RedesignLightbox<Type>['Methods'],
    RedesignLightbox<Type>['Computed'],
    RedesignLightbox<Type>['Props'],
    unknown
>;

export interface RedesignComponent<
    DataName extends string,
    Type extends RedesignKey,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps,
> {
    Data: Data;
    Methods: Methods;
    Computed: Computed;
    Props: Props &
        Record<DataName, Redesigns[Type] & { authenticity_token: string }> & {
            url: string;
            lightbox: RedesignLightboxVue<Type>;
            getSetting<S extends string, T>(
                setting: S,
                defaultValue: T
            ): Promise<T>;
            setSetting<S extends string, T>(
                settingId: S,
                value: T
            ): Promise<void>;
        };
}

export type RedesignVueInstance<
    Component extends RedesignComponent<string, RedesignKey>,
> = CombinedVueInstance<
    Vue,
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>;

export type RedesignSubComponent<
    DataName extends string,
    Type extends RedesignKey,
    Data = DefaultData<Vue>,
    Methods = DefaultMethods<Vue>,
    Computed = DefaultComputed,
    Props = DefaultProps,
> = RedesignComponent<
    DataName,
    Type,
    Data,
    Methods,
    Computed,
    Props & {
        $m: $m;
        $mc: $mc;
    }
>;
