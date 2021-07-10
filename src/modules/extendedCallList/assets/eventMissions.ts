import { MissionMarkerAdd } from 'typings/Ingame';

export default (
    LSSM: Vue,
    events: { text: string; missions: number[] }[]
): void => {
    const eventsById: Record<number, string[]> = {};
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
        const mission = parseInt(panel.getAttribute('mission_type_id') ?? '-1');
        const title = panel.querySelector<HTMLAnchorElement>(
            '.map_position_mover[id^="mission_caption_"]'
        );
        if (
            !eventsById.hasOwnProperty(mission) ||
            !title ||
            panel.querySelector(`.${wrapperClass}`)
        )
            return;
        const wrapper = document.createElement('span');
        wrapper.innerText = `[${eventsById[mission].join(' ')}]`;
        wrapper.classList.add(wrapperClass);
        wrapper.style.setProperty('margin-right', '0.5rem');
        title.before(wrapper);
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
