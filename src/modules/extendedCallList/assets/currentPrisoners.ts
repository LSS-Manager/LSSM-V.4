import type { MissionMarkerAdd, PrisonerMarkerAdd } from 'typings/Ingame';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    hide0CurrentPrisoners: boolean,
    currentPrisonersInTooltips: boolean
) => {
    LSSM.$store.commit('useFontAwesome');

    const prisonersHolderClass: string = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-current_prisoners`
    );

    const setPrisoners = (mission: HTMLDivElement, count = 0) => {
        let prisonersHolder = mission.querySelector<HTMLSpanElement>(
            `.${prisonersHolderClass}`
        );
        if (!prisonersHolder) {
            const wrapper = document.createElement('span');
            wrapper.classList.add('pull-right');
            wrapper.style.setProperty('white-space', 'nowrap');
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-handcuffs', 'fa-fw');
            icon.style.setProperty('margin-left', '0.2em');
            icon.style.setProperty('margin-right', '0.2em');
            prisonersHolder = document.createElement('span');
            prisonersHolder.classList.add(prisonersHolderClass);
            wrapper.append(icon, prisonersHolder);
            mission.querySelector('.panel-heading')?.append(wrapper);
        }
        let amount = count;
        if (!count) {
            const prisonersHolder = mission.querySelector(
                '.mission_prisoners[id^="mission_prisoners_"]'
            );
            if (prisonersHolder) {
                amount = prisonersHolder.querySelectorAll(
                    '.small[id^="prisoner_"]'
                ).length;
            }
        }
        prisonersHolder.textContent = amount.toLocaleString();

        prisonersHolder.parentElement?.classList[
            hide0CurrentPrisoners && !amount ? 'add' : 'remove'
        ]('hidden');

        if (
            currentPrisonersInTooltips &&
            (amount || (!amount && !hide0CurrentPrisoners))
        ) {
            window.mission_markers
                .find(
                    m =>
                        m.mission_id ==
                        parseInt(mission.getAttribute('mission_id') ?? '-1')
                )
                ?.getTooltip()
                ?.setContent(
                    `${
                        mission.querySelector(`a[id^="mission_caption_"]`)
                            ?.innerHTML
                    }<i class="fa fa-handcuffs" style="margin-left: 0.2em; width: 0.875em"></i> ${amount.toLocaleString()}`
                );
        }
    };

    document
        .querySelectorAll<HTMLDivElement>(
            '#missions-panel-body .missionSideBarEntry'
        )
        .forEach(panel => setPrisoners(panel));

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (panel) setPrisoners(panel);
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'prisonerMarkerAdd',
            post: true,
            callback(marker: PrisonerMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.mission_id}`
                );
                if (panel) setPrisoners(panel);
            },
        })
        .then();
};
