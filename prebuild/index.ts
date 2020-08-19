import copyStatic from './copyStatic';
import buildUserscript from './buildUserscript';
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
    emptyFolder('./dist/static');
    emptyFolder('./dist/admin');
    emptyFolder(
        `./dist/${process.argv[2] === 'production' ? 'stable/' : 'beta/'}`
    );
    console.info('\tcopyStatic');
    copyStatic();
    console.log('\tCollect Third-Party Libraries');
    getLibraries();
    console.log('Prebuild ran successfully, building...');
})();
