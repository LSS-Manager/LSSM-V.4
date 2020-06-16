import { VueConstructor } from 'vue/types/vue';
import { Store } from 'vuex';
import { BuildingMarker } from './Ingame';
import Highcharts from 'highcharts';

export interface ExtendedWindow {
    keepAlive: boolean;
    tellParent(code: string): void;
    fullScreen: boolean;
    mapkit: unknown;
    user_id: number;
    building_markers: BuildingMarker[];
}

export interface IndexedExtendedWindow {
    [PREFIX: string]: Vue;
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
            highChartsDarkMode: Highcharts.Options;
        };
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
