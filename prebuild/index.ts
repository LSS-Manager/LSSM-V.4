import fs from 'fs';

import buildAPI from './api';
import collectFAIconNames from './collectFAIconNames';
import copyStatic from './copyStatic';
import createBranchesJson from './createBranchesJson';
import downloadMissions from './downloadMissions';
import downloadReleasenotes from './downloadReleasenotes';
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

const emptyDist = () => {
    emptyFolder('./dist');
    if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
};

(async () => {
    console.time('prebuild');
    console.log('Running LSSM-Prebuild-Scripts...');

    if (process.env.LSSM_ARGS?.toLowerCase().includes('--api')) {
        await timeWrap('emptyDir', emptyDist);
        await timeWrap('build API', buildAPI);
        console.timeEnd('prebuild');
        console.log('Built the API, skipping other prebuild steps!');
        return;
    }

    await timeWrap('setVersion', setVersion);
    await timeWrap('update latest browser versions', updateBrowserVersions);
    await timeWrap('emptyDir', emptyDist);
    await timeWrap('download missions', downloadMissions);
    await timeWrap('download releasenotes', downloadReleasenotes);
    await timeWrap('create dumy branches.json', createBranchesJson);
    await timeWrap('copyStatic', copyStatic);
    await timeWrap('build API', buildAPI);
    await timeWrap('Collect Third-Party Libraries', getLibraries);
    await timeWrap('Collect FA-Icons', collectFAIconNames);

    console.timeEnd('prebuild');
    console.log('Prebuild ran successfully, building...');
})();
