import { VueConstructor } from 'vue/types/vue';
import { Store } from 'vuex';
import { BuildingMarker, POIMarker } from './Ingame';
import Highcharts from 'highcharts';
import VueI18n from 'vue-i18n';
import { Map, Marker } from 'leaflet';

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
        mission_poi_markers: POIMarker[];
        [PREFIX: string]: Vue | unknown;
        map: Map;
        mission_position_new_marker?: Marker;
        lightboxOpen(link: string): void;
        mission_position_new_dragend(): void;
        vehicleSelectionReset(): void;
        aao_available(arrId: number, calculateTime: boolean): void;
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

export interface RadioMessage {
    additionalText: string;
    caption: string;
    fms: number;
    fms_real: number;
    fms_text: string;
    id: number;
    mission_id: number;
    target_building_id: number;
    type: string;
    user_id: number;
}
