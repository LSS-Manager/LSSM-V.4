import createBtn, { type StarrableButton } from './createBtn';

import type { ButtonGroupCallback } from '../utils/buttonGroup';

export type AddStarrableButton = (
    mission: ButtonGroupCallback,
    starredMissionBtnClass: string
) => void;

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missions: string[],
    starredMissionBtnClass: string,
    starredMissionPanelClass: string
): AddStarrableButton => {
    const buttons: StarrableButton[] = [];

    const move = (btn: HTMLButtonElement, id: string) => {
        const missionElement = document.querySelector<HTMLDivElement>(
            `#mission_${id}`
        );
        if (!missionElement) return;

        if (btn.classList.contains('btn-warning')) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('hidden');
            placeholder.dataset.missionPlaceholder = id;
            missionElement.after(placeholder);
            missionElement.classList.add(starredMissionPanelClass);
            missionElement.parentElement?.prepend(missionElement);
        } else {
            const placeholder = missionElement?.parentElement?.querySelector(
                `[data-mission-placeholder="${id}"]`
            );
            if (!placeholder) return;
            missionElement.classList.remove(starredMissionPanelClass);
            placeholder.after(missionElement);
            placeholder.remove();
        }
    };

    document
        .querySelector<HTMLDivElement>('#missions-panel-body')
        ?.addEventListener('click', async e => {
            const btn: HTMLButtonElement | null = (
                e.target as HTMLElement
            ).closest(`.${starredMissionBtnClass}`);
            const id = btn?.dataset.mission;
            if (!btn || !id) return;

            const button = buttons.find(
                ({ dataset: { mission } }) => mission === id
            );
            if (!button) return;
            await button.switch?.();

            move(btn, id);
        });

    return (mission, starredMissionBtnClass) => {
        const starred = missions.includes(mission.id.toString());
        const btn = createBtn(
            LSSM,
            MODULE_ID,
            mission.id.toString(),
            starred,
            starredMissionBtnClass
        );
        mission.btnGroup.append(btn);
        buttons.push(btn);
        if (starred) move(btn, mission.id.toString());
    };
};
