import fs from 'fs';
import path from 'path';

import docsPackageJson from '../docs/.vuepress/package.json';
import libraries from '../src/libraries.json';
import packageJson from '../package.json';

const dependencies = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
});

const docsDependencies = Object.keys(docsPackageJson.dependencies);

const addDependencies = (dependencies: string[], node_modules: string) =>
    dependencies.forEach(module => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!libraries.hasOwnProperty(module)) libraries[module] = {};
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(`${node_modules}/${module}/package.json`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        libraries[module].version = mod.version;
        if (mod.hasOwnProperty('homepage'))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            libraries[module].url = mod.homepage;

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

addDependencies(dependencies, path.join(__dirname, '../node_modules'));
addDependencies(
    docsDependencies,
    path.join(__dirname, '../docs/.vuepress/node_modules')
);

const librariesSorted = {};
Object.keys(libraries)
    .filter(lib => [...dependencies, ...docsDependencies].includes(lib))
    .sort()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .forEach(lib => (librariesSorted[lib] = libraries[lib]));

export default (): void =>
    fs.writeFileSync(
        './src/libraries.json',
        JSON.stringify(librariesSorted, null, '\t')
    );
