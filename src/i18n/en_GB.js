const files = require.context(
    '../',
    true,
    /modules\/(?!template).*?\/i18n\/en_GB.root(\.js(on)?)?/
);
const modules = {};
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));

module.exports = {
    modules,
};
