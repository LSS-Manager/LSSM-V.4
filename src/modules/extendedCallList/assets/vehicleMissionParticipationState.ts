export default async (LSSM: Vue, MODULE_ID: string): Promise<void> => {
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: `${MODULE_ID}-vehicleMissionParticipitationState`,
    });

    const missions: number[] = LSSM.$store.getters['api/participatedMissions'];
    document
        .querySelectorAll<HTMLTableRowElement>(
            '#mission_own table tbody tr, #mission_alliance table tbody tr'
        )
        .forEach(row => {
            const span = document.createElement('span');
            span.classList.add(
                'glyphicon',
                missions.includes(
                    parseInt(
                        row
                            .querySelector<HTMLAnchorElement>(
                                'a[href^="/missions/"]'
                            )
                            ?.getAttribute('href')
                            ?.replace(/.*?(?=\d+$)/, '') ?? '-1'
                    )
                )
                    ? 'glyphicon-user'
                    : 'glyphicon-asterisk'
            );
            row.firstElementChild?.append(span);
        });
};
