import createBtn from './createBtn';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    starredMissions: string[],
    starredMissionBtnClass: string
): void => {
    const missionId = window.location.pathname.match(/\d+\/?$/u)?.[0];
    if (!missionId) return;
    const btn = createBtn(
        LSSM,
        MODULE_ID,
        missionId,
        starredMissions.includes(missionId),
        starredMissionBtnClass
    );
    btn.addEventListener('click', () => btn.switch?.().then());
    document
        .querySelector(
            '#mission_general_info > div[style*="float: left;"] > img'
        )
        ?.before(btn);
};
