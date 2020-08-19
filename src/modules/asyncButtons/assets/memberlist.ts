export default (LSSM: Vue): void => {
    const roles = {
        ...((LSSM.$t(`modules.${MODULE_ID}.memberlistRoles`) as unknown) as {
            [role: string]: string;
        }),
        '': '',
    } as {
        [role: string]: string;
    };

    const storeDispatch = async (
        roleHolder: HTMLElement,
        rights: string[],
        t: HTMLAnchorElement
    ) => {
        await LSSM.$store
            .dispatch('api/request', {
                url: t.getAttribute('href'),
            })
            .then(({ status }) => {
                if (status !== 200) return;
                const href = t.getAttribute('href')?.split('/');
                if (!href) return;
                if (href[2] === 'kick') {
                    return t?.parentElement?.parentElement?.parentElement?.classList.add(
                        'hidden'
                    );
                } else {
                    const set = href[4] === '1';
                    if (set) {
                        t.classList.replace('btn-success', 'btn-danger');
                        href[4] = '0';
                        t.textContent =
                            t.textContent?.replace(setText, unsetText) || '';
                        rights.push(
                            roles[
                                t.pathname.match(
                                    /(?<=\/verband\/)[^/]*/
                                )?.[0] || ''
                            ]
                        );
                    } else {
                        t.classList.replace('btn-danger', 'btn-success');
                        href[4] = '1';
                        t.textContent =
                            t.textContent?.replace(unsetText, setText) || '';
                        rights.splice(
                            rights.findIndex(
                                r =>
                                    r ===
                                    roles[
                                        t.pathname.match(
                                            /(?<=\/verband\/)[^/]*/
                                        )?.[0] || ''
                                    ]
                            ),
                            1
                        );
                    }

                    if (rights.includes(roles['admin']))
                        roleHolder.textContent = roles['admin'];
                    else roleHolder.textContent = rights.sort().join(', ');

                    t.setAttribute('href', href.join('/'));
                    Array.from(t.parentElement?.children || []).forEach(
                        childBtn => {
                            childBtn.classList.remove('disabled');
                        }
                    );
                }
            });
    };

    const setText = LSSM.$t(
        `modules.${MODULE_ID}.memberlistManageUser.set`
    ).toString();
    const unsetText = LSSM.$t(
        `modules.${MODULE_ID}.memberlistManageUser.unset`
    ).toString();
    (document.querySelectorAll('td [id^="rights_"]') as NodeListOf<
        HTMLDivElement
    >).forEach(holder => {
        const hideBtn = document.createElement('a');
        hideBtn.classList.add('btn', 'btn-xs', 'btn-default');
        hideBtn.href = '#';
        hideBtn.textContent = LSSM.$t(
            `modules.${MODULE_ID}.memberlistManageUser.hide`
        ).toString();
        hideBtn.onclick = () => {
            $(holder).hide('fast');
            if (holder.previousElementSibling)
                $(holder.previousElementSibling).show('fast');
        };
        holder.prepend(hideBtn);
        const roleHolder = holder.parentElement?.parentElement?.querySelector(
            'td:nth-of-type(2) small'
        ) as HTMLElement | null;
        if (!roleHolder) return;
        const rights = Array.from(
            holder.querySelectorAll('a[href$="/0"]') as NodeListOf<
                HTMLAnchorElement
            >
        ).map(a => roles[a.pathname.match(/(?<=\/verband\/)[^/]*/)?.[0] || '']);
        holder.addEventListener('click', async e => {
            e.preventDefault();
            const t = e.target as HTMLAnchorElement | null;
            if (!t || t.tagName !== 'A') return;

            t.removeAttribute('data-confirm');

            Array.from(t.parentElement?.children || []).forEach(childBtn => {
                childBtn.classList.add('disabled');
            });
            if (t.getAttribute('href')?.split('/')[2] === 'kick') {
                LSSM.$modal.show('dialog', {
                    title: LSSM.$t(
                        `modules.${MODULE_ID}.memberlistManageUser.kickModal.title`
                    ),
                    text: LSSM.$t(
                        `modules.${MODULE_ID}.memberlistManageUser.kickModal.text`
                    ),
                    buttons: [
                        {
                            title: LSSM.$t(
                                `modules.${MODULE_ID}.memberlistManageUser.kickModal.btnCancel`
                            ),
                            default: true,
                            handler() {
                                Array.from(
                                    t.parentElement?.children || []
                                ).forEach(childBtn => {
                                    childBtn.classList.remove('disabled');
                                });
                                LSSM.$modal.hide('dialog');
                            },
                        },
                        {
                            title: LSSM.$t(
                                `modules.${MODULE_ID}.memberlistManageUser.kickModal.btnConfirm`
                            ),
                            handler() {
                                storeDispatch(roleHolder, rights, t);
                                LSSM.$modal.hide('dialog');
                            },
                        },
                    ],
                });
            } else {
                await storeDispatch(roleHolder, rights, t);
            }
        });
    });
};
