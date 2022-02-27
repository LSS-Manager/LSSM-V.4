import type { Message } from '../../shareAlliancePost/main';
import type { Mission } from 'typings/Mission';
import type {
    ButtonGroupCallback,
    MissionUpdateCallback,
} from './utils/buttonGroup';

export type AddShareBtn = (mission: ButtonGroupCallback) => void;
export type UpdateShareBtn = (mission: MissionUpdateCallback) => void;

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    types: ('' | 'sicherheitswache')[],
    minCredits: number,
    buttonColor: string,
    enableSap: boolean,
    sapMessages: Message[]
): Promise<{ addShareBtn: AddShareBtn; updateShareBtn: UpdateShareBtn }> => {
    const typesIdsSelector = types
        .map(type => `#mission_list${type ? `_${type}` : ''}`)
        .join(',');

    const shareBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-share-mission-btn`
    );

    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';

    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];
    const acceptedMissionTypes = Object.entries(missionsById)
        .filter(([, { average_credits }]) =>
            minCredits ? average_credits && average_credits >= minCredits : true
        )
        .map(([id]) => id);

    const sapNoMessage = LSSM.$t(
        'modules.shareAlliancePost.noMessage'
    ).toString();
    const sapMissionList = enableSap
        ? await import(
              /* webpackChunkName: "modules/shareAlliancePost/missionlist" */ '../../shareAlliancePost/assets/missionList'
          ).then(({ default: missionList }) => missionList)
        : null;

    const addShareBtn: AddShareBtn = mission => {
        if (
            mission.element.querySelector('.panel-success') ||
            !mission.element.closest(typesIdsSelector)
        )
            return;
        let missionType =
            mission.element.getAttribute('mission_type_id') ?? '-1';
        const overlayIndex =
            mission.element.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            missionType += `-${overlayIndex}`;
        const additionalOverlay =
            mission.element.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            missionType += `/${additionalOverlay}`;
        if (missionType !== '-1' && !acceptedMissionTypes.includes(missionType))
            return;
        const btn = document.createElement('button');
        btn.classList.add('btn', `btn-${buttonColor}`, 'btn-xs', shareBtnClass);
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-share-alt');
        btn.append(icon);

        if (enableSap) {
            const group = document.createElement('span');
            group.classList.add('btn-group');
            group.append(btn);
            btn.addEventListener('click', () =>
                sapMissionList?.(
                    LSSM,
                    btn,
                    mission,
                    sapMessages,
                    missionType,
                    missionsById[missionType],
                    sapNoMessage,
                    authToken
                )
            );
            mission.btnGroup.append(group);
        } else {
            mission.btnGroup.append(btn);
            btn.addEventListener('click', () => {
                btn.disabled = true;
                LSSM.$store
                    .dispatch('api/request', {
                        url: `/missions/${mission.id}/alliance`,
                        feature: 'ecl-share-missions',
                    })
                    .then(() => btn.remove());
            });
        }
    };

    return {
        addShareBtn,
        updateShareBtn: mission => {
            if (mission.element.querySelector('.panel-success')) {
                return mission.element
                    .querySelector(`.${shareBtnClass}`)
                    ?.remove();
            }
            if (!mission.element.querySelector(`.${shareBtnClass}`))
                addShareBtn(mission);
        },
    };
};
