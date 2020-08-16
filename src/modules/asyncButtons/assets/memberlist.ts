export default (LSSM: Vue, memberlistSettings: string[]): void => {
    // Kick Button
    if (memberlistSettings.includes('kick')) {
        const kickBtns = Array.from(
            document.querySelectorAll('td div[id^="rights_"] a:nth-of-type(1)')
        );
        kickBtns.forEach(btn => {
            btn.addEventListener('click', async e => {
                e.preventDefault();
                await LSSM.$store
                    .dispatch('api/request', {
                        url: btn.getAttribute('href'),
                    })
                    .then(({ status }) => {
                        if (status == 200) {
                            btn.parentElement?.parentElement?.parentElement?.classList.add(
                                'hidden'
                            );
                        }
                    });
            });
        });
    }
};
