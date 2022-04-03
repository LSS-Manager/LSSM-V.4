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
        let moduleId = module;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!libraries.hasOwnProperty(module)) libraries[module] = {};
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(`${node_modules}/${module}/package.json`);
        if (module === 'vue' && mod.version.startsWith('3.')) {
            moduleId = 'vue3';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!libraries.hasOwnProperty(moduleId)) libraries[moduleId] = {};
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        libraries[moduleId].version = mod.version;
        if (mod.hasOwnProperty('homepage'))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            libraries[moduleId].url = mod.homepage;

        const entry = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.keys(libraries[moduleId])
            .sort()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .forEach(attr => (entry[attr] = libraries[moduleId][attr]));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        libraries[moduleId] = entry;
    });

addDependencies(dependencies, path.join(__dirname, '../node_modules'));
addDependencies(
    docsDependencies,
    path.join(__dirname, '../docs/.vuepress/node_modules')
);

const librariesSorted = {};
Object.keys(libraries)
    .filter(lib => [...dependencies, ...docsDependencies, 'vue3'].includes(lib))
    .sort()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .forEach(lib => (librariesSorted[lib] = libraries[lib]));

export default (): void =>
    fs.writeFileSync(
        './src/libraries.json',
        JSON.stringify(librariesSorted, null, 4)
    );
