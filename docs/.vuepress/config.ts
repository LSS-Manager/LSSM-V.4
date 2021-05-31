import copydir from 'copy-dir';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

import addToBuildStats from '../../build/addToBuildStats';
import config from '../../src/config';
import { version } from '../../package.json';

import { Module } from '../../typings/Module';

interface Translation {
    [key: string]: Translation | string;
}
interface ModuleRegistration {
    title: string;
    description: string;
    file: string;
    register: Module;
    hasSrc: boolean;
}

const BASE = '/v4/docs/';

const ROOT_PATH = path.join(__dirname, '../../');
const MODULES_PATH = path.join(ROOT_PATH, 'src/modules');
const DOCS_PATH = path.join(ROOT_PATH, 'docs');
const DOCS_I18N_PATH = path.join(DOCS_PATH, '.vuepress/i18n');

const LANGS = Object.keys(config.games).filter(lang =>
    fs.existsSync(path.join(DOCS_PATH, lang))
);
const MODULES = fs
    .readdirSync(MODULES_PATH)
    .filter(
        module =>
            !['template', ...config.modules['core-modules']].includes(module)
    );
const I18N: Record<string, Translation> = {};

const setLocales = async () => {
    if (Object.keys(I18N).length) return;
    for (const lang of fs.readdirSync(DOCS_I18N_PATH)) {
        I18N[lang.split('.')[0]] = await import(
            path.join(DOCS_I18N_PATH, lang)
        );
    }
};

const sidebar_lssm = ['', 'metadata'];
const sidebar_others = [
    'suggestions',
    'support',
    'error_report',
    'faq',
    'bugs',
    'appstore',
    'settings',
    'other',
];

const getLocale = (lang: string, key: string): Translation | string => {
    const walk = (
        base: Translation | string,
        path: string[]
    ): Translation | string => {
        if (typeof base === 'string' || !base) return base;
        if (path.length === 1) return base[path[0]];
        const attr = path.shift();
        if (!attr) return base;
        return walk(base[attr], path);
    };

    const path = key.split('.');

    const reqLang = walk(I18N[lang], path);
    const en_US = walk(I18N.en_US, path);
    const de_DE = walk(I18N.de_DE, path);
    return reqLang ?? en_US ?? de_DE;
};

const updateConfigs = () => {
    config.discord.invite = `https://discord.gg/${config.discord.invite}`;
    config.discord.channels = Object.fromEntries(
        Object.entries(config.discord.channels).map(([channel, id]) => [
            channel,
            `https://discordapp.com/channels/${config.discord.id}/${id}`,
        ])
    );
};

const emptyFolders = () => {
    const emptyFolder = (rootPath: string, deleteFolder = false): void => {
        const absPath = path.join(ROOT_PATH, rootPath);
        if (fs.existsSync(absPath)) {
            fs.readdirSync(absPath).forEach((file: string) => {
                const curPath = `${absPath}/${file}`;
                if (fs.lstatSync(curPath).isDirectory())
                    emptyFolder(curPath, true);
                else fs.unlinkSync(curPath);
            });
            if (deleteFolder) fs.rmdirSync(absPath);
        }
    };

    [
        'dist/docs',
        ...fs
            .readdirSync(path.join(ROOT_PATH, 'docs/'))
            .filter((name: string) => LANGS.indexOf(name) >= 0)
            .map(lang => `docs/${lang}/modules`),
        'docs/.vuepress/public/assets',
    ].forEach(folder => {
        emptyFolder(folder);
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    });
};

