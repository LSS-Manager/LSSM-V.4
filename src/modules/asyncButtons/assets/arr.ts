import type { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m, MODULE_ID: string): void => {
    const $sm = (key: string, args?: Parameters<$m>[1]) =>
        $m(`deleteARR.${key}`, args);
    const btns = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
            'a[href^="/aaos/"][data-method="delete"]'
        )
    );
    btns.forEach(btn => {
        btn.addEventListener('click', async e => {
            e.preventDefault();
            btn.removeAttribute('data-method');
            Array.from(
                btn.parentElement?.parentElement?.children || []
            ).forEach(childBtn => {
                childBtn.classList.add('disabled');
            });
            LSSM.$modal.show('dialog', {
                title: $sm('deleteModal.title'),
                text: $sm('deleteModal.text'),
                buttons: [
                    {
                        title: $sm('deleteModal.btnCancel'),
                        default: true,
                        handler() {
                            Array.from(
                                btn.parentElement?.parentElement?.children || []
                            ).forEach(childBtn => {
                                childBtn.classList.remove('disabled');
                            });
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
                            await LSSM.$stores.api
                                .request(btn.href, `${MODULE_ID}-arr`, {
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
