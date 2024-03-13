import fs from 'fs';
import path from 'path';

import { defineConfig } from 'vitepress'

import childProcess from './utils/childProcess';
import config from '../../src/config';
import getConstants from './utils/getConstants';
import i18n from './utils/i18n';
import localeConfig, {
    type LocaleSiteConfig,
    type LocaleThemeConfig,
} from './utils/localeConfig';

import type { Versions } from './utils/generate/versions';

const {
  DOCS_URL,
  BASE,
  VITEPRESS_PATH,
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

const { run } = childProcess(DOCS_UTILS_PATH);

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

// Generate versions

const versionsFile = path.join(DOCS_TEMP_PATH, '.versions.json');
run('generate/versions', versionsFile);
const versions: Versions = JSON.parse(fs.readFileSync(versionsFile).toString());


// Generate modules

const modulesFile = path.join(DOCS_TEMP_PATH, '.modules.json');
run(
  'generate/modules',
  modulesFile,
  MODULES_PATH,
  DOCS_PATH,
  JSON.stringify(LANGS),
  JSON.stringify(MODULES)
);

// Generate i18n

const $t = i18n(DOCS_I18N_PATH);
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
  localeConfigs.siteConfigs[`${lang}`] = siteConfig;
  localeConfigs.themeConfigs[`/${lang}/`] = themeConfig;
  localeConfigs.searchConfigs[`/${lang}/`] = {
      placeholder: searchPlaceholder,
  };
  localeConfigs.pwaPopupConfigs[`/${lang}/`] = pwaPopupConfig;
});
localeConfigs.siteConfigs['root'] = localeConfigs.siteConfigs['en_US'];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LSS-Manager V.4 Wiki",
  description: "The Wiki for LSS-Manager V.4",
  outDir: "../dist/docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: `v${versions.short}`, link: `https://github.com/${config.github.repo}/releases/tag/v${versions.short}` }
    ],

    sidebar: {},

    socialLinks: [
      { icon: 'github', link: `https://github.com/${config.github.repo}` },
      { icon: 'discord', link: `https://discord.gg/${config.discord.invite}` }
    ]
  },
  locales: localeConfigs.siteConfigs 
})
