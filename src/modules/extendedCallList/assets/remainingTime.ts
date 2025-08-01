import type { MissionTimer } from 'typings/Ingame';

export default (LSSM: Vue, greenOnly: boolean): void =>
    LSSM.$stores.root.hook({
        event: 'missionTimer',
        callback({ date_end_calc, id, vehicle_state }: MissionTimer) {
            if (greenOnly && vehicle_state !== 2) return;
            const timeElement = document.getElementById(
                `mission_overview_countdown_${id}`
            );
            if (timeElement) {
                timeElement.textContent = window.formatTime(
                    Math.floor(date_end_calc - window.unix_timestamp()),
                    false
                );
            }
        },
    });
