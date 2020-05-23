const fs = require('fs');
const packageJson = require('../package.json');
const libraries = require('../src/libraries.json');

const dependencies = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
});

dependencies.forEach(module => {
    if (!libraries.hasOwnProperty(module)) libraries[module] = {};
    const mod = require(`../node_modules/${module}/package.json`);
    libraries[module].version = mod.version;
    if (mod.hasOwnProperty('homepage')) libraries[module].url = mod.homepage;

    const entry = {};
    Object.keys(libraries[module])
        .sort()
        .forEach(attr => (entry[attr] = libraries[module][attr]));
    libraries[module] = entry;
});

const librariesSorted = {};
Object.keys(libraries)
    .filter(lib => dependencies.includes(lib))
    .sort()
    .forEach(lib => (librariesSorted[lib] = libraries[lib]));

fs.writeFileSync(
    './src/libraries.json',
    JSON.stringify(librariesSorted, null, '\t')
);
