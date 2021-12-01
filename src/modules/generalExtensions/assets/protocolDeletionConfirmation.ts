import { $m } from 'typings/Module';

export default async (
    LSSM: Vue,
    $sm: $m,
    singleState: boolean,
    MODULE_ID: string
): Promise<void> => {
    const remove_single_entry = async (
        btn: HTMLAnchorElement,
        link: string
    ) => {
        const row = document.getElementById(
            `protocol_entry_${btn.getAttribute('protocol_id')}`
        );
        if (!row) return;
        await LSSM.$store.dispatch('api/request', {
            url: link,
        });
        row.style.display = 'none';
    };

    const callback = () => {
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = LSSM.$store.getters.nodeAttribute(
            'ga-pdc-single-toggle'
        );
        toggleInput.checked = singleState;
        toggleInput.addEventListener('change', () => {
            singleState = toggleInput.checked;
            LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'deleteSingleProtocolEntry',
                value: singleState,
            });
        });
        const toggleSpan = document.createElement('span');
        toggleSpan.classList.add('pull-right');
        const toggleLabel = document.createElement('label');
        toggleLabel.setAttribute('for', toggleInput.id);
        toggleLabel.innerHTML = `${$sm('toggleSingle')}&nbsp;`;

        document
            .querySelectorAll<HTMLAnchorElement>(
                '#tab_protocol a[href$="/leitstelle-protocol-delete"]'
            )
            .forEach((btn, i) => {
                if (!i) {
                    toggleSpan.append(toggleInput, toggleLabel);
                    btn.after(toggleSpan);
                }
                const deletionLink = btn.href;
                btn.removeAttribute('href');
                btn.addEventListener('click', () => {
                    btn.classList.add('disabled');
                    btn.setAttribute('disabled', 'true');
                    LSSM.$modal.show('dialog', {
                        title: $sm('all.title'),
                        text: $sm('all.text'),
                        buttons: [
                            {
                                title: $sm('cancel'),
                                default: true,
                                handler() {
                                    btn.classList.remove('disabled');
                                    btn.removeAttribute('disabled');
                                    LSSM.$modal.hide('dialog');
                                },
                            },
                            {
                                title: $sm('confirm'),
                                handler() {
                                    window.location.replace(deletionLink);
                                },
                            },
                        ],
                    });
                });
            });
        document
            .querySelectorAll<HTMLAnchorElement>(
                '#tab_protocol a.leitstelle_delete_protocol_entry'
            )
            .forEach(btn => {
                const newBtn = btn.cloneNode(true) as HTMLAnchorElement;
                btn.after(newBtn);
                btn.remove();
                const deletionLink = newBtn.href;
                newBtn.removeAttribute('href');
                newBtn.addEventListener('click', e => {
                    if (!toggleInput.checked)
                        return remove_single_entry(newBtn, deletionLink);
                    e.preventDefault();
                    newBtn.classList.add('disabled');
                    newBtn.setAttribute('disabled', 'true');
                    LSSM.$modal.show('dialog', {
                        title: $sm('single.title'),
                        text: $sm('single.text'),
                        buttons: [
                            {
                                title: $sm('cancel'),
                                default: true,
                                handler() {
                                    newBtn.classList.remove('disabled');
                                    newBtn.removeAttribute('disabled');
                                    LSSM.$modal.hide('dialog');
                                },
                            },
                            {
                                title: $sm('confirm'),
                                async handler() {
                                    await remove_single_entry(
                                        newBtn,
                                        deletionLink
                                    );
                                    LSSM.$modal.hide('dialog');
                                },
                            },
                        ],
                    });
                });
            });
    };
    callback();

    await LSSM.$store.dispatch('observeAsyncTab', {
        tabSelector: '#tab_protocol',
        callback,
    });
};
