import { defineUserConfig } from 'vuepress';
import fs from 'fs';
import path from 'path';

import childProcess from './utils/childProcess';
import config from '../../src/config';
import i18n from './utils/i18n';
import noMapkitSettings from './utils/noMapkitSettings.json';

import localeConfig, {
    type LocaleSiteConfig,
    type LocaleThemeConfig,
} from './utils/localeConfig';

import type { Locale } from './types/Locale';
import type { ThemeData } from './types/ThemeData';
import type TranslationType from './i18n/de_DE.json';
import type { Versions } from './utils/generate/versions';

const BASE = '/v4/docs/';

const VUEPRESS_PATH = __dirname;
const ROOT_PATH = path.join(VUEPRESS_PATH, '../../');
const MODULES_PATH = path.join(ROOT_PATH, 'src/modules');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const DIST_DOCS_PATH = path.join(DIST_PATH, 'docs');
const DOCS_PATH = path.join(ROOT_PATH, 'docs');
const DOCS_DIST_PATH = path.join(VUEPRESS_PATH, 'dist');
const DOCS_TEMP_PATH = path.join(VUEPRESS_PATH, '.temp');
const DOCS_I18N_PATH = path.join(VUEPRESS_PATH, 'i18n');
const DOCS_UTILS_PATH = path.join(VUEPRESS_PATH, 'utils');
const DOCS_COMPONENTS_PATH = path.join(VUEPRESS_PATH, 'components');

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

const LANGS = Object.keys(config.games)
    .filter(lang => fs.existsSync(path.join(DOCS_PATH, lang)))
    .sort() as Locale[];
const MODULES = fs
    .readdirSync(MODULES_PATH)
    .filter(
        module =>
            !['template', ...config.modules['core-modules']].includes(module)
    );

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
    JSON.stringify(
        LANGS.map(lang => [lang, $t(lang, 'readme.serverStatus.game')])
    )
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
} = {
    siteConfigs: {},
    themeConfigs: {},
    searchConfigs: {},
};

LANGS.forEach(lang => {
    const { siteConfig, themeConfig, searchPlaceholder } =
        getLocaleConfig(lang);
    localeConfigs.siteConfigs[`/${lang}/`] = siteConfig;
    localeConfigs.themeConfigs[`/${lang}/`] = themeConfig;
    localeConfigs.searchConfigs[`/${lang}/`] = {
        placeholder: searchPlaceholder,
    };
});

if (fs.existsSync(DIST_DOCS_PATH)) fs.unlinkSync(DIST_DOCS_PATH);
fs.symlinkSync(DOCS_DIST_PATH, DIST_DOCS_PATH);

export default defineUserConfig<ThemeData>({
    // site config
    base: BASE,
    lang: 'en-US',
    title: 'LSS-Manager V.4 Wiki',
    description: $t('en_US', 'description').toString(),
    head: [['link', { rel: 'icon', href: BASE + 'img/lssm.png' }]],

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
    theme: '@vuepress/theme-default',
    themeConfig: {
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
        variables: {
            discord: config.discord,
            github: `https://github.com/${config.github.repo}`,
            server: config.server,
            fontAwesomeIconSearchLink: config.fontAwesomeIconSearch,
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
            moment: Object.fromEntries(
                LANGS.map(lang => [lang, $t(lang, 'moment')])
            ) as unknown as ThemeData['variables']['moment'],
            tables: Object.fromEntries(
                LANGS.map(lang => [lang, $t(lang, 'tables')])
            ) as unknown as ThemeData['variables']['tables'],
            v3Comparison: {
                translations: Object.fromEntries(
                    LANGS.map(lang => [lang, $t(lang, 'v3')])
                ),
                ...JSON.parse(
                    fs
                        .readFileSync(
                            path.join(DOCS_UTILS_PATH, 'v3Comparison.json')
                        )
                        .toString()
                ),
            },
            contributors: contributorsFile.contributors,
            contributionTypes: contributorsFile.types,
        },
    },

    // plugins
    plugins: [
        ['vuepress-plugin-clipboard', { align: 'top', staticIcon: true }],
        [
            '@vuepress/plugin-search',
            {
                locales: localeConfigs.searchConfigs,
            },
        ],
        [
            '@vuepress/register-components',
            {
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
                        'v3-v4-comparison/new.vue'
                    ),
                    'v3-v4-comparison-integrated': path.join(
                        DOCS_COMPONENTS_PATH,
                        'v3-v4-comparison/integrated.vue'
                    ),
                    'v3-v4-comparison-v3only': path.join(
                        DOCS_COMPONENTS_PATH,
                        'v3-v4-comparison/v3only.vue'
                    ),
                    'browser-support-table': path.join(
                        DOCS_COMPONENTS_PATH,
                        'browser-support-table.vue'
                    ),
                    'bugs': path.join(DOCS_COMPONENTS_PATH, 'bugs.vue'),
                    'discord': path.join(DOCS_COMPONENTS_PATH, 'discord.vue'),
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
                        'translators.vue'
                    ),
                },
            },
        ],
    ],
});
