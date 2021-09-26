import buildUserscript from './buildUserscript';
import copyStatic from './copyStatic';
import { emptyFolder } from './emptyDir';
import { execSync } from 'child_process';
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
    console.info('\tcreate API');
    execSync('yarn run api');
    console.log('\tCollect Third-Party Libraries');
    getLibraries();
    console.log('Prebuild ran successfully, building...');
})();
