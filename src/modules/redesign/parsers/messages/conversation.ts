import type { RedesignParser } from 'typings/modules/Redesign';

interface Message {
    sender: {
        avatar: string;
        online: boolean;
        id: number;
        name: string;
        isAlliance: boolean;
    };
    timestamp: string;
    content: string;
}

export interface ConversationWindow {
    subject: string;
    lastPage: number;
    id: number;
    messages: Message[];
}

export default <RedesignParser<ConversationWindow>>(({
    doc,
    href,
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
    id: parseInt(
        new URL(href ?? '/', window.location.origin).pathname.split('/')[2]
    ),
    messages: Array.from(doc.querySelectorAll<HTMLDivElement>('.well')).map(
        message => {
            const senderInfos = message.querySelector<HTMLElement>('strong');
            const senderLink =
                (senderInfos ?? message).querySelector<HTMLAnchorElement>(
                    'a[href^="/profile/"], a[href^="/alliances/"]'
                ) ?? null;
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
                    isAlliance: /^\/alliances\//u.test(
                        senderLink?.getAttribute('href') ?? ''
                    ),
                },
                timestamp: message.dataset.messageTime ?? '',
                content: Array.from(
                    message.querySelectorAll<HTMLParagraphElement>(
                        `${
                            senderInfos ? 'strong' : 'a[href^="/alliances/"]'
                        } + span ~ p`
                    )
                )
                    .map(p => p.outerHTML)
                    .join('\n'),
            };
        }
    ),
}));
