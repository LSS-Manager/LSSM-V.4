import fs from 'fs';
import packageJson from '../package.json';
import libraries from '../src/libraries.json';

const dependencies = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
});

dependencies.forEach(module => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!libraries.hasOwnProperty(module)) libraries[module] = {};
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(`../node_modules/${module}/package.json`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    libraries[module].version = mod.version;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (mod.hasOwnProperty('homepage')) libraries[module].url = mod.homepage;

    const entry = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(libraries[module])
        .sort()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .forEach(attr => (entry[attr] = libraries[module][attr]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    libraries[module] = entry;
});

const librariesSorted = {};
Object.keys(libraries)
    .filter(lib => dependencies.includes(lib))
    .sort()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .forEach(lib => (librariesSorted[lib] = libraries[lib]));

fs.writeFileSync(
    './src/libraries.json',
    JSON.stringify(librariesSorted, null, '\t')
);
