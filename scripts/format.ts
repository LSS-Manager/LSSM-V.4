import * as fs from 'fs';
import path from 'path';

import prettier from 'prettier';

import sortJSON from './utils/sortJSON';
import tsconfig from '../tsconfig.json';

const ROOT_PATH = path.join(__dirname, '..');

const format = (content: string, format: 'json' | 'yaml'): string =>
    prettier
        .format(content, {
            arrowParens: 'avoid',
            endOfLine: 'lf',
            parser: format,
            quoteProps: 'consistent',
            singleQuote: true,
            tabWidth: 4,
            trailingComma: 'es5',
        })
        .trimEnd();

const formatJSON = (json: object, sortArray: boolean): string =>
    format(JSON.stringify(sortJSON(json, sortArray)), 'json');

const excluded = [
    path.join(ROOT_PATH, 'src', 'libraries.json'),
    path.join(ROOT_PATH, 'src', 'utils', 'browsers.json'),
];

const getJsons = (folder: string): string[] => {
    const jsons = [] as string[];
    if (/node_modules/u.test(folder)) return [];
    fs.readdirSync(folder, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory())
            jsons.push(...getJsons(`${folder}/${item.name}`));
        else if (
            item.isFile() &&
            item.name.endsWith('.json') &&
            !(
                item.name === 'package.json' ||
                excluded.includes(path.join(folder, item.name))
            )
        )
            jsons.push(`${folder}/${item.name}`);
    });
    return jsons;
};

const getYamls = (folder: string): string[] => {
    const yamls = [] as string[];
    if (/node_modules/u.test(folder)) return [];
    fs.readdirSync(folder, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory())
            yamls.push(...getYamls(`${folder}/${item.name}`));
        else if (item.isFile() && item.name.endsWith('.yml'))
            yamls.push(`${folder}/${item.name}`);
    });
    return yamls;
};

fs.writeFileSync(
    path.join(ROOT_PATH, 'tsconfig.json'),
    formatJSON(tsconfig, true)
);

let currentFile = '';
try {
    let fileCounterJSON = 0;
    let fileCounterYAML = 0;
    [
        '.github',
        'build',
        'docs',
        'lssmaql',
        'prebuild',
        'scripts',
        'src',
        'static',
        'typings',
    ].forEach(folder => {
        getJsons(path.join(ROOT_PATH, folder)).forEach(file => {
            if (file === path.join(ROOT_PATH, './src/utils/emojis.json'))
                return;

            currentFile = file;
            const sortArray = false;
            fs.writeFileSync(
                file,
                formatJSON(
                    JSON.parse(fs.readFileSync(file).toString()),
                    sortArray
                )
            );
            fileCounterJSON++;
        });
        getYamls(path.join(ROOT_PATH, folder)).forEach(file => {
            currentFile = file;
            fs.writeFileSync(
                file,
                format(fs.readFileSync(file).toString(), 'yaml')
            );
            fileCounterYAML++;
        });
    });
    console.log(
        `✨ formatted ${fileCounterJSON} JSON and ${fileCounterYAML} YAML files!`
    );
} catch (e) {
    console.error(currentFile, e);
    process.exit(1);
}
