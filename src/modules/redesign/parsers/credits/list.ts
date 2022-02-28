import type { RedesignParser } from 'typings/modules/Redesign';

interface Entry {
    amount: number;
    desc: string;
    date: string;
}

export interface CreditsListWindow {
    entries: Entry[];
    lastPage: number;
}

export default <RedesignParser<CreditsListWindow>>(({ LSSM, doc }) => {
    const getNum = (el: Element | null) =>
        LSSM.$utils.getNumberFromText(el?.textContent?.trim() ?? '0');
    return {
        entries: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>('table tbody tr')
        ).map(entry => ({
            amount: getNum(entry.children[0]),
            desc: entry.children[1]?.textContent?.trim() ?? '',
            date: entry.children[2]?.textContent?.trim() ?? '',
        })),
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? Number.MAX_SAFE_INTEGER.toString()
        ),
    };
});
