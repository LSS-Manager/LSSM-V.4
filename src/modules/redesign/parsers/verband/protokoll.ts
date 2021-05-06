import moment from 'moment';

import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface User {
    icon: string;
    name: string;
    id: number;
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
    affected?: User;
}

export interface VerbandProtokollWindow extends VerbandWindow {
    lastPage: number;
    entries: Entry[];
}

export default <RedesignParser<VerbandProtokollWindow>>(async ({
    doc,
    getIdFromEl = () => -1,
    LSSM,
}) => {
    moment.locale(LSSM.$store.state.lang);

    const protokoll_types: Record<
        Entry['type'],
        { regex: RegExp; title?: string }
    > = (
        await import(
            /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../../i18n/${LSSM.$store.state.lang}/verband/protokoll_types`
        )
    ).default;
    const getUser = (cell: HTMLTableCellElement | null): User | undefined =>
        cell?.innerText.trim()
            ? {
                  icon: cell.querySelector<HTMLImageElement>('img')?.src ?? '',
                  name: cell.innerText.trim(),
                  id: getIdFromEl(cell.querySelector<HTMLAnchorElement>('a')),
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
            const time = new Date();
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
        lastPage: parseInt(
            doc
                .querySelector<HTMLAnchorElement>(
                    '.pagination.pagination li:nth-last-of-type(2)'
                )
                ?.textContent?.trim() ?? '1'
        ),
    };
});
