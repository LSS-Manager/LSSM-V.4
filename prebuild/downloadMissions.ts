import { dirname } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

export default async (): Promise<void> => {
    const items = [
        {
            from: 'https://v4.lss-manager.de/missions/de_DE.json',
            to: 'static/missions/de_DE.json',
        },
    ];

    for (const item of items) {
        console.log(`Downloading ${item.from} to ${item.to}...`);

        // ensure target directory exists
        await mkdir(dirname(item.to), { recursive: true });

        // download file and write it to disk
        const response = await fetch(item.from);
        await writeFile(item.to, Buffer.from(await response.arrayBuffer()));
    }
};
