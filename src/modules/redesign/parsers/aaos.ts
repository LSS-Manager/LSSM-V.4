import { RedesignParser } from 'typings/modules/Redesign';

interface AAO {
    id: number;
    bg_color: string;
    color: string;
    title: string;
    type: 'arr' | 'vehicle_group';
}

type Category = Record<'0' | '1' | '2' | '3' | '4' | '5' | '6', AAO[]>;

export interface AAOsWindow {
    categories: Record<string, Category>;
}

export default <RedesignParser<AAOsWindow>>(({ doc }) => {
    const getAAOs = (wrapper: HTMLDivElement | null): AAO[] =>
        wrapper
            ? Array.from(
                  wrapper.querySelectorAll<HTMLAnchorElement>(
                      '.aao_btn_group > a, .aao_searchable'
                  )
              ).map(arr => ({
                  id: parseInt(arr.href.match(/\d+/)?.[0] ?? '-1'),
                  bg_color: arr.style.backgroundColor,
                  color: arr.style.color,
                  title: arr.textContent?.trim() ?? '',
                  type: arr.hasAttribute('vehicle_group_id')
                      ? 'vehicle_group'
                      : 'arr',
              }))
            : [];
    const getAAOCategory = (wrapper_id: string): Category => ({
        '0': getAAOs(
            doc.querySelector<HTMLDivElement>(
                wrapper_id === 'mission_aao_no_category'
                    ? '#aao_without_category'
                    : `#${wrapper_id} .pull-right`
            )
        ),
        ...(Object.fromEntries(
            Array.from(
                doc.querySelectorAll<HTMLDivElement>(
                    `#${wrapper_id} .col-sm-2.col-xs-4`
                )
            ).map((row, row_id) => [row_id + 1, getAAOs(row)])
        ) as Record<'1' | '2' | '3' | '4' | '5' | '6', AAO[]>),
    });
    return {
        categories: {
            '': getAAOCategory('mission_aao_no_category'),
            ...Object.fromEntries(
                Array.from(
                    doc.querySelectorAll<HTMLAnchorElement>('#aao-tabs li a')
                ).map(tab => [
                    tab.innerText.trim(),
                    getAAOCategory(new URL(tab.href).hash.replace(/^#/, '')),
                ])
            ),
        },
    };
});
