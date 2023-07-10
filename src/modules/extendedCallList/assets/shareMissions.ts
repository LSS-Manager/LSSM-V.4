import type { Message } from '../../shareAlliancePost/assets/missionWindow';
import type {
    ButtonGroupCallback,
    MissionUpdateCallback,
} from './utils/buttonGroup';

export type AddShareBtn = (mission: ButtonGroupCallback) => void;
export type UpdateShareBtn = (mission: MissionUpdateCallback) => void;

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    types: ('' | 'alliance' | 'sicherheitswache')[],
    minCredits: number,
    buttonColor: string,
    enableSap: boolean,
    sapMessages: Message[],
    SAPStay: boolean
): Promise<{ addShareBtn: AddShareBtn; updateShareBtn: UpdateShareBtn }> => {
    const typesIdsSelector = types
        .map(type => `#mission_list${type ? `_${type}` : ''}`)
        .join(',');

    const shareBtnClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-share-mission-btn`
    );

    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';

    const missionsById = LSSM.$stores.api.missions;
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
            !types.length ||
            !mission.element.closest(typesIdsSelector) ||
            (!SAPStay && mission.element.querySelector('.panel-success'))
        )
            return;

        const stayMode = !!(
            SAPStay && mission.element.querySelector('.panel-success')
        );

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
        icon.classList.add(
            'fas',
            stayMode ? 'fa-comment-dots' : 'fa-share-nodes'
        );
        btn.append(icon);

        if (enableSap) {
            const group = document.createElement('span');
            group.classList.add('btn-group');
            group.append(btn);
            const panel = mission.element.querySelector<HTMLDivElement>(
                `#mission_panel_${mission.id}`
            );
            if (panel && panel?.style.animation) {
                const panelAnimation = getComputedStyle(panel).animation;
                const observer = new MutationObserver(() => {
                    if (group.classList.contains('open'))
                        panel.style.removeProperty('animation');
                    else panel.style.setProperty('animation', panelAnimation);
                });
                observer.observe(group, {
                    attributeFilter: ['class'],
                });
            }
            btn.addEventListener(
                'click',
                () =>
                    sapMissionList?.(
                        LSSM,
                        btn,
                        mission,
                        sapMessages,
                        missionType,
                        missionsById[missionType],
                        sapNoMessage,
                        authToken,
                        updateShareBtn,
                        stayMode
                    )
            );
            mission.btnGroup.append(group);
        } else {
            mission.btnGroup.append(btn);
            btn.addEventListener('click', () => {
                btn.disabled = true;
                LSSM.$stores.api
                    .request({
                        url: `/missions/${mission.id}/alliance`,
                        feature: 'ecl-share-missions',
                    })
                    .then(() => btn.remove());
            });
        }
    };

    const updateShareBtn: UpdateShareBtn = mission => {
        if (mission.element.querySelector('.panel-success') && !SAPStay)
            return mission.element.querySelector(`.${shareBtnClass}`)?.remove();

        if (!mission.element.querySelector(`.${shareBtnClass}`))
            addShareBtn(mission);
    };

    return {
        addShareBtn,
        updateShareBtn,
    };
};
