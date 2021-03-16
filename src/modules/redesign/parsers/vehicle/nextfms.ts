export default (
    html: string,
    _: string,
    getIdFromEl: (el: HTMLAnchorElement | null) => number
): number => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return getIdFromEl(
        doc.querySelector<HTMLAnchorElement>(
            'a.btn.btn-success[href^="/vehicles/"]'
        )
    );
};
