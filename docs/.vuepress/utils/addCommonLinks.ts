import config from '../../../src/config';
import getConstants from './getConstants';

import type { Locale } from '../types/Locale';

const { LANGS, MODULES } = getConstants();

const commonLinks = {
    // LSSM
    'lssm.status': config.statuspage,
    'lssm.discord': `https://discord.gg/${config.discord.invite}`,
    'lssm.userscript': `${config.server}lssm-v4.user.js`,
    // Docs
    'docs': config.docs,
    'docs.apps': (lang: Locale) => `/${lang}/apps/`,
    'docs.appstore': (lang: Locale) => `/${lang}/appstore/`,
    'docs.bugs': (lang: Locale) => `/${lang}/bugs/`,
    'docs.error_report': (lang: Locale) => `/${lang}/error_report/`,
    'docs.faq': (lang: Locale) => `/${lang}/faq/`,
    'docs.metadata': (lang: Locale) => `/${lang}/metadata/`,
    'docs.other': (lang: Locale) => `/${lang}/other/`,
    'docs.settings': (lang: Locale) => `/${lang}/settings/`,
    'docs.suggestions': (lang: Locale) => `/${lang}/suggestions/`,
    'docs.support': (lang: Locale) => `/${lang}/support/`,
    // Docs: Langs
    ...Object.fromEntries(
        LANGS.map(lang => [`docs.langs.${lang}`, `${config.docs}${lang}/`])
    ),
    // Docs: Modules
    ...Object.fromEntries(
        LANGS.flatMap(lang =>
            MODULES.map(module => [
                `docs.modules.${lang}.${module}`,
                `${config.docs}${lang}/modules/${module}/`,
            ])
        )
    ),
    // Games
    'games.self': (lang: Locale) => `https://${config.games[lang].shortURL}`,
    ...Object.fromEntries(
        Object.entries(config.games).map(([lang, { shortURL }]) => [
            `games.${lang}`,
            `https://${shortURL}`,
        ])
    ),
    // Other
    'tampermonkey': 'https://tampermonkey.net/',
};

type commonLinksKey =
    | keyof typeof commonLinks
    | `docs.${Locale}`
    | `docs.modules.${Locale}.${string}`
    | `games.${Locale}`;

type CommonLinksConfig = (
    | commonLinksKey
    | '*'
    | 'docs.langs'
    | 'docs.modules'
    | 'docs'
    | 'games'
    | 'lssm'
)[];

const getCommonLinks = (config: CommonLinksConfig, lang: Locale) => {
    const filteredLinks = Object.entries(commonLinks).filter(
        ([key]) =>
            config.includes('*') ||
            config.includes(key as keyof typeof commonLinks) ||
            (key.startsWith('docs.langs.') && config.includes('docs.langs')) ||
            (!lang &&
                key.startsWith('docs.modules.') &&
                config.includes('docs.modules')) ||
            (lang &&
                key.startsWith(`docs.modules.${lang}.`) &&
                config.includes('docs.modules')) ||
            (key.startsWith('docs.') &&
                !key.startsWith('docs.modules.') &&
                !key.startsWith('docs.langs.') &&
                config.includes('docs')) ||
            (key.startsWith('games.') && config.includes('games')) ||
            (key.startsWith('lssm.') && config.includes('lssm'))
    );
    return filteredLinks
        .map(
            ([key, link]) =>
                `[${key}]: ${typeof link === 'function' ? link(lang) : link}`
        )
        .join('\n');
};

export default (
    md: string,
    config: CommonLinksConfig = ['*'],
    lang: Locale = 'en_US'
) =>
    md.replace(
        /<!-- ==START_FOOTER==.*?-->.*$/su,
        `
<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
${getCommonLinks(config, lang)}
`.trim()
    );
