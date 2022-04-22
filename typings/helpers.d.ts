import 'i18n-js';
import type { DefaultProps } from 'vue/types/options';
import type Highcharts from 'highcharts';
import type L from 'leaflet';
import type { POI } from './modules/EnhancedPOI';
import type { sceditor } from './SCEditor';
import type { Store } from 'vuex';
import type VueI18n from 'vue-i18n';
import type {
    AppstoreComputed,
    AppstoreData,
    AppstoreMethods,
} from 'typings/components/Appstore';
import type {
    BuildingMarker,
    BuildingMarkerAdd,
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
                building: BuildingMarkerAdd
            ): L.LayerGroup | L.Map;
            onOverlayChanged: L.LayersControlEventHandlerFn;
            massFiltersChange(filter_id: string, add: boolean): void;
            decorateFilterText(text: string, filter_id: string): string;
        };
        [PREFIX: string]: Vue | unknown;
        map: L.Map;
        L: typeof L;
        mission_position_new_marker?: L.Marker;
        building_new_marker?: L.Marker;
        building_move_marker?: L.Marker;
        mission_graphics: [string, string, string][];
        patient_timers: PatientTimer[];
        sale_count_down: number;
        mission_label: boolean;
        lightboxOpen(link: string): void;
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
        buildingMarkerBulkContentCacheDraw(): void;
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
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $store: Store<any>;
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
            DefaultProps
        >;
        $settings: CombinedVueInstance<
            Vue,
            SettingsData,
            SettingsMethods,
            SettingsComputed,
            DefaultProps
        >;
        $m(
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
    }
}

export type returnTypeFunction = (...args: unknown[]) => unknown;

export interface LSSMEvent {
    detail: unknown[];
}
