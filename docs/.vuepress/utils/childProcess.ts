import { execFileSync } from 'child_process';
import path from 'path';

type Util = 'generate/home' | 'generate/versions';

export default (utilsPath: string) => ({
    run(file: Util, ...args: string[]) {
        const result = execFileSync('ts-node', [
            path.join(utilsPath, `${file}.ts`),
            ...args,
        ]).toString();
        if (result) console.log(result);
    },
});
