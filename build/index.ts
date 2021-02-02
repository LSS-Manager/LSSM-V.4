import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import { version } from '../package.json';
import config from '../src/config';
import webpackConfig from '../webpack.config';
import webpack, { Configuration } from 'webpack';
import moment from 'moment';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import DynamicImportQueryPlugin from './plugins/DynamicImportQueryPlugin';
import { Module } from '../typings/Module';

console.time(`build`);

console.info(`Let's build that stuff in Version ${version}`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

const locales = Object.keys(config.games).filter(game =>
    fs.existsSync(`./src/i18n/${game}.ts`)
);

const entry = {
    mode: process.argv[2] || 'development',
    entry: {
        core: path.resolve(__dirname, '../src/core.ts'),
    },
    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: pathData =>
            `${pathData.chunk?.name?.replace(/^[a-z]{2}_[A-Z]{2}_/, '')}.js`,
        publicPath: `${config.server}`,
    },
    ...lodash.cloneDeep(webpackConfig),
} as Configuration;

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
        MODE: process.argv[2] === 'production' ? '"stable"' : '"beta"',
        MODULE_REGISTER_FILES: JSON.stringify(
            Object.fromEntries(
                modules.map(module => [
                    module,
                    require(`../src/modules/${module}/register`),
                ])
            )
        ),
        MODULES_OF_LOCALE: Object.fromEntries(
            locales.map(locale => [
                locale,
                JSON.stringify(
                    [...modules, ...config.modules['core-modules']].filter(
                        module => {
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            const registration = require(`../src/modules/${module}/register`) as Module;
                            return (
                                !registration.locales ||
                                registration.locales?.includes(locale)
                            );
                        }
                    )
                ),
            ])
        ),
    }),
    new webpack.ContextReplacementPlugin(
        /moment\/locale$/,
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
    })
);

console.log('Generated configurations. Building…');
webpack(
    new SpeedMeasurePlugin({
        disable: process.argv[2] !== 'development',
        outputFormat: 'humanVerbose',
    }).wrap(entry),
    (err, stats) => {
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

        if (stats) {
            fs.writeFileSync(
                `./dist/webpack.out.${
                    process.argv[2] === 'production' ? 'public' : 'beta'
                }.json`,
                JSON.stringify(stats.toJson(), null, '\t')
            );
        }
        console.log('Stats:');
        console.log(stats?.toString({ colors: true }));
        console.timeEnd(`build`);
        console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
        if (stats?.hasErrors()) process.exit(-1);
    }
);
