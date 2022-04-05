import { type Compiler, Template } from 'webpack';

import config from '../../src/config';
import loadingIndicatorStorageKey from './LoadingProgressPluginStorageKey';

const pluginName = 'LoadingProgressPlugin';

export default class LoadingProgressPlugin {
    private startEvent = 'onStartEvent';
    private endEvent = 'onCompleteEvent';

    createEvent(type: 'end' | 'start') {
        return [
            `var ${
                type === 'start' ? this.startEvent : this.endEvent
            } = new CustomEvent("${config.loadScript[type]}", {`,
            Template.indent([
                'detail: {',
                Template.indent([
                    'url: url,',
                    'key: key,',
                    'chunkId: chunkId,',
                ]),
                '}',
            ]),
            `});`,
        ];
    }

    apply(compiler: Compiler): void {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            const basicFunctionOrig = compilation.runtimeTemplate.basicFunction;
            compilation.runtimeTemplate.basicFunction = (
                ...args: [string, string[] | string]
            ) => {
                const [params] = args;
                let [, body] = args;
                if (params === 'prev, event') {
                    // this is the onScriptComplete function
                    const newCode =
                        '// Dispatch Event\n' +
                        `if (${this.endEvent}) window.dispatchEvent(${this.endEvent});\n`;
                    if (Array.isArray(body)) body.unshift(newCode);
                    else body = `${newCode}${body}`;
                } else if (params === 'url, done, key, chunkId') {
                    // this is the loadScript function
                    if (Array.isArray(body)) {
                        body.splice(
                            -1,
                            0,
                            ...this.createEvent('end'),
                            `if (!localStorage.hasOwnProperty(${JSON.stringify(
                                loadingIndicatorStorageKey
                            )}) || localStorage.getItem(${JSON.stringify(
                                loadingIndicatorStorageKey
                            )}) === "true") {\n`,
                            Template.indent([
                                ...this.createEvent('start'),
                                `window.dispatchEvent(${this.startEvent});\n`,
                            ]),
                            '}\n'
                        );
                    }
                }
                args[1] = body;
                return basicFunctionOrig.apply(
                    compilation.runtimeTemplate,
                    args
                );
            };
        });
    }
}
