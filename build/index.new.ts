import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import { version } from '../package.json';
import config from '../src/config';
import webpackConfig from '../webpack.config';
import webpack, { ChunkData, Configuration } from 'webpack';
import moment from 'moment';

console.time('build');

const dir = process.argv[2] === 'production' ? 'stable/' : 'beta/';

console.info(`Let's build that stuff in Version ${version}`);

const entries = Object.entries(config.games)
    .filter(game => game[0] === 'de_DE')
    .map(game => {
        const [locale, { locale_fallback }] = game;
        if (!fs.existsSync(`./src/i18n/${locale}.js`)) return;
        const entry = {
            mode: process.argv[2] || 'development',
            entry: {
                [`${locale}_core`]: path.resolve(__dirname, '../src/core.ts'),
            },
            output: {
                path: path.resolve(__dirname, `../dist/${dir}${locale}`),
                filename: (chunkData: ChunkData) =>
                    `${chunkData.chunk.name.replace(
                        /^[a-z]{2}_[A-Z]{2}_/,
                        ''
                    )}.js`,
            },
            ...lodash.cloneDeep(webpackConfig),
        };
        const fallbackLocales = [];
        if (locale_fallback) {
            fallbackLocales.push(locale_fallback);
            let nextFallback = config.games[locale_fallback].locale_fallback;
            while (nextFallback) {
                fallbackLocales.push(nextFallback);
                nextFallback = config.games[nextFallback].locale_fallback;
            }
        }

        entry.plugins.unshift(
            new webpack.DefinePlugin({
                PREFIX: JSON.stringify(config.prefix),
                BUILD_LANG: JSON.stringify(locale),
                VERSION: JSON.stringify(version),
                MODE: process.argv[2] === 'production' ? '"stable"' : '"beta"',
                FALLBACK_LOCALES: JSON.stringify(fallbackLocales),
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
        return entry;
    })
    .filter(entry => entry);

webpack(entries as Configuration[], (err, stats) => {
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

    console.log('Stats:');
    console.log(stats.toString({ colors: true }));
    console.timeEnd('build');
    console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
    if (stats.hasErrors()) process.exit(-1);
});
