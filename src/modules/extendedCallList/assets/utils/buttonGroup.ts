import { MissionMarkerAdd } from 'typings/Ingame';

export interface ButtonGroupCallback {
    element: HTMLDivElement;
    btnGroup: HTMLSpanElement;
    id: number;
}

export default (
    LSSM: Vue,
    MODULE_ID: string,
    callback: (mission: ButtonGroupCallback) => void
): void => {
    const btnGroupClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_btn-group_pre-alarm`
    );

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `.${btnGroupClass}`,
            style: {
                display: 'flex',
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
                if (mission && !mission.querySelector(`.${btnGroupClass}`))
                    addButtonGroup(mission);
            },
        })
        .then();
};
