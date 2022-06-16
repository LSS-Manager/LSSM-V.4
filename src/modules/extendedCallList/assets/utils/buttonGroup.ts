import type { MissionMarkerAdd } from 'typings/Ingame';

export interface ButtonGroupCallback {
    element: HTMLDivElement;
    btnGroup: HTMLSpanElement;
    id: number;
}

export type MissionUpdateCallback = ButtonGroupCallback;

export default (
    LSSM: Vue,
    MODULE_ID: string,
    callback: (mission: ButtonGroupCallback) => void,
    onUpdate: (mission: MissionUpdateCallback) => void
): void => {
    const btnGroupClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}_btn-group_pre-alarm`
    );

    LSSM.$stores.root.addStyle({
        selectorText: `.${btnGroupClass}`,
        style: {
            display: 'inline-flex',
        },
    });

    const addButtonGroup = (mission: HTMLDivElement): HTMLSpanElement => {
        const btnGroup = document.createElement('span');
        btnGroup.classList.add('btn-group', btnGroupClass);
        btnGroup.dataset.mission = mission.getAttribute('mission_id') ?? '';
        mission.querySelector('a[id^="alarm_button_"]')?.before(btnGroup);
        callback({
            element: mission,
            btnGroup,
            id: parseInt(btnGroup.dataset.mission || '-1'),
        });
        return btnGroup;
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(addButtonGroup);

    LSSM.$stores.root.hook({
        event: 'missionMarkerAdd',
        callback(marker: MissionMarkerAdd) {
            const mission = document.querySelector<HTMLDivElement>(
                `#mission_${marker.id}`
            );
            if (mission) {
                let btnGroup = mission.querySelector<HTMLSpanElement>(
                    `.${btnGroupClass}`
                );
                if (!btnGroup) btnGroup = addButtonGroup(mission);
                onUpdate({
                    element: mission,
                    btnGroup,
                    id: parseInt(mission.getAttribute('mission_id') ?? '-1'),
                });
            }
        },
    });
};
