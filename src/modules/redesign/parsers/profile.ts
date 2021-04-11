import { BuildingMarkerAdd } from 'typings/Ingame';
import { RedesignParser } from 'typings/modules/Redesign';

type Building = BuildingMarkerAdd;

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
    authenticity_token: string;
}

export default <RedesignParser<ProfileWindow>>((source, href) => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const id = parseInt(
        new URL(href, window.location.origin).pathname.match(
            /\d+(?=\/?$)/
        )?.[0] ?? '-1'
    );
    const self = id === window.user_id;
    const pageHeader = doc.querySelector<HTMLDivElement>('.page-header');
    const headTexts: string[] = (window[PREFIX] as Vue).$utils
        .getTextNodes(
            pageHeader ?? doc,
            (n: Node) => (n.textContent?.trim() ?? '').length > 0
        )
        .map(t => t.textContent?.trim() ?? '');
    const alliance = pageHeader?.querySelector<HTMLAnchorElement>(
        'a[href^="/alliances"]'
    );
    const profileText = doc.getElementById('profile_text_photo');
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
        credits: parseInt(
            headTexts[1]
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '-1'
        ),
        alliance: alliance
            ? {
                  id: parseInt(alliance.href.match(/\d+(?=\/?$)/)?.[0] ?? '-1'),
                  name: alliance.textContent?.trim() ?? '',
              }
            : undefined,
        registration: self
            ? new Date(
                  doc
                      .getElementById('signup_date')
                      ?.getAttribute('data-signup-date') ?? 0
              )
            : undefined,
        text: profileText?.textContent?.trim() ?? '',
        image: profileText?.querySelector<HTMLImageElement>('img')?.src ?? '',
        awards: Array.from(
            doc.querySelectorAll('#profile_awards > .col-sm-3 > .panel')
        ).map(award => ({
            caption:
                award
                    .querySelector<HTMLDivElement>(
                        '.panel-heading .panel-title'
                    )
                    ?.textContent?.trim() ?? '',
            image:
                award.querySelector<HTMLImageElement>('.panel-body img')?.src ??
                '',
            desc:
                award
                    .querySelector<HTMLDivElement>('.panel-body')
                    ?.textContent?.trim() ?? '',
        })),
        has_map: !!doc.getElementById('profile_map'),
        buildings: (Array.from(doc.scripts)
            .flatMap(script =>
                script.innerText.match(
                    /(?<=buildingMarkerAdd\(){(?:".*?":(?:\d+(?:\.\d+)?|".*?"),?)+}(?=\);)/g
                )
            )
            .filter(b => !!b) as string[]).map(b => JSON.parse(b)),
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
            parseInt(option.href.match(/\d+(?=\/?$)/)?.[0] ?? '-1')
        ),
        can_alliance_ignore: !!allianceIgnore,
        alliance_ignored: allianceIgnore?.href.endsWith('destroy'),
        authenticity_token:
            doc.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                ?.content ?? '',
    };
});
