import verbandParser from '../verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandNewsEditWindow extends VerbandWindow {
    caption: string;
    content: string;
    is_public: boolean;
    id: number;
}

export default <RedesignParser<VerbandNewsEditWindow>>(({
    doc,
    href = '',
    getIdFromEl = () => -1,
}) => {
    const form = doc.querySelector<HTMLFormElement>(
        'form[id^="edit_alliance_newse_"]'
    );
    return {
        ...verbandParser({ doc, getIdFromEl }),
        caption:
            form?.querySelector<HTMLInputElement>(
                'input[name="alliance_newse[caption]"]'
            )?.value ?? '',
        content:
            form?.querySelector<HTMLTextAreaElement>(
                'textarea[name="alliance_newse[content]"]'
            )?.value ?? '',
        is_public:
            form?.querySelector<HTMLInputElement>(
                'input[type="checkbox"][name="alliance_newse[public]"]'
            )?.checked ?? false,
        id: parseInt(
            new URL(href, window.location.origin).pathname.match(/\d+/)?.[0] ??
                '-1'
        ),
    };
});
