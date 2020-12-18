import { $m } from 'typings/Module';

export default async (LSSM: Vue, $sm: $m): Promise<void> => {
    const callback = () => {
        document
            .querySelectorAll<HTMLAnchorElement>(
                '#tab_protocol a[href$="/leitstelle-protocol-delete"]'
            )
            .forEach(btn => {
                const deletionLink = btn.href;
                btn.removeAttribute('href');
                btn.addEventListener('click', () => {
                    btn.classList.add('disabled');
                    btn.setAttribute('disabled', 'true');
                    LSSM.$modal.show('dialog', {
                        title: $sm('title'),
                        text: $sm('text'),
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
                                async handler() {
                                    window.location.replace(deletionLink);
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
