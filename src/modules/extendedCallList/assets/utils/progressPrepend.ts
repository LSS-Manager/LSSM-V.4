import type { MissionMarkerAdd } from 'typings/Ingame';

export interface ProgressPrependCallback {
    missionPanel: HTMLDivElement;
    progressbarWrapper: HTMLDivElement;
    id: number;
}

export interface MissionUpdateCallback {
    missionPanel: HTMLDivElement;
    id: number;
}

export default (
    LSSM: Vue,
    MODULE_ID: string,
    callback: (mission: ProgressPrependCallback) => void,
    onUpdate: (mission: MissionUpdateCallback) => void
): void => {
    const progressBarClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_progress-bar`
    );

    const updateProgressBar = (mission: HTMLDivElement) => {
        const progressbarWrapper = mission.querySelector<HTMLDivElement>(
            'div[id^="mission_bar_outer_"]'
        )?.parentElement as HTMLDivElement | null | undefined;
        if (!progressbarWrapper) return;
        progressbarWrapper.classList.add(progressBarClass);
        progressbarWrapper.dataset.mission =
            mission.getAttribute('mission_id') ?? '';
        callback({
            missionPanel: mission,
            progressbarWrapper,
            id: parseInt(progressbarWrapper.dataset.mission || '-1'),
        });
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(updateProgressBar);

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const mission = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (mission) {
                    if (!mission.querySelector(`.${progressBarClass}`))
                        updateProgressBar(mission);
                    onUpdate({
                        missionPanel: mission,
                        id: parseInt(
                            mission.getAttribute('mission_id') ?? '-1'
                        ),
                    });
                }
            },
        })
        .then();
};
