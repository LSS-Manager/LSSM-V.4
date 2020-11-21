import { VueConstructor } from 'vue/types/vue';
import { Store } from 'vuex';
import { BuildingMarker, POIMarker } from './Ingame';
import Highcharts from 'highcharts';
import VueI18n from 'vue-i18n';
import L, { Map, Marker } from 'leaflet';
import 'i18n-js';
import { POI } from './modules/EnhancedPOI';

declare global {
    interface Window {
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
        [PREFIX: string]: Vue | unknown;
        map: Map;
        L: typeof L;
        mission_position_new_marker?: Marker;
        building_new_marker?: Marker;
        mission_graphics: [string, string, string][];
        lightboxOpen(link: string): void;
        mission_position_new_dragend(): void;
        building_new_dragend(): void;
        vehicleSelectionReset(): void;
        aao_available(arrId: number, calculateTime: boolean): void;
        extensionCountdown(remaining: number, id: number): void;
        formatTime(remaining: number, t?: boolean): string;
        buildingMarkerAdd(marker: {
            id: number;
            user_id: number;
            name: string;
            longitude: number;
            latitude: number;
            icon: string;
            vgi: unknown | null;
            lbid: number;
            show_vehicles_at_startpage: boolean;
            level: number;
            personal_count: number;
            building_type: number;
            filter_id: string;
            detail_button: string;
        }): boolean;
        buildingMarkerBulkContentCacheDraw(): void;
        building_maps_redraw(): void;
        creditsUpdate(credits: number): void;
        coinsUpdate(coins: number): void;
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
            getTextNodes(
                root: Node,
                filter: (node: Node, ...args: unknown[]) => boolean
            ): Text[];
            highChartsDarkMode: Highcharts.Options;
        };
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
