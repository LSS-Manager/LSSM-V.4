import fs from 'fs';
import path from 'path';

import config from '../src/config';

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const apiPath = path.join(distPath, 'api');
const i18nPath = path.join(rootPath, 'src', 'i18n');

export default async (): Promise<Record<string, string>> => {
    if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath);

    const types = ['vehicles', 'buildings', 'schoolings', 'pois', 'ranks'];

    const locales = Object.keys(config.games).filter(game =>
        fs.existsSync(path.join(i18nPath, `${game}.ts`))
    );

    for (const locale of locales) {
        const outputPath = path.join(apiPath, locale);
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
        const t = (await import(path.join(i18nPath, `${locale}.ts`))).default;
        types.forEach(type => {
            fs.writeFileSync(
                path.join(outputPath, `${type}.json`),
                JSON.stringify(t[type] ?? {})
            );
        });
    }

    return { rootPath, distPath, apiPath, i18nPath };
};
