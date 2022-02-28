import type { MissionMarkerAdd } from 'typings/Ingame';

export default (
    LSSM: Vue,
    events: { text: string; missions: string[] }[]
): void => {
    const eventsById: Record<string, string[]> = {};
    events.forEach(({ text, missions }) =>
        missions.forEach(mission => {
            if (!eventsById.hasOwnProperty(mission)) eventsById[mission] = [];
            eventsById[mission].push(text);
        })
    );

    const wrapperClass = LSSM.$store.getters.nodeAttribute(
        'ecl-eventmission-wrapper'
    );

    const checkEvent = (panel: HTMLDivElement): void => {
        let mission = panel.getAttribute('mission_type_id') ?? '-1';
        const title = panel.querySelector<HTMLAnchorElement>(
            '.map_position_mover[id^="mission_caption_"]'
        );
        const overlayIndex = panel.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            mission += `-${overlayIndex}`;
        const additionalOverlay =
            panel.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            mission += `/${additionalOverlay}`;
        if (
            !eventsById.hasOwnProperty(mission) ||
            !title ||
            panel.querySelector(`.${wrapperClass}`)
        )
            return;
        const wrapper = document.createElement('span');
        wrapper.textContent = `[${eventsById[mission].join(' ')}]`;
        wrapper.classList.add(wrapperClass);
        wrapper.style.setProperty('margin-right', '0.5rem');
        title.before(wrapper);

        const searchAttr = panel.getAttribute('search_attribute') ?? '';
        if (!searchAttr.includes(wrapper.textContent)) {
            panel.setAttribute(
                'search_attribute',
                `${searchAttr} ${wrapper.textContent}`
            );
        }
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => checkEvent(panel));

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (panel) checkEvent(panel);
            },
        })
        .then();
};
