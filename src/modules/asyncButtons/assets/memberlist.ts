export default (LSSM: Vue): void => {
    const setText = LSSM.$t(
        `modules.${MODULE_ID}.memberlistManageUser.set`
    ).toString();
    const unsetText = LSSM.$t(
        `modules.${MODULE_ID}.memberlistManageUser.unset`
    ).toString();
    document.querySelectorAll('td [id^="rights_"]').forEach(holder =>
        holder.addEventListener('click', async e => {
            e.preventDefault();
            const t = e.target as HTMLElement | null;
            if (!t || t.tagName !== 'A') return;

            Array.from(t.parentElement?.children || []).forEach(childBtn => {
                childBtn.classList.add('disabled');
            });

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
                                t.textContent?.replace(setText, unsetText) ||
                                '';
                        } else {
                            t.classList.replace('btn-danger', 'btn-success');
                            href[4] = '1';
                            t.textContent =
                                t.textContent?.replace(unsetText, setText) ||
                                '';
                        }
                        t.setAttribute('href', href.join('/'));
                        Array.from(t.parentElement?.children || []).forEach(
                            childBtn => {
                                childBtn.classList.remove('disabled');
                            }
                        );
                    }
                });
        })
    );
};
