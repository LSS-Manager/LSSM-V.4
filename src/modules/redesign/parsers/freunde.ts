import { RedesignParser } from 'typings/modules/Redesign';

interface Friend {
    name: string;
    user_id: number;
    online_icon: string;
    note: string;
    friend_id: number;
}

export interface FreundeWindow {
    friends: Friend[];
}

export default <RedesignParser<FreundeWindow>>(({ doc, getIdFromEl }) => {
    return {
        friends: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>('table tbody tr')
        ).map(row => ({
            name: row.children[1].textContent?.trim() ?? '',
            user_id: getIdFromEl(
                row.children[1].querySelector<HTMLAnchorElement>('a')
            ),
            online_icon:
                row.children[0].querySelector<HTMLImageElement>('img')?.src ??
                '/images/user_gray.png',
            note:
                row.children[2].querySelector<HTMLParagraphElement>('p')
                    ?.innerHTML ?? '',
            friend_id: parseInt(
                row.children[3]
                    .querySelector<HTMLAnchorElement>('a')
                    ?.href.match(/\d+/)?.[0] ?? '-1'
            ),
        })),
    };
});
