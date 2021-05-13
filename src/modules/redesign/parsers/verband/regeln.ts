import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandRegelnWindow extends VerbandWindow {
    edit_text: boolean;
    rules: string;
}

export default <RedesignParser<VerbandRegelnWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => ({
    ...verbandParser({ doc, getIdFromEl }),
    edit_text: !!doc.querySelector('a[href="/veband/text/edit"]'),
    rules:
        doc.querySelector<HTMLDivElement>('#alliance-rules')?.innerHTML ?? '',
}));
