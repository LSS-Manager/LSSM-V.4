import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import config from '../src/config';

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const apiPath = path.join(distPath, 'api');
const i18nPath = path.join(rootPath, 'src', 'i18n');

const getTSFile = async (
    sourcePath: string,
    outputPath = ''
): Promise<Record<number | string, unknown>> => {
    const targetPath = outputPath || sourcePath.replace(/\.ts$/u, '.js');
    execSync(`tsc "${sourcePath}" --target esnext --moduleResolution node`);
    fs.writeFileSync(
        targetPath,
        fs
            .readFileSync(targetPath)
            .toString()
            .replace(/export default/u, 'module.exports = ')
    );

    const result = (await import(targetPath)).default;
    fs.rmSync(targetPath);
    return result;
};

export default async (): Promise<void> => {
    if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath);

    const types = [
        'vehicles',
        'vehicleCategories',
        'buildings',
        'buildingCategories',
        'small_buildings',
        'schoolings',
        'pois',
        'ranks',
    ];

    const locales = Object.keys(config.games).filter(game =>
        fs.existsSync(path.join(i18nPath, `${game}.ts`))
    );

    for (const locale of locales) {
        const outputPath = path.join(apiPath, locale);
        const localeDir = path.join(i18nPath, locale);
        const jsPath = path.join(i18nPath, `${locale}.js`);
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

        const t = await getTSFile(path.join(i18nPath, `${locale}.ts`), jsPath);
        for (const type of types) {
            const typePath = path.join(localeDir, `${type}.ts`);
            if (fs.existsSync(typePath)) t[type] = await getTSFile(typePath);
            fs.writeFileSync(
                path.join(outputPath, `${type}.json`),
                JSON.stringify(t[type] ?? {})
            );
        }
    }
};
