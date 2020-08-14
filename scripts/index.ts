import sort from './sort';

const scripts = process.argv.splice(2);

const scriptHandlers = {
    sort,
} as { [key: string]: () => string | void };

const outputs = [] as string[];

scripts.forEach(script => {
    outputs.push(
        `### ${script} ###\n\n${scriptHandlers[script]?.() ||
            ''}\n\n=== end ${script} ===`
    );
});

console.log(outputs.join('\n\n\n'));
