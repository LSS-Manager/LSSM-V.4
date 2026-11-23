import toggle from './toggle';

import type { $m, ModuleMainFunction } from 'typings/Module';

export interface CollapsableButton extends HTMLButtonElement {
    switch?(): Promise<void>;
}

const COLOR_ACTIVE = 'danger';
const ICON_ACTIVE = 'up-right-and-down-left-from-center';

const COLOR_INACTIVE = 'success';
const ICON_INACTIVE = 'down-left-and-up-right-to-center';

// sent to other windows when a button has been switched
interface CollapsableUpdate {
    missionId: string;
    // whether the button was collapsed before switching it
    wasActive: boolean;
}

// the handler for other windows is only registered once per window
let handlerRegistered = false;

const BTN_ACTIVE = `btn-${COLOR_ACTIVE}`;
const BTN_INACTIVE = `btn-${COLOR_INACTIVE}`;

const getTitle = ($m: $m, collapsed: boolean, id: string) =>
    $m(
        `collapsableMissions.${id === '-1' ? 'all.' : ''}${
            collapsed ? 'expand' : 'collapse'
        }`
    ).toString();

const switchBtnState = (btn: HTMLButtonElement, $m: $m) => {
    const collapsed = btn.classList.contains(BTN_ACTIVE);
    const btnClassReplace: [string, string] = [BTN_INACTIVE, BTN_ACTIVE];
    if (collapsed) btnClassReplace.reverse();
    btn.classList.replace(...btnClassReplace);
    const icon = btn.querySelector('svg');
    icon?.setAttribute('data-icon', collapsed ? ICON_INACTIVE : ICON_ACTIVE);
    const title = getTitle($m, collapsed, btn.dataset.mission ?? '-1');
    btn.setAttribute('title', title);
    icon?.setAttribute('title', title);
};

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missionId: string,
    isCollapsed: boolean,
    collapsableMissionBtnClass: string,
    collapsedClass: string,
    collapsedBarContentClass: string,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m
): CollapsableButton => {
    const btn: CollapsableButton = document.createElement('button');

    if (!handlerRegistered) {
        handlerRegistered = true;
        LSSM.$stores.broadcast.on<CollapsableUpdate>(
            'collapsableMissions_update',
            ({ missionId: updatedMission, wasActive }) =>
                document
                    .querySelectorAll<HTMLButtonElement>(
                        `#missions-panel-body button.${collapsableMissionBtnClass}${
                            updatedMission !== '-1'
                                ? `[data-mission="${updatedMission}"]`
                                : `.${wasActive ? BTN_ACTIVE : BTN_INACTIVE}`
                        }`
                    )
                    .forEach(button => switchBtnState(button, $m))
        );
    }

    btn.classList.add(
        collapsableMissionBtnClass,
        'btn',
        'btn-xs',
        `btn-${isCollapsed ? COLOR_ACTIVE : COLOR_INACTIVE}`
    );
    btn.dataset.mission = missionId;
    const icon = document.createElement('i');
    icon.classList.add(
        `fas`,
        `fa-${isCollapsed ? ICON_ACTIVE : ICON_INACTIVE}`
    );

    const title = getTitle($m, isCollapsed, missionId);
    btn.setAttribute('title', title);
    icon?.setAttribute('title', title);

    btn.append(icon);

    // other windows switch their buttons of this mission (or all of them) as well
    const send = () =>
        LSSM.$stores.broadcast.send<CollapsableUpdate>(
            'collapsableMissions_update',
            {
                missionId,
                wasActive: btn.classList.contains(BTN_ACTIVE),
            }
        );

    const store = async () => {
        if (missionId === '-1') {
            await setSetting('collapsedMissions', []);
            await setSetting(
                'allMissionsCollapsed',
                !btn.classList.contains(BTN_ACTIVE)
            );
            return;
        }

        const missions = await getSetting<string[]>('collapsedMissions', []);
        const allCollapsed = await getSetting('allMissionsCollapsed', false);

        if (btn.classList.contains(allCollapsed ? BTN_INACTIVE : BTN_ACTIVE))
            missions.splice(missions.indexOf(missionId), 1);
        else missions.push(missionId);

        await setSetting('collapsedMissions', missions);
    };

    btn.switch = async () => {
        await store();
        await send();
        if (missionId === '-1') {
            document
                .querySelectorAll<HTMLButtonElement>(
                    `#missions-panel-body button.${collapsableMissionBtnClass}.${
                        btn.classList.contains(BTN_ACTIVE)
                            ? BTN_ACTIVE
                            : BTN_INACTIVE
                    }`
                )
                .forEach(btn => {
                    switchBtnState(btn, $m);
                    const btnGroup = btn.parentElement;
                    if (btnGroup) {
                        toggle(
                            btnGroup,
                            btn,
                            btn.dataset.mission ?? '-1',
                            collapsedClass,
                            collapsedBarContentClass
                        );
                    }
                });
        }
        switchBtnState(btn, $m);
    };

    return btn;
};
