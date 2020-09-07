export default (LSSM: Vue): void => {
    const btns = Array.from(
        document.querySelectorAll(
            'a[href^="/alliance_posts/"][data-method="delete"]'
        ) as NodeListOf<HTMLAnchorElement>
    );
    btns.forEach(btn => {
        btn.addEventListener('click', async e => {
            e.preventDefault();
            btn.removeAttribute('data-confirm');
            btn.removeAttribute('data-method');
            Array.from(btn.parentElement?.children || []).forEach(childBtn => {
                childBtn.classList.add('disabled');
            });
            LSSM.$modal.show('dialog', {
                title: LSSM.$t(
                    `modules.${MODULE_ID}.forumPost.deleteModal.title`
                ),
                text: LSSM.$t(
                    `modules.${MODULE_ID}.forumPost.deleteModal.text`
                ),
                buttons: [
                    {
                        title: LSSM.$t(
                            `modules.${MODULE_ID}.forumPost.deleteModal.btnCancel`
                        ),
                        default: true,
                        handler() {
                            Array.from(
                                btn.parentElement?.children || []
                            ).forEach(childBtn => {
                                childBtn.classList.remove('disabled');
                            });
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: LSSM.$t(
                            `modules.${MODULE_ID}.forumPost.deleteModal.btnConfirm`
                        ),
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
                                    },
                                })
                                .then(({ status }) => {
                                    if (status !== 200) return;
                                    btn.parentElement?.parentElement?.classList.add(
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
