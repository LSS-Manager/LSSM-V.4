import fs from 'fs';
import path from 'path';

import config from '../../../src/config';

import type { $t } from './i18n';
import type { DefaultThemeLocaleData } from '@vuepress/theme-default/lib/shared/options';
import type { Locale } from '../types/Locale';
import type { ModulesFile } from './generate/modules';
import type { SiteLocaleData } from '@vuepress/shared';

export type LocaleSiteConfig = Partial<SiteLocaleData>;
export type LocaleThemeConfig = DefaultThemeLocaleData;

export default (
    $t: $t,
    sidebar_lssm: string[],
    sidebar_others: string[],
    moduleFile: ModulesFile,
    DOCS_PATH: string
) => {
    const modules = Object.keys(moduleFile);

    return (
        lang: Locale
    ): {
        siteConfig: LocaleSiteConfig;
        themeConfig: LocaleThemeConfig;
        searchPlaceholder: string;
        pwaPopupConfig: { message: string; buttonText: string };
    } => {
        const game = config.games[lang];
        const flag = game.flag;
        const langPath = `/${lang}/`;

        return {
            siteConfig: {
                lang: lang.replace(/_/u, '-'),
                title: `LSS-Manager V.4 Wiki ${flag}`,
                description: $t(lang, 'description').toString(),
            },
            themeConfig: {
                selectLanguageText: `${flag} ${game.name}`,
                selectLanguageAriaLabel: `${lang} ${game.name}`,
                selectLanguageName: `${flag} ${game.name}`,
                sidebar: [
                    {
                        text: 'LSSM',
                        collapsible: false,
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
                        text: `${$t(lang, 'apps')} 📦`,
                        collapsible: true,
                        children: [
                            ...(fs.existsSync(
                                path.join(DOCS_PATH, lang, 'apps.md')
                            )
                                ? [`/${lang}/apps`]
                                : []),
                            ...modules
                                .filter(module =>
                                    moduleFile[module].docs.includes(lang)
                                )
                                .sort((moduleA, moduleB) =>
                                    moduleFile[moduleA].translations[
                                        lang
                                    ].name.localeCompare(
                                        moduleFile[moduleB].translations[lang]
                                            .name
                                    )
                                )
                                .map(module => `/${lang}/modules/${module}/`),
                        ],
                    },
                ],
                editLinkText: $t(lang, 'footer.edit').toString(),
                lastUpdatedText: $t(lang, 'footer.lastUpdated').toString(),
                contributors: false,
                contributorsText: $t(lang, 'footer.contributors').toString(),
                tip: $t(lang, 'containers.tip').toString(),
                warning: $t(lang, 'containers.warning').toString(),
                danger: $t(lang, 'containers.danger').toString(),
                backToHome: $t(lang, '404.general.home').toString(),
            },
            searchPlaceholder: $t(lang, 'search').toString(),
            pwaPopupConfig: {
                message: $t(lang, 'pwa.message').toString(),
                buttonText: $t(lang, 'pwa.button').toString(),
            },
        };
    };
};
