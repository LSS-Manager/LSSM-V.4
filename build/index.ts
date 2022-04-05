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

console.info(`Let's build that stuff in Version ${version}`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

const locales = Object.keys(config.games).filter(game =>
    fs.existsSync(`./src/i18n/${game}.ts`)
);

const mode = process.argv[3] || 'development';

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
        publicPath: `${config.server}`,
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
        MODE: mode === 'production' ? '"stable"' : '"beta"',
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
        uid: {
            value: `window.I18n.locale + "-" + window.user_id`, // must be valid JS Code stringified
            isDynamicKey: true, // false by default
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
        fs.writeFileSync(
            `./dist/webpack.out.${
                mode === 'production' ? 'public' : 'beta'
            }.json`,
            JSON.stringify(stats.toJson(), null, '\t')
        );
        fs.writeFileSync(
            './dist/static/fileSizes.json',
            JSON.stringify(
                Object.fromEntries(
                    stats
                        .toJson()
                        .assets?.map(({ name, size }) => [
                            name.replace(/\.js$/u, ''),
                            size,
                        ]) ?? []
                )
            )
        );
        addToBuildStats({ version });
    }
    console.log('Stats:');
    console.log(stats?.toString({ colors: true }));
    console.timeEnd(`build`);
    console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
    if (stats?.hasErrors()) process.exit(-1);
});
