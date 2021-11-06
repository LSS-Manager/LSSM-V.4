import {
    ButtonGroupCallback,
    MissionUpdateCallback,
} from '../utils/buttonGroup';

export type AddShareBtn = (mission: ButtonGroupCallback) => void;
export type UpdateShareBtn = (mission: MissionUpdateCallback) => void;

export default (
    LSSM: Vue,
    MODULE_ID: string
): { addShareBtn: AddShareBtn; updateShareBtn: UpdateShareBtn } => {
    const shareBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-share-mission-btn`
    );
    return {
        addShareBtn: mission => {
            if (mission.element.querySelector('.panel-success')) return;
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-success', 'btn-xs', shareBtnClass);
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
