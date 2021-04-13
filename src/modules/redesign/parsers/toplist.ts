import { RedesignParser } from 'typings/modules/Redesign';

interface User {
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
    users: User[];
    lastPage: number;
}

export default <RedesignParser<TopListWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => {
    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '0'
        );
    return {
        users: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>(
                'table tbody:last-of-type tr'
            )
        ).map(user => ({
            img:
                user.children[0]?.querySelector<HTMLImageElement>('img')?.src ??
                '',
            credits: getNum(user.children[1]),
            name: user.children[2]?.textContent?.trim() ?? '',
            id: getIdFromEl(
                user.children[2]?.querySelector<HTMLAnchorElement>('a')
            ),
            online: !!user.children[2].querySelector<HTMLImageElement>(
                'img[src="/images/user_green.png"]'
            ),
            alliance: {
                name: user.children[3]?.textContent?.trim() ?? '',
                id: getIdFromEl(
                    user.children[3]?.querySelector<HTMLAnchorElement>('a')
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
});
