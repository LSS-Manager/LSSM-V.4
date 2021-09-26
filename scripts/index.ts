import fs from 'fs';
import { ChildProcess, execSync } from 'child_process';

import config from '../src/config';
import sort from './sort';

const scripts = process.argv.splice(2);

const build = (mode: string) => {
    console.time('games');
    console.log(execSync(`node build ${mode}`).toString());
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
    tscBuild() {
        console.log(execSync('tsc -b build').toString());
    },
    dev() {
        this.tscBuild();
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
        this.tscBuild();
        build('production');
        this.showChanges();
    },
    showChanges() {
        console.log(execSync('git diff --color-words').toString());
    },
    async api() {
        if (!fs.existsSync('./dist/api')) fs.mkdirSync('./dist/api');

        const exports = [
            'vehicles',
            'buildings',
            'schoolings',
            'pois',
            'ranks',
        ];

        const locales = Object.keys(config.games).filter(game =>
            fs.existsSync(`./src/i18n/${game}.ts`)
        );

        for (const locale of locales) {
            if (!fs.existsSync(`./dist/api/${locale}`))
                fs.mkdirSync(`./dist/api/${locale}`);
            const t = (await import(`../src/i18n/${locale}`)).default;
            exports.forEach(ex => {
                fs.writeFileSync(
                    `./dist/api/${locale}/${ex}.json`,
                    JSON.stringify(t[ex] ?? {})
                );
                console.log(`./dist/api/${locale}/${ex}.json`);
            });
        }
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
