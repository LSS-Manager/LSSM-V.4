import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export type VerbandEditNameWindow = VerbandWindow;

export default <RedesignParser<VerbandEditNameWindow>>(
    (({ doc, getIdFromEl = () => -1 }) => verbandParser({ doc, getIdFromEl }))
);
