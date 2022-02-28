import type { PatientTimer } from 'typings/Ingame';

export default (LSSM: Vue): Promise<void> =>
    LSSM.$store
        .dispatch('hook', {
            event: 'patientTimerMission',
            callback(patient: PatientTimer['params']) {
                const bar = document.querySelector<HTMLDivElement>(
                    `#mission_patients_${patient.id}`
                );
                const barOuter = bar?.parentElement;
                if (!bar || !barOuter || patient.target_percent) return;
                let outer =
                    barOuter.parentElement?.querySelector<HTMLDivElement>(
                        '.mission_overview_countdown'
                    );
                if (!outer) {
                    outer = document.createElement('div');
                    outer.classList.add('mission_overview_countdown');
                    outer.style.setProperty('display', 'inline-block');
                    barOuter.before(outer);
                }
                outer.textContent = window.formatTime(
                    Math.floor(
                        (patient.miliseconds_by_percent / 1000) *
                            patient.live_current_value
                    ),
                    false
                );
                for (
                    let second = 1;
                    second < patient.miliseconds_by_percent / 1000;
                    second++
                ) {
                    window.setTimeout(() => {
                        if (outer) {
                            outer.textContent = window.formatTime(
                                Math.floor(
                                    (patient.miliseconds_by_percent / 1000) *
                                        patient.live_current_value -
                                        second
                                ),
                                false
                            );
                        }
                    }, second * 1000);
                }
            },
        })
        .then();
