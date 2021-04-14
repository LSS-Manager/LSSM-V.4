import { RedesignParser } from 'typings/modules/Redesign';

interface Entry {
    total: number;
    minus: number;
    plus: number;
}

export interface CreditsOverviewWindow {
    entries: Entry[];
}

export default <RedesignParser<CreditsOverviewWindow>>(({ doc }) => {
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
        )
            .map(entry => ({
                total: getNum(entry.children[0]),
                minus: getNum(entry.children[1]),
                plus: getNum(entry.children[2]),
            }))
            .reverse(),
    };
});