const processModules = async () => {
    const HEAD_EMOJIS = {
        alpha: '🧑‍🔬',
        dev: '🐛',
        settings: '⚙️',
    };
    const MODULES_BY_LANG: Record<
        string,
        ModuleRegistration[]
    > = Object.fromEntries(LANGS.map(lang => [lang, []]));

    const getRootI18n = (
        module: string,
        lang: string
    ): Promise<{ name: string; description?: string }> =>
        new Promise(resolve =>
            import(path.join(MODULES_PATH, module, 'i18n', `${lang}.root`))
                .then(({ name, description }) => resolve({ name, description }))
                .catch(() =>
                    import(path.join(MODULES_PATH, module, 'i18n/en_US.root'))
                        .then(({ name, description }) =>
                            resolve({ name, description })
                        )
                        .catch(() => resolve({ name: module }))
                )
        );

    const getTargetPath = (module: string, lang: string) =>
        path.join(DOCS_PATH, lang, 'modules', `${module}.md`);

    const getYaml = (title: string, lang: string) => `---
title: ${title}
lang: ${lang}
---
`;

    const getGithub = (issue: number) =>
        `<a href="https://github.com/${config.github.repo}/issues/${issue}" title="Issue #${issue} on GitHub" target="_blank"><img src="https://github.githubassets.com/pinned-octocat.svg" alt="Issue #${issue} on GitHub" style="height: 1.5ex" data-prevent-zooming/></a>`;

    const getModuleHead = (
        title: string,
        description: string,
        lang: string,
        register: Module
    ) => `
# ${title} ${register.github ? getGithub(register.github) : ``}

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
        attr =>
            `> ${HEAD_EMOJIS[attr] ?? ''} ${getLocale(lang, `head.${attr}`)}`
    )
    .join('\n>\n')}
${
    register.noMapkit
        ? `
:::danger Mapkit
${getLocale(lang, 'head.mapkit')}
:::`
        : ``
}
`;

    for (const module of MODULES) {
        const MODULE_PATH = path.join(MODULES_PATH, module);
        const MODULE_DOC_PATH = path.join(MODULE_PATH, 'docs');
        const register: Module = await import(
            path.join(MODULE_PATH, 'register')
        );
        if (register.noapp) continue;
        const usedLangs = LANGS.filter(lang =>
            (register.locales ?? LANGS).includes(lang)
        );
        const noDocs: Record<
            string,
            { i18n: { name: string; description: string }; register: Module }
        > = {};
        for (const lang of usedLangs) {
            const i18n = {
                description: '',
                ...(await getRootI18n(module, lang)),
            };
            const targetPath = getTargetPath(module, lang);
            const srcPath = path.join(MODULE_DOC_PATH, `${lang}.md`);
            const hasSrc = fs.existsSync(srcPath);
            MODULES_BY_LANG[lang].push({
                title: i18n.name,
                description: i18n.description,
                file: targetPath,
                register,
                hasSrc,
            });
            const content = hasSrc
                ? fs
                      .readFileSync(srcPath)
                      .toString()
                      .trim()
                : '';
            if (!hasSrc || !content.length) {
                noDocs[lang] = { i18n, register };
                continue;
            }
            fs.writeFileSync(
                targetPath,
                `${getYaml(i18n.name, lang)}
${getModuleHead(i18n.name, i18n.description, lang, register)}
${content.replace(/(?<=!\[.*?]\().*?(?=\))/g, asset =>
    path.join(BASE, 'assets', module, lang, asset)
)}`
            );
        }
        const docsLangs = usedLangs.filter(
            lang => !noDocs.hasOwnProperty(lang)
        );
        Object.entries(noDocs).forEach(([lang, { i18n, register }]) => {
            fs.writeFileSync(
                getTargetPath(module, lang),
                `${getYaml(i18n.name, lang)}
${getModuleHead(i18n.name, i18n.description, lang, register)}
:::warning No module page existing yet
Dear User,

thanks for your interest in the Wiki page of **${i18n.name}**!
Unfortunately, we weren't able to create the content for your language \`${lang}\` yet. If you want to contribute to our wiki, feel free to create this page [on GitHub](https://github.com/${
                    config.github.repo
                }/new/dev/src/modules/${module}/docs?filename=${lang}.md)!
We suggest to have a look at the files of the other languages for examples in the [docs directory](https://github.com/${
                    config.github.repo
                }/tree/dev/src/modules/${module}/docs)

This module already has a Wiki page in the following languages:
${docsLangs
    .map(
        l =>
            `* [${config.games[l].flag} ${config.games[l].name}](/${l}/modules/${module}.html)`
    )
    .join('\n')}
:::
`
            );
        });

        const assetDir = path.join(MODULE_DOC_PATH, 'assets');
        const targetDir = path.join(
            DOCS_PATH,
            '.vuepress/public/assets',
            module
        );
        if (fs.existsSync(assetDir)) {
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
            copydir.sync(assetDir, targetDir);
        }
    }

    const themeLocales: Record<
        string,
        {
            label: string;
            nav: { text: string; link: string }[];
            sidebar: (
                | { title: string; collapsable: boolean; children: string[] }
                | string
            )[];
        }
    > = {};
    const noMapkitModules: Record<string, { title: string; f: string }[]> = {};
    const locales: Record<string, { lang: string; title: string }> = {};

    Object.entries(MODULES_BY_LANG).forEach(([lang, modules]) => {
        MODULES_BY_LANG[lang] = modules.sort((a, b) =>
            a.title < b.title ? -1 : a.title > b.title ? 1 : 0
        );
        noMapkitModules[lang] = MODULES_BY_LANG[lang]
            .filter(({ register: { noMapkit } }) => noMapkit)
            .map(m => ({
                title: m.title,
                f: path.relative(
                    path.join(DOCS_PATH, lang),
                    m.file.replace('.md', '')
                ),
            }));

        const langPath = `/${lang}/`;
        const game = config.games[lang];

        locales[langPath] = {
            lang,
            title: `LSS-Manager V.4 Wiki ${game.flag}`,
        };

        themeLocales[langPath] = {
            label: `${game.flag} ${game.name}`,
            nav: [
                {
                    text: 'Discord',
                    link: config.discord.invite,
                },
            ],
            sidebar: [
                {
                    title: 'LSSM',
                    collapsable: false,
                    children: sidebar_lssm
                        .filter(file =>
                            fs.existsSync(
                                path.posix.join(
                                    DOCS_PATH,
                                    lang,
                                    `${file || 'README'}.md`
                                )
                            )
                        )
                        .map(file => `${langPath}${file}`),
                },
                ...sidebar_others
                    .filter(file =>
                        fs.existsSync(
                            path.posix.join(
                                DOCS_PATH,
                                lang,
                                `${file || 'README'}.md`
                            )
                        )
                    )
                    .map(file => `${langPath}${file}`),
                {
                    title: `${getLocale(lang, 'apps')} 📦`,
                    collapsable: true,
                    children: [
                        ...(fs.existsSync(path.join(DOCS_PATH, lang, 'apps.md'))
                            ? [`/${lang}/apps`]
                            : []),
                        ...MODULES_BY_LANG[lang]
                            .filter(
                                ({ hasSrc, file }) =>
                                    hasSrc && fs.existsSync(file)
                            )
                            .map(
                                ({ file }) =>
                                    `/${path.posix.relative(
                                        DOCS_PATH,
                                        file.replace('.md', '')
                                    )}`
                            ),
                    ],
                },
            ],
        };
    });

    return {
        locales,
        themeLocales,
        noMapkitModules,
    };
};

