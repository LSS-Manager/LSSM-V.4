const fs = require('fs');
const Terser = require('terser');
const packageJson = require('../package');
const config = require('../src/config');

const script = packageJson.userscript;

const tlds = [];

const gameIncludes = Object.keys(config.games).map(game => {
    const tld = config.games[game].shortURL
        .replace(/^[^.]*/, '')
        .replace(/^\./, '')
        .replace('.', '\\.');
    if (!tlds.includes(tld)) tlds.push(tld);
    return config.games[game].shortURL.replace(/\..*$/, '').replace('.', '\\.');
});

const includes = new RegExp(
    `^https?://(w{3}\\.)?(${[...new Set(gameIncludes)].join(
        '|'
    )})\\.(${tlds.join('|')})/.*$`
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
// @author       ${script.author}
// @description  ${script.description}
// @include      ${includes}
// @homepage     ${config.server}
// @updateURL    ${config.server}lssm-v4.user.js
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
