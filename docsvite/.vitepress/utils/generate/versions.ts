import fs from 'fs';

import config from '../../../../src/config';
import { version } from '../../../../package.json';

export interface Versions {
    beta: string;
    stable: string;
    short: string;
}

const [, , file] = process.argv;

const fetchStableVersion = (): Promise<{ version: string }> =>
    fetch(`${config.urls.server}static/build_stats.json`)
        .then(res => (res.status === 200 ? res.json() : { version: '4.x.x' }))
        .catch(() => ({ version: '4.x.x' }));

(async () =>
    fetchStableVersion().then(({ version: stable }) =>
        fs.writeFileSync(
            file,
            JSON.stringify(<Versions>{
                beta: version,
                stable,
                short: stable.match(/4(\.(x|\d+)){2}/u)?.[0] ?? '4.x.x',
            })
        )
    ))();
