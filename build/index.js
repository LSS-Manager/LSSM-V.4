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
    entry.plugins.push(
        new webpack.DefinePlugin({
            BUILD_LANG: JSON.stringify(game),
        })
    );
    entry.plugins.push(new CleanWebpackPlugin());
    entry.plugins.push(
        new webpack.ContextReplacementPlugin(
            /moment\/locale$/,
            new RegExp(
                `${moment.localeData(game)._abbr}|${
                    moment.localeData(config.games[game].locale_fallback)._abbr
                }`
            )
        )
    );
    return entry;
});

const moduleDirs = fs
    .readdirSync('./src/modules')
    .filter(x => x !== 'template')
    .filter(m => !config.modules['core-modules'].includes(m));
const modules = moduleDirs.map(module => {
    if (fs.existsSync(`./src/modules/${module}/main.js`)) {
        const entry = {
            mode: process.argv[2] || 'development',
            entry: { [module]: `./src/modules/${module}/main.js` },
            output: {
                path: path.resolve(__dirname, `../dist/modules/${module}`),
                filename: 'main.js',
            },
            ...lodash.cloneDeep(webpackConfig),
        };
        entry.plugins = [
            new webpack.DefinePlugin({
                MODULE_ID: JSON.stringify(module),
            }),
            new webpack.ContextReplacementPlugin(
                /moment\/locale$/,
                new RegExp(
                    Object.keys(config.games)
                        .map(g => moment.localeData(g)._abbr)
                        .join('|')
                )
            ),
            ...entry.plugins,
        ];
        return entry;
    }
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
