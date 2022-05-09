import type { RedesignParser } from 'typings/modules/Redesign';

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

export default <RedesignParser<AllianceListWindow>>(({
    doc,
    getIdFromEl = () => -1,
    LSSM,
}) => ({
    alliances: Array.from(
        doc.querySelectorAll<HTMLTableRowElement>('table tbody:last-of-type tr')
    ).map(alliance => ({
        img:
            alliance.children[0]?.querySelector<HTMLImageElement>('img')?.src ??
            '',
        credits: LSSM.$utils.getNumberFromText(
            alliance.children[2]?.textContent?.trim() ?? ''
        ),
        name: alliance.children[1]?.textContent?.trim() ?? '',
        id: getIdFromEl(
            alliance.children[1]?.querySelector<HTMLAnchorElement>('a')
        ),
        members: LSSM.$utils.getNumberFromText(
            alliance.children[3]?.textContent?.trim() ?? ''
        ),
        green: alliance.classList.contains('success'),
    })),
    lastPage: parseInt(
        doc
            .querySelector<HTMLAnchorElement>(
                '.pagination.pagination li:nth-last-of-type(2)'
            )
            ?.textContent?.trim() ?? '1'
    ),
}));
