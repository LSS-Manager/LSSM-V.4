import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandHomeWindow extends VerbandWindow {
    image: string;
    edit_text: boolean;
    edit_name: boolean;
    edit_logo: boolean;
    text: string;
    appliable: boolean;
    no_apply_box: string;
    applied: boolean;
}

export default <RedesignParser<VerbandHomeWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => {
    const id = getIdFromEl(
        doc.querySelector<HTMLAnchorElement>(
            'nav ul.navbar-right li:first-child a[href^="/alliances/"]'
        )
    );
    const applyBtn = doc.querySelector<HTMLAnchorElement>(
        `a[href="/verband/bewerben/${id}"]`
    );
    return {
        ...verbandParser({ doc, getIdFromEl }),
        image:
            doc.querySelector<HTMLImageElement>('img.profile_avatar')?.src ??
            '',
        edit_text: !!doc.querySelector('a[href="/veband/text/edit"]'),
        edit_name: !!doc.querySelector(`a[href="/alliances/${id}/edit"]`),
        edit_logo: !!doc.querySelector('a[href="/verband/avatar"]'),
        text:
            doc.querySelector<HTMLDivElement>('#alliance-description')
                ?.innerHTML ?? '',
        appliable: !!applyBtn,
        no_apply_box: applyBtn?.classList.contains('disabled')
            ? doc.querySelector<HTMLDivElement>('.alert.alert-info')
                  ?.innerHTML ?? ''
            : '',
        applied: !!doc.querySelector<HTMLAnchorElement>(
            `a[href="/verband/bewerben/${id}/zurueckziehen"]`
        ),
    };
});
