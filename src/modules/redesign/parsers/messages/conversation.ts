import type { RedesignParser } from 'typings/modules/Redesign';

interface Message {
    sender: {
        avatar: string;
        online: boolean;
        id: number;
        name: string;
    };
    timestamp: string;
    content: string;
}

export interface ConversationWindow {
    subject: string;
    lastPage: number;
    messages: Message[];
}

export default <RedesignParser<ConversationWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => ({
    subject:
        doc.querySelector<HTMLHeadingElement>('h1')?.textContent?.trim() ?? '',
    lastPage: parseInt(
        doc
            .querySelector<HTMLAnchorElement>(
                '.pagination.pagination li:nth-last-of-type(2)'
            )
            ?.textContent?.trim() ?? '1'
    ),
    messages: Array.from(doc.querySelectorAll<HTMLDivElement>('.well')).map(
        message => {
            const senderInfos = message.querySelector<HTMLElement>('strong');
            const senderLink =
                senderInfos?.querySelector<HTMLAnchorElement>(
                    'a[href^="/profile/"]'
                ) ?? null;
            const timestampEl =
                message.querySelector<HTMLSpanElement>('strong + span');
            return {
                sender: {
                    avatar:
                        senderInfos
                            ?.querySelector('img.profile_avatar')
                            ?.getAttribute('src')
                            ?.replace(/\/mini\//u, '/medium/') ?? '',
                    online:
                        senderInfos
                            ?.querySelector('img.online_icon')
                            ?.getAttribute('src') === '/images/user_green.png',
                    id: getIdFromEl(senderLink),
                    name: senderLink?.textContent?.trim() ?? '',
                },
                timestamp: timestampEl?.textContent?.trim() ?? '',
                content: Array.from(
                    message.querySelectorAll<HTMLParagraphElement>(
                        'strong + span ~ p'
                    )
                )
                    .map(p => p.outerHTML)
                    .join('\n'),
            };
        }
    ),
}));
