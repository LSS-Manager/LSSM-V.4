import fs from 'fs';
import path from 'path';

import type { Module } from '../../../../typings/Module';

type LangCode = `${string}_${string}`;

const [, , file, MODULES_FOLDER, DOCS_FOLDER, langs, modules] = process.argv;

const LANGS: LangCode[] = JSON.parse(langs);
const LOCALES = LANGS.map(([lang]) => lang);
const MODULES: string[] = JSON.parse(modules);

const loadRegisterFile = (registerFile: string): Promise<Module> => {
    const jsonPath = `${registerFile}.json`;
    if (fs.existsSync(jsonPath)) {
        return new Promise(resolve =>
            resolve(JSON.parse(fs.readFileSync(jsonPath).toString()))
        );
    }
    return import(registerFile);
};

(async () => {
    for (const module of MODULES) {
        const MODULE_FOLDER = path.join(MODULES_FOLDER, module);
        const MODULE_DOCS_FOLDER = path.join(MODULE_FOLDER, 'docs');
        const MODULE_REGISTER_FILE = path.join(MODULE_FOLDER, 'register');

        const registerFile = await loadRegisterFile(MODULE_REGISTER_FILE);
        if (registerFile.noapp) continue;

        for (const lang of LOCALES) {
            if (registerFile.locales && !registerFile.locales.includes(lang))
                continue;

            const DOCS_MODULE_FOLDER = path.join(
                DOCS_FOLDER,
                lang,
                'modules',
                module
            );
            const DOCS_MODULE_FILE = path.join(DOCS_MODULE_FOLDER, 'README.md');

            const MODULE_DOCS_FILE = path.join(
                MODULE_DOCS_FOLDER,
                `${lang}.md`
            );

            if (!fs.existsSync(DOCS_MODULE_FOLDER))
                fs.mkdirSync(DOCS_MODULE_FOLDER, { recursive: true });

            if (fs.existsSync(MODULE_DOCS_FILE)) {
                const symlinkPath = DOCS_MODULE_FILE;
                if (!fs.existsSync(symlinkPath))
                    fs.symlinkSync(MODULE_DOCS_FILE, symlinkPath);
                const MODULE_DOCS_ASSETS = path.join(
                    MODULE_DOCS_FOLDER,
                    'assets'
                );
                const MODULE_DOCS_ASSETS_LANG = path.join(
                    MODULE_DOCS_ASSETS,
                    lang
                );
                const MODULE_DOCS_ASSETS_US = path.join(
                    MODULE_DOCS_ASSETS,
                    'en_US'
                );
                const MODULE_DOCS_ASSETS_GB = path.join(
                    MODULE_DOCS_ASSETS,
                    'en_GB'
                );
                const MODULE_DOCS_ASSETS_DE = path.join(
                    MODULE_DOCS_ASSETS,
                    'de_DE'
                );
                if (fs.existsSync(MODULE_DOCS_ASSETS)) {
                    const assetDir = [
                        MODULE_DOCS_ASSETS_LANG,
                        MODULE_DOCS_ASSETS_US,
                        MODULE_DOCS_ASSETS_GB,
                        MODULE_DOCS_ASSETS_DE,
                    ].find(assetsDir => fs.existsSync(assetsDir));
                    if (assetDir) {
                        fs.readdirSync(assetDir).forEach(file => {
                            const symlinkPath = path.join(
                                DOCS_MODULE_FOLDER,
                                file
                            );
                            if (!fs.existsSync(symlinkPath)) {
                                fs.symlinkSync(
                                    path.join(assetDir, file),
                                    symlinkPath
                                );
                            }
                        });
                    }
                }
            } else {
                fs.writeFileSync(DOCS_MODULE_FILE, '');
            }
        }
    }
})();
