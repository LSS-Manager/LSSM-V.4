import type { RedesignParser } from 'typings/modules/Redesign';

export interface SystemMessageWindow {
    title: string;
    content: string;
}

export default <RedesignParser<SystemMessageWindow>>(({ doc }) => ({
    title:
        doc.querySelector<HTMLHeadingElement>('h1')?.textContent?.trim() ?? '',
    content:
        doc.querySelector<HTMLDivElement>('.system_message_content_container')
            ?.innerHTML ?? '',
}));
