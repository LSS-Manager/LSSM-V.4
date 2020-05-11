const files = require.context(
    '../',
    true,
    /modules\/(?!template).*?\/i18n\/en_US.root(\.js(on)?)?/
);
const modules = {
    settings: {
        name: 'Settings',
        save: 'Save',
        reset: 'Reset',
    },
};
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));

module.exports = {
    modules,
};
