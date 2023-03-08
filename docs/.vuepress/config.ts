import fs from 'fs';
import path from 'path';

import pluginClipboard from 'vuepress-plugin-clipboard';
import pluginRegisterComponents from '@vuepress/plugin-register-components';
import pluginSearch from '@vuepress/plugin-search';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';
import { defaultTheme, defineUserConfig } from 'vuepress';

import childProcess from './utils/childProcess';
import config from '../../src/config';
import getConstants from './utils/getConstants';
import i18n from './utils/i18n';
import noMapkitSettings from './utils/noMapkitSettings.json';
import localeConfig, {
    type LocaleSiteConfig,
    type LocaleThemeConfig,
} from './utils/localeConfig';

import type { DocsVar } from './types/ThemeData';
import type TranslationType from './i18n/de_DE.json';
import type { Versions } from './utils/generate/versions';

const {
    DOCS_URL,
    BASE,
    VUEPRESS_PATH,
    ROOT_PATH,
    MODULES_PATH,
    DIST_PATH,
    DOCS_PATH,
    DOCS_DIST_PATH,
    DOCS_TEMP_PATH,
    DOCS_I18N_PATH,
    DOCS_UTILS_PATH,
    DOCS_COMPONENTS_PATH,
    LANGS,
    MODULES,
} = getConstants();

const contributorsFile = JSON.parse(
    fs.readFileSync(path.join(ROOT_PATH, '.all-contributorsrc')).toString()
);

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

const $t = i18n(DOCS_I18N_PATH);

const { run } = childProcess(DOCS_UTILS_PATH);
run(
    'generate/home',
    path.join(DOCS_PATH, 'README.md'),
    JSON.stringify(LANGS.map(lang => [lang, config.games[lang].flag]))
);

if (!fs.existsSync(DOCS_TEMP_PATH)) fs.mkdirSync(DOCS_TEMP_PATH);

const versionsFile = path.join(DOCS_TEMP_PATH, '.versions.json');
run('generate/versions', versionsFile);
const versions: Versions = JSON.parse(fs.readFileSync(versionsFile).toString());

const bugsFile = path.join(DOCS_TEMP_PATH, '.bugs.json');
run('generate/bugs', bugsFile);

run(
    'generate/readmes',
    DOCS_PATH,
    JSON.stringify(LANGS.map(lang => [lang, $t(lang, 'readme.serverStatus')]))
);

const modulesFile = path.join(DOCS_TEMP_PATH, '.modules.json');
run(
    'generate/modules',
    modulesFile,
    MODULES_PATH,
    DOCS_PATH,
    JSON.stringify(LANGS),
    JSON.stringify(MODULES)
);

const getLocaleConfig = localeConfig(
    $t,
    sidebar_lssm,
    sidebar_others,
    JSON.parse(fs.readFileSync(modulesFile).toString()),
    DOCS_PATH
);

const localeConfigs: {
    siteConfigs: Record<`/${string}/`, LocaleSiteConfig>;
    themeConfigs: Record<`/${string}/`, LocaleThemeConfig>;
    searchConfigs: Record<`/${string}/`, { placeholder: string }>;
    pwaPopupConfigs: Record<
        `/${string}/`,
        { message: string; buttonText: string }
    >;
} = {
    siteConfigs: {},
    themeConfigs: {},
    searchConfigs: {},
    pwaPopupConfigs: {},
};

LANGS.forEach(lang => {
    const { siteConfig, themeConfig, searchPlaceholder, pwaPopupConfig } =
        getLocaleConfig(lang);
    localeConfigs.siteConfigs[`/${lang}/`] = siteConfig;
    localeConfigs.themeConfigs[`/${lang}/`] = themeConfig;
    localeConfigs.searchConfigs[`/${lang}/`] = {
        placeholder: searchPlaceholder,
    };
    localeConfigs.pwaPopupConfigs[`/${lang}/`] = pwaPopupConfig;
});

const statsComponentsPath = path.join(DOCS_COMPONENTS_PATH, '.temp', 'stats');
fs.mkdirSync(statsComponentsPath, { recursive: true });
const clocStatsPath = path.join(statsComponentsPath, 'cloc.vue');
const gitStatsPath = path.join(statsComponentsPath, 'git.vue');
run('generate/projectStats', ROOT_PATH, clocStatsPath, gitStatsPath);

run(
    'generate/manifest',
    path.join(VUEPRESS_PATH, 'public', 'manifest.webmanifest'),
    $t('en_US', 'description').toString(),
    'LSS-Manager V.4 Wiki',
    DOCS_URL.toString()
);

const __VAR__ = {
    discord: config.discord,
    github: `https://github.com/${config.github.repo}`,
    server: config.urls.server,
    fontAwesomeIconSearchLink: config.urls.fontAwesomeIconSearch,
    versions,
    browsers: config.browser,
    bugIssues: JSON.parse(fs.readFileSync(bugsFile).toString()),
    i18n: Object.fromEntries(
        LANGS.map(lang => [
            lang,
            $t(lang, '') as unknown as typeof TranslationType,
        ])
    ),
    modules: JSON.parse(fs.readFileSync(modulesFile).toString()),
    noMapkitSettings,
    selectLanguageTexts: Object.fromEntries(
        Object.entries(localeConfigs.themeConfigs).map(
            ([locale, { selectLanguageText }]) => [
                locale,
                selectLanguageText ?? '',
            ]
        )
    ),
    moment: Object.fromEntries(
        LANGS.map(lang => [lang, $t(lang, 'moment')])
    ) as unknown as DocsVar['moment'],
    tables: Object.fromEntries(
        LANGS.map(lang => [lang, $t(lang, 'tables')])
    ) as unknown as DocsVar['tables'],
    v3Comparison: {
        translations: Object.fromEntries(
            LANGS.map(lang => [lang, $t(lang, 'v3')])
        ),
        ...JSON.parse(
            fs
                .readFileSync(path.join(DOCS_UTILS_PATH, 'v3Comparison.json'))
                .toString()
        ),
    },
    contributors: contributorsFile.contributors,
    contributionTypes: contributorsFile.types,
    stats: {
        cloc: Object.fromEntries(
            LANGS.map(lang => [lang, $t(lang, 'stats.cloc')])
        ) as unknown as DocsVar['stats']['cloc'],
        git: Object.fromEntries(
            LANGS.map(lang => [lang, $t(lang, 'stats.git')])
        ) as unknown as DocsVar['stats']['git'],
    },
} as DocsVar;

