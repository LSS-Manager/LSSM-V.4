import { ChildProcess, execSync } from 'child_process';

import sort from './sort';

const scripts = process.argv.splice(2);

const build = (mode: string) => {
    console.time('games');
    console.log(execSync(`ts-node build ${mode}`).toString());
    console.timeEnd('games');
};

const scriptHandlers = {
    sort,
    emojis() {
        console.log(execSync('ts-node ./scripts/utils/fetchEmojis').toString());
    },
    lint() {
        this.sort();
        console.log(
            execSync(
                'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ ./typings/ --ext .js,.ts,.vue -f table --no-error-on-unmatched-pattern --fix'
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
    tscDocs() {
        console.log(execSync('tsc -b docs/.vuepress/').toString());
    },
    docs() {
        this.tscDocs();
        console.log(execSync('vuepress build docs').toString());
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
} as { [key: string]: () => string | void | Promise<string | void> };

(async () => {
    const execute = async (script: string) => {
        console.log(`### ${script} ###\n\n`);
        console.time(script);
        await scriptHandlers[script]?.();
        console.log(`\n\n=== end ${script} ===`);
        console.timeEnd(script);
    };

    try {
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
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
