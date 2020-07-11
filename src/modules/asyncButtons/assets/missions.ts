export default (LSSM: Vue, missionSettings: string[]): void => {
    if (
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
        })();
};
