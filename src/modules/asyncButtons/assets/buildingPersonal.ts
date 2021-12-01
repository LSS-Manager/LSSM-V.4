import { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m, MODULE_ID: string): void => {
    const $sm = (key: string, args?: Parameters<$m>[1]) =>
        $m(`buildingPersonal.${key}`, args);
    const btns = Array.from(
        document.querySelectorAll(
            'a[href^="/personals/"][data-method="delete"]'
        ) as NodeListOf<HTMLAnchorElement>
    );
    btns.forEach(btn => {
        btn.addEventListener('click', async e => {
            e.preventDefault();
            btn.removeAttribute('data-confirm');
            btn.removeAttribute('data-method');
            LSSM.$modal.show('dialog', {
                title: $sm('deleteModal.title'),
                text: $sm('deleteModal.text'),
                buttons: [
                    {
                        title: $sm('deleteModal.btnCancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: $sm('deleteModal.btnConfirm'),
                        async handler() {
                            const url = new URL(btn.href);
                            url.searchParams.append('_method', 'delete');
                            url.searchParams.append(
                                'authenticity_token',
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute('content') || ''
                            );
                            await LSSM.$store
                                .dispatch('api/request', {
                                    url: btn.href,
                                    init: {
                                        method: 'POST',
                                        body: url.searchParams.toString(),
                                        credentials: 'include',
                                        mode: 'cors',
                                        headers: {
                                            'Accept':
                                                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                                            'Content-Type':
                                                'application/x-www-form-urlencoded',
                                            'Upgrade-Insecure-Requests': '1',
                                        },
                                    },
                                    feature: `${MODULE_ID}-buildingPersonal`,
                                })
                                .then(({ status }) => {
                                    if (status !== 200) return;
                                    btn.parentElement?.parentElement?.parentElement?.classList.add(
                                        'hide'
                                    );
                                });
                            LSSM.$modal.hide('dialog');
                        },
                    },
                ],
            });
        });
    });
};
