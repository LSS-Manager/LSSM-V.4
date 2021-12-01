declare module 'copy-dir' {
    interface Options {
        utimes: boolean;
        mode: boolean | number;
        cover: boolean;
        filter: boolean | ((...args: unknown[]) => boolean);
    }
    export function sync(from: string, to: string, options?: Options): void;
}
