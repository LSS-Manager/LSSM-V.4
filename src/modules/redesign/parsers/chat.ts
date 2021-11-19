import { RedesignParser } from 'typings/modules/Redesign';

interface User {
    name: string;
    id: number;
}

interface Message {
    author: User;
    datetime: string;
    content: string;
}

export interface VerbandChatWindow {
    lastPage: number;
    messages: Message[];
}

export default <RedesignParser<VerbandChatWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => ({
    lastPage: parseInt(
        doc
            .querySelector<HTMLAnchorElement>(
                '.pagination.pagination li:nth-last-of-type(2)'
            )
            ?.textContent?.trim() ?? '1'
    ),
    messages: Array.from(
        doc.querySelectorAll<HTMLDivElement>('#iframe-inside-container .well')
    ).map(well => {
        const userEl = well.querySelector<HTMLAnchorElement>(
            'a[href^="/profile/"]'
        );
        return <Message>{
            author: {
                id: getIdFromEl(userEl),
                name: userEl?.textContent?.trim() ?? '',
            },
            datetime: well
                .querySelector<HTMLSpanElement>('span.pull-right')
                ?.textContent?.trim(),
            content: well
                .querySelector<HTMLParagraphElement>('p')
                ?.textContent?.trim(),
        };
    }),
}));
