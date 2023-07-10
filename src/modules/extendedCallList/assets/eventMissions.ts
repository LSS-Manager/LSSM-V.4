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

    const wrapperClass = LSSM.$stores.root.nodeAttribute(
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
        if (!eventsById.hasOwnProperty(mission) || !title) return;

        const prefix = `[${eventsById[mission].join(' ')}]`;

        if (!panel.querySelector(`.${wrapperClass}`)) {
            const wrapper = document.createElement('span');
            wrapper.textContent = prefix;
            wrapper.classList.add(wrapperClass);
            wrapper.style.setProperty('margin-right', '0.5rem');
            title.before(wrapper);
        }

        const searchAttr = panel.getAttribute('search_attribute') ?? '';
        if (!searchAttr.includes(prefix)) {
            panel.setAttribute('search_attribute', `${searchAttr} ${prefix}`);
            window.searchMission();
        }
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => checkEvent(panel));

    LSSM.$stores.root.hook({
        event: 'missionMarkerAdd',
        callback(marker: MissionMarkerAdd) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.id}`
            );
            if (panel) checkEvent(panel);
        },
    });
};
