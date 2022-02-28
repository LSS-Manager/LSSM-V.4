import toggle from './toggle';

import type { $m } from 'typings/Module';

export interface CollapsableButton extends HTMLButtonElement {
    switch?(): Promise<void>;
}

const COLOR_ACTIVE = 'danger';
const ICON_ACTIVE = 'up-right-and-down-left-from-center';

const COLOR_INACTIVE = 'success';
const ICON_INACTIVE = 'down-left-and-up-right-to-center';

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
    $m: $m
): CollapsableButton => {
    const btn: CollapsableButton = document.createElement('button');

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

    const send = () => {
        const handler = function (msg: CustomBroadcastMessage) {
            document
                .querySelectorAll<HTMLButtonElement>(
                    `#missions-panel-body button.${
                        msg.data.collapsableMissionBtnClass
                    }${
                        msg.data.missionId !== '-1'
                            ? `[data-mission="${msg.data.missionId}"]`
                            : `.${
                                  (msg.data.btnClassList as string)
                                      .split(' ')
                                      .includes(msg.data.BTN_ACTIVE as string)
                                      ? msg.data.BTN_ACTIVE
                                      : msg.data.BTN_INACTIVE
                              }`
                    }`
                )
                .forEach(btn =>
                    // eslint-disable-next-line no-eval
                    eval(`${msg.data.switchBtnState}`)(btn)
                );
        };
        LSSM.$store
            .dispatch('broadcast/send_custom_message', {
                name: 'collapsableMissions_update',
                handler,
                data: {
                    missionId,
                    collapsableMissionBtnClass,
                    btnClassList: btn.getAttribute('string') ?? '',
                    BTN_ACTIVE,
                    BTN_INACTIVE,
                    switchBtnState: switchBtnState.toString(),
                },
            })
            .then();
    };

    const store = async () => {
        if (missionId === '-1') {
            await LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'collapsedMissions',
                value: [],
            });
            await LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'allMissionsCollapsed',
                value: !btn.classList.contains(BTN_ACTIVE),
            });
            return;
        }

        const missions: string[] = await LSSM.$store.dispatch(
            'settings/getSetting',
            {
                moduleId: MODULE_ID,
                settingId: 'collapsedMissions',
                defaultValue: [],
            }
        );
        const allCollapsed = await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'allMissionsCollapsed',
            defaultValue: false,
        });

        if (btn.classList.contains(allCollapsed ? BTN_INACTIVE : BTN_ACTIVE)) {
            missions.splice(
                missions.findIndex(mission => mission === missionId),
                1
            );
        } else {
            missions.push(missionId);
        }

        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'collapsedMissions',
            value: missions,
        });
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
