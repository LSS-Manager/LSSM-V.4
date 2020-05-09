const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');

const config = require('../../src/config');
const packageJson = require('../../package');

const langModules = fs.readdirSync('./docs/').filter(x => Object.keys(config.games).indexOf(x) >= 0);

const emptyFolder = require('../../prebuild/emptyDir').emptyFolder;
emptyFolder('./dist/docs');
langModules.forEach(x => emptyFolder(`./docs/${x}/modules`));
emptyFolder('./docs/.vuepress/public/assets', false);

const moduleDirs = fs.readdirSync('./src/modules');
moduleDirs.forEach(module => {
    if (module !== 'template' && fs.existsSync(`./src/modules/${module}/docs`)) {
        const docs = fs.readdirSync(`./src/modules/${module}/docs`)
            .filter(f => f.match(new RegExp(`^${module}\...(_..)?\..*$`)));
        docs.forEach(f => {
            const lang = f.split('.')[1];
            if (!fs.existsSync(`./docs/${lang}/modules`)) fs.mkdirSync(`./docs/${lang}/modules`);
            fs.copyFileSync(path.join(__dirname, `../../src/modules/${module}/docs/${f}`), `./docs/${lang}/modules/${f.replace(new RegExp(`\.${lang}`), '')}`);
        });
        if (fs.existsSync(`./src/modules/${module}/docs/assets`)) {
            if (!fs.existsSync(`./docs/.vuepress/public/assets/${module}`)) fs.mkdirSync(`./docs/.vuepress/public/assets/${module}`);
            copydir.sync(`./src/modules/${module}/docs/assets`, `./docs/.vuepress/public/assets/${module}`);
        }
    }
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

const modulesSorted = lang => {
    const files = [];
    if (fs.existsSync(`./docs${lang}apps.md`)) files.push(`${lang}apps.md`);
    if (fs.existsSync(`./docs${lang}modules`)) {
         const filePaths = fs.readdirSync(`./docs${lang}modules`);
         const fileTitles = filePaths.map(f => (
           {
               title: fs.readFileSync(`./docs${lang}modules/${f}`).toString().match(/-{3,}\n(?:[^-]{3,}\n)*title:(.*)/)[1].trim(),
               file: f
           })
         ).sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
         files.push(...Object.values(fileTitles).map(({file}) => `${lang}modules/${file.replace(/\..*?$/, '')}`));
    }
    return files
}

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
                children: modulesSorted(langPath),
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
