import fs from 'fs';
import path from 'path';

import config from '../../../../src/config';

import type { Module } from '../../../../typings/Module';

interface Translations404 {
    content: string;
    languages: string;
    title: string;
}
interface TranslationsHead {
    alpha: string;
    dev: string;
    mapkit: string;
    settings: string;
}

type LangCode = `${string}_${string}`;

const HEAD_EMOJIS = {
    alpha: '🧑‍🔬',
    dev: '🐛',
    settings: '⚙️',
};

const [, , file, MODULES_FOLDER, langs, modules] = process.argv;

const LANGS: [LangCode, Translations404, TranslationsHead][] =
    JSON.parse(langs);
const TRANSLATIONS = Object.fromEntries(
    LANGS.map(([lang, translations404, translationsHead]) => [
        lang,
        {
            404: translations404,
            head: translationsHead,
        },
    ])
);
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

const getFrontMatter = (title: string, lang: string) => `---
title: ${title}
lang: ${lang}
---
`;

const getGithub = (issue: number) =>
    `<a href="https://github.com/${config.github.repo}/issues/${issue}" title="Issue #${issue} on GitHub" target="_blank"><img src="https://github.githubassets.com/pinned-octocat.svg" alt="Issue #${issue} on GitHub" style="height: 1.5ex" data-prevent-zooming class="github-icon"/></a>`;

const getModuleHead = (
    title: string,
    description: string,
    lang: string,
    register: Module
) => `
# ${title} ${register.github ? getGithub(register.github) : ''}

${
    description
        ? `
> ℹ **${description}**
>
`
        : ``
}
${(['alpha', 'dev', 'settings'] as ('alpha' | 'dev' | 'settings')[])
    .filter(attr => register[attr])
    .map(
        attr => `> ${HEAD_EMOJIS[attr] ?? ''} ${TRANSLATIONS[lang].head[attr]}`
    )
    .join('\n>\n')}
${
    register.noMapkit
        ? `
:::danger Mapkit
${TRANSLATIONS[lang].head.mapkit}
:::`
        : ``
}
`;

const getModule = (
    lang: string,
    title: string,
    description: string,
    register: Module
) =>
    `${getFrontMatter(title, lang)}${getModuleHead(
        title,
        description,
        lang,
        register
    )}`;

(async () => {
    for (const module of MODULES) {
        const MODULE_FOLDER = path.join(MODULES_FOLDER, module);
        const MODULE_DOCS_FOLDER = path.join(MODULE_FOLDER);
        const MODULE_REGISTER_FILE = path.join(MODULE_FOLDER, 'register');

        const registerFile = await loadRegisterFile(MODULE_REGISTER_FILE);
        if (registerFile.noapp) continue;

        for (const lang of LOCALES) {
            if (registerFile.locales && registerFile.locales.includes(lang))
                continue;

            const MODULE_DOCS_FILE = path.join(
                MODULE_DOCS_FOLDER,
                `${lang}.md`
            );
            const docsFileExists = fs.existsSync(MODULE_DOCS_FILE);
            const docsSrc = docsFileExists
                ? fs.readFileSync(MODULE_DOCS_FILE).toString()
                : '';

            if (!docsFileExists || !docsSrc.length) {
            } else {
                // const module
            }
        }
    }
})();
