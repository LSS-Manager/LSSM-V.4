import type { Compiler } from 'webpack';

const pluginName = 'DynamicImportQueryPlugin';

export default class DynamicImportQueryPlugin {
    options = {} as { name: string; value: string; dyn: boolean }[];
    query = '';

    constructor(
        options: Record<string, { value: string; isDynamicKey?: boolean }>
    ) {
        this.options = Object.entries(options).map(
            ([key, { value, isDynamicKey }]) => ({
                name: key,
                value,
                dyn: !!isDynamicKey,
            })
        );
        this.query = this.options
            .map(({ name, value, dyn }) => {
                if (!dyn) return `${name}=${encodeURIComponent(value)}`;
                return `${name}=" + encodeURIComponent(${value}) + "`;
            })
            .join('&');
    }

    apply(compiler: Compiler): void {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            const getPathOrig = compilation.getPath;
            compilation.getPath = (...args) => {
                const path = getPathOrig.apply(compilation, args);
                return args[0] === '"[id].js"'
                    ? `${path} + "?${this.query}"`
                    : path;
            };
        });
    }
}
