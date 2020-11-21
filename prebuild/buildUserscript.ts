import fs from 'fs';
import Terser from 'terser';
import packageJson from '../package.json';
import config from '../src/config';

const script = packageJson.userscript;

const tlds = {} as { [tld: string]: string[] };

Object.values(config.games).forEach(({ shortURL, police }) => {
    const tld = shortURL
        .replace(/^[^.]*/, '')
        .replace(/^\./, '')
        .replace('.', '\\.');
    if (!tlds.hasOwnProperty(tld)) tlds[tld] = [];
    tlds[tld].push(
        (police ? `(${police}\\.)?` : '') +
            shortURL.replace(/\..*$/, '').replace('.', '\\.')
    );
});

const gameIncludes = Object.keys(tlds).map(tld => {
    let include = '';
    if (tlds[tld].length > 1) include += '(?:';
    include += tlds[tld].join('|');
    if (tlds[tld].length > 1) include += ')';
    return `${include}\\.${tld}`;
});

export default async (): Promise<void> =>
    fs.writeFileSync(
        './static/lssm-v4.user.js',
        `// ==UserScript==
// @name         ${script.name}
// @version      ${packageJson.version.replace(/\+.*$/, '')}+${Object.keys(
            config.games
        )
            .map(lang => lang.replace(/^.*?_/, ''))
            .join('-')}
// @author       ${script.author}
// @description  ${script.description}
// @include      ${new RegExp(
            `^https?://(?:w{3}\\.)?(?:${gameIncludes.join('|')})/.*$`
        )}
// @homepage     ${config.server}
// @updateURL    ${config.server}lssm-v4.user.js
// @downloadURL  ${config.server}lssm-v4.user.js
// @run-at       document-idle
// @icon         ${config.server}docs/img/lssm.png
// @supportURL   ${config.server}docs/de_DE/error_report
// ==/UserScript==
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
