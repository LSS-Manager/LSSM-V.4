export default (LSSM: Vue): void => {
    // Share with alliance
    const allianceBtn = document.querySelector(
        'a.btn[href^="/buildings"][href$="alliance"]'
    );
    allianceBtn?.addEventListener('click', async e => {
        e.preventDefault();
        await LSSM.$store
            .dispatch('api/request', {
                url: allianceBtn.getAttribute('href'),
            })
            .then(
                ({ status }) =>
                    status === 200 &&
                    allianceBtn.classList.toggle('btn-danger') &&
                    allianceBtn.classList.toggle('btn-success')
            );
    });
};
