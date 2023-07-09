import config from '../../../src/config';
import getConstants from './getConstants';

import type { Locale } from '../types/Locale';

const { LANGS, MODULES } = getConstants();

const GITHUB_URL = `https://github.com/${config.github.repo}`;

const commonLinks = {
    // LSSM
    'lssm.status': config.urls.statuspage,
    'lssm.discord': `https://discord.gg/${config.discord.invite}`,
    'lssm.userscript': `${config.urls.server}lssm-v4.user.js`,
    'lssm.donations': config.urls.donations,
    // Docs
    'docs': config.urls.docs,
    'docs.home': (lang: Locale) => `/${lang}/`,
    'docs.apps': (lang: Locale) => `/${lang}/apps.md`,
    'docs.appstore': (lang: Locale) => `/${lang}/appstore.md`,
    'docs.bugs': (lang: Locale) => `/${lang}/bugs.md`,
    'docs.error_report': (lang: Locale) => `/${lang}/error_report.md`,
    'docs.faq': (lang: Locale) => `/${lang}/faq.md`,
    'docs.metadata': (lang: Locale) => `/${lang}/metadata.md`,
    'docs.other': (lang: Locale) => `/${lang}/other.md`,
    'docs.settings': (lang: Locale) => `/${lang}/settings.md`,
    'docs.suggestions': (lang: Locale) => `/${lang}/suggestions.md`,
    'docs.support': (lang: Locale) => `/${lang}/support.md`,
    // Docs: Langs
    ...Object.fromEntries(
        LANGS.map(lang => [`docs.langs.${lang}`, `${config.urls.docs}${lang}/`])
    ),
    // Docs: Modules
    ...Object.fromEntries(
        LANGS.flatMap(lang =>
            MODULES.map(module => [
                `docs.modules.${lang}.${module}`,
                `${config.urls.docs}${lang}/modules/${module}/`,
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
    'github': GITHUB_URL,
    'github.issues': `${GITHUB_URL}/issues`,
    'github.issues.open': `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Abug`,
};

type commonLinksKey =
    | keyof typeof commonLinks
    | `docs.${Locale}`
    | `docs.modules.${Locale}.${string}`
    | `games.${Locale}`;

export type CommonLinksConfig = (
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
            (key.startsWith('lssm.') && config.includes('lssm')) ||
            (key.startsWith('github.') && config.includes('github'))
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
        md.includes('==START_FOOTER==')
            ? /\n<!-- ==START_FOOTER==.*?-->.*$/su
            : /$/u,
        `
<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
${getCommonLinks(config, lang)}
`.trimEnd()
    );