const setReadmeHeads = () =>
    LANGS.forEach(lang => {
        if (!fs.existsSync(path.join(DOCS_PATH, lang))) return;
        const filePath = path.join(DOCS_PATH, lang, 'README.md');
        const flag = config.games[lang].flag;
        fs.writeFileSync(
            filePath,
            (fs.readFileSync(filePath).toString() ?? '').replace(
                /(.|\n)*?(?=\n## )/,
                `---
title: LSS-Manager V.4
lang: ${lang}
sidebarDepth: 2
---

# Wiki ${flag} <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)
`
            )
        );
    });

const fetchStableVersion = (): Promise<{ version: string }> =>
    fetch(`${config.server}static/build_stats.json`)
        .then(res =>
            res.status === 200
                ? res.json()
                : new Promise(resolve => resolve({ version: '4.x.x' }))
        )
        .catch(() => new Promise(resolve => resolve({ version: '4.x.x' })));

module.exports = async () => {
    await setLocales();
    updateConfigs();
    emptyFolders();
    setReadmeHeads();
    const { locales, themeLocales, noMapkitModules } = await processModules();
    const { version: stable } = await fetchStableVersion();
    const vuepressConfig = {
        title: 'LSS-Manager V.4 Wiki',
        description: 'The Wiki for the LSS-Manager',
        base: BASE,
        dest: './dist/docs',
        head: [
            [
                'link',
                {
                    rel: 'icon',
                    href: '/img/lssm.png',
                },
            ],
        ],
        markdown: {
            sluglify: '',
            lineNumbers: true,
        },
        themeConfig: {
            logo: '/img/lssm.png',
            variables: {
                discord: config.discord,
                github: `https://github.com/${config.github.repo}`,
                server: config.server,
                versions: {
                    beta: version,
                    stable,
                    short: stable.match(/4(\.(x|\d+)){2}/)?.[0] ?? '4.x',
                },
                browsers: config.browser,
                noMapkitModules,
            },
            locales: themeLocales,
            activeHeaderLinks: true,
            repo: config.github.repo,
            editLinks: false,
        },
        locales,
        plugins: {
            '@vuepress/active-header-links': {},
            '@vuepress/back-to-top': {},
            '@vuepress/last-updated': {
                transformer(timestamp: number, lang: string) {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const moment = require('moment');
                    moment.locale(lang);
                    return moment(timestamp).format('LLL');
                },
            },
            'vuepress-plugin-redirect': {
                locales: true,
            },
            'vuepress-plugin-smooth-scroll': {},
            'vuepress-plugin-zooming': {
                selector: 'img:not([data-prevent-zooming])',
                options: {
                    bgColor: 'black',
                },
            },
        },
    };
    addToBuildStats({ docs_config: vuepressConfig });
    return vuepressConfig;
};
