const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');

const config = require('../../src/config');

const langModules = fs.readdirSync('./docs/').filter(x => Object.keys(config.games).indexOf(x) >= 0);

const emptyFolder = require('../../prebuild/emptyDir').emptyFolder;
emptyFolder('./dist/docs');
langModules.forEach(x => emptyFolder(`./docs/${x}/modules`));
emptyFolder('./docs/.vuepress/public/assets', false);

const moduleDirs = fs.readdirSync('./src/modules');
const modulesSorted = {};
moduleDirs.forEach(module => {
    if (module !== 'template' && fs.existsSync(`./src/modules/${module}/docs`)) {
        const docs = fs.readdirSync(`./src/modules/${module}/docs`)
            .filter(f => f.match(/^[a-z]{2}_[A-Z]{2}\.md$/));
        docs.forEach(f => {
            const lang = f.split('.')[0];
            if (!modulesSorted.hasOwnProperty(lang)) modulesSorted[lang] = [];
            if (!fs.existsSync(`./docs/${lang}/modules`)) fs.mkdirSync(`./docs/${lang}/modules`);
            const title = require(`../../src/modules/${module}/i18n/${lang}.root`).name;
            modulesSorted[lang].push({
                title,
                f: `${lang}/modules/${f.replace(lang, module)}`,
                noMapkit: require(`../../src/modules/${module}/register`).noMapkit,
            })
            fs.copyFileSync(path.join(__dirname, `../../src/modules/${module}/docs/${f}`), `./docs/${lang}/modules/${f.replace(lang, module)}`);
            const content = fs.readFileSync(`./docs/${lang}/modules/${f.replace(lang, module)}`).toString();
            fs.writeFileSync(`./docs/${lang}/modules/${f.replace(lang, module)}`, `---
title: ${title}
lang: ${lang}
---

# ${title}

${content}`);
        });
        if (fs.existsSync(`./src/modules/${module}/docs/assets`)) {
            if (!fs.existsSync(`./docs/.vuepress/public/assets/${module}`)) fs.mkdirSync(`./docs/.vuepress/public/assets/${module}`);
            copydir.sync(`./src/modules/${module}/docs/assets`, `./docs/.vuepress/public/assets/${module}`);
        }
    }
});
const noMapkitModules = {};
Object.keys(modulesSorted).forEach(lang => {
    noMapkitModules[lang] = [...Object.values(modulesSorted[lang]).filter(module => module.noMapkit).sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0).map(m => ({title: m.title, f: m.f.replace(/(^[a-z]{2}_[A-Z]{2}\/|\..*?$)/g, '')}))];
    modulesSorted[lang] = [...Object.values(modulesSorted[lang]).sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0).map(file => file.f)];
    if (fs.existsSync(`./docs/${lang}/apps.md`)) modulesSorted[lang].unshift(`${lang}/apps.md`);
});

const locales = {};
const themeLocales = {};

const sidebar_lssm = [
    '',
    'metadata',
];
const sidebar_others = [
    'suggestions',
    'support',
    'error_report',
    'faq',
    'appstore',
    'settings',
    'other',
];

Object.keys(config.games).forEach(lang => {
    const game = config.games[lang];
    const langPath = `/${lang}/`;
    locales[langPath] = {
        lang,
        title: `LSS-Manager V.4 Wiki ${game.flag}`,
    };
    themeLocales[langPath] = {
        label: `${game.flag} ${game.name}`,
        nav: [
            {
                text: 'Discord',
                link: config.discord,
            }
        ],
        sidebar: [
            {
                title: 'LSSM',
                collapsable: false,
                children: sidebar_lssm
                    .filter(f => fs.existsSync(`./docs${langPath}${f || 'README'}.md`))
                    .map(f => `${langPath}${f}`),
            },
            ...sidebar_others.filter(f => fs.existsSync(`./docs${langPath}${f || 'README'}.md`))
                .map(f => `${langPath}${f}`),
            {
                title: 'Apps 📦',
                collapsable: true,
                children: modulesSorted[lang] || [],
            }
        ],
    };
});

const options = {
    title: 'LSS-Manager V.4 Wiki',
    description: 'The Wiki for the LSS-Manager',
    base: '/docs/',
    dest: './dist/docs',
    head: [
        ['link', {
            rel: 'icon',
            href: '/img/lssm.png'
        }]
    ],
    markdown: {
      sluglify: '',
      lineNumbers: true,
    },
    themeConfig: {
        logo: '/img/lssm.png',
        variables: {
            discord: config.discord,
            discord_support: config.discord_support,
            github: config.github.repo,
            server: config.server,
            versions: require('../../static/.configs.json').versions,
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
            transformer(timestamp, lang) {
                const moment = require('moment');
                moment.locale(lang);
                return moment(timestamp).fromNow();
            }
        },
        'vuepress-plugin-redirect': {
            locales: true,
        },
        'vuepress-plugin-smooth-scroll': {},
        'vuepress-plugin-zooming': {
            options: {
                bgColor: 'black',
            }
        },
    },
};

module.exports = options;
