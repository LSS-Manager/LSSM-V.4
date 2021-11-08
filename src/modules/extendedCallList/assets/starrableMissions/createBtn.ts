export interface StarrableButton extends HTMLButtonElement {
    switch?(): Promise<void>;
}

const switchBtnState = (btn: HTMLButtonElement) => {
    const starred = btn.classList.contains('btn-warning');
    const btnClassReplace: [string, string] = ['btn-default', 'btn-warning'];
    if (starred) btnClassReplace.reverse();
    btn.classList.replace(...btnClassReplace);
    btn.querySelector('svg')?.setAttribute(
        'data-prefix',
        starred ? 'far' : 'fas'
    );
};

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missionId: string,
    isStarred: boolean,
    starredMissionBtnClass: string
): StarrableButton => {
    const btn: StarrableButton = document.createElement('button');

    btn.classList.add(
        starredMissionBtnClass,
        'btn',
        'btn-xs',
        `btn-${isStarred ? 'warning' : 'default'}`
    );
    btn.dataset.mission = missionId;
    const icon = document.createElement('i');
    icon.classList.add(`fa${isStarred ? 's' : 'r'}`, 'fa-star');
    btn.append(icon);

    const send = () =>
        LSSM.$store
            .dispatch('broadcast/send_custom_message', {
                name: 'starredMissions_update',
                handler(msg: CustomBroadcastMessage) {
                    document
                        .querySelectorAll<HTMLButtonElement>(
                            `button.${msg.data.starredMissionBtnClass}[data-mission="${msg.data.missionId}"]`
                        )
                        // eslint-disable-next-line no-eval
                        .forEach(eval(`${msg.data.switchBtnState}`));
                },
                data: {
                    missionId,
                    starredMissionBtnClass,
                    switchBtnState: switchBtnState.toString(),
                },
            })
            .then();

    const store = async () => {
        const missions: string[] = await LSSM.$store.dispatch(
            'settings/getSetting',
            {
                moduleId: MODULE_ID,
                settingId: 'starredMissions',
                defaultValue: [],
            }
        );
        if (btn.classList.contains('btn-warning')) {
            missions.splice(
                missions.findIndex(mission => mission === missionId),
                1
            );
        } else {
            missions.push(missionId);
        }
        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'starredMissions',
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
