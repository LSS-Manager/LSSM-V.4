import type { ThemeData } from './types/ThemeData';

declare module 'vue/types/vue' {
    interface Vue {
        $lang: string;
        $theme: ThemeData;
    }
}
