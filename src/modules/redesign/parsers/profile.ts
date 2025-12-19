import type { RedesignParser } from 'typings/modules/Redesign';

interface Building {
    id: number;
    user_id: number;
    name: string;
    longitude: number;
    latitude: number;
    icon: string;
    icon_other: string;
    lbid: number;
    show_vehicles_at_startpage: boolean;
    level: number;
    personal_count: number;
    building_type: number;
    filter_id: string;
    detail_button: string;
}

interface Award {
    caption: string;
    image: string;
    desc: string;
}

export interface ProfileWindow {
    id: number;
    name: string;
    online: boolean;
    self: boolean;
    credits: number;
    alliance?: {
        name: string;
        id: string;
    };
    registration?: Date;
    text: string;
    image: string;
    awards: Award[];
    has_map: boolean;
    buildings: Building[];
    ignored: boolean;
    friend: boolean;
    ban: number[];
    can_alliance_ignore: boolean;
    alliance_ignored: boolean;
}

export default <RedesignParser<ProfileWindow>>(async ({
    LSSM,
    doc,
    href = '',
}) => {
    const id = parseInt(
        new URL(href, window.location.origin).pathname.match(
            /\d+(?=\/?$)/u
        )?.[0] ?? '-1'
    );
    const self = id === window.user_id;
    const pageHeader = doc.querySelector<HTMLDivElement>('.page-header');
    const headTexts: string[] = LSSM.$utils
        .getTextNodes(
            pageHeader ?? doc,
            (n: Node) => (n.textContent?.trim() ?? '').length > 0
        )
        .map(t => t.textContent?.trim() ?? '');
    const alliance = pageHeader?.querySelector<HTMLAnchorElement>(
        'a[href^="/alliances"]'
    );
    const profileText = doc.querySelector<HTMLDivElement>(
        '#profile_text_photo'
    );
    const allianceIgnore = doc.querySelector<HTMLAnchorElement>(
        '.page-header a[href^="/allianceIgnore/"]'
    );
    return {
        id,
        name: doc.querySelector<HTMLHeadingElement>('h1')?.textContent?.trim(),
        online: !!doc.querySelector<HTMLImageElement>(
            'img[src="/images/user_green.png"]'
        ),
        self,
        credits: pageHeader?.dataset.creditsEarned
            ? parseInt(pageHeader?.dataset.creditsEarned ?? '0')
            : LSSM.$utils.getNumberFromText(headTexts[1]),
        alliance: alliance
            ? {
                  id: parseInt(
                      alliance.href.match(/\d+(?=\/?$)/u)?.[0] ?? '-1'
                  ),
                  name: alliance.textContent?.trim() ?? '',
              }
            : undefined,
        registration: self
            ? new Date(
                  doc
                      .querySelector<HTMLSpanElement>('#signup_date')
                      ?.getAttribute('data-signup-date') ?? 0
              )
            : undefined,
        text: profileText?.textContent?.trim() ?? '',
        image: profileText?.querySelector<HTMLImageElement>('img')?.src ?? '',
        awards: Array.from(
            doc.querySelectorAll(
                '#profile_awards > .grid-container > .grid-item'
            )
        ).map(award => ({
            caption:
                award
                    .querySelector<HTMLDivElement>(
                        '.grid-item-header .panel-title'
                    )
                    ?.textContent?.trim() ?? '',
            image:
                award.querySelector<HTMLImageElement>('.grid-item-img img')
                    ?.src ?? '',
            desc:
                award
                    .querySelector<HTMLDivElement>('.grid-item-text')
                    ?.textContent?.trim() ?? '',
        })),
        has_map: !!doc.querySelector<HTMLDivElement>('#profile_map'),
        buildings: await fetch(`/building/buildings_json?user_to_load_id=${id}`)
            .then(res => res.json())
            .then<Building[]>(p => p.buildings ?? [])
            .then(b => b.filter(({ user_id }) => user_id === id)),
        ignored: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/ignoriert/entfernen/"]'
        ),
        friend: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/freunde/entfernen/"]'
        ),
        ban: Array.from(
            doc.querySelectorAll<HTMLAnchorElement>(
                `a[href^="/profile/${id}/chatban/"]`
            )
        ).map(option =>
            parseInt(option.href.match(/\d+(?=\/?$)/u)?.[0] ?? '-1')
        ),
        can_alliance_ignore: !!allianceIgnore,
        alliance_ignored: allianceIgnore?.href.endsWith('destroy'),
    };
});
