import { MissionTimer } from 'typings/Ingame';

export default (LSSM: Vue, greenOnly: boolean): void => {
    LSSM.$store.dispatch('hook', {
        event: 'missionTimer',
        callback({ date_end_calc, id, vehicle_state }: MissionTimer) {
            console.log(greenOnly, vehicle_state);
            if (greenOnly && vehicle_state !== 2) return;
            const timeElement = document.getElementById(
                `mission_overview_countdown_${id}`
            );
            if (timeElement)
                timeElement.innerText = window.formatTime(
                    Math.floor(date_end_calc - window.unix_timestamp()),
                    false
                );
        },
    });
};
