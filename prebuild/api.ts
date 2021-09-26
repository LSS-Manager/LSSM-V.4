import fs from 'fs';

import config from '../src/config';

export default async (): Promise<void> => {
    if (!fs.existsSync('./dist/api')) fs.mkdirSync('./dist/api');

    const types = ['vehicles', 'buildings', 'schoolings', 'pois', 'ranks'];

    const locales = Object.keys(config.games).filter(game =>
        fs.existsSync(`./src/i18n/${game}.ts`)
    );

    for (const locale of locales) {
        if (!fs.existsSync(`./dist/api/${locale}`))
            fs.mkdirSync(`./dist/api/${locale}`);
        const t = (await import(`../src/i18n/${locale}`)).default;
        types.forEach(type => {
            fs.writeFileSync(
                `./dist/api/${locale}/${type}.json`,
                JSON.stringify(t[type] ?? {})
            );
        });
    }
};
