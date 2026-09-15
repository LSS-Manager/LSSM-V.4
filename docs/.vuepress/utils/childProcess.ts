import { execFileSync } from 'child_process';
import path from 'path';

type Util =
    | 'generate/bugs'
    | 'generate/home'
    | 'generate/manifest'
    | 'generate/modules'
    | 'generate/projectStats'
    | 'generate/readmes'
    | 'generate/versions';

export default (utilsPath: string) => ({
    run(file: Util, ...args: string[]) {
        const tsNodePath = path.resolve(
            utilsPath,
            '..',
            '..',
            '..',
            'node_modules',
            'ts-node',
            'dist',
            'bin.js',
        );
        const result = execFileSync(
            process.execPath,
            [tsNodePath, path.join(utilsPath, `${file}.ts`), ...args],
            {
                env: process.env,
            }
        ).toString();
        if (result) console.log(result);
    },
});
