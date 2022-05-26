export default () => {
    const releaseBtn = document
        .querySelector<HTMLAnchorElement>(
            'a[href^="/vehicles/"][href$="/patient/-1"]'
        )
        ?.cloneNode(true);
    if (!releaseBtn || !(releaseBtn instanceof HTMLAnchorElement)) return;

    releaseBtn.classList.add('pull-right');

    document
        .querySelector<HTMLHeadingElement>('#h2_sprechwunsch')
        ?.append(releaseBtn);
};
