import { $m } from 'typings/Module';
import { ButtonGroupCallback } from '../utils/buttonGroup';
import createBtn, { CollapsableButton } from './createBtn';

export type AddCollapsableButton = (
    mission: ButtonGroupCallback,
    collapsableBtnClass: string
) => void;

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missions: string[],
    collapsableMissionBtnClass: string,
    $m: $m
): AddCollapsableButton => {
    const buttons: CollapsableButton[] = [];

    const collapsedClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_collapsable-missions_collapsed`
    );

    LSSM.$store
        .dispatch('addStyles', [
            {
                selectorText: `.${collapsedClass} .panel-heading`,
                style: {
                    display: 'flex',
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-heading > *:not(:last-child)`,
                style: {
                    'margin-right': '5px',
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"]`,
                style: {
                    width: '100%',
                },
            },
            {
                selectorText: `body.dark .${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"]`,
                style: {
                    'background-color': 'black',
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-heading .progress-bar[id^="mission_bar_"]`,
                style: {
                    'text-align': 'left',
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] a[id^="mission_caption_"]`,
                style: {
                    'margin-left': '5px',
                    'position': 'absolute',
                    'z-index': 10,
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] .progress-striped-inner`,
                style: {
                    'background-color': 'rgba(255, 255, 255, 0.5)',
                    'opacity': 0.1,
                },
            },
            {
                selectorText: `.${collapsedClass} .panel-body`,
                style: {
                    display: 'none',
                },
            },
        ])
        .then();

    const toggle = (
        btnGroup: HTMLSpanElement,
        btn: HTMLButtonElement,
        missionId: string
    ) => {
        const mission = document.querySelector<HTMLDivElement>(
            `#mission_${missionId}`
        );
        const icon = mission?.querySelector<HTMLImageElement>(
            `#mission_vehicle_state_${missionId}`
        );
        const progressBarWrapper = mission?.querySelector<HTMLDivElement>(
            `#mission_bar_outer_${missionId}`
        );
        const progressBar = progressBarWrapper?.querySelector<HTMLDivElement>(
            `#mission_bar_${missionId}`
        );
        const caption = mission?.querySelector<HTMLAnchorElement>(
            `#mission_caption_${missionId}`
        );
        if (
            !mission ||
            !icon ||
            !progressBarWrapper ||
            !progressBar ||
            !caption
        )
            return;
        if (btn.classList.contains('btn-success')) {
            mission.classList.remove(collapsedClass);

            const iconPlaceholder = mission?.querySelector<HTMLDivElement>(
                `[data-collapsable-icon-placeholder="${missionId}"]`
            );
            const progressbarPlaceholder = mission?.querySelector<
                HTMLDivElement
            >(`[data-collapsable-progressbar-placeholder="${missionId}"]`);
            const captionPlaceholder = mission?.querySelector<HTMLDivElement>(
                `[data-collapsable-caption-placeholder="${missionId}"]`
            );
            if (
                !iconPlaceholder ||
                !progressbarPlaceholder ||
                !captionPlaceholder
            )
                return;

            iconPlaceholder.after(icon);
            iconPlaceholder.remove();

            captionPlaceholder.after(caption);
            captionPlaceholder.remove();
            progressbarPlaceholder.after(progressBarWrapper);
            progressbarPlaceholder.remove();
        } else {
            mission.classList.add(collapsedClass);

            const iconPlaceholder = document.createElement('div');
            iconPlaceholder.classList.add('hidden');
            iconPlaceholder.dataset.collapsableIconPlaceholder = missionId;
            icon.after(iconPlaceholder);
            btnGroup.after(icon);

            const progressbarPlaceholder = document.createElement('div');
            progressbarPlaceholder.classList.add('hidden');
            progressbarPlaceholder.dataset.collapsableProgressbarPlaceholder = missionId;
            progressBarWrapper.after(progressbarPlaceholder);
            const captionPlaceholder = document.createElement('div');
            captionPlaceholder.classList.add('hidden');
            captionPlaceholder.dataset.collapsableCaptionPlaceholder = missionId;
            caption.after(captionPlaceholder, progressBarWrapper);
            progressBar.prepend(caption);
        }
    };

    document
        .getElementById('missions-panel-body')
        ?.addEventListener('click', async e => {
            const btn: HTMLButtonElement | null = (e.target as HTMLElement).closest(
                `.${collapsableMissionBtnClass}`
            );
            const id = btn?.dataset.mission;
            if (!btn || !id) return;

            const button = buttons.find(
                ({ dataset: { mission } }) => mission === id
            );
            const btnGroup = button?.closest<HTMLSpanElement>(
                `.${LSSM.$store.getters.nodeAttribute(
                    `${MODULE_ID}_btn-group_pre-alarm`
                )}`
            );
            if (!button || !btnGroup) return;
            await button.switch?.();

            toggle(btnGroup, btn, id);
        });

    return (mission, collapsableMissionBtnClass) => {
        const collapsed = missions.includes(mission.id.toString());
        const btn = createBtn(
            LSSM,
            MODULE_ID,
            mission.id.toString(),
            collapsed,
            collapsableMissionBtnClass,
            $m
        );
        mission.btnGroup.append(btn);
        buttons.push(btn);
        if (collapsed) toggle(mission.btnGroup, btn, mission.id.toString());
    };
};
