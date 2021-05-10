import moment from 'moment';

import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface Building {
    name: string;
    id: number;
    type: 'building';
}

interface User {
    icon: string;
    name: string;
    id: number;
    type: 'user';
}

interface Entry {
    time: Date;
    timestring: string;
    executor?: User;
    description: string;
    type:
        | ''
        | 'mission'
        | 'event'
        | 'appl_accepted'
        | 'appl_declined'
        | 'deny_appl'
        | 'allow_appl'
        | 'left'
        | 'kicked'
        | 'set_chatban'
        | 'remove_chatban'
        | 'added_role'
        | 'removed_role';
    affected?: User | Building;
}

export interface VerbandProtokollWindow extends VerbandWindow {
    lastPage: number;
    entries: Entry[];
    protokoll_types: Record<
        Exclude<Entry['type'], ''>,
        { regex: RegExp; title?: string }
    >;
}

export default <RedesignParser<VerbandProtokollWindow>>(async ({
    doc,
    getIdFromEl = () => -1,
    LSSM,
}) => {
    moment.locale(LSSM.$store.state.lang);

    const protokoll_types: VerbandProtokollWindow['protokoll_types'] = (
        await import(
            /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../../i18n/${LSSM.$store.state.lang}/verband/protokoll_types`
        )
    ).default;
    const getUser = (
        cell: HTMLTableCellElement | null
    ): User | Building | undefined =>
        cell?.innerText.trim()
            ? cell?.querySelector<HTMLAnchorElement>('a[href^="/profile/"]')
                ? {
                      icon:
                          cell.querySelector<HTMLImageElement>('img')?.src ??
                          '',
                      name: cell.innerText.trim(),
                      id: getIdFromEl(
                          cell.querySelector<HTMLAnchorElement>('a')
                      ),
                      type: 'user',
                  }
                : {
                      name: cell.innerText.trim(),
                      id: getIdFromEl(
                          cell.querySelector<HTMLAnchorElement>('a')
                      ),
                      type: 'building',
                  }
            : void 0;
    return {
        ...verbandParser({ doc, getIdFromEl }),
        entries: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>('table tbody tr')
        ).map(row => {
            const description =
                row
                    .querySelector<HTMLTableCellElement>('td:nth-child(3)')
                    ?.innerText?.trim()
                    .split(/\n/g)
                    .map(t => t.trim())
                    .join(' ') ?? '';
            const time = new Date(
                row
                    .querySelector<HTMLTableCellElement>('td:first-child span')
                    ?.getAttribute('data-log-time') ?? 0
            );
            return {
                time,
                timestring: moment(time).format('L LT'),
                executor: getUser(
                    row.querySelector<HTMLTableCellElement>('td:nth-child(2)')
                ),
                description,
                type:
                    Object.entries(protokoll_types).find(([, { regex }]) =>
                        description.match(regex)
                    )?.[0] ?? '',
                affected: getUser(
                    row.querySelector<HTMLTableCellElement>('td:nth-child(4)')
                ),
            };
        }),
        protokoll_types,
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? '1'
        ),
    };
});
