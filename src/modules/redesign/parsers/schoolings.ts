import getSchoolings from '../../schoolingOverview/assets/getSchoolings';
import verbandParser from './verband/verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';
import {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

export interface SchoolingsWindow extends VerbandWindow {
    ownSchoolings: OwnSchoolings;
    openSchoolings: OpenSchoolings;
}

export default <RedesignParser<SchoolingsWindow>>(({
    LSSM,
    doc,
    getIdFromEl,
}) => ({
    ...verbandParser({ doc, getIdFromEl }),
    ...getSchoolings(LSSM, doc),
}));
