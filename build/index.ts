import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import { version } from '../package.json';
import config from '../src/config';
import webpackConfig from '../webpack.config';
import webpack, { Configuration } from 'webpack';
import moment from 'moment';
import { Module } from '../typings/Module';
import DynamicImportQueryPlugin from './plugins/DynamicImportQueryPlugin';

console.time('build');

console.info(`Let's build that stuff in Version ${version}`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

const entries = Object.entries(config.games)
    .filter(game => fs.existsSync(`./src/i18n/${game[0]}.ts`))
    .map(game => {
        const [locale, { locale_fallback }] = game;
        const entry = {
            mode: process.argv[2] || 'development',
            entry: {
                [`${locale}_core`]: path.resolve(__dirname, '../src/core.ts'),
            },
            output: {
                path: path.resolve(__dirname, `../dist/${locale}`),
                filename: pathData =>
                    `${pathData.chunk?.name?.replace(
                        /^[a-z]{2}_[A-Z]{2}_/,
                        ''
                    )}.js`,
                publicPath: `${config.server}${locale}/`,
            },
            ...lodash.cloneDeep(webpackConfig),
        } as Configuration;
        const fallbackLocales = [] as string[];
        if (locale_fallback) {
            fallbackLocales.push(locale_fallback);
            let nextFallback = config.games[locale_fallback].locale_fallback;
            while (nextFallback) {
                fallbackLocales.push(nextFallback);
                nextFallback = config.games[nextFallback].locale_fallback;
            }
        }

        const modules = moduleDirs.filter(module => {
            if (
                config.modules['core-modules'].includes(module) ||
                module === 'template'
            )
                return;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const registration = require(`../src/modules/${module}/register`) as Module;
            return (
                !registration.locales || registration.locales?.includes(locale)
            );
        });

        entry.plugins?.unshift(
            new webpack.DefinePlugin({
                PREFIX: JSON.stringify(config.prefix),
                BUILD_LANG: JSON.stringify(locale),
                VERSION: JSON.stringify(version),
                MODE: process.argv[2] === 'production' ? '"stable"' : '"beta"',
                FALLBACK_LOCALES: JSON.stringify(fallbackLocales),
                MODULE_REGISTER_FILES: new RegExp(
                    `modules\\/(${modules.join('|')})\\/register\\.js(on)?`
                ),
                MODULE_ROOT_I18N_FILES: new RegExp(
                    `modules\\/(${[
                        ...modules,
                        ...config.modules['core-modules'],
                    ].join('|')})\\/i18n\\/${locale}.root(\\/index)?\\.js(on)?$`
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
            new webpack.ContextReplacementPlugin(
                /i18n$/,
                new RegExp(`${[locale, ...fallbackLocales].join('|')}$`)
            )
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

        return entry;
    })
    .filter(entry => entry);

console.log('Generated configurations. Building…');
webpack([...entries], (err, stats) => {
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
    // console.log(stats?.toString({ colors: true }));
    // TODO: Each lang a single call of this file via scripts/index.ts to avoid Problems with heap memory
    console.log(
        `successfully built ${stats.hash} but we will not log stats here currently due to heap errors`
    );
    console.timeEnd('build');
    console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
    if (stats?.hasErrors()) process.exit(-1);
});
