import { MissionMarkerAdd } from 'typings/Ingame';

export interface ButtonGroupCallback {
    element: HTMLDivElement;
    btnGroup: HTMLSpanElement;
    id: number;
}

export interface MissionUpdateCallback {
    element: HTMLDivElement;
    id: number;
}

export default (
    LSSM: Vue,
    MODULE_ID: string,
    callback: (mission: ButtonGroupCallback) => void,
    onUpdate: (mission: MissionUpdateCallback) => void
): void => {
    const btnGroupClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_btn-group_pre-alarm`
    );

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `.${btnGroupClass}`,
            style: {
                display: 'inline-flex',
            },
        })
        .then();

    const addButtonGroup = (mission: HTMLDivElement) => {
        const btnGroup = document.createElement('span');
        btnGroup.classList.add('btn-group', btnGroupClass);
        btnGroup.dataset.mission = mission.getAttribute('mission_id') ?? '';
        mission.querySelector('a[id^="alarm_button_"]')?.before(btnGroup);
        callback({
            element: mission,
            btnGroup,
            id: parseInt(btnGroup.dataset.mission || '-1'),
        });
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(addButtonGroup);

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const mission = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (mission) {
                    if (!mission.querySelector(`.${btnGroupClass}`))
                        addButtonGroup(mission);
                    onUpdate({
                        element: mission,
                        id: parseInt(
                            mission.getAttribute('mission_id') ?? '-1'
                        ),
                    });
                }
            },
        })
        .then();
};
