import { execSync } from 'child_process';
// import config from '../src/config';
import sort from './sort';
// import fs from 'fs';

const scripts = process.argv.splice(2);

const build = (mode: string) => {
    console.time('games');
    // const games = [] as string[];
    // const builds = Object.keys(config.games).filter(game =>
    //     fs.existsSync(`./src/i18n/${game}.ts`)
    // );
    // const games_rem = [...builds];
    // builds.map(game => {
    //     console.log(execSync(`node build ${mode} ${game}`).toString());
    //     games.push(game);
    //     games_rem.shift();
    //     console.log(`built ${games}, remaining ${games_rem}`);
    // });
    console.log(execSync(`node build ${mode}`).toString());
    console.timeEnd('games');
};

const scriptHandlers = {
    sort,
    emojis() {
        console.log(execSync('node ./scripts/utils/fetchEmojis').toString());
    },
    lint() {
        this.sort();
        console.log(
            execSync(
                'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ ./typings/ --ext .js,.ts,.vue -f table --no-error-on-unmatched-pattern --fix'
            ).toString()
        );
    },
    tscPrebuild() {
        console.log(
            execSync('tsc src/userscript.ts && tsc -b prebuild').toString()
        );
    },
    predev() {
        this.emojis();
        this.lint();
        this.tscPrebuild();
        console.log(execSync('node prebuild').toString());
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
        this.tscPrebuild();
        console.log(execSync('node prebuild production').toString());
    },
    build() {
        this.tscBuild();
        build('production');
        this.showChanges();
    },
    showChanges() {
        console.log(execSync('git diff --color-words').toString());
    },
} as { [key: string]: () => string | void };

const execute = (script: string) => {
    console.log(`### ${script} ###\n\n`);
    console.time(script);
    scriptHandlers[script]?.();
    console.log(`\n\n=== end ${script} ===`);
    console.timeEnd(script);
};

try {
    scripts.forEach(script => {
        execute(script);
        console.log('\n\n\n');
    });
} catch (e) {
    console.error(e);
    console.log(
        `===output===\n${e.output
            .map((o: string | null) => o?.toString())
            .join('\n')}\n###output###`
    );
    console.log(`===stdout===\n${e.stdout?.toString()}\n###stdout###`);
    console.log(`===stderr===\n${e.stderr?.toString()}\n###stderr###`);
    process.exit(-1);
}
