import { exec } from 'child_process';
import sort from './sort';

const scripts = process.argv.splice(2);

const scriptHandlers = {
    sort,
    lint() {
        this.sort();
        // TODO: Does not work yet
        exec(
            'eslint ../docs/.vuepress/ ../static/ ../prebuild/ ../build/ ../src/ ../scripts/ --ext .js,.vue -f table --no-error-on-unmatched-pattern --fix'
        );
    },
} as { [key: string]: () => string | void };

const outputs = scripts.map(
    script =>
        `### ${script} ###\n\n${scriptHandlers[script]?.() ||
            ''}\n\n=== end ${script} ===`
);

console.log(outputs.join('\n\n\n'));
