export default (LSSM: Vue, missionSettings: string[]): void => {
    // Prisoners
    if (
        document.querySelector('.vehicle_prisoner_select') &&
        missionSettings.includes('missionPrisoners')
    )
        document
            .getElementById('mission_vehicle_at_mission')
            ?.addEventListener('click', e => {
                const target = e.target as HTMLElement;
                if (
                    !target.matches(
                        'a.btn.btn-success[href^="/vehicles/"][href*="/gefangener/"], a.btn.btn-warning[href^="/vehicles/"][href*="/gefangener/"]'
                    )
                )
                    return;
                e.preventDefault();
                LSSM.$store
                    .dispatch('api/request', {
                        url: target.getAttribute('href'),
                    })
                    .then(() => {
                        const vehicleId = target.getAttribute('vehicle_id');
                        target.parentElement?.parentElement?.remove();
                        document
                            .getElementById(`vehicle_row_${vehicleId}`)
                            ?.remove();
                        // TODO: Remove all prisoner selections when all prisoners transported
                    });
            });

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
