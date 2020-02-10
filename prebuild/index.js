console.log('Running LSSM-Prebuild-Scripts...');

console.info('\tsetVersion');
require('./setVersion');
console.info('\tbuildUserscript');
require('./buildUserscript');
console.info('\temptyDir');
require('./emptyDir').emptyFolder('./dist');
console.info('\tcopyStatic');
require('./copyStatic');

console.log('Prebuild ran successfully, building...');
