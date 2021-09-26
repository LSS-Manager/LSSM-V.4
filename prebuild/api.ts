import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import config from '../src/config';

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const apiPath = path.join(distPath, 'api');
const i18nPath = path.join(rootPath, 'src', 'i18n');

export default async (): Promise<void> => {
    if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath);

    const types = ['vehicles', 'buildings', 'schoolings', 'pois', 'ranks'];

    const locales = Object.keys(config.games).filter(game =>
        fs.existsSync(path.join(i18nPath, `${game}.ts`))
    );

    for (const locale of locales) {
        const outputPath = path.join(apiPath, locale);
        const jsPath = path.join(i18nPath, `${locale}.js`);
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
        execSync(
            `tsc ${path.join(
                i18nPath,
                `${locale}.ts`
            )} --target esnext --moduleResolution node`
        );
        fs.writeFileSync(
            jsPath,
            fs
                .readFileSync(jsPath)
                .toString()
                .replace(/export default/, 'module.exports = ')
        );
        const t = (await import(jsPath)).default;
        types.forEach(type => {
            fs.writeFileSync(
                path.join(outputPath, `${type}.json`),
                JSON.stringify(t[type] ?? {})
            );
        });
    }
};
