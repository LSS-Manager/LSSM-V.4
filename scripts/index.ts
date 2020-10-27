import { execSync } from 'child_process';
import sort from './sort';

const scripts = process.argv.splice(2);

const scriptHandlers = {
    sort,
    emojis() {
        console.log(execSync('node ./scripts/utils/fetchEmojis').toString());
    },
    lint() {
        this.sort();
        console.log(
            execSync(
                'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ --ext .js,.vue -f table --no-error-on-unmatched-pattern --fix'
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
        // console.log(execSync('node build').toString());
        execSync('node build').toString();
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
        console.log(execSync('node build production').toString());
        this.showChanges();
    },
    showChanges() {
        console.log(execSync('git diff --color-words').toString());
    },
} as { [key: string]: () => string | void };

const execute = (script: string) => {
    console.log(`### ${script} ###\n\n`);
    scriptHandlers[script]?.();
    console.log(`\n\n=== end ${script} ===`);
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
