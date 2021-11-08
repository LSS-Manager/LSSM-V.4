import { Compiler } from 'webpack';

const pluginName = 'DynamicImportQueryPlugin';

export default class DynamicImportQueryPlugin {
    options = {} as { name: string; value: string; dyn: boolean }[];

    constructor(options: {
        [key: string]: { value: string; isDynamicKey?: boolean };
    }) {
        this.options = Object.entries(options).map(
            ([key, { value, isDynamicKey }]) => ({
                name: key,
                value,
                dyn: !!isDynamicKey,
            })
        );
    }

    apply(compiler: Compiler): void {
        compiler.hooks.thisCompilation.tap(pluginName, ({ mainTemplate }) => {
            mainTemplate.hooks.localVars.tap(
                { name: pluginName, stage: 1 },
                source => {
                    if (
                        source.includes('function jsonpScriptSrc') &&
                        !source.includes('webpackJsonpScriptSrc')
                    ) {
                        return `${source.replace(
                            'function jsonpScriptSrc',
                            'function webpackJsonpScriptSrc'
                        )}
function jsonpScriptSrc(chunkId) {
    var url = new URL(webpackJsonpScriptSrc(chunkId));
    ${JSON.stringify(this.options)}.forEach(function (_a) {
        var name = _a.name, value = _a.value, dynamic = _a.dyn;
        if (!dynamic) return url.searchParams.append(name, value);
        return url.searchParams.append(name, eval(value));
    });
    return url.toString();
}
`;
                    } else {
                        return source;
                    }
                }
            );
        });
    }
}
