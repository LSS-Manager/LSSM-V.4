import createBtn from './createBtn';

import type { ModuleMainFunction } from 'typings/Module';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    starredMissions: string[],
    starredMissionBtnClass: string,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting']
): void => {
    const missionId = window.location.pathname.match(/\d+\/?$/u)?.[0];
    if (!missionId) return;
    const btn = createBtn(
        LSSM,
        MODULE_ID,
        missionId,
        starredMissions.includes(missionId),
        starredMissionBtnClass,
        getSetting,
        setSetting
    );
    btn.addEventListener('click', () => btn.switch?.(true).then());
    document
        .querySelector(
            '#mission_general_info > div[style*="float: left;"] > img'
        )
        ?.before(btn);
};
