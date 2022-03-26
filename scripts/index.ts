import fs from 'fs';
import { type ChildProcess, execSync } from 'child_process';

import fetchEmojis from './utils/fetchEmojis';
import sort from './sort';

const scripts = process.argv.splice(2);

const build = (mode: string) => {
    console.time('games');
    console.log(execSync(`ts-node build --esModuleInterop ${mode}`).toString());
    console.timeEnd('games');
};

const scriptHandlers = {
    sort,
    emojis() {
        fetchEmojis();
    },
    lint() {
        this.sort();
        console.log(
            execSync(
                'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ ./typings/ --ext .js,.ts,.vue -f table --no-error-on-unmatched-pattern --fix --report-unused-disable-directives'
            ).toString()
        );
    },
    predev() {
        this.emojis();
        this.lint();
        console.log(execSync('ts-node prebuild').toString());
    },
    dev() {
        build('development');
        this.showChanges();
    },
    docs() {
        console.log(
            execSync(
                './docs/.vuepress/node_modules/.bin/vuepress build docs'
            ).toString()
        );
        fs.cpSync('./docs/.vuepress/dist/', './dist/docs', { recursive: true });
    },
    preBuild() {
        this.emojis();
        this.lint();
        console.log(execSync('ts-node prebuild production').toString());
    },
    build() {
        build('production');
        this.showChanges();
    },
    showChanges() {
        console.log(execSync('git diff --color-words').toString());
    },
} as Record<string, () => Promise<string | void> | string | void>;

(async () => {
    const execute = async (script: string) => {
        console.log(`### ${script} ###\n\n`);
        console.time(script);
        await scriptHandlers[script]?.();
        console.log(`\n\n=== end ${script} ===`);
        console.timeEnd(script);
    };

    try {
        for (const script of scripts) {
            await execute(script);
            console.log('\n\n\n');
        }
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const childProcess: ChildProcess = e;
        console.error(childProcess);
        console.log(
            `===stdout===\n${childProcess.stdout?.toString()}\n###stdout###`
        );
        console.log(
            `===stderr===\n${childProcess.stderr?.toString()}\n###stderr###`
        );
        process.exit(-1);
    }
})();
