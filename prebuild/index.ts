import buildUserscript from './buildUserscript';
import copyStatic from './copyStatic';
import { emptyFolder } from './emptyDir';
import getLibraries from './getLibraries';
import setVersion from './setVersion';

(async () => {
    console.log('Running LSSM-Prebuild-Scripts...');

    console.info('\tsetVersion');
    setVersion();
    console.info('\tbuildUserscript');
    await buildUserscript();
    console.info('\temptyDir');
    emptyFolder('./dist');
    console.info('\tcopyStatic');
    copyStatic();
    console.log('\tCollect Third-Party Libraries');
    getLibraries();
    console.log('Prebuild ran successfully, building...');
})();
