document.addEventListener('click', e => {
    // linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]"
    const target = (e.target as HTMLElement | null)?.closest(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $.rails.linkClickSelector
    ) as HTMLAnchorElement | null;
    if (!target) return;
    const confirmation = target.getAttribute('data-confirm');
    const o = target.getAttribute('data-method');
    const s = target.getAttribute('data-params');
    if (confirmation) {
        // return if not confirmed
    }
    // disable if disabled selector
    // if attr data-remote defined do-remote
    // if not data-method send request
    // else handle method

    // do-remote:
    // if (neither ctrl nor meta pressed) or (method not get) or data-params defined
    // handle-remote
    // if handle-remote was false enable element
    // else error and enable element
});
