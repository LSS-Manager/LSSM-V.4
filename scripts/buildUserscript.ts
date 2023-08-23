import fs from 'fs';
import path from 'path';

import Terser from 'terser';

import config from '../src/config';
import packageJson from '../package.json';

const script = packageJson.userscript;
const localCoreName = 'core';

const getScriptPath = (local: boolean) =>
    path.resolve(
        __dirname,
        `../static/lssm-v4.${local ? 'local.' : ''}user.js`
    );

const createUserScript = async (local: boolean) =>
    fs.writeFileSync(
        getScriptPath(local),
        `// ==UserScript==
// @name         ${script.name}${local ? ' – Local' : ''}
// @version      ${packageJson.version.replace(/\+.*$/u, '')}-${Object.keys(
            config.games
        )
            .map(lang => lang.replace(/^.*?_/u, ''))
            .join('-')}
// @author       ${script.author}
// @description  ${script.description}
// @namespace    https://lss-manager.de/
// @homepage     ${config.urls.docs}
// @downloadURL  ${config.urls.server}lssm-v4.user.js
// @updateURL    ${config.urls.server}lssm-v4.user.js
// @supportURL   ${config.urls.docs}en_US/error_report
// @icon         ${config.urls.docs}img/lssm.png
${Object.values(config.games)
    .map(
        ({ shortURL, police }) =>
            `// @match        https://www.${shortURL}/*${
                police
                    ? `\n// @match        https://${police}.${shortURL}/*`
                    : ''
            }`
    )
    .join('\n')}
// @run-at       document-idle
// @grant        GM_info
// @grant        unsafeWindow
${
    local
        ? `
// @grant        GM_getResourceURL
// @resource     ${localCoreName} ${config.urls.server}core.js
`.trimStart()
        : ''
}// ==/UserScript==
/* global I18n, user_id */
${
    (
        await Terser.minify(
            fs
                .readFileSync('./src/userscript.js')
                .toString()
                .replace(/import 'tampermonkey';/gu, ''),
            {
                compress: {
                    ecma: 2020,
                    global_defs: {
                        local,
                        localCoreName,
                        host: config.urls.server,
                        prefix: config.prefix,
                    },
                    sequences: false,
                    unsafe_arrows: true,
                },
                mangle: {
                    toplevel: true,
                },
                format: {
                    ecma: 2020,
                },
            }
        )
    ).code
}
`
    );

Promise.all([createUserScript(false), createUserScript(true)]).then();
