import type { Mission } from 'typings/Mission';
import type {
    MissionUpdateCallback,
    ProgressPrependCallback,
} from './utils/progressPrepend';

export default (
    LSSM: Vue,
    MODULE_ID: string
): {
    addAverageCredits(mission: ProgressPrependCallback): number;
    updateAverageCredits(mission: MissionUpdateCallback): void;
} => {
    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];

    const wrapperClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_average-credits_wrapper`
    );

    const getMissionTypeFromPanel = (panel: HTMLDivElement): string => {
        let missionType = panel.getAttribute('mission_type_id') ?? '-1';
        const overlayIndex = panel.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            missionType += `-${overlayIndex}`;
        const additionalOverlay =
            panel.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            missionType += `/${additionalOverlay}`;
        return missionType;
    };

    return {
        addAverageCredits({ missionPanel, progressbarWrapper }) {
            const colWidth = 1;
            const missionType = getMissionTypeFromPanel(missionPanel);
            const wrapper = document.createElement('div');
            wrapper.classList.add(`col-xs-${colWidth}`, wrapperClass);
            wrapper.style.setProperty('display', 'flex');
            wrapper.style.setProperty('justify-content', 'center');
            wrapper.style.setProperty('align-items', 'center');
            wrapper.style.setProperty('height', '20px');

            const span = document.createElement('span');
            span.classList.add('label');
            if (!LSSM.$store.state.darkmode)
                span.style.setProperty('color', 'black');

            const missionSpecs: Mission | undefined = missionsById[missionType];
            span.textContent = `~ ${
                missionSpecs?.average_credits?.toLocaleString() ?? '–'
            }`;
            wrapper.append(span);
            progressbarWrapper.before(wrapper);
            return colWidth;
        },
        updateAverageCredits({ missionPanel }) {
            const span = missionPanel.querySelector<HTMLSpanElement>(
                `.${wrapperClass} span`
            );
            if (span) {
                span.textContent = `~ ${
                    missionsById[
                        getMissionTypeFromPanel(missionPanel)
                    ]?.average_credits?.toLocaleString() ?? '–'
                }`;
            }
        },
    };
};
