import fs from 'fs';
import path from 'path';
import { type DefaultThemeOptions, defineUserConfig } from 'vuepress';

import childProcess from './utils/childProcess';
import config from '../../src/config';
import i18n from './utils/i18n';
import type { Versions } from './utils/generate/versions';

import localeConfig, {
    type LocaleSiteConfig,
    type LocaleThemeConfig,
} from './utils/localeConfig';

const BASE = '/v4/docs/';

const VUEPRESS_PATH = __dirname;
const ROOT_PATH = path.join(VUEPRESS_PATH, '../../');
const MODULES_PATH = path.join(ROOT_PATH, 'src/modules');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const DOCS_PATH = path.join(ROOT_PATH, 'docs');
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
    .sort();

const $t = i18n(DOCS_I18N_PATH);

const getLocaleConfig = localeConfig(
    $t,
    sidebar_lssm,
    sidebar_others,
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

// const shortVersion = stable.match(/4(\.(x|\d+)){2}/u)?.[0] ?? '4.x.x';

LANGS.forEach(lang => {
    const { siteConfig, themeConfig, searchPlaceholder } =
        getLocaleConfig(lang);
    localeConfigs.siteConfigs[`/${lang}/`] = siteConfig;
    localeConfigs.themeConfigs[`/${lang}/`] = themeConfig;
    localeConfigs.searchConfigs[`/${lang}/`] = {
        placeholder: searchPlaceholder,
    };
});

const { run } = childProcess(DOCS_UTILS_PATH);
run(
    'generate/home',
    path.join(DOCS_PATH, 'README.md'),
    JSON.stringify(LANGS.map(lang => [lang, config.games[lang].flag]))
);
const versionsFile = path.join(VUEPRESS_PATH, '.versions.json');
run('generate/versions', versionsFile);
const versions: Versions = JSON.parse(fs.readFileSync(versionsFile).toString());

export default defineUserConfig<DefaultThemeOptions>({
    // site config
    base: BASE,
    lang: 'en-US',
    title: 'LSS-Manager V.4 Wiki',
    description: $t('en_US', 'description').toString(),
    head: [['link', { rel: 'icon', href: '/img/lssm.png' }]],

    // common config
    markdown: {
        importCode: {
            handleImportPath: str =>
                str.replace(
                    /^@userscript$/u,
                    path.join(DIST_PATH, 'static/lssm-v4.user.js')
                ),
        },
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
            // noMapkitModules,
            // bugIssues: (
            //     await axios(
            //         `https://api.github.com/repos/${config.github.repo}/issues?labels=bug&per_page=100&sort=created`
            //     )
            // ).data,
            moment: Object.fromEntries(
                LANGS.map(lang => [lang, $t(lang, 'moment')])
            ),
            contributors: contributorsFile.contributors,
            contributionTypes: contributorsFile.types,
        },
    },

    // plugins
    plugins: [
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
                    'bugs': path.join(DOCS_COMPONENTS_PATH, 'bugs.vue'),
                    'discord': path.join(DOCS_COMPONENTS_PATH, 'discord.vue'),
                    'discord-channel': path.join(
                        DOCS_COMPONENTS_PATH,
                        'discord-channel.vue'
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
