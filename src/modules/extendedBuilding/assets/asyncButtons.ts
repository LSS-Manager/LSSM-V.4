export default (LSSM: Vue): void => {
    // Alliance Tax
    const taxBtns = Array.from(
        document.querySelectorAll('.btn-alliance_costs')
    );
    taxBtns.forEach(btn => {
        btn.addEventListener('click', async e => {
            e.preventDefault();
            taxBtns.forEach(tbtn => tbtn.classList.add('disabled'));
            await LSSM.$store
                .dispatch('api/request', {
                    url: btn.getAttribute('href'),
                })
                .then(({ status }) => {
                    if (status === 200) {
                        document
                            .querySelector('.btn-alliance_costs.btn-success')
                            ?.classList.replace('btn-success', 'btn-default');
                        btn.classList.replace('btn-default', 'btn-success');
                        taxBtns.forEach(tbtn =>
                            tbtn.classList.remove('disabled')
                        );
                    }
                });
        });
    });
};
