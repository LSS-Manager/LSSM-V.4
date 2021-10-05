export interface CollapsableButton extends HTMLButtonElement {
    switch?(): Promise<void>;
}

const COLOR_ACTIVE = 'danger';
const ICON_ACTIVE = 'expand-alt';

const COLOR_INACTIVE = 'success';
const ICON_INACTIVE = 'compress-alt';

const BTN_ACTIVE = `btn-${COLOR_ACTIVE}`;
const BTN_INACTIVE = `btn-${COLOR_INACTIVE}`;

const switchBtnState = (btn: HTMLButtonElement) => {
    const collapsed = btn.classList.contains(BTN_ACTIVE);
    const btnClassReplace: [string, string] = [BTN_INACTIVE, BTN_ACTIVE];
    if (collapsed) btnClassReplace.reverse();
    btn.classList.replace(...btnClassReplace);
    btn.querySelector('svg')?.setAttribute(
        'data-icon',
        collapsed ? ICON_INACTIVE : ICON_ACTIVE
    );
};

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missionId: string,
    isCollapsed: boolean,
    collapsableMissionBtnClass: string
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
    btn.append(icon);

    const send = () =>
        LSSM.$store
            .dispatch('broadcast/send_custom_message', {
                name: 'collapsableMissions_update',
                handler(msg: CustomBroadcastMessage) {
                    document
                        .querySelectorAll<HTMLButtonElement>(
                            `button.${msg.data.collapsableMissionBtnClass}[data-mission="${msg.data.missionId}"]`
                        )
                        // eslint-disable-next-line no-eval
                        .forEach(eval(`${msg.data.switchBtnState}`));
                },
                data: {
                    missionId,
                    collapsableMissionBtnClass,
                    switchBtnState: switchBtnState.toString(),
                },
            })
            .then();

    const store = async () => {
        const missions: string[] = await LSSM.$store.dispatch(
            'settings/getSetting',
            {
                moduleId: MODULE_ID,
                settingId: 'collapsedMissions',
                defaultValue: [],
            }
        );
        if (btn.classList.contains(BTN_ACTIVE)) {
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
        switchBtnState(btn);
    };

    return btn;
};
