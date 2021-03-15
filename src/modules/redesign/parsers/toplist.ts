interface Entry {
    img: string;
    credits: number;
    name: string;
    id: number;
    online: boolean;
    alliance: {
        id: number;
        name: string;
    };
}

export interface TopListWindow {
    entries: Entry[];
    lastPage: number;
}

export default (
    source: string,
    _: string,
    getIdFromEl: (el: HTMLAnchorElement | null) => number
): TopListWindow => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '0'
        );
    return {
        entries: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>(
                'table tbody:last-of-type tr'
            )
        ).map(entry => ({
            img:
                entry.children[0]?.querySelector<HTMLImageElement>('img')
                    ?.src ?? '',
            credits: getNum(entry.children[1]),
            name: entry.children[2]?.textContent?.trim() ?? '',
            id: getIdFromEl(
                entry.children[2]?.querySelector<HTMLAnchorElement>('a')
            ),
            online: !!entry.children[2].querySelector<HTMLImageElement>(
                'img[src="/images/user_green.png"]'
            ),
            alliance: {
                name: entry.children[3]?.textContent?.trim() ?? '',
                id: getIdFromEl(
                    entry.children[3]?.querySelector<HTMLAnchorElement>('a')
                ),
            },
        })),
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? '1'
        ),
    };
};
