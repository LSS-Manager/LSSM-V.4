import { ParserParam } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export default ({
    doc,
    getIdFromEl = () => -1,
}: Pick<ParserParam, 'doc' | 'getIdFromEl'>): VerbandWindow => {
    return {
        meta: {
            name:
                doc
                    .querySelector<HTMLAnchorElement>('nav .navbar-brand')
                    ?.innerText?.trim() ?? '',
            id: getIdFromEl(
                doc.querySelector<HTMLAnchorElement>(
                    'nav ul.navbar-right li:first-child a[href^="/alliances/"]'
                )
            ),
            self: !!doc.querySelector('a[href="/alliance_threads"]'),
            nav: {
                protokoll: !!doc.querySelector('a[href="/alliance_logfiles"]'),
            },
        },
    };
};
