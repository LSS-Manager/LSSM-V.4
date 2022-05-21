import { execSync } from 'child_process';
import fs from 'fs';

import Terser from 'terser';

import config from '../src/config';
import packageJson from '../package.json';

const script = packageJson.userscript;

execSync('tsc src/userscript.ts');

export default async (): Promise<void> =>
    fs.writeFileSync(
        './static/lssm-v4.user.js',
        `// ==UserScript==
// @name         ${script.name}
// @version      ${packageJson.version.replace(/\+.*$/u, '')}-${Object.keys(
            config.games
        )
            .map(lang => lang.replace(/^.*?_/u, ''))
            .join('-')}
// @author       ${script.author}
// @description  ${script.description}
// @namespace    https://lss-manager.de/
// @homepage     ${config.server}docs/
// @downloadURL  ${config.server}lssm-v4.user.js
// @updateURL    ${config.server}lssm-v4.user.js
// @supportURL   ${config.server}docs/en_US/error_report
// @icon         ${config.server}docs/img/lssm.png
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
// ==/UserScript==
/* global I18n, user_id */
${
    (
        await Terser.minify(
            fs
                .readFileSync('./src/userscript.js')
                .toString()
                .replace(
                    /exports\.__esModule = true;|require\("tampermonkey"\);/gu,
                    ''
                ),
            {
                compress: {
                    global_defs: {
                        host: config.server,
                        prefix: config.prefix,
                    },
                },
            }
        )
    ).code
}
`
    );
