import 'i18n-js';
import { DefaultProps } from 'vue/types/options';
import Highcharts from 'highcharts';
import { MapFilterInitializer } from '../src/modules/centerMap/assets/getMapFilterInitializer';
import { POI } from './modules/EnhancedPOI';
import { sceditor } from './SCEditor';
import { Store } from 'vuex';
import VueI18n from 'vue-i18n';
import {
    AppstoreComputed,
    AppstoreData,
    AppstoreMethods,
} from 'typings/components/Appstore';
import { BuildingMarker, BuildingMarkerAdd, POIMarker } from './Ingame';
import { CombinedVueInstance, VueConstructor } from 'vue/types/vue';
import L, {
    LayerGroup,
    LayersControlEventHandlerFn,
    Map,
    Marker,
} from 'leaflet';
import {
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
        building_markers: BuildingMarker[];
        map_pois_service: {
            getMissionPoiMarkersArray(): POIMarker[];
            leafletMissionPositionMarkerAdd(poi: POI): void;
        };
        map_filters_service: {
            initialize(a: MapFilterInitializer): void;
            getMapFiltersLayersForMap(): Record<string, LayerGroup>;
            getMapFiltersLayers(): Record<string, LayerGroup>;
            getFilterLayerByBuildingParams(
                building: BuildingMarkerAdd
            ): LayerGroup | Map;
            onOverlayChanged: LayersControlEventHandlerFn;
            massFiltersChange(filter_id: string, add: boolean): void;
            decorateFilterText(text: string, filter_id: string): string;
        };
        [PREFIX: string]: Vue | unknown;
        map: Map;
        L: typeof L;
        mission_position_new_marker?: Marker;
        building_new_marker?: Marker;
        building_move_marker?: Marker;
        mission_graphics: [string, string, string][];
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
        extensionCountdown(remaining: number, id: number): void;
        educationCountdown(remaining: number, id: string | number): void;
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
            getNumberFromText<Multiple extends boolean = false>(
                text: string,
                allNumbers: Multiple = false,
                fallback = -1
            ): Multiple extends true ? number[] : number;
            getTextNodes(
                root: Node,
                filter: (node: Node, ...args: unknown[]) => boolean
            ): Text[];
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
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
    }
}

export type returnTypeFunction = (...args: unknown[]) => unknown;

export interface LSSMEvent {
    detail: unknown[];
}
