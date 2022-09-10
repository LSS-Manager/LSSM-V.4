import type { DocsVar, ThemeData } from './types/ThemeData';

declare module 'vue/types/vue' {
    interface Vue {
        $lang: string;
        $theme: ThemeData;
    }
}

declare global {
    const __VAR__: DocsVar;
}
