import { RedesignParserSrcOnly } from 'typings/modules/Redesign';

interface Entry {
    amount: number;
    desc: string;
    date: string;
}

export interface CreditsListWindow {
    entries: Entry[];
    lastPage: number;
}

export default <RedesignParserSrcOnly<CreditsListWindow>>(source => {
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
