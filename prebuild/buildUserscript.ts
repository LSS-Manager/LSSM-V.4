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
// @homepage     ${config.server}docs/
// @updateURL    ${config.server}lssm-v4.user.js
// @downloadURL  ${config.server}lssm-v4.user.js
// @icon         ${config.server}docs/img/lssm.png
// @supportURL   ${config.server}docs/en_US/error_report
// @run-at       document-idle
// ==/UserScript==
/* global I18n, user_id */
${
    (
        await Terser.minify(fs.readFileSync('./src/userscript.js').toString(), {
            compress: {
                global_defs: {
                    host: config.server,
                },
            },
        })
    ).code
}
`
    );
