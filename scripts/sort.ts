import * as fs from 'fs';
import path from 'path';

import prettier from 'prettier';

import sortJSON from './utils/sortJSON';
import tsconfig from '../tsconfig.json';

const ROOT_PATH = path.join(__dirname, '..');

fs.writeFileSync(
    path.join(ROOT_PATH, 'tsconfig.json'),
    JSON.stringify(sortJSON(tsconfig, true), null, 4)
);

const getJsons = (folder: string): string[] => {
    const jsons = [] as string[];
    if (/node_modules/u.test(folder)) return [];
    fs.readdirSync(folder, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory())
            jsons.push(...getJsons(`${folder}/${item.name}`));
        else if (
            item.isFile() &&
            item.name.endsWith('.json') &&
            item.name !== 'package.json'
        )
            jsons.push(`${folder}/${item.name}`);
    });
    return jsons;
};

let currentFile = '';
try {
    let fileCounter = 0;
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
    ].forEach(folder =>
        getJsons(path.join(ROOT_PATH, folder)).forEach(file => {
            if (file === path.join(ROOT_PATH, './src/utils/emojis.json'))
                return;
            currentFile = file;
            const sortArray = false;
            fs.writeFileSync(
                file,
                prettier
                    .format(
                        JSON.stringify(
                            sortJSON(
                                JSON.parse(fs.readFileSync(file).toString()),
                                sortArray
                            )
                        ),
                        {
                            arrowParens: 'avoid',
                            endOfLine: 'lf',
                            parser: 'json',
                            quoteProps: 'consistent',
                            singleQuote: true,
                            tabWidth: 4,
                            trailingComma: 'es5',
                        }
                    )
                    .trimEnd()
            );
            fileCounter++;
        })
    );
    console.log(`✨ sorted ${fileCounter} JSON files!`);
} catch (e) {
    console.error(currentFile, e);
    process.exit(1);
}
