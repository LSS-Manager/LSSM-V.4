import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

export type VerbandEditNameWindow = VerbandWindow;

export default <RedesignParser<VerbandEditNameWindow>>(
    (({ doc, getIdFromEl = () => -1 }) => verbandParser({ doc, getIdFromEl }))
);
