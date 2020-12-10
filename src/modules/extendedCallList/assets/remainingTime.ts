import { MissionTimer } from 'typings/Ingame';

export default (LSSM: Vue): void => {
    LSSM.$store.dispatch('hook', {
        event: 'missionTimer',
        callback({ date_end_calc, id }: MissionTimer) {
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
