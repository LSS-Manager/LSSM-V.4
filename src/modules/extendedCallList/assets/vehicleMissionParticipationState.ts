export default async (LSSM: Vue, MODULE_ID: string): Promise<void> => {
    await LSSM.$stores.api.getVehicles(
        `${MODULE_ID}-vehicleMissionParticipitationState`
    );

    const missions = LSSM.$stores.api.participatedMissions;
    document
        .querySelectorAll<HTMLTableRowElement>(
            '#mission_own table thead tr th:nth-child(2), #mission_alliance table  thead tr th:nth-child(2)'
        )
        .forEach(th => th.remove());
    document
        .querySelectorAll<HTMLTableRowElement>(
            '#mission_own table tbody tr, #mission_alliance table tbody tr'
        )
        .forEach(row => {
            row
                .querySelector(
                    '.glyphicon.glyphicon-user, .glyphicon.glyphicon-asterisk'
                )
                ?.parentElement?.remove();
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
                            ?.match(/\d+$/u)?.[0] ?? '-1'
                    )
                )
                    ? 'glyphicon-user'
                    : 'glyphicon-asterisk'
            );
            row.firstElementChild?.append(span);
        });
};
