import config from '../../../config';

export default (LSSM: Vue): void => {
    const findTitle = (redesign = false): string => {
        const heading = document.querySelector(
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
                .map(h => `${redesign ? '.redesign-wrapper ' : ''}${h}`)
                .join(',')
        );
        let title =
            window.location.pathname === '/' ?
                ''
            :   Array.from(heading?.childNodes ?? [])
                    ?.find(node => node.nodeType === Node.TEXT_NODE)
                    ?.textContent?.trim()
                    .replace(/\n/gu, ' ')
                    .replace(/ {2,}/gu, ' ') ||
                window.location.pathname.replace(/^\/|\/[ADJUgimux]*$/gu, '');
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand && navbarBrand?.textContent?.trim())
            title = `${navbarBrand?.textContent.trim()}: ${title}`;
        if (
            window.location !== window.parent.location &&
            title.length &&
            !window.parent.hasOwnProperty('lssmv4-redesign-lightbox')
        )
            title = `[${title}] `;
        else if (title.length) title = `${title} | `;
        window.tellParent(
            `var _a;
        if (((_a = document.getElementById('lightbox_box')) === null || _a === void 0 ? void 0 : _a.style.display) !== 'none') document.title = ${JSON.stringify(
            title + config.games[LSSM.$stores.root.locale].name
        )};`
        );
        return title;
    };

    findTitle();

    LSSM.$stores.root.hook({
        event: 'lightboxClose',
        post: true,
        callback() {
            document.title = `${findTitle()}${
                config.games[LSSM.$stores.root.locale].name
            }`;
        },
    });

    LSSM.$stores.event.addListener({
        name: 'redesign-finished-loading',
        listener: () => findTitle(true),
    });
};
