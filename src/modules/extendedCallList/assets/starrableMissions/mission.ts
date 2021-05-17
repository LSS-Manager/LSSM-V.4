export default (LSSM: Vue, MODULE_ID: string): void => {
    LSSM.$store
        .dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'starredMissions',
            defaultValue: [],
        })
        .then((missions: string[]) => {
            const id = window.location.pathname.match(/\d+\/?$/)?.[0];
            if (!id) return;
            const starred = missions.includes(id);
            const btn = document.createElement('button');
            btn.classList.add(
                'btn',
                'btn-xs',
                `btn-${starred ? 'warning' : 'default'}`
            );
            const icon = document.createElement('i');
            icon.classList.add(`fa${starred ? 's' : 'r'}`, 'fa-star');
            btn.append(icon);
            document
                .querySelector(
                    '#mission_general_info > div[style*="float: left;"] > img'
                )
                ?.before(btn);
            btn.addEventListener('click', () => {
                const starred = btn.classList.contains('btn-warning');
                const btnClassReplace: [string, string] = [
                    'btn-default',
                    'btn-warning',
                ];
                if (starred) btnClassReplace.reverse();
                btn.classList.replace(...btnClassReplace);
                btn.querySelector('svg')?.setAttribute(
                    'data-prefix',
                    starred ? 'far' : 'fas'
                );
                if (starred) {
                    missions.splice(
                        missions.findIndex(m => m === id),
                        1
                    );
                } else {
                    missions.push(id);
                }
                LSSM.$store
                    .dispatch('broadcast/send_custom_message', {
                        name: 'starredMissions_update',
                        handler(msg: CustomBroadcastMessage) {
                            document
                                .querySelector<HTMLButtonElement>(
                                    `button[data-mission="${msg.data.id}"]`
                                )
                                ?.click();
                        },
                        data: { id },
                    })
                    .then();
            });
        });
};
