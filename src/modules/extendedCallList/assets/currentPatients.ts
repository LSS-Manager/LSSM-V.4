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
    const patientHolderClass: string = LSSM.$stores.root.nodeAttribute(
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
            icon.classList.add('fas', 'fa-user-injured', 'fa-fw');
            icon.style.setProperty('margin-left', '0.2em');
            icon.style.setProperty('margin-right', '0.2em');
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
            const getComment = (position: 'end' | 'start') =>
                `<!--${PREFIX}-ecl-patients-${position}-->`;
            const startComment = getComment('start');
            const endComment = getComment('end');
            const tooltip = window.mission_markers
                .find(
                    m =>
                        m.mission_id ==
                        parseInt(mission.getAttribute('mission_id') ?? '-1')
                )
                ?.getTooltip();
            const content = tooltip?.getContent();
            const prevContent =
                content instanceof HTMLElement
                    ? content.innerHTML
                    : content?.toString() ?? '';
            tooltip?.setContent(
                `${prevContent.replace(
                    new RegExp(
                        `${LSSM.$utils.escapeRegex(
                            startComment
                        )}.*?${LSSM.$utils.escapeRegex(endComment)}`,
                        's'
                    ),
                    ''
                )}${startComment}&nbsp;<i class="fa fa-user-injured fa-fw" style="width: 0.875em"></i> ${amount.toLocaleString()}${endComment}`
            );
        }
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => setPatients(panel));

    LSSM.$stores.root.hook({
        event: 'missionMarkerAdd',
        callback(marker: MissionMarkerAdd) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.id}`
            );
            if (panel) setPatients(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'patientMarkerAdd',
        post: true,
        callback(marker: PatientMarkerAdd) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.mission_id}`
            );
            if (panel) setPatients(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'patientMarkerAddCombined',
        post: true,
        callback(marker: PatientMarkerAddCombined) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.mission_id}`
            );
            if (panel) setPatients(panel, marker.count);
        },
    });
};
