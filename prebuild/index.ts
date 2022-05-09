import buildAPI from './api';
import buildUserscript from './buildUserscript';
import copyStatic from './copyStatic';
import { emptyFolder } from './emptyDir';
import getLibraries from './getLibraries';
import setVersion from './setVersion';
import updateBrowserVersions from './updateBrowserVersions';

(async () => {
    console.log('Running LSSM-Prebuild-Scripts...');

    console.info('\tsetVersion');
    console.info(setVersion());
    console.info('\tupdate latest browser versions');
    updateBrowserVersions();
    console.info('\tbuildUserscript');
    await buildUserscript();
    console.info('\temptyDir');
    emptyFolder('./dist');
    console.info('\tcopyStatic');
    copyStatic();
    console.info('\tbuild API');
    await buildAPI();
    console.log('\tCollect Third-Party Libraries');
    getLibraries();
    console.log('Prebuild ran successfully, building...');
})();
