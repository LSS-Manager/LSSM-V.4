import type { ModuleMainFunction } from 'typings/Module';

export interface ConversationMessageTemplate {
    name: string;
    subject: string;
    template: string;
}

export interface ChatMessageTemplate {
    name: string;
    text: string;
}

export default <ModuleMainFunction>(async ({ $m, getSetting }) => {
    if (/^\/?$/u.test(window.location.pathname)) {
        const messages = (
            await getSetting<{
                value: ChatMessageTemplate[];
                enabled: boolean;
            }>('chatTemplates')
        ).value;
        if (messages.length) {
            import(
                /* webpackChunkName: "modules/messageTemplates/chat" */ './assets/chat/main'
            ).then(({ default: conversations }) => conversations(messages));
        }
    } else if (/^\/messages\/(?:new|\d+)\/?$/u.test(window.location.pathname)) {
        const messages = (
            await getSetting<{
                value: ConversationMessageTemplate[];
                enabled: boolean;
            }>('templates')
        ).value;
        if (messages.length) {
            import(
                /* webpackChunkName: "modules/messageTemplates/conversations" */ './assets/conversations/main'
            ).then(({ default: conversations }) => conversations(messages, $m));
        }
    }
});
