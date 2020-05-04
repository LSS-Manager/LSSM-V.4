console.log('Running LSSM-Prebuild-Scripts...');

console.info('\tsetVersion');
require('./setVersion');
console.info('\tbuildUserscript');
require('./buildUserscript');
console.info('\temptyDir');
const emptyFolder = require('./emptyDir').emptyFolder;
emptyFolder('./dist/static');
emptyFolder(`./dist/${process.argv[2] === 'production' ? 'stable/' : 'beta/'}`);
console.info('\tcopyStatic');
require('./copyStatic');

console.log('Prebuild ran successfully, building...');
