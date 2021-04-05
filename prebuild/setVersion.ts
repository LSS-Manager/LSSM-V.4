import packageJson from '../package.json';
import moment from 'moment-timezone';
import fs from 'fs';

packageJson.version = packageJson.version.replace(
    /\+.*$/,
    `+${moment()
        .tz('Europe/Berlin')
        .format('YYYYMMDD.HHmm')}`
);

const staticConfigs = {} as Record<string, unknown>;

staticConfigs.versions = {};
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
