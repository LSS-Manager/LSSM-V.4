import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandRegelnWindow extends VerbandWindow {
    edit_text: boolean;
    rules: string;
}

export default <RedesignParser<VerbandRegelnWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => {
    const id = getIdFromEl(
        doc.querySelector<HTMLAnchorElement>(
            'nav ul.navbar-right li:first-child a[href^="/alliances/"]'
        )
    );
    return {
        meta: {
            name:
                doc
                    .querySelector<HTMLAnchorElement>('nav .navbar-brand')
                    ?.innerText?.trim() ?? '',
            id,
            self: !!doc.querySelector('a[href="/alliance_threads"]'),
        },
        edit_text: !!doc.querySelector('a[href="/veband/text/edit"]'),
        rules:
            doc.querySelector<HTMLDivElement>('#alliance-rules')?.innerHTML ??
            '',
    };
});
