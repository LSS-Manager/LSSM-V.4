import { Compiler } from 'webpack';

const pluginName = 'DynamicImportQueryPlugin';

export default class DynamicImportQueryPlugin {
    options = {} as { name: string; value: string; dyn: boolean }[];
    isModule = false;

    constructor(
        options: {
            [key: string]: { value: string; isDynamicKey?: boolean };
        },
        isModule = false
    ) {
        this.options = Object.entries(options).map(
            ([key, { value, isDynamicKey }]) => ({
                name: key,
                value,
                dyn: !!isDynamicKey,
            })
        );
        this.isModule = isModule;
    }

    apply(compiler: Compiler): void {
        compiler.hooks.thisCompilation.tap(pluginName, ({ mainTemplate }) => {
            mainTemplate.hooks.localVars.tap(
                { name: pluginName, stage: 1 },
                source => {
                    if (source.includes('function jsonpScriptSrc'))
                        return `${source.replace(
                            'function jsonpScriptSrc',
                            'function webpackJsonpScriptSrc'
                        )}
function jsonpScriptSrc(chunkId) {
    var url = new URL(webpackJsonpScriptSrc(chunkId)${
        this.isModule
            ? '.replace(__webpack_require__.p, __webpack_require__.p + "modules/")'
            : ''
    });
    ${JSON.stringify(this.options)}.forEach(function (_a) {
        var name = _a.name, value = _a.value, dynamic = _a.dyn;
        if (!dynamic) return url.searchParams.append(name, value);
        return url.searchParams.append(name, eval(value));
    });
    return url.toString();
}
`;
                    else return source;
                }
            );
        });
    }
}
