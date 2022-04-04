import fs from 'fs';

import axios from 'axios';

import config from '../../../../src/config';
import { version } from '../../../../package.json';

export interface Versions {
    beta: string;
    stable: string;
    short: string;
}

const [, , file] = process.argv;

const fetchStableVersion = (): Promise<{ version: string }> =>
    axios(`${config.server}static/build_stats.json`)
        .then(res =>
            res.status === 200
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  (new Promise(resolve => resolve(res.data)) as Promise<{
                      version: string;
                  }>)
                : (new Promise(resolve =>
                      resolve({ version: '4.x.x' })
                  ) as Promise<{ version: string }>)
        )
        .catch(
            () =>
                new Promise(resolve =>
                    resolve({ version: '4.x.x' })
                ) as Promise<{ version: string }>
        );

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
