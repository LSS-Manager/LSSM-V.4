import { VueConstructor } from 'vue/types/vue';
import { Store } from 'vuex';
export interface ExtendedWindow {
    keepAlive: boolean;
    tellParent(code: string): void;
    fullScreen: boolean;
    mapkit: unknown;
    user_id: number;
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
        // $utils: {};
    }
}

export type returnTypeFunction = (...args: unknown[]) => unknown;

export interface LSSMEvent {
    detail: unknown[];
}
