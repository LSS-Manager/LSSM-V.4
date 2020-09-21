import { execSync } from 'child_process';
import sort from './sort';
import emojis from './utils/fetchEmojis';

const scripts = process.argv.splice(2);

try {
    const scriptHandlers = {
        sort,
        emojis,
        lint() {
            return [
                this.sort(),
                execSync(
                    'eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ --ext .js,.vue -f table --no-error-on-unmatched-pattern --fix'
                ).toString(),
            ].join('\n\n');
        },
        tscPrebuild() {
            return execSync(
                'tsc src/userscript.ts && tsc -b prebuild'
            ).toString();
        },
        predev() {
            return [
                this.lint(),
                this.emojis(),
                this.tscPrebuild(),
                execSync('node prebuild').toString(),
            ].join('\n\n');
        },
        tscBuild() {
            return execSync('tsc -b build').toString();
        },
        dev() {
            return [this.tscBuild(), execSync('node build').toString()].join(
                '\n\n'
            );
        },
        tscDocs() {
            return execSync('tsc -b docs/.vuepress/').toString();
        },
        docs() {
            return [
                this.tscDocs(),
                execSync('vuepress build docs').toString(),
            ].join('\n\n');
        },
        preBuild() {
            return [
                this.lint(),
                this.tscPrebuild(),
                execSync('node prebuild production').toString(),
            ].join('\n\n');
        },
        build() {
            return [
                this.tscBuild(),
                execSync('node build production').toString(),
            ].join('\n\n');
        },
    } as { [key: string]: () => string | void };

    const outputs = scripts.map(
        script =>
            `### ${script} ###\n\n${scriptHandlers[script]?.() ||
                ''}\n\n=== end ${script} ===`
    );

    console.log(outputs.join('\n\n\n'));
} catch (e) {
    console.error(e);
    console.log(
        `===output===\n${e.output
            .map((o: string | null) => o?.toString())
            .join('\n')}\n###output###`
    );
    console.log(`===stdout===\n${e.stdout?.toString()}\n###stdout###`);
    console.log(`===stderr===\n${e.stderr?.toString()}\n###stderr###`);
}
