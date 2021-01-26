import { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m, MODULE_ID: string): void => {
    const $sm = (key: string, args?: Parameters<$m>[1]) =>
        $m(`upgradeConfirmation.${key}`, args);

    const btn = document.querySelector(
        '.alert a[href$="/small_expand"]'
    ) as HTMLAnchorElement;
    if (!btn) return;
    btn.addEventListener('click', e => {
        e.preventDefault();
        btn.removeAttribute('data-method');
        LSSM.$modal.show('dialog', {
            title: $sm('modal.title'),
            text: $sm('modal.text'),
            buttons: [
                {
                    title: $sm('modal.btnCancel'),
                    default: true,
                    handler() {
                        LSSM.$modal.hide('dialog');
                    },
                },
                {
                    title: $sm('modal.btnConfirm'),
                    async handler() {
                        const url = new URL(btn.href);
                        url.searchParams.append('_method', 'post');
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
                                feature: `${MODULE_ID}-upgrade`,
                            })
                            .then(({ status }) => {
                                if (status !== 200) return;
                                window.location.reload();
                            });
                        LSSM.$modal.hide('dialog');
                    },
                },
            ]
        })
    });
};
