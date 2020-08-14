import { execSync } from 'child_process';
import sort from './sort';

const scripts = process.argv.splice(2);

const scriptHandlers = {
    sort,
    lint() {
        let output = this.sort();
        output += `\n\n${execSync(
            'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ --ext .js,.vue -f table --no-error-on-unmatched-pattern --fix'
        ).toString()}`;
        return output;
    },
} as { [key: string]: () => string | void };

const outputs = scripts.map(
    script =>
        `### ${script} ###\n\n${scriptHandlers[script]?.() ||
            ''}\n\n=== end ${script} ===`
);

console.log(outputs.join('\n\n\n'));
