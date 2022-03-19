import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

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
    errors: Record<
        'amContent' | 'amSubject' | 'header' | 'rules' | 'text' | 'webhook',
        string
    >;
}

const classToField: Record<string, keyof VerbandEditTextWindow['errors']> = {
    alliance_text_content: 'text',
    alliance_text_rules: 'rules',
    alliance_text_welcome_subject: 'amSubject',
    alliance_text_welcome_text: 'amContent',
    alliance_text_chat_header: 'header',
    alliance_text_discord_webhook: 'webhook',
};

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
        errors: Object.fromEntries(
            Array.from(
                form?.querySelectorAll<HTMLDivElement>(
                    '.form-group.has-error'
                ) ?? []
            ).map(formGroup => {
                const field = Object.entries(classToField).find(([cls]) =>
                    formGroup.classList.contains(cls)
                )?.[1];
                if (!field) return [];
                return [
                    field,
                    formGroup
                        .querySelector<HTMLSpanElement>(
                            'input + span.help-block'
                        )
                        ?.textContent?.trim() ?? '',
                ];
            })
        ),
    };
});
