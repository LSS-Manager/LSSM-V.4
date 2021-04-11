import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

export interface VerbandNewsEditWindow extends VerbandWindow {
    authenticity_token: string;
    caption: string;
    content: string;
    is_public: boolean;
    id: number;
}

export default <RedesignParser<VerbandNewsEditWindow>>((
    source,
    href,
    getIdFromEl
) => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const id = getIdFromEl(
        doc.querySelector<HTMLAnchorElement>(
            'nav ul.navbar-right li:first-child a[href^="/alliances/"]'
        )
    );
    const form = doc.querySelector<HTMLFormElement>(
        'form[id^="edit_alliance_newse_"]'
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
            doc.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                ?.content ?? '',
        caption:
            form?.querySelector<HTMLInputElement>(
                'input[name="alliance_newse[caption]"]'
            )?.value ?? '',
        content:
            form?.querySelector<HTMLTextAreaElement>(
                'textarea[name="alliance_newse[content]"]'
            )?.value ?? '',
        is_public:
            form?.querySelector<HTMLInputElement>(
                'input[type="checkbox"][name="alliance_newse[public]"]'
            )?.checked ?? false,
        id: parseInt(
            new URL(href, window.location.origin).pathname.match(/\d+/)?.[0] ??
                '-1'
        ),
    };
});
