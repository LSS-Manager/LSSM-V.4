const files = require.context(
    '.',
    true,
    /modules\/(?!template).*?\/register\.js(on)?/
);
const modules = {};
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));
Object.keys(modules).forEach(module => {
    if (
        modules[module].locales &&
        modules[module].locales.length &&
        modules[module].locales.indexOf(window.I18n.locale) < 0
    ) {
        delete modules[module];
    }
});

module.exports = modules;
