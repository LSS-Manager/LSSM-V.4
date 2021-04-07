import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandEditNameWindow extends VerbandWindow {
    authenticity_token: string;
}

export default <RedesignParser<VerbandEditNameWindow>>((
    source,
    _,
    getIdFromEl
) => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
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
        authenticity_token:
            (doc
                .querySelector<HTMLFormElement>('form[id^="edit_alliance_"]')
                ?.elements.namedItem('authenticity_token') as HTMLInputElement)
                ?.value ?? '',
    };
});
