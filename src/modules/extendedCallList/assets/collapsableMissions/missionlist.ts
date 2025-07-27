import toggle from './toggle';
import createBtn, { type CollapsableButton } from './createBtn';

import type { ButtonGroupCallback } from '../utils/buttonGroup';
import type { $m, ModuleMainFunction } from 'typings/Module';

export type AddCollapsableButton = (
    mission: ButtonGroupCallback,
    collapsableBtnClass: string
) => void;

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missions: string[],
    allMissionsCollapsed: boolean,
    collapsableMissionBtnClass: string,
    sortBtnId: string,
    showAllBtn: boolean,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m
): AddCollapsableButton => {
    const buttons: CollapsableButton[] = [];

    const collapsedClass = LSSM.$stores.root
        .nodeAttribute(`${MODULE_ID}_collapsable-missions_collapsed`)
        .toString();
    const collapsedBarContentClass = LSSM.$stores.root
        .nodeAttribute(
            `${MODULE_ID}_collapsable-missions_collapsed-bar_content`
        )
        .toString();

    LSSM.$stores.root.addStyles([
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
            selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] [id^="pumping_bar_outer_"]`,
            style: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
            },
        },
        {
            selectorText: `.${collapsedClass} .panel-heading .progress-bar[id^="mission_bar_"]`,
            style: {
                'text-align': 'left',
            },
        },
        {
            selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] .${collapsedBarContentClass}`,
            style: {
                'display': 'flex',
                'width': '100%',
                'position': 'absolute',
                'justify-content': 'space-between',
                'z-index': 1,
            },
        },
        {
            selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] .${collapsedBarContentClass} a[id^="mission_caption_"]`,
            style: {
                'margin-left': '5px',
                'color': 'black',
                'width': '100%',
            },
        },
        {
            selectorText: `body.dark .${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] .${collapsedBarContentClass} a[id^="mission_caption_"]`,
            style: {
                color: 'white',
            },
        },
        {
            selectorText: `.${collapsedClass} .panel-heading .mission_progress[id^="mission_bar_outer_"] .${collapsedBarContentClass} .mission_overview_countdown`,
            style: {
                'margin-right': '5px',
                'flex-shrink': 0,
                'font-size': '14px',
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
    ]);

    document
        .querySelector<HTMLDivElement>('#missions-panel-body')
        ?.addEventListener('click', async e => {
            const btn: HTMLButtonElement | null = (
                e.target as HTMLElement
            ).closest(`.${collapsableMissionBtnClass}`);
            const id = btn?.dataset.mission;
            if (!btn || !id) return;

            const button = buttons.find(
                ({ dataset: { mission } }) => mission === id
            );
            const btnGroup = button?.closest<HTMLSpanElement>(
                `.${LSSM.$stores.root.nodeAttribute(
                    `${MODULE_ID}_btn-group_pre-alarm`
                )}`
            );
            if (!button || !btnGroup) return;
            await button.switch?.();

            toggle(btnGroup, btn, id, collapsedClass, collapsedBarContentClass);
        });

    const allBtn = createBtn(
        LSSM,
        MODULE_ID,
        '-1',
        false,
        collapsableMissionBtnClass,
        collapsedClass,
        collapsedBarContentClass,
        getSetting,
        setSetting,
        $m
    );

    if (!showAllBtn) allBtn.classList.add('hidden');

    allBtn.classList.add('btn-xs');
    allBtn.addEventListener('click', async () => {
        await allBtn.switch?.();
    });

    if (allMissionsCollapsed) allBtn.click();

    const sortBtn = document.getElementById(sortBtnId);
    if (sortBtn) {
        sortBtn.parentElement?.before(allBtn);
    } else {
        document
            .querySelector<HTMLDivElement>(
                '.missions-panel-main .mission_selection:not(:has(~.mission_selection))'
            )
            ?.after(allBtn);
    }

    return (mission, collapsableMissionBtnClass) => {
        const collapsed = allBtn.classList.contains('btn-danger')
            ? !missions.includes(mission.id.toString())
            : missions.includes(mission.id.toString());
        const btn = createBtn(
            LSSM,
            MODULE_ID,
            mission.id.toString(),
            collapsed,
            collapsableMissionBtnClass,
            collapsedClass,
            collapsedBarContentClass,
            getSetting,
            setSetting,
            $m
        );
        mission.btnGroup.append(btn);
        buttons.push(btn);
        if (collapsed) {
            toggle(
                mission.btnGroup,
                btn,
                mission.id.toString(),
                collapsedClass,
                collapsedBarContentClass
            );
        }
    };
};
