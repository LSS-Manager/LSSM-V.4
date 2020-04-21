const fs = require('fs');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const config = require('../src/config');
const serverConfig = require('../static/.configs');
const packageJson = require('../package');
const moment = require('moment');
const axios = require('axios');

console.log(`Lets build that stuff in Version ${packageJson.version}`);

const webpackConfig = require('../webpack.config');

const moduleDirs = fs
    .readdirSync('./src/modules')
    .filter(x => x !== 'template')
    .filter(m => !config.modules['core-modules'].includes(m));
const modules = [];

const entries = Object.keys(config.games).map(game => {
    const entry = {
        mode: process.argv[2] || 'development',
        entry: {
            [`${game}_core`]: './src/core.js',
            [`${game}_blank`]: './src/blank.js',
        },
        output: {
            path: path.resolve(__dirname, `../dist/${game}`),
            filename: chunkData =>
                `${chunkData.chunk.name.replace(/^[a-z]{2}_[A-Z]{2}_/, '')}.js`,
        },
        ...lodash.cloneDeep(webpackConfig),
    };
    entry.plugins = [
        new webpack.DefinePlugin({
            BUILD_LANG: JSON.stringify(game),
        }),
        new webpack.ContextReplacementPlugin(
            /moment\/locale$/,
            new RegExp(
                `${moment.localeData(game)._abbr}|${
                    moment.localeData(config.games[game].locale_fallback)._abbr
                }`
            )
        ),
        ...entry.plugins,
    ];
    const modulesEntry = lodash.cloneDeep(entry);
    modulesEntry.entry = {};
    moduleDirs
        .filter(module => fs.existsSync(`./src/modules/${module}/main.js`))
        .forEach(module => {
            modulesEntry.entry[
                `${game}_${module}`
            ] = `./src/modules/${module}/main.js`;
            if (
                fs.existsSync(`./src/modules/${module}/i18n/${game}.js`) ||
                fs.existsSync(`./src/modules/${module}/i18n/${game}.json`) ||
                fs.existsSync(
                    `./src/modules/${module}/i18n/${game}/index.js`
                ) ||
                fs.existsSync(`./src/modules/${module}/i18n/${game}/index.json`)
            )
                modulesEntry.module.rules.push({
                    test: new RegExp(`modules/${module}/main.js$`),
                    loader: 'webpack-append',
                    query: `window.lssmv4.$i18n.mergeLocaleMessage(${JSON.stringify(
                        game
                    )},{modules:{${module}: require(\`${path.resolve(
                        __dirname,
                        `../src/modules/${module}/i18n/${game}`
                    )}\`),},});`,
                });
            modulesEntry.module.rules.push({
                test: new RegExp(`modules/${module}/.*\\.(js|vue)$`),
                loader: 'string-replace-loader',
                query: {
                    multiple: [
                        {
                            search: /MODULE_ID/g,
                            replace: JSON.stringify(module),
                        },
                    ],
                },
            });
        });
    modulesEntry.output = {
        path: path.resolve(__dirname, `../dist/${game}/modules`),
        filename: chunkData =>
            `${chunkData.chunk.name.replace(
                /^[a-z]{2}_[A-Z]{2}_/,
                ''
            )}/main.js`,
    };
    modulesEntry.module.rules.push({
        test: /\.(js|vue)$/,
        loader: 'string-replace-loader',
        query: {
            multiple: [
                {
                    search: /require\((['"])vue(['"])\)/g,
                    replace: 'window.lssmv4.Vue',
                },
                {
                    search: /import ([^ ]*) from (['"])vue(['"])/g,
                    replace: 'const Vue = window.lssmv4.Vue',
                },
            ],
        },
    });
    modules.push(modulesEntry);
    return entry;
});

webpack([...entries, ...modules], (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.log('Errors:');
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.log('Warnings:');
        console.warn(info.warnings);
    }

    console.log('Stats:');
    console.log(stats.toString({ colors: true }));
    if (stats.hasErrors()) process.exit(-1);

    if (process.argv[2] === 'production') {
        axios
            .post(serverConfig.discord_webhook_url, {
                embeds: [
                    {
                        author: {
                            name: 'LSS-Manager V.4',
                        },
                        title: 'New Build',
                        color: 13185068,
                        description: `The latest Version of the LSSM is **${packageJson.version}**`,
                        timestamp: new Date(),
                    },
                ],
            })
            .then(() =>
                console.log(
                    `LSSM Version ${packageJson.version} successfully built!`
                )
            )
            .catch(error => {
                console.error(error);
                process.abort();
            });
    } else {
        console.log(`LSSM Version ${packageJson.version} successfully built!`);
    }
});
