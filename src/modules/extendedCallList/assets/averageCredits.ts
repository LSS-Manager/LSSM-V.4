import { Mission } from 'typings/Mission';
import { MissionMarkerAdd } from 'typings/Ingame';

export default (LSSM: Vue): void => {
    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];

    const addCredits = (panel: HTMLDivElement): void => {
        let mission = panel.getAttribute('mission_type_id') ?? '-1';
        const bar = panel.querySelector<HTMLDivElement>(
            '.panel-body > .row > .col-xs-11'
        );
        if (!bar) return;
        bar.classList.replace('col-xs-11', 'col-xs-10');
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-xs-1');
        wrapper.style.setProperty('display', 'flex');
        wrapper.style.setProperty('justify-content', 'center');
        wrapper.style.setProperty('align-items', 'center');
        wrapper.style.setProperty('height', '20px');

        const span = document.createElement('span');
        span.classList.add('label');
        if (!LSSM.$store.state.darkmode)
            span.style.setProperty('color', 'black');
        const overlayIndex = panel.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            mission += `-${overlayIndex}`;
        const additionalOverlay =
            panel.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            mission += `/${additionalOverlay}`;
        const missionSpecs: Mission | undefined = missionsById[mission];
        span.textContent = `~ ${
            missionSpecs?.average_credits?.toLocaleString() ?? '–'
        }`;
        wrapper.append(span);
        bar.before(wrapper);
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => addCredits(panel));

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (panel) addCredits(panel);
            },
        })
        .then();
};
