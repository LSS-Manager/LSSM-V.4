export default (LSSM: Vue): void =>
    LSSM.$stores.root.hook({
        event: 'patientTimer',
        callback() {
            window.patient_timers.forEach(patient => {
                const bar = document.getElementById(
                    `patient_bar_${patient.patient_id}`
                );
                const barOuter = bar?.parentElement;
                if (!bar || !barOuter || patient.params.target_percent) return;
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
                            patient.params.live_current_value
                    ),
                    false
                );
            });
        },
    });
