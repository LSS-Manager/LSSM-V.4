import moment from 'moment';

import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

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
        | 'added_role'
        | 'allow_appl'
        | 'appl_accepted'
        | 'appl_declined'
        | 'build'
        | 'complete_extension'
        | 'complete_schooling'
        | 'demolish'
        | 'deny_appl'
        | 'event'
        | 'kicked'
        | 'left'
        | 'mission'
        | 'remove_chatban'
        | 'removed_role'
        | 'set_chatban'
        | 'start_extension'
        | 'start_schooling';
    affected?: Building | User;
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
    moment.locale(LSSM.rootStore.locale);

    const protokoll_types: VerbandProtokollWindow['protokoll_types'] = (
        await import(
            /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../../i18n/${LSSM.rootStore.locale}/verband/protokoll_types`
        )
    ).default;
    const getUser = (
        cell: HTMLTableCellElement | null
    ): Building | User | undefined =>
        cell?.textContent?.trim()
            ? cell?.querySelector<HTMLAnchorElement>('a[href^="/profile/"]')
                ? {
                      icon:
                          cell.querySelector<HTMLImageElement>('img')?.src ??
                          '',
                      name: cell.textContent?.trim() ?? '',
                      id: getIdFromEl(
                          cell.querySelector<HTMLAnchorElement>('a')
                      ),
                      type: 'user',
                  }
                : {
                      name: cell.textContent?.trim() ?? '',
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
                    ?.textContent?.trim()
                    .split(/\n/gu)
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
