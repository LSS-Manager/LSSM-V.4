import moment from 'moment';

import type { RedesignParser } from 'typings/modules/Redesign';

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
    LSSM,
    doc,
    getIdFromEl = () => -1,
}) => {
    moment.locale(LSSM.$store.state.lang);
    return {
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? '1'
        ),
        messages: Array.from(
            doc.querySelectorAll<HTMLDivElement>(
                '#iframe-inside-container .well'
            )
        ).map(well => {
            const userEl = well.querySelector<HTMLAnchorElement>(
                'a[href^="/profile/"]'
            );
            return <Message>{
                author: {
                    id: getIdFromEl(userEl),
                    name: userEl?.textContent?.trim() ?? '',
                },
                datetime: moment(well.dataset.messageTime ?? 0).format(
                    'ddd, DD.MM LT'
                ),
                content: well
                    .querySelector<HTMLParagraphElement>('p')
                    ?.textContent?.trim(),
            };
        }),
    };
});
