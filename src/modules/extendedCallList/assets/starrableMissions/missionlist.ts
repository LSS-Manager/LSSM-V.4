import { MissionMarkerAdd } from 'typings/Ingame';

export default (LSSM: Vue, missions: string[], MODULE_ID: string): void => {
    const btnClass: string = LSSM.$store.getters.nodeAttribute(
        'ecl-sm-starbutton'
    );

    const moveMissionUp = (id: string): void => {
        const missionElement = document.getElementById(`mission_${id}`);
        if (!missionElement) return;
        const placeholder = document.createElement('div');
        placeholder.classList.add('hidden');
        placeholder.setAttribute('data-mission-placeholder', id);
        missionElement.after(placeholder);
        missionElement.parentElement?.prepend(missionElement);
    };

    const moveMissionDown = (id: string): void => {
        const missionElement = document.getElementById(`mission_${id}`);
        const placeholder = missionElement?.parentElement?.querySelector(
            `[data-mission-placeholder="${id}"]`
        );
        if (!missionElement || !placeholder) return;
        placeholder.after(missionElement);
        placeholder.remove();
    };

    document
        .getElementById('missions-panel-body')
        ?.addEventListener('click', e => {
            const btn = (e.target as HTMLElement).closest(`.${btnClass}`);
            if (!btn) return;
            const mission = btn.getAttribute('data-mission') ?? '-1';
            const missionElement =
                btn.parentElement?.parentElement?.parentElement;
            if (mission === '-1' || !missionElement) return;
            const remove = missions.includes(mission);
            const btnClassReplace: [string, string] = [
                'btn-default',
                'btn-warning',
            ];
            if (remove) btnClassReplace.reverse();
            btn.classList.replace(...btnClassReplace);
            btn.querySelector('svg')?.setAttribute(
                'data-prefix',
                remove ? 'far' : 'fas'
            );
            if (remove) {
                missions.splice(
                    missions.findIndex(m => m === mission),
                    1
                );
            } else {
                missions.push(mission);
            }
            LSSM.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: 'starredMissions',
                    value: missions,
                })
                .then();
            if (remove) moveMissionDown(mission);
            else moveMissionUp(mission);
        });

    const getStarBtn = (id: string): HTMLButtonElement => {
        const starred = missions.includes(id);
        const btn = document.createElement('button');
        btn.classList.add(
            btnClass,
            'btn',
            'btn-xs',
            `btn-${starred ? 'warning' : 'default'}`
        );
        btn.setAttribute('data-mission', id);
        const icon = document.createElement('i');
        icon.classList.add(`fa${starred ? 's' : 'r'}`, 'fa-star');
        if (starred) moveMissionUp(id);
        btn.append(icon);
        return btn;
    };

    document
        .querySelectorAll<HTMLAnchorElement>(
            '#missions-panel-body .missionSideBarEntry a[id^="alarm_button_"]'
        )
        .forEach(alarm => {
            const btn = getStarBtn(
                alarm.getAttribute('href')?.match(/\d+$/)?.[0] ?? '-1'
            );
            alarm.before(btn);
        });

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                if (
                    !document.querySelector(
                        `button.${btnClass}[data-mission="${marker.id}"]`
                    )
                ) {
                    document
                        .querySelector<HTMLAnchorElement>(
                            `#missions-panel-body .missionSideBarEntry a[id="alarm_button_${marker.id}"]`
                        )
                        ?.before(getStarBtn(marker.id.toString()));
                }
            },
        })
        .then();
};
