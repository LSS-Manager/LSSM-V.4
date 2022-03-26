import fs from 'fs';
import path from 'path';

import type { Locale } from '../../types/Locale';
import type { Module } from '../../../../typings/Module';

interface ModuleTranslation {
    name: string;
    description: string;
    settings: Record<
        string,
        Record<string, string> & { title: string; description?: string }
    >;
}
interface ResolvedModuleTranslation {
    name: string;
    description?: string;
    settings?: Record<
        string,
        Record<string, string> & { title: string; description?: string }
    >;
}
export type ModulesFile = Record<
    string,
    {
        registration: Module;
        docs: Locale[];
        translations: Record<string, ModuleTranslation>;
    }
>;
export interface Frontmatter {
    lang: string;
    title: string;
    editLinkPattern: string;
    empty?: boolean;
}

const [, , file, MODULES_FOLDER, DOCS_FOLDER, langs, modules] = process.argv;

const LANGS: Locale[] = JSON.parse(langs);
const MODULES: string[] = JSON.parse(modules);

const loadJsonOrTSFile = <T>(file: string): Promise<T> => {
    const jsonPath = `${file}.json`;
    if (fs.existsSync(jsonPath)) {
        return new Promise(resolve =>
            resolve(JSON.parse(fs.readFileSync(jsonPath).toString()))
        );
    }
    return import(file);
};

const modulesFile: ModulesFile = {};

(async () => {
    for (const module of MODULES) {
        const MODULE_FOLDER = path.join(MODULES_FOLDER, module);
        const MODULE_DOCS_FOLDER = path.join(MODULE_FOLDER, 'docs');
        const MODULE_REGISTER_FILE = path.join(MODULE_FOLDER, 'register');

        const registerFile = await loadJsonOrTSFile<Module>(
            MODULE_REGISTER_FILE
        );
        if (registerFile.noapp) continue;

        const getRootI18n = (
            lang: string
        ): Promise<ModuleTranslation | void> => {
            const i18nFolder = path.join(MODULE_FOLDER, 'i18n');
            return loadJsonOrTSFile<ResolvedModuleTranslation>(
                path.join(i18nFolder, `${lang}.root`)
            )
                .then(
                    ({ name, description, settings }) =>
                        (modulesFile[module].translations[lang] = {
                            name,
                            description: description || '',
                            settings: settings || {},
                        })
                )
                .catch(() =>
                    loadJsonOrTSFile<ResolvedModuleTranslation>(
                        path.join(i18nFolder, `en_US.root`)
                    )
                        .then(
                            ({ name, description, settings }) =>
                                (modulesFile[module].translations[lang] = {
                                    name,
                                    description: description || '',
                                    settings: settings || {},
                                })
                        )
                        .catch(
                            () =>
                                (modulesFile[module].translations[lang] = {
                                    name: module,
                                    description: '',
                                    settings: {},
                                })
                        )
                );
        };

        modulesFile[module] = {
            registration: registerFile,
            docs: [],
            translations: {},
        };

        for (const lang of LANGS) {
            if (registerFile.locales && !registerFile.locales.includes(lang))
                continue;

            await getRootI18n(lang);

            const DOCS_MODULE_FOLDER = path.join(
                DOCS_FOLDER,
                lang,
                'modules',
                module
            );
            const DOCS_MODULE_FILE = path.join(DOCS_MODULE_FOLDER, 'README.md');

            const MODULE_DOCS_FILE = lang.startsWith('en_')
                ? [lang, 'en_US', 'en_GB', 'en_AU']
                      .map(l => path.join(MODULE_DOCS_FOLDER, `${l}.md`))
                      .find(file => fs.existsSync(file)) ||
                  path.join(MODULE_DOCS_FOLDER, `${lang}.md`)
                : path.join(MODULE_DOCS_FOLDER, `${lang}.md`);

            if (!fs.existsSync(DOCS_MODULE_FOLDER))
                fs.mkdirSync(DOCS_MODULE_FOLDER, { recursive: true });

            const frontMatterVars: Frontmatter = {
                lang: lang.replace('_', '-'),
                title: modulesFile[module].translations[lang].name,
                editLinkPattern: `:repo/edit/:branch/src/modules/${module}/docs/${lang}.md`,
            };

            const getHead = (vars: Frontmatter) => `---
${Object.entries(vars)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}
---
`;

            if (fs.existsSync(MODULE_DOCS_FILE)) {
                const docsContent = fs
                    .readFileSync(MODULE_DOCS_FILE)
                    .toString();
                frontMatterVars.empty = docsContent.trim() === '';
                fs.writeFileSync(
                    DOCS_MODULE_FILE,
                    getHead(frontMatterVars) + docsContent
                );
                if (!frontMatterVars.empty) modulesFile[module].docs.push(lang);
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
                frontMatterVars.empty = true;
                fs.writeFileSync(DOCS_MODULE_FILE, getHead(frontMatterVars));
            }
        }
    }
    fs.writeFileSync(file, JSON.stringify(modulesFile));
})();
