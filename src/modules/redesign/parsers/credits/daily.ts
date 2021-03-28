import { RedesignParser } from 'typings/modules/Redesign';

interface Entry {
    total: number;
    average: number;
    amount: number;
    desc: string;
}

export interface CreditsDailyWindow {
    entries: Entry[];
}

export default <RedesignParser<CreditsDailyWindow>>(source => {
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
            doc.querySelectorAll<HTMLTableRowElement>('#daily_table tbody tr')
        ).map(entry => ({
            total: getNum(entry.children[0]),
            average: getNum(entry.children[1]),
            amount: getNum(entry.children[2]),
            desc: entry.children[3]?.textContent?.trim() ?? '',
        })),
    };
});
