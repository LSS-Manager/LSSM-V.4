import packageJson from '../package.json';
import staticConfigs from '../static/.configs.json';
import moment from 'moment';
import fs from 'fs';

packageJson.version = packageJson.version.replace(
    /\+.*$/,
    `+${moment().format('YYYYMMDD.HHmm')}`
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (!staticConfigs.hasOwnProperty('versions')) staticConfigs.versions = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
staticConfigs.versions[process.argv[2] === 'production' ? 'stable' : 'beta'] =
    packageJson.version;
export default (): void => {
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));
    fs.writeFileSync(
        './static/.configs.json',
        JSON.stringify(staticConfigs, null, 4)
    );
};
