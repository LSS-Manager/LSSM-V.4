const packageJson = require('../package');
const moment = require('moment');
const fs = require('fs');

packageJson.version = packageJson.version.replace(
    /\+.*$/,
    `+${moment().format('YYYYMMDD.HHmm')}`
);

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));
