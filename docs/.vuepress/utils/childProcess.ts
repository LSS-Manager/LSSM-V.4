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
        const result = execFileSync('./node_modules/.bin/ts-node', [
            path.join(utilsPath, `${file}.ts`),
            ...args,
        ]).toString();
        if (result) console.log(result);
    },
});
