import { Building } from 'typings/Building';
import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    let wrapper = document.getElementById('btn-group-building-select');
    if (!wrapper) return;

    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'buildingListFilter-initial',
    });

    const filters: {
        contentType: 'text' | 'icon';
        icon_style: 'fas' | 'far' | 'fab';
        title: string;
        buildings: number[];
        state: 'enabled' | 'disabled';
    }[] = (
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'filters',
        })
    ).value;

    const enable = (
        btn: HTMLButtonElement,
        buildings: number[],
        index: number
    ) => {
        btn.classList.replace('btn-danger', 'btn-success');
        document
            .querySelectorAll<HTMLDivElement>(
                buildings
                    .map(
                        b =>
                            `#buildings .building_list_li[building_type_id="${b}"]`
                    )
                    .join(',')
            )
            .forEach(b => {
                b.classList.add('category_selected');
                b.style.setProperty('display', 'block');
            });
        filters[index].state = 'enabled';
    };
    const disable = (
        btn: HTMLButtonElement,
        buildings: number[],
        index: number
    ) => {
        btn.classList.replace('btn-success', 'btn-danger');
        document
            .querySelectorAll<HTMLDivElement>(
                buildings
                    .map(
                        b =>
                            `#buildings .building_list_li[building_type_id="${b}"]`
                    )
                    .join(',')
            )
            .forEach(b => {
                b.classList.remove('category_selected');
                b.style.setProperty('display', 'none');
            });
        filters[index].state = 'disabled';
    };

    const updateSettings = () =>
        LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'filters',
            value: { value: filters, enabled: true },
        });

    const smallBuildings = (LSSM.$t('small_buildings') as unknown) as Record<
        number,
        number
    >;

    const updateFilters = async () => {
        wrapper = document.getElementById('btn-group-building-select');
        if (!wrapper) return;
        wrapper.querySelectorAll('a').forEach(a => a.remove());
        const btns: [HTMLButtonElement, number[]][] = [];

        const buildingsByType: Record<number, Building[]> =
            LSSM.$store.getters['api/buildingsByType'];
        Object.entries(smallBuildings).forEach(([big, small]) =>
            document
                .querySelectorAll<HTMLLIElement>(
                    `#buildings .building_list_li[building_type_id="${big}"]`
                )
                .forEach(building => {
                    const id = parseInt(
                        building
                            .querySelector<HTMLUListElement>(
                                'ul[data-building_id]'
                            )
                            ?.getAttribute('data-building_id') ?? '-1'
                    );
                    if (buildingsByType[small]?.find(b => b.id === id)) {
                        building.setAttribute(
                            'building_type_id',
                            small.toString()
                        );
                    }
                })
        );

        filters.forEach(
            ({ contentType, title, icon_style, buildings, state }, index) => {
                const btn = document.createElement('button');
                btn.classList.add('btn', 'btn-xs', 'btn-success');
                if (contentType === 'text') {
                    btn.innerText = title;
                } else {
                    const icon = document.createElement('i');
                    icon.classList.add(icon_style, `fa-${title}`, 'fa-fw');
                    btn.append(icon);
                }
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('btn-danger'))
                        enable(btn, buildings, index);
                    else disable(btn, buildings, index);
                    updateSettings();
                    window.buildingsVehicleLoadVisible();
                });
                btn.addEventListener('dblclick', () => {
                    btns.forEach(([btnI, buildings], index) => {
                        if (btnI === btn) enable(btnI, buildings, index);
                        else disable(btnI, buildings, index);
                        updateSettings();
                        window.buildingsVehicleLoadVisible();
                    });
                });
                if (state === 'disabled') disable(btn, buildings, index);
                else enable(btn, buildings, index);
                btns.push([btn, buildings]);
                wrapper?.append(btn);
            }
        );

        const buildingList = document.querySelector<HTMLUListElement>(
            '#building_list'
        );
        if (!buildingList) return;

        const buildings: [HTMLLIElement, string][] = Array.from(
            buildingList.querySelectorAll<HTMLLIElement>('li.building_list_li')
        ).map(building => [
            building,
            building
                .querySelector<HTMLAnchorElement>(
                    '.building_list_caption a.map_position_mover'
                )
                ?.textContent?.toLowerCase() ?? '',
        ]);

        const searchHideClass = LSSM.$store.getters.nodeAttribute(
            'blf-search-not-matching'
        );
        const reversedListClass = LSSM.$store.getters.nodeAttribute(
            'blf-reversed-buildinglist'
        );

        LSSM.$store
            .dispatch('addStyles', [
                {
                    selectorText: `.${searchHideClass}`,
                    style: {
                        display: 'none !important',
                    },
                },
                {
                    selectorText: `.${reversedListClass}, .${reversedListClass} > li`,
                    style: {
                        transform: 'rotate(180deg)',
                    },
                },
            ])
            .then();

        const sortBtn = document.createElement('button');
        sortBtn.classList.add('btn', 'btn-xs', 'btn-default', 'pull-right');
        sortBtn.style.setProperty('margin-top', '-4px');
        const sortIcon = document.createElement('i');
        sortIcon.classList.add('fas', 'fa-sort-alpha-down');

        sortBtn.append(sortIcon);

        sortBtn.addEventListener('click', () => {
            const icon = sortBtn.querySelector('svg');
            if (!icon) return;
            const state = buildingList.classList.toggle(reversedListClass);
            if (state) icon.setAttribute('data-icon', 'sort-alpha-up-alt');
            else icon.setAttribute('data-icon', 'sort-alpha-down');
            LSSM.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: 'sortDesc',
                    value: state,
                })
                .then();
        });

        if (
            await LSSM.$store.dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'sortDesc',
            })
        )
            sortBtn.click();

        let searchTimeout = null as number | null;

        const searchBtn = document.createElement('button');
        searchBtn.classList.add('btn', 'btn-xs', 'btn-default', 'pull-right');
        searchBtn.style.setProperty('margin-top', '-4px');
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fas', 'fa-search');

        searchBtn.append(searchIcon);

        const search = document.createElement('input');
        search.type = 'search';
        search.classList.add('pull-right', 'search_input_field', 'hidden');
        search.style.setProperty('position', 'absolute');
        search.style.setProperty('margin-top', '-4px');
        search.style.setProperty('right', '22px');
        search.style.setProperty('height', '20px');

        searchBtn.addEventListener('click', e => {
            e.stopPropagation();
            search.classList.toggle('hidden');
            search.focus();
        });

        document.addEventListener('click', e => {
            if (e.target !== search) search.classList.add('hidden');
        });

        search.addEventListener('keyup', () => {
            if (searchTimeout) window.clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(
                () =>
                    buildings.forEach(([building, caption]) =>
                        building.classList[
                            caption.match(
                                LSSM.$utils.escapeRegex(
                                    search.value.trim().toLowerCase()
                                )
                            )
                                ? 'remove'
                                : 'add'
                        ](searchHideClass)
                    ),
                100
            );
        });

        wrapper.style.setProperty('width', '100%');
        wrapper.prepend(searchBtn, sortBtn);
        wrapper.append(search);
    };

    const observer = new MutationObserver(updateFilters);

    const buildingsElement = document.getElementById('buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });

    await updateFilters();
});
