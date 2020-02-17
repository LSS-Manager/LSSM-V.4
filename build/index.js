const fs = require('fs');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const config = require('../src/config');
const packageJson = require('../package');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    return entry;
});

const moduleDirs = fs.readdirSync('./src/modules');
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
        entry.plugins.push(
            new webpack.DefinePlugin({
                MODULE_ID: JSON.stringify(module),
            })
        );
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

    console.log(`LSSM Version ${packageJson.version} successfully built!`);
});
