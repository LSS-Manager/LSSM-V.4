export default (LSSM: Vue, missionSettings: string[]): void => {
    // Prisoners
    if (
        document.querySelector('.vehicle_prisoner_select') &&
        missionSettings.includes('missionPrisoners')
    ) {
        const prisonersLabel = document.getElementById('h2_prisoners');
        let currentPrisoners = parseInt(
            prisonersLabel?.textContent?.trim().match(/^\d+/)?.[0] || '0'
        );
        if (prisonersLabel && currentPrisoners) {
            document
                .getElementById('mission_vehicle_at_mission')
                ?.addEventListener('click', e => {
                    const target = e.target as HTMLElement;
                    if (
                        !target.matches(
                            'a.btn.btn-success[href^="/vehicles/"][href*="/gefangener/"], a.btn.btn-warning[href^="/vehicles/"][href*="/gefangener/"]'
                        ) ||
                        currentPrisoners <= 1
                    )
                        return;
                    e.preventDefault();
                    LSSM.$store
                        .dispatch('api/request', {
                            url: target.getAttribute('href'),
                        })
                        .then(() => {
                            const vehicleId = target.parentElement?.getAttribute(
                                'vehicle_id'
                            );
                            const amount = 1;
                            let remainingCells = -1;
                            const newTextContent =
                                target.textContent?.trim()?.replace(
                                    /(\(.*?: )(\d+)(, .*\)$)/,
                                    (_, before, cells, after) =>
                                        `${before}${(() => {
                                            remainingCells =
                                                parseInt(cells) - amount;
                                            return remainingCells;
                                        })()}${after}`
                                ) || target.textContent;
                            Array.from(
                                document.querySelectorAll(
                                    `.vehicle_prisoner_select a.btn[href$="/gefangener/${target
                                        .getAttribute('href')
                                        ?.match(/\d+$/)?.[0] || '-1'}"]`
                                )
                            ).forEach(cell => {
                                cell.textContent = newTextContent;
                                if (remainingCells <= 0) {
                                    cell.classList.replace(
                                        'btn-success',
                                        'btn-danger'
                                    );
                                    cell.classList.replace(
                                        'btn-warning',
                                        'btn-danger'
                                    );
                                }
                            });

                            document
                                .getElementById(`vehicle_row_${vehicleId}`)
                                ?.remove();
                            target.parentElement?.parentElement?.remove();
                            currentPrisoners -= amount;
                            prisonersLabel.textContent =
                                prisonersLabel.textContent
                                    ?.trim()
                                    .replace(
                                        /^\d+/,
                                        currentPrisoners.toString()
                                    ) || '';
                            if (!currentPrisoners) {
                                Array.from(
                                    document.querySelectorAll(
                                        '.vehicle_prisoner_select'
                                    )
                                ).forEach(p => p.remove());
                            }
                        });
                });
        }
    }

    // MissionReply [WIP]
    /*if (
        document.getElementById('mission_reply_mission_id') &&
        missionSettings.includes('missionReply')
    )
        (() => {
            const reply_form = document.getElementById(
                'new_mission_reply'
            ) as HTMLFormElement | null;
            if (!reply_form) return;

            reply_form.addEventListener('submit', e => {
                e.preventDefault();
                const form = document.getElementById(
                    'new_mission_reply'
                ) as HTMLFormElement | null;
                if (!form) return;
                Array.from(form.elements).forEach(item => {
                    item.classList.add('disabled');
                    item.setAttribute('disabled', 'true');
                });
                LSSM.$store
                    .dispatch('api/request', {
                        url: '/mission_replies',
                        init: {
                            method: 'POST',
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            body: new URLSearchParams(new FormData(form)),
                        },
                    })
                    .then(() => {
                        Array.from(form.elements).forEach(item => {
                            item.classList.remove('disabled');
                            item.removeAttribute('disabled');
                        });
                    });
            });
        })();*/
};
