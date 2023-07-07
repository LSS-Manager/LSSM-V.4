import * as fs from 'fs';
import path from 'path';

import prettier from 'prettier';

import sortJSON from './utils/sortJSON';

const ROOT_PATH = path.join(__dirname, '..');

const format = (content: string, format: 'json' | 'yaml'): Promise<string> =>
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
        .then(res => res.trimEnd());

const formatJSON = (
    json: object,
    sortArray: boolean,
    top: string[]
): Promise<string> =>
    format(JSON.stringify(sortJSON(json, sortArray, top)), 'json');

const excluded = [path.join(ROOT_PATH, 'src', 'generated')];

const getFiles = (
    folder: string,
    endings: string[],
    extraFilter?: (file: string) => boolean
): string[] => {
    const files = [] as string[];
    if (/node_modules/u.test(folder)) return [];
    fs.readdirSync(folder, { withFileTypes: true }).forEach(item => {
        if (excluded.includes(path.join(folder, item.name))) return;
        if (item.isDirectory()) {
            files.push(
                ...getFiles(`${folder}/${item.name}`, endings, extraFilter)
            );
        } else if (
            item.isFile() &&
            endings.some(ending => item.name.endsWith(`.${ending}`)) &&
            !extraFilter?.(item.name)
        ) {
            files.push(`${folder}/${item.name}`);
        }
    });
    return files;
};

const getJsons = (folder: string): string[] =>
    getFiles(folder, ['json'], file => file.endsWith('package.json'));

const getYamls = (folder: string): string[] =>
    getFiles(folder, ['yml', 'yaml']);

const tops = (file: string) => {
    const tops: string[] = [];
    if (
        file.endsWith('/tsconfig.json') ||
        file.endsWith('/tsconfig.userscript.json')
    )
        tops.push('extends');
    return tops;
};

let currentFile = '';
try {
    let fileCounterJSON = 0;
    let fileCounterYAML = 0;
    Promise.all(
        ['tsconfig.json', 'renovate.json', '.yarnrc.yml']
            .map(file => {
                const filePath = path.join(ROOT_PATH, file);
                const src = fs.readFileSync(filePath).toString();
                const isJson = file.endsWith('.json');

                if (isJson) fileCounterJSON++;
                else fileCounterYAML++;

                return (
                    isJson
                        ? formatJSON(JSON.parse(src), true, tops(file))
                        : format(src, 'yaml')
                ).then(formatted => fs.promises.writeFile(filePath, formatted));
            })
            .concat(
                ...[
                    '.github',
                    'build',
                    'docs',
                    'lssmaql',
                    'prebuild',
                    'scripts',
                    'src',
                    'static',
                    'typings',
                ].flatMap(folder => {
                    const promises: Promise<void>[] = [];
                    getJsons(path.join(ROOT_PATH, folder)).forEach(file => {
                        currentFile = file;
                        const sortArray = file.endsWith('tsconfig.json');
                        promises.push(
                            formatJSON(
                                JSON.parse(fs.readFileSync(file).toString()),
                                sortArray,
                                tops(file)
                            ).then(formatted =>
                                fs.promises.writeFile(file, formatted)
                            )
                        );
                        fileCounterJSON++;
                    });
                    getYamls(path.join(ROOT_PATH, folder)).forEach(file => {
                        currentFile = file;
                        promises.push(
                            format(
                                fs.readFileSync(file).toString(),
                                'yaml'
                            ).then(formatted =>
                                fs.promises.writeFile(file, formatted)
                            )
                        );
                        fileCounterYAML++;
                    });
                    return promises;
                })
            )
    ).then(() =>
        console.log(
            `✨ formatted ${fileCounterJSON} JSON and ${fileCounterYAML} YAML files!`
        )
    );
} catch (e) {
    console.error(currentFile, e);
    process.exit(1);
}
