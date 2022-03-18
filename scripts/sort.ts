import * as fs from 'fs';

import * as tsconfig from '../tsconfig.json';
import sortJSON from './utils/sortJSON';

fs.writeFileSync(
    '../tsconfig.json',
    JSON.stringify(sortJSON(tsconfig, true), null, '\t')
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

export default (): string => {
    let currentFile = '';
    try {
        const output = [] as string[];
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
            getJsons(`./${folder}`).forEach(file => {
                if (file === './src/utils/emojis.json') return;
                currentFile = file;
                const sortArray = false;
                fs.writeFileSync(
                    file,
                    JSON.stringify(
                        sortJSON(
                            JSON.parse(fs.readFileSync(file).toString()),
                            sortArray
                        ),
                        null,
                        4
                    )
                );
                output.push(file);
            })
        );
        return output.map(f => `✨ sorted file "${f}"`).join('\n');
    } catch (e) {
        console.error(currentFile, e);
        process.exit(1);
    }
};
