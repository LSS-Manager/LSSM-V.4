import type {
    MissionMarkerAdd,
    PatientMarkerAdd,
    PatientMarkerAddCombined,
} from 'typings/Ingame';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    hide0CurrentPatients: boolean,
    currentPatientsInTooltips: boolean
) => {
    LSSM.$store.commit('useFontAwesome');

    const patientHolderClass: string = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-current_patients`
    );

    const setPatients = (mission: HTMLDivElement, count = 0) => {
        let patientHolder = mission.querySelector<HTMLSpanElement>(
            `.${patientHolderClass}`
        );
        if (!patientHolder) {
            const wrapper = document.createElement('span');
            wrapper.classList.add('pull-right');
            wrapper.style.setProperty('white-space', 'nowrap');
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-user-injured');
            icon.style.setProperty('margin-left', '0.2em');
            patientHolder = document.createElement('span');
            patientHolder.classList.add(patientHolderClass);
            wrapper.append(icon, patientHolder);
            mission.querySelector('.panel-heading')?.append(wrapper);
        }
        let amount = count;
        if (!count) {
            if (
                mission.querySelector(
                    '[id^="mission_patients_"] [id^="patient_"]'
                )
            ) {
                amount = mission.querySelectorAll('.patient_progress').length;
            } else {
                if (
                    mission
                        .querySelector<HTMLDivElement>(
                            '[id^="mission_patient_summary_"]'
                        )
                        ?.style.getPropertyValue('display') !== 'none'
                ) {
                    amount = LSSM.$utils.getNumberFromText(
                        mission.querySelector(
                            '.mission_list_patient_icon + strong'
                        )?.textContent ?? '0'
                    );
                }
            }
        }
        patientHolder.textContent = amount.toLocaleString();

        patientHolder.parentElement?.classList[
            hide0CurrentPatients && !amount ? 'add' : 'remove'
        ]('hidden');

        if (
            currentPatientsInTooltips &&
            (amount || (!amount && !hide0CurrentPatients))
        ) {
            window.mission_markers
                .find(
                    m =>
                        m.mission_id ==
                        parseInt(mission.getAttribute('mission_id') ?? '-1')
                )
                ?.getTooltip()
                ?.setContent(
                    `${
                        mission.querySelector(`a[id^="mission_caption_"]`)
                            ?.innerHTML
                    }<i class="fa fa-user-injured" style="margin-left: 0.2em; width: 0.875em"></i> ${amount.toLocaleString()}`
                );
        }
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => setPatients(panel));

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (panel) setPatients(panel);
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'patientMarkerAdd',
            post: true,
            callback(marker: PatientMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.mission_id}`
                );
                if (panel) setPatients(panel);
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'patientMarkerAddCombined',
            post: true,
            callback(marker: PatientMarkerAddCombined) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.mission_id}`
                );
                if (panel) setPatients(panel, marker.count);
            },
        })
        .then();
};
