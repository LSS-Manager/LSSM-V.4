import type { ModuleMainFunction } from 'typings/Module';

export interface StarrableButton extends HTMLButtonElement {
    switch?(triggeredInMissionWindow?: boolean): Promise<void>;
}

const switchBtnState = (
    btn: HTMLButtonElement,
    triggeredInMissionWindow = false
) => {
    const starred = btn.classList.contains('btn-warning');
    const btnClassReplace: [string, string] = ['btn-default', 'btn-warning'];
    if (starred) btnClassReplace.reverse();
    btn.classList.replace(...btnClassReplace);
    btn
        .querySelector('svg')
        ?.setAttribute('data-prefix', starred ? 'far' : 'fas');
    if (triggeredInMissionWindow) {
        (window[PREFIX] as Vue).$stores.event.createAndDispatchEvent({
            name: 'ecl_starrable-missions_toggle',
            detail: {
                missionId: btn.dataset.mission,
            },
        });
    }
};

export default (
    LSSM: Vue,
    MODULE_ID: string,
    missionId: string,
    isStarred: boolean,
    starredMissionBtnClass: string,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting']
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

    const send = (triggeredInMissionWindow = false) =>
        LSSM.$stores.broadcast
            .sendCustomMessage<{
                missionId: string;
                starredMissionBtnClass: string;
                triggeredInMissionWindow: boolean;
                switchBtnState: string;
            }>({
                name: 'starredMissions_update',
                handler(msg) {
                    document
                        .querySelectorAll<HTMLButtonElement>(
                            `button.${msg.data.starredMissionBtnClass}[data-mission="${msg.data.missionId}"]`
                        )
                        .forEach(btn =>
                            // eslint-disable-next-line no-eval
                            eval(`${msg.data.switchBtnState}`)(
                                btn,
                                msg.data.triggeredInMissionWindow
                            )
                        );
                },
                data: {
                    missionId,
                    starredMissionBtnClass,
                    triggeredInMissionWindow,
                    switchBtnState: switchBtnState.toString(),
                },
            })
            .then();

    const store = async () => {
        const missions = await getSetting<string[]>('starredMissions', []);
        if (btn.classList.contains('btn-warning'))
            missions.splice(missions.indexOf(missionId), 1);
        else missions.push(missionId);

        await setSetting('starredMissions', missions);
    };

    btn.switch = async (triggeredInMissionWindow = false) => {
        await store();
        await send(triggeredInMissionWindow);
        document
            .querySelectorAll<HTMLButtonElement>(
                `button.${starredMissionBtnClass}[data-mission="${missionId}"]`
            )
            .forEach(btn => switchBtnState(btn, triggeredInMissionWindow));
    };

    return btn;
};
