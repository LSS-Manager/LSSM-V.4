export default (LSSM: Vue): void => {
    document.querySelectorAll('td [id^="rights_"]').forEach(holder =>
        holder.addEventListener('click', async e => {
            e.preventDefault();
            const t = e.target as HTMLElement;
            if (!t) return;
            if (t.tagName !== 'a') return;

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
                        if (href[4] === '1') {
                            t.classList.replace('btn-success', 'btn-danger');
                            href[4] === '1' ? (href[4] = '0') : (href[4] = '1');
                            t.setAttribute('href', href.join('/'));
                            Array.from(t.parentElement?.children || []).forEach(
                                childBtn => {
                                    childBtn.classList.remove('disabled');
                                }
                            );
                        }
                    }
                });
        })
    );
};
