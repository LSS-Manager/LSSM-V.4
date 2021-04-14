import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface User {
    credits: number;
    name: string;
    id: number;
    icon_src: string;
    caption: string;
    roles: string[];
    discount: number;
    tax: number;
    edit?: {
        kick: boolean;
        admin: boolean;
        coadmin: boolean;
        sprechwunsch_admin: boolean;
        aufsichtsrat: boolean;
        finance: boolean;
        schooling: boolean;
    };
}

export interface VerbandMitgliederWindow extends VerbandWindow {
    users: User[];
    online: boolean;
    lastPage: number;
    edit_caption: boolean;
    edit_discount: boolean;
}

export default <RedesignParser<VerbandMitgliederWindow>>(({
    doc,
    href = '',
    getIdFromEl = () => -1,
}) => {
    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '-1'
        );
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
        users: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>(
                'table tbody:last-of-type tr'
            )
        ).map(
            user =>
                <User>{
                    credits: getNum(user.children[2]),
                    name: user.children[0]?.textContent?.trim() ?? '',
                    id: getIdFromEl(
                        user.children[0]?.querySelector<HTMLAnchorElement>('a')
                    ),
                    icon_src:
                        user.children[0].querySelector<HTMLImageElement>(
                            'img.online_icon'
                        )?.src ?? '/images/user_gray.png',
                    caption:
                        user.children[1]
                            .querySelector<HTMLSpanElement>(
                                '.badge[id^="role_caption_"]'
                            )
                            ?.innerText?.trim() ?? '',
                    roles:
                        user.children[1]
                            .querySelector<HTMLElement>('small')
                            ?.innerText?.trim()
                            .split(',')
                            .map(r => r.trim())
                            .filter(r => r.length)
                            .sort() ?? [],
                    discount: getIdFromEl(
                        user.children[3]?.querySelector<HTMLAnchorElement>(
                            'a.btn-success[href^="/verband/discount"]'
                        )
                    ),
                    tax: getNum(user.children[4]),
                    edit: user.children[5]?.querySelector<HTMLAnchorElement>(
                        '.btn_edit_rights'
                    )
                        ? {
                              kick: !!user.children[5].querySelector<
                                  HTMLAnchorElement
                              >('a[href^="/verband/kick/"]'),
                              ...Object.fromEntries(
                                  [
                                      'admin',
                                      'coadmin',
                                      'sprechwunsch_admin',
                                      'aufsichtsrat',
                                      'finance',
                                      'schooling',
                                  ].map(role => [
                                      role,
                                      !!user.children[5]
                                          .querySelector<HTMLAnchorElement>(
                                              `a[href^="/verband/${role}/"]`
                                          )
                                          ?.classList.contains('btn-danger'),
                                  ])
                              ),
                          }
                        : undefined,
                }
        ),
        online: new URL(href, window.location.origin).searchParams.has(
            'online'
        ),
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? '1'
        ),
        edit_caption: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/verband/rolecaptionForm/"]'
        ),
        edit_discount: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/verband/discount/"]'
        ),
    };
});