export default defineUserConfig({
    // site config
    base: BASE,
    lang: 'en-US',
    title: 'LSS-Manager V.4 Wiki',
    description: $t('en_US', 'description').toString(),
    head: [
        [
            'link',
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: `${BASE}img/icons/apple-touch-icon.png`,
            },
        ],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `${BASE}img/icons/favicon-32x32.png`,
            },
        ],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `${BASE}img/icons/favicon-16x16.png`,
            },
        ],
        ['link', { rel: 'manifest', href: `${BASE}manifest.webmanifest` }],
        [
            'link',
            {
                rel: 'mask-icon',
                href: `${BASE}img/icons/safari-pinned-tab.svg`,
                color: '#22272e',
            },
        ],
        [
            'link',
            { rel: 'shortcut icon', href: `${BASE}img/icons/favicon.ico` },
        ],
        ['meta', { name: 'msapplication-TileColor', content: '#22272e' }],
        [
            'meta',
            {
                name: 'msapplication-TileImage',
                content: `${BASE}img/icons/mstile-144x144.png`,
            },
        ],
        [
            'meta',
            {
                name: 'msapplication-config',
                content: `${BASE}img/icons/browserconfig.xml`,
            },
        ],
        ['meta', { name: 'theme-color', content: '#22272e' }],
    ],

    // common config
    dest: DOCS_DIST_PATH,
    temp: DOCS_TEMP_PATH,
    markdown: {
        importCode: {
            handleImportPath: str =>
                str.replace(
                    /^@userscript$/u,
                    path.join(DIST_PATH, 'static/lssm-v4.user.js')
                ),
        },
    },
    alias: {
        '@theme/Page.vue': path.join(
            VUEPRESS_PATH,
            'theme/components/Page.vue'
        ),
    },

    // i18n config
    locales: localeConfigs.siteConfigs,

    // theme and its config
    theme: defaultTheme({
        navbar: [
            {
                text: `v${versions.short}`,
                link: `https://github.com/${config.github.repo}/releases/tag/v${versions.short}`,
            },
            {
                text: 'Discord',
                link: `https://discord.gg/${config.discord.invite}`,
            },
        ],
        logo: '/img/lssm.png',
        repo: config.github.repo,
        locales: localeConfigs.themeConfigs,
        docsRepo: `https://github.com/${config.github.repo}`,
        docsBranch: 'dev',
        docsDir: 'docs',
        // eslint-disable-next-line
        // @ts-ignore
        variables: __VAR__,
    }),

    define: {
        __VAR__,
    },

    // plugins
    plugins: [
        sitemapPlugin({
            hostname: DOCS_URL.toString(),
            changefreq: 'always',
        }),
        pluginClipboard({ align: 'top', staticIcon: true }),
        pluginSearch({ locales: localeConfigs.searchConfigs }),
        pluginRegisterComponents({
            components: {
                'momentjs-preview': path.join(
                    DOCS_COMPONENTS_PATH,
                    'momentjs/preview.vue'
                ),
                'momentjs-shorts': path.join(
                    DOCS_COMPONENTS_PATH,
                    'momentjs/shorts.vue'
                ),
                'momentjs-variables': path.join(
                    DOCS_COMPONENTS_PATH,
                    'momentjs/variables.vue'
                ),
                'tampermonkey-download-table': path.join(
                    DOCS_COMPONENTS_PATH,
                    'tampermonkey/download-table.vue'
                ),
                'v3-v4-comparison-new': path.join(
                    DOCS_COMPONENTS_PATH,
                    'v3-v4-comparison/new-table.vue'
                ),
                'v3-v4-comparison-integrated': path.join(
                    DOCS_COMPONENTS_PATH,
                    'v3-v4-comparison/integrated-table.vue'
                ),
                'v3-v4-comparison-v3only': path.join(
                    DOCS_COMPONENTS_PATH,
                    'v3-v4-comparison/v3only-table.vue'
                ),
                'browser-support-table': path.join(
                    DOCS_COMPONENTS_PATH,
                    'browser-support-table.vue'
                ),
                'bugs': path.join(DOCS_COMPONENTS_PATH, 'bug-list.vue'),
                'discord': path.join(DOCS_COMPONENTS_PATH, 'discord-link.vue'),
                'discord-channel': path.join(
                    DOCS_COMPONENTS_PATH,
                    'discord-channel.vue'
                ),
                'mapkit-modules': path.join(
                    DOCS_COMPONENTS_PATH,
                    'mapkit-modules.vue'
                ),
                'translators': path.join(
                    DOCS_COMPONENTS_PATH,
                    'translator-list.vue'
                ),
                'stats-cloc': clocStatsPath,
                'stats-git': gitStatsPath,
            },
        }),
        pwaPlugin({
            skipWaiting: false,
        }),
        pwaPopupPlugin(localeConfigs.pwaPopupConfigs),
    ],
});
