import buildAPI from './api';
import collectFAIconNames from './collectFAIconNames';
import copyStatic from './copyStatic';
import { emptyFolder } from './emptyDir';
import getLibraries from './getLibraries';
import setVersion from './setVersion';
import updateBrowserVersions from './updateBrowserVersions';

const timeWrap = async (name: string, fn: () => Promise<unknown> | unknown) => {
    console.log('--');
    console.time(`  ${name}`);
    const result = await fn();
    console.timeEnd(`  ${name}`);
    if (result) console.info(`    ${result}`);
    console.log('--');
};

(async () => {
    console.time('prebuild');
    console.log('Running LSSM-Prebuild-Scripts...');

    await timeWrap('setVersion', setVersion);
    await timeWrap('update latest browser versions', updateBrowserVersions);
    await timeWrap('emptyDir', () => emptyFolder('./dist'));
    await timeWrap('copyStatic', copyStatic);
    await timeWrap('build API', buildAPI);
    await timeWrap('Collect Third-Party Libraries', getLibraries);
    await timeWrap('Collect FA-Icons', collectFAIconNames);

    console.timeEnd('prebuild');
    console.log('Prebuild ran successfully, building...');
})();
