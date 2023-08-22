/**
 * @file - Type definition extending the window object by ingame defined properties and methods.
 */

import 'i18n-js';
import type { DefaultProps } from 'vue/types/options';
import type Highcharts from 'highcharts';
import type L from 'leaflet';
import type { POI } from './modules/EnhancedPOI';
import type { sceditor } from './SCEditor';
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
import type {
    AppstoreComputed,
    AppstoreData,
    AppstoreMethods,
} from 'typings/components/Appstore';
import type {
    BuildingMarker,
    BuildingMarkerAdd,
    MissionGraphicsLookup,
    MissionMarker,
    PatientTimer,
    POIMarker,
} from './Ingame';
import type { CombinedVueInstance, VueConstructor } from 'vue/types/vue';
import type {
    SettingsComputed,
    SettingsData,
    SettingsMethods,
} from 'typings/components/Settings';

export type GameFlavour = 'missionchief' | 'policechief';

export type Prefixed<str extends string> = `${typeof PREFIX}-${str}`;

declare const GM_INFO_KEY: Prefixed<'GM_Info'>;

declare global {
    interface Window {
        $: JQueryStatic;
        sceditor: sceditor;
        keepAlive: boolean;
        tellParent(code: string): void;
        fullScreen: boolean;
        mapkit: unknown;
        user_id: number;
        username: string;
        user_premium: boolean;
        alliance_admin: boolean;
        alliance_coadmin: boolean;
        alliance_owner: boolean;
        building_markers: BuildingMarker[];
        mission_markers: MissionMarker[];
        map_pois_service: {
            getMissionPoiMarkersArray(): POIMarker[];
            leafletMissionPositionMarkerAdd(poi: POI): void;
        };
        map_filters_service: {
            // initialize(a: MapFilterInitializer): void;
            getMapFiltersLayersForMap(): Record<string, L.LayerGroup>;
            getMapFiltersLayers(): Record<string, L.LayerGroup>;
            getFilterLayerByBuildingParams(
                building: Pick<BuildingMarkerAdd, 'building_type' | 'user_id'>
            ): L.LayerGroup | L.Map;
            onOverlayChanged: L.LayersControlEventHandlerFn;
            massFiltersChange(filter_id: string, add: boolean): void;
            decorateFilterText(text: string, filter_id: string): string;
        };
        [PREFIX]: Vue | unknown;
        [GM_INFO_KEY]: Tampermonkey.ScriptInfo;
        map: L.Map;
        L: typeof L;
        icon_empty: L.Icon;
        mission_position_new_marker?: L.Marker;
        building_new_marker?: L.Marker;
        building_move_marker?: L.Marker;
        mission_graphics_lookups: MissionGraphicsLookup;
        mission_graphics: MissionGraphicsLookup['regular'];
        patient_timers: PatientTimer[];
        sale_count_down: number;
        mission_label: boolean;
        vehicle_graphics: ([string, string, 'false' | 'true'] | null)[]; // it seems to be sexy to stringify booleans according to the game...
        buildingMarkerBulkContentCache: string[];
        gameFlavour: GameFlavour;
        flavourAssetOverrides: Record<
            GameFlavour,
            { from: string; to: string }[]
        >;
        mission_count_max: number;
        breadcrumbnav: {
            init(id: string): void;
            add(id: string): void;
            back(): void;
            clear(): void;
        };
        pressedKeys?: Record<number, boolean>; // in missions window
        lightboxOpen(link: string): void;
        successfullMessage(html: string): void;
        mission_position_new_dragend(): void;
        building_move_marker_dragend(): void;
        building_new_dragend(): void;
        vehicleSelectionReset(): void;
        aao_available(arrId: number, calculateTime: boolean): void;
        aao_building_check(
            buildingIds: number[],
            checkbox: JQuery<HTMLInputElement>
        ): boolean;
        extensionCountdown(remaining: number, id: number | string): void;
        educationCountdown(remaining: number, id: number | string): void;
        formatTime(remaining: number, t?: boolean): string;
        buildingMarkerAdd(marker: BuildingMarkerAdd): boolean;
        constructBuildingListElement(marker: BuildingMarkerAdd): void;
        buildingMarkerBulkContentCacheDraw(): void;
        iconAnchorCalculate(size: [number, number]): [number, number];
        iconMapGenerate(url: string, marker: L.Marker): void;
        getBuildingMarkerIcon(
            building: Pick<BuildingMarkerAdd, 'building_type'>
        ): string;
        building_maps_redraw(): void;
        creditsUpdate(credits: number): void;
        coinsUpdate(coins: number): void;
        unix_timestamp(): number;
        mapMoveToSearch(): void;
        lightboxClose(creation?: string): void; // creation Param only for LSSM Redesign
        buildingsVehicleLoadVisible(): void;
        missionScrollUpdate(): void;
        mapExpand(design_big_map: boolean): void;
        setupTimer(timer: {
            $timer: JQuery<HTMLElement>;
            format: string | 'long';
            onTimerEnd(): void;
        }): void;
        updateTimer(
            timer: Pick<
                Parameters<this['setupTimer']>[0],
                '$timer' | 'format'
            > & {
                endTime: Date;
            }
        ): void;
        flavouredAsset(asset: string, scope?: string): string;
        searchMission(): void;
        schooling_check_educated_counter_visible_check?(): void; // in schooling windows
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $stores: {
            root: ReturnType<typeof useRootStore>;
            api: ReturnType<typeof useAPIStore>;
            broadcast: ReturnType<typeof useBroadcastStore>;
            console: ReturnType<typeof useConsoleStore>;
            event: ReturnType<typeof useEventStore>;
            modules: ReturnType<typeof useModulesStore>;
            notifications: ReturnType<typeof useNotificationStore>;
            settings: ReturnType<typeof useSettingsStore>;
            storage: ReturnType<typeof useStorageStore>;
            translations: ReturnType<typeof useTranslationStore>;
        };
        $vue: VueConstructor;
        modal: {
            width: number;
            height: number;
        };
        $utils: {
            urlRegex: RegExp;
            escapeRegex(s: string): string;
            getMissionTypeInMissionWindow(): string;
            getMissionOptions(
                LSSM: Vue,
                MODULE_ID: string,
                reason: string
            ): Promise<{ missionIds: string[]; missionNames: string[] }>;
            getNumberFromText<Multiple extends boolean = false>(
                text: string,
                allNumbers?: Multiple,
                fallback?: number
            ): Multiple extends true ? number[] : number;
            getTextNodes(
                root: Node,
                filter: (node: Node, ...args: unknown[]) => boolean
            ): Text[];
            activeCountdowns: string[];
            countdown(
                id: string,
                countdown: number,
                initialCall?: boolean
            ): void;
            highChartsDarkMode: Highcharts.Options;
        };
        $appstore: CombinedVueInstance<
            Vue,
            AppstoreData,
            AppstoreMethods,
            AppstoreComputed,
            DefaultProps,
            unknown
        >;
        $settings: CombinedVueInstance<
            Vue,
            SettingsData,
            SettingsMethods,
            SettingsComputed,
            DefaultProps,
            unknown
        >;
        $m(
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
    }
}

export interface LSSMEvent<arguments extends unknown[] = unknown[]>
    extends Event {
    detail: arguments;
}
