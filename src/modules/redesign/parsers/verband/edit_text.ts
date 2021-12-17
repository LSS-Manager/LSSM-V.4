import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandEditTextWindow extends VerbandWindow {
    text: string;
    rules: string;
    header: string;
    webhook: string;
    automaticMessage: {
        subject: string;
        content: string;
    };
    faq: string;
}

export default <RedesignParser<VerbandEditTextWindow>>(({
    doc,
    getIdFromEl = () => 1,
}) => {
    const form = doc.querySelector<HTMLFormElement>(
        'form[id^="edit_alliance_text_"]'
    );
    return {
        ...verbandParser({ doc, getIdFromEl }),
        text:
            form?.querySelector<HTMLTextAreaElement>(
                'textarea[name="alliance_text[content]"]'
            )?.value ?? '',
        rules:
            form?.querySelector<HTMLTextAreaElement>(
                'textarea[name="alliance_text[rules]"]'
            )?.value ?? '',
        automaticMessage: {
            subject:
                form?.querySelector<HTMLTextAreaElement>(
                    'input[name="alliance_text[welcome_subject]"]'
                )?.value ?? '',
            content:
                form?.querySelector<HTMLTextAreaElement>(
                    'textarea[name="alliance_text[welcome_text]"]'
                )?.value ?? '',
        },
        header:
            form?.querySelector<HTMLInputElement>(
                'input[name="alliance_text[chat_header]"]'
            )?.value ?? '',
        webhook:
            form?.querySelector<HTMLInputElement>(
                'input[name="discord_webhook"]'
            )?.value ?? '',
        faq:
            form?.querySelector<HTMLAnchorElement>(
                'a[href*="xyrality.helpshift"]'
            )?.href ?? '',
    };
});
