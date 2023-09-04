import * as fs from 'fs';
import * as path from 'path';

import lodash from 'lodash';
import moment from 'moment';
import webpack from 'webpack';

import addToBuildStats from './addToBuildStats';
import config from '../src/config';
import DynamicImportQueryPlugin from './plugins/DynamicImportQueryPlugin';
import LoadingProgressPlugin from './plugins/LoadingProgressPlugin';
import { version } from '../package.json';
import webpackConfig from '../webpack.config';

// TODO: Find a way to use SpeedMeasurePlugin with webpack@5 and vue-loader
// import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

console.time(`build`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

const locales = Object.keys(config.games).filter(game =>
    fs.existsSync(`./src/i18n/${game}.ts`)
);

const mode = process.argv[3] || 'development';
const branch = process.argv[4] || 'dummy';

console.info(`Let's build that stuff! version: ${version}; branch: ${branch};`);

const entry = {
    mode,
    stats: {
        errorDetails: true,
    },
    entry: {
        core: path.resolve(__dirname, '../src/core.ts'),
    },
    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: pathData =>
            `${pathData.chunk?.name?.replace(/^[a-z]{2}_[A-Z]{2}_/u, '')}.js`,
        publicPath: `${config.urls.server}`,
    },
    ...lodash.cloneDeep(webpackConfig),
} as webpack.Configuration;

const modules = moduleDirs.filter(
    module =>
        !(
            config.modules['core-modules'].includes(module) ||
            module === 'template'
        )
);

entry.plugins?.unshift(
    new webpack.DefinePlugin({
        PREFIX: JSON.stringify(config.prefix),
        VERSION: JSON.stringify(version),
        BRANCH: JSON.stringify(branch),
        SERVER: JSON.stringify(config.urls.server),
        MODE: JSON.stringify(mode === 'production' ? 'stable' : 'beta'),
        MODULE_REGISTER_FILES: JSON.stringify(
            Object.fromEntries(
                modules.map(module => [
                    module,
                    require(`../src/modules/${module}/register`),
                ])
            )
        ),
        LOADSCRIPT_EVENT_START: JSON.stringify(config.loadScript.start),
        LOADSCRIPT_EVENT_END: JSON.stringify(config.loadScript.end),
    }),
    new webpack.ContextReplacementPlugin(
        /moment\/locale$/u,
        new RegExp(
            `(${locales
                .map(l =>
                    l !== 'en_US'
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          moment.localeData(l)._abbr
                        : 'en-gb'
                )
                .join('|')})$`
        )
    )
);
entry.plugins?.push(
    new DynamicImportQueryPlugin({
        v: {
            value: version,
        },
        branch: {
            value: branch,
        },
    }),
    new LoadingProgressPlugin()
);

console.log('Generated configurations. Building…');
webpack(entry, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err.details) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(err.details);
        }
    }

    if (!stats) {
        console.error('Build Error: stats is a falsy value!');
        return process.exit(-1);
    } else {
        const jsonStats = stats.toJson();
        fs.writeFileSync(
            `./dist/webpack.out.${
                mode === 'production' ? 'public' : 'beta'
            }.json`,
            JSON.stringify(jsonStats, null, '\t')
        );
        const fileSizes = Object.fromEntries(
            jsonStats.assets?.map(({ name, size }) => [
                name.replace(/\.js$/u, ''),
                size,
            ]) ?? []
        );
        fs.mkdirSync('./dist/static', { recursive: true });
        fs.writeFileSync(
            './dist/static/fileSizes.json',
            JSON.stringify(fileSizes)
        );
        addToBuildStats({
            version,
            size: Object.values(fileSizes).reduce((a, b) => a + b, 0),
            files: Object.entries(fileSizes).length,
            time: jsonStats.time,
        });
    }
    console.log('Stats:');
    console.log(stats?.toString({ colors: true }));
    console.timeEnd(`build`);
    console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
    if (stats?.hasErrors()) process.exit(-1);
});
