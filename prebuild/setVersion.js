const packageJson = require('../package');
const staticConfigs = require('../static/.configs');
const moment = require('moment');
const fs = require('fs');

packageJson.version = packageJson.version.replace(
    /\+.*$/,
    `+${moment().format('YYYYMMDD.HHmm')}`
);
staticConfigs.version = packageJson.version;

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));
fs.writeFileSync(
    './static/.configs.json',
    JSON.stringify(staticConfigs, null, 4)
);
