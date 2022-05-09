export default (
    LSSM: Vue,
    missionSettings: string[],
    MODULE_ID: string
): void => {
    // Prisoners
    if (
        document.querySelector('.vehicle_prisoner_select') &&
        missionSettings.includes('missionPrisoners')
    ) {
        const prisonersLabel =
            document.querySelector<HTMLHeadingElement>('#h2_prisoners');
        let currentPrisoners = parseInt(
            prisonersLabel?.textContent?.trim().match(/^\d+/u)?.[0] || '0'
        );
        if (prisonersLabel && currentPrisoners) {
            document
                .querySelector<HTMLTableElement>('#mission_vehicle_at_mission')
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
                            feature: `${MODULE_ID}-missions-prisoners`,
                        })
                        .then(() => {
                            const vehicleId =
                                target.parentElement?.getAttribute(
                                    'vehicle_id'
                                );
                            const amount = 1;
                            let remainingCells = -1;
                            const newTextContent =
                                target.textContent?.trim()?.replace(
                                    /(\(.*?: )(\d+)(, .*\)$)/u,
                                    (_, before, cells, after) =>
                                        `${before}${(() => {
                                            remainingCells =
                                                parseInt(cells) - amount;
                                            return remainingCells;
                                        })()}${after}`
                                ) || target.textContent;
                            Array.from(
                                document.querySelectorAll(
                                    `.vehicle_prisoner_select a.btn[href$="/gefangener/${
                                        target
                                            .getAttribute('href')
                                            ?.match(/\d+$/u)?.[0] || '-1'
                                    }"]`
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
                                .querySelector<HTMLTableRowElement>(
                                    `#vehicle_row_${vehicleId}`
                                )
                                ?.remove();
                            target.parentElement?.parentElement?.remove();
                            currentPrisoners -= amount;
                            prisonersLabel.textContent =
                                prisonersLabel.textContent
                                    ?.trim()
                                    .replace(
                                        /^\d+/u,
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

    // MissionReply
    const replyButton = document.querySelector<HTMLButtonElement>(
        '#mission_reply_content ~ div button[type="submit"]'
    );
    const replyInputField = document.querySelector<HTMLInputElement>(
        '#mission_reply_content'
    );
    if (
        missionSettings.includes('missionReply') &&
        replyButton &&
        replyInputField
    ) {
        replyButton.disabled = !replyInputField.value;
        replyInputField.addEventListener(
            'input',
            () => (replyButton.disabled = !replyInputField.value)
        );
        replyButton.addEventListener('click', e => {
            e.preventDefault();

            const message = replyInputField.value;
            if (!message) return;

            replyButton.disabled = true;
            replyInputField.disabled = true;

            const url = new URL('/mission_replies', window.location.origin);
            url.searchParams.append('utf8', '✓');
            const authToken =
                document.querySelector<HTMLMetaElement>(
                    'meta[name="csrf-token"]'
                )?.content ?? '';
            url.searchParams.append('authenticity_token', authToken);
            url.searchParams.append('mission_reply[alliance_chat]', '0');
            if (
                document.querySelector<HTMLInputElement>(
                    '#mission_reply_alliance_chat'
                )?.checked
            )
                url.searchParams.append('mission_reply[alliance_chat]', '1');

            url.searchParams.append('mission_reply[content]', message);

            const missionId = window.location.pathname.split('/')[2];
            url.searchParams.append(
                'mission_reply[mission_id]',
                missionId.toString()
            );
            LSSM.$store
                .dispatch('api/request', {
                    url: '/mission_replies',
                    feature: `${MODULE_ID}_missionReply`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                })
                .then(() => {
                    let missionReplies =
                        document.querySelector<HTMLUListElement>(
                            '#mission_replies'
                        );
                    if (!missionReplies) {
                        missionReplies = document.createElement('ul');
                        missionReplies.id = 'mission_replies';
                        document
                            .querySelector<HTMLDivElement>(
                                '#new_mission_reply + .clearfix'
                            )
                            ?.after(missionReplies);
                    }

                    const reply = document.createElement('li');
                    reply.setAttribute('title', new Date().toLocaleString());
                    const userLink = document.createElement('a');
                    userLink.setAttribute('href', `/profile/${user_id}`);
                    userLink.textContent = window.username;
                    reply.append(
                        document.createTextNode(
                            `[${new Date().toLocaleTimeString(undefined, {
                                hour12: false,
                                timeStyle: 'short',
                            })}] `
                        ),
                        userLink,
                        document.createTextNode(`: ${message}`)
                    );

                    missionReplies.prepend(reply);

                    replyButton.disabled = true;
                    replyInputField.value = '';
                    replyInputField.disabled = false;
                });
        });
    }
};
