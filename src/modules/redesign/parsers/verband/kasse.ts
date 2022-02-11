import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface Earning {
    user: {
        id: number;
        name: string;
    };
    value: number;
}

interface Spendings {
    credits: number;
    user: {
        id: number;
        name: string;
    };
    description: string;
    date: string;
}

interface Verbandskasse extends VerbandWindow {
    enabled: boolean;
    canToggle: boolean;
}

interface EnabledVerbandskasse extends Verbandskasse {
    enabled: true;
    value: number;
    rate: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    earnings: {
        type: 'daily' | 'monthly';
        scroll: number;
        earnings: Earning[];
    };
    spendings: {
        page: number;
        lastPage: number;
        spendings: Spendings[];
    };
}

interface DisabledVerbandskasse extends Verbandskasse {
    enabled: false;
}

export type VerbandskasseWindow = DisabledVerbandskasse | EnabledVerbandskasse;

export default <RedesignParser<VerbandskasseWindow>>(({
    doc,
    LSSM,
    getIdFromEl = () => -1,
    href = '',
}) => {
    const earningsPanel = doc.querySelector<HTMLDivElement>(
        '#alliance-finances-earnings'
    );
    const enabled = !!earningsPanel;
    const searchParams = new URL(href, window.location.origin).searchParams;
    return {
        ...verbandParser({ doc, getIdFromEl }),
        enabled,
        canToggle: !!doc.querySelector('a[href="/verband/kasse/umschalten"]'),
        ...(enabled
            ? <EnabledVerbandskasse>{
                  value: LSSM.$utils.getNumberFromText(
                      doc.querySelector<HTMLHeadingElement>(
                          '#alliance-finances-summary h1'
                      )?.textContent ?? '0'
                  ),
                  rate: getIdFromEl(
                      doc.querySelector<HTMLAnchorElement>(
                          '#alliance-finances-summary .btn-discount.btn-success'
                      )
                  ),
                  earnings: {
                      type:
                          searchParams.get('type') === 'monthly'
                              ? 'monthly'
                              : 'daily',
                      scroll: parseInt(searchParams.get('scroll') ?? '0'),
                      earnings: Array.from(
                          doc.querySelectorAll<HTMLTableRowElement>(
                              '#alliance-finances-earnings table tbody tr'
                          )
                      ).map(row => {
                          const user =
                              row.querySelector<HTMLAnchorElement>('a');
                          return {
                              user: {
                                  id: getIdFromEl(user),
                                  name: user?.textContent ?? '',
                              },
                              value: LSSM.$utils.getNumberFromText(
                                  row.querySelector('td:nth-child(2)')
                                      ?.textContent ?? '0'
                              ),
                          };
                      }),
                  },
                  spendings: {
                      page: parseInt(searchParams.get('page') ?? '1'),
                      lastPage: parseInt(
                          doc
                              .querySelector<HTMLAnchorElement>(
                                  '#alliance-finances-spendings .pagination.pagination li:nth-last-of-type(2)'
                              )
                              ?.textContent?.trim() ?? '1'
                      ),
                      spendings: Array.from(
                          doc.querySelectorAll<HTMLTableRowElement>(
                              '#alliance-finances-spendings table tbody tr'
                          )
                      ).map(row => {
                          const user =
                              row.querySelector<HTMLAnchorElement>('a');
                          return {
                              credits: LSSM.$utils.getNumberFromText(
                                  row.children[0].textContent ?? '0'
                              ),
                              user: {
                                  id: getIdFromEl(user),
                                  name: user?.textContent ?? '',
                              },
                              description: row.children[2].textContent ?? '',
                              date: row.children[3].textContent ?? '',
                          };
                      }),
                  },
              }
            : {}),
    };
});
