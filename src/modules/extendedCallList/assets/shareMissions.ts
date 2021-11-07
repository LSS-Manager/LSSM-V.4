import { Mission } from 'typings/Mission';
import {
    ButtonGroupCallback,
    MissionUpdateCallback,
} from './utils/buttonGroup';

export type AddShareBtn = (mission: ButtonGroupCallback) => void;
export type UpdateShareBtn = (mission: MissionUpdateCallback) => void;

export default (
    LSSM: Vue,
    MODULE_ID: string,
    types: ('' | 'sicherheitswache')[],
    minCredits: number,
    buttonColor: string
): { addShareBtn: AddShareBtn; updateShareBtn: UpdateShareBtn } => {
    const typesIdsSelector = types
        .map(type => `#mission_list${type ? `_${type}` : ''}`)
        .join(',');

    const shareBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-share-mission-btn`
    );

    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];
    const acceptedMissionTypes = Object.entries(missionsById)
        .filter(([, { average_credits }]) =>
            minCredits ? average_credits && average_credits >= minCredits : true
        )
        .map(([id]) => id);

    return {
        addShareBtn: mission => {
            if (
                mission.element.querySelector('.panel-success') ||
                !mission.element.closest(typesIdsSelector)
            )
                return;
            let missionType =
                mission.element.getAttribute('mission_type_id') ?? '-1';
            const overlayIndex =
                mission.element.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex !== 'null') missionType += `-${overlayIndex}`;
            if (
                missionType !== '-1' &&
                !acceptedMissionTypes.includes(missionType)
            )
                return;
            const btn = document.createElement('button');
            btn.classList.add(
                'btn',
                `btn-${buttonColor}`,
                'btn-xs',
                shareBtnClass
            );
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-share-alt');
            btn.append(icon);
            btn.addEventListener('click', () => {
                btn.disabled = true;
                LSSM.$store
                    .dispatch('api/request', {
                        url: `/missions/${mission.id}/alliance`,
                        feature: 'ecl-share-missions',
                    })
                    .then(() => btn.remove());
            });
            mission.btnGroup.append(btn);
        },
        updateShareBtn: mission => {
            if (mission.element.querySelector('.panel-success'))
                mission.element.querySelector(`.${shareBtnClass}`)?.remove();
        },
    };
};
