import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import { version } from '../package.json';
import config from '../src/config';
import webpackConfig from '../webpack.config';
import webpack, { Configuration } from 'webpack';
import moment from 'moment';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Module } from '../typings/Module';
import DynamicImportQueryPlugin from './plugins/DynamicImportQueryPlugin';

const locale = process.argv[3];

console.time(`build_${locale}`);

console.info(`Let's build that stuff in Version ${version}`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

if (!fs.existsSync(`./src/i18n/${locale}.ts`)) process.exit(-1);

const entry = {
    mode: process.argv[2] || 'development',
    entry: {
        [`${locale}_core`]: path.resolve(__dirname, '../src/core.ts'),
    },
    output: {
        path: path.resolve(__dirname, `../dist/${locale}`),
        filename: pathData =>
            `${pathData.chunk?.name?.replace(/^[a-z]{2}_[A-Z]{2}_/, '')}.js`,
        publicPath: `${config.server}${locale}/`,
    },
    ...lodash.cloneDeep(webpackConfig),
} as Configuration;

const modules = moduleDirs.filter(module => {
    if (
        config.modules['core-modules'].includes(module) ||
        module === 'template'
    )
        return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const registration = require(`../src/modules/${module}/register`) as Module;
    return !registration.locales || registration.locales?.includes(locale);
});

entry.plugins?.unshift(
    new webpack.DefinePlugin({
        PREFIX: JSON.stringify(config.prefix),
        BUILD_LANG: JSON.stringify(locale),
        VERSION: JSON.stringify(version),
        MODE: process.argv[2] === 'production' ? '"stable"' : '"beta"',
        MODULE_REGISTER_FILES: new RegExp(
            `modules\\/(${modules.join('|')})\\/register\\.js(on)?`
        ),
        MODULE_ROOT_I18N_FILES: new RegExp(
            `modules\\/(${[...modules, ...config.modules['core-modules']].join(
                '|'
            )})\\/i18n\\/${locale}.root(\\/index)?\\.js(on)?$`
        ),
    }),
    new webpack.ContextReplacementPlugin(
        /moment\/locale$/,
        new RegExp(
            `${
                locale !== 'en_US'
                    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      moment.localeData(locale)._abbr
                    : 'en-gb'
            }$`
        )
    ),
    new webpack.ContextReplacementPlugin(/i18n$/, new RegExp(`${locale}$`))
);
entry.plugins?.push(
    new DynamicImportQueryPlugin({
        v: {
            value: version,
        },
        uid: {
            value: `${JSON.stringify(locale)} + "-" + window.user_id`, // must be valid JS Code stringified
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

        if (stats)
            fs.writeFileSync(
                `./dist/webpack.out.${
                    process.argv[2] === 'production' ? 'public' : 'beta'
                }.json`,
                JSON.stringify(stats.toJson(), null, '\t')
            );
        console.log('Stats:');
        console.log(stats?.toString({ colors: true }));
        console.timeEnd(`build_${locale}`);
        console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
        if (stats?.hasErrors()) process.exit(-1);
    }
);
