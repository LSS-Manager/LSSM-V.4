const fs = require('fs');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const config = require('../src/config');
const serverConfig = require('../static/.configs');
const packageJson = require('../package');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
        entry: { [game]: './src/core.js' },
        output: {
            path: path.resolve(__dirname, `../dist/${game}`),
            filename: 'core.js',
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
    moduleDirs.forEach(module => {
        if (fs.existsSync(`./src/modules/${module}/main.js`)) {
            const moduleEntry = lodash.cloneDeep(entry);
            moduleEntry.entry = {
                [`${game}_${module}`]: `./src/modules/${module}/main.js`,
            };
            moduleEntry.output = {
                path: path.resolve(
                    __dirname,
                    `../dist/${game}/modules/${module}`
                ),
                filename: 'main.js',
            };
            if (
                fs.existsSync(`./src/modules/${module}/i18n/${game}.js`) ||
                fs.existsSync(`./src/modules/${module}/i18n/${game}.json`) ||
                fs.existsSync(
                    `./src/modules/${module}/i18n/${game}/index.js`
                ) ||
                fs.existsSync(`./src/modules/${module}/i18n/${game}/index.json`)
            ) {
                moduleEntry.module.rules.push({
                    test: /main\.js/,
                    loader: 'webpack-append',
                    query: `window.lssmv4.$i18n.mergeLocaleMessage(${JSON.stringify(
                        game
                    )},{modules:{${module}: require(\`./i18n/${game}\`),},});`,
                });
            }
            moduleEntry.plugins.push(
                new webpack.DefinePlugin({
                    MODULE_ID: JSON.stringify(module),
                })
            );
            modules.push(moduleEntry);
        }
    });
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
