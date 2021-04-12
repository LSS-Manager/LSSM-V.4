import { RedesignParser } from 'typings/modules/Redesign';

interface Alliance {
    img: string;
    credits: number;
    name: string;
    id: number;
    members: number;
    green: boolean;
}

export interface AllianceListWindow {
    alliances: Alliance[];
    lastPage: number;
}

export default <RedesignParser<AllianceListWindow>>(({ doc, getIdFromEl }) => {
    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '0'
        );
    return {
        alliances: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>(
                'table tbody:last-of-type tr'
            )
        ).map(alliance => ({
            img:
                alliance.children[0]?.querySelector<HTMLImageElement>('img')
                    ?.src ?? '',
            credits: getNum(alliance.children[2]),
            name: alliance.children[1]?.textContent?.trim() ?? '',
            id: getIdFromEl(
                alliance.children[1]?.querySelector<HTMLAnchorElement>('a')
            ),
            members: getNum(alliance.children[3]),
            green: alliance.classList.contains('success'),
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
