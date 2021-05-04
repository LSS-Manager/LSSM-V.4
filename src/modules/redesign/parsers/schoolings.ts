import getSchoolings from '../../schoolingOverview/assets/getSchoolings';
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
    meta: {
        name:
            doc
                .querySelector<HTMLAnchorElement>('nav .navbar-brand')
                ?.innerText?.trim() ?? '',
        id:
            getIdFromEl?.(
                doc.querySelector<HTMLAnchorElement>(
                    'nav ul.navbar-right li:first-child a[href^="/alliances/"]'
                )
            ) ?? -1,
        self: !!doc.querySelector('a[href="/alliance_threads"]'),
    },
    ...getSchoolings(LSSM, doc),
}));
