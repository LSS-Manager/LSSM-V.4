const copydir = require('copy-dir');
const config = require('../src/config');
const staticConfigs = require('../static/.configs');
const fs = require('fs');

staticConfigs.acao = `^https://(?:www.)?(?:${Object.values(config.games)
    .map(g => g.shortURL)
    .join('|')})$`;
staticConfigs.admins = config.admins;

fs.writeFileSync(
    './static/.configs.json',
    JSON.stringify(staticConfigs, null, 4)
);

if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

copydir.sync('./static', `./dist/static`);
fs.copyFileSync('./.htaccess', './dist/.htaccess');
