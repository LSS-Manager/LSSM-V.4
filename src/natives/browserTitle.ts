export default (LSSM: Vue): void => {
    const store = LSSM.$store;

    const heading = document.querySelector('h1, h2, h3, h4, h5, h6');
    let title = '';
    if (heading) {
        title =
            heading.textContent
                ?.trim()
                .replace(/\n/g, ' ')
                .replace(/ {2,}/g, ' ') || '';
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand && navbarBrand?.textContent?.trim())
            title = `${navbarBrand?.textContent.trim()}: ${title}`;
        if (window.location !== window.parent.location) title = `[${title}] `;
        else title = `${title} | `;
    }
    window.tellParent(
        `document.title = '${title}${
            store.state.games[store.state.lang].name
        }';`
    );
    store
        .dispatch('hook', {
            event: 'lightboxClose',
            post: true,
            callback() {
                document.title = `${title}${
                    store.state.games[store.state.lang].name
                }`;
            },
        })
        .then();
};
