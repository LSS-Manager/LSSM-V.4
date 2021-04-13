import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandEditNameWindow extends VerbandWindow {
    authenticity_token: string;
}

export default <RedesignParser<VerbandEditNameWindow>>(({
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
    };
});
