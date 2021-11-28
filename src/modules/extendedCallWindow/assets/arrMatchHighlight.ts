export default (LSSM: Vue): void => {
    const title = document.getElementById('missionH1');
    if (!title) return;

    const greyClass = LSSM.$store.getters.nodeAttribute('arr-grey');

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `.${greyClass}`,
            style: {
                filter: 'grayscale(0.75) !important',
                position: 'relative',
            },
        })
        .then(() => {
            const words = (
                title.textContent
                    ?.trim()
                    .split(' ')
                    .map(w => LSSM.$utils.escapeRegex(w.toLowerCase())) || []
            ).filter(w => w.length > 3);
            Array.from(
                document.querySelectorAll('.aao') as NodeListOf<
                    HTMLAnchorElement
                >
            ).forEach(arr => {
                const arrText = arr.textContent?.trim().toLowerCase() || '';
                if (!words.find(w => arrText.match(w)))
                    arr.classList.add(greyClass);
            });
        });
};
