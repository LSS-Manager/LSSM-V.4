const fs = require('fs');
const Terser = require('terser');
const packageJson = require('../package');
const config = require('../src/config');

const script = packageJson.userscript;

const gameIncludes = Object.keys(config.games).map(
    game => `// @include      *://www.${config.games[game].shortURL}/*`
);

fs.writeFileSync(
    './static/lssm-v4.user.js',
    `// ==UserScript==
// @name         ${script.name} - Dev Version
// @version      ${packageJson.version.replace(/\+.*$/, '')}+${Object.keys(
        config.games
    )
        .map(lang => lang.replace(/^.*?_/, ''))
        .join('-')}
// @description  ${script.description}
${gameIncludes.join('\n')}
// @homepage     ${config.server}
// @updateURL    ${config.server}lssm-v4.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==
${
    Terser.minify(fs.readFileSync('./src/userscript.js').toString(), {
        compress: {
            global_defs: {
                host: config.server,
            },
        },
    }).code
}
`
);
