import { dirname } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

import config from '../src/config';

export default async (): Promise<void> => {
    const supportedLanguages = Object.keys(config.games);
    const items = supportedLanguages.map(lang => {
        return {
            from: `https://v4.lss-manager.de/releasenotes/${lang}.json`,
            to: `static/releasenotes/${lang}.json`,
        };
    });

    await Promise.all(
        items.map(async item => {
            console.log(`Downloading ${item.from} to ${item.to}...`);

            // ensure target directory exists
            await mkdir(dirname(item.to), { recursive: true });

            // download file and write it to disk
            const response = await fetch(item.from);
            await writeFile(item.to, Buffer.from(await response.arrayBuffer()));
        })
    );
};
