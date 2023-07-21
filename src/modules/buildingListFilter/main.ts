import type { ModuleMainFunction } from 'typings/Module';

interface FilterBtn extends HTMLButtonElement {
    reload?(): void;
}

export default <ModuleMainFunction>(async ({
    LSSM,
    MODULE_ID,
    getSetting,
    setSetting,
}) => {
    let selectGroup = document.querySelector<HTMLDivElement>(
        '#btn-group-building-select'
    );
    if (!selectGroup) return;

    await LSSM.$stores.api.getBuildings(MODULE_ID);

    LSSM.$stores.root.addStyle({
        selectorText: '#building_panel_heading .search-station-input',
        style: {
            display: 'none',
        },
    });

    const extraBtnsGroup = document.createElement('div');
    extraBtnsGroup.classList.add('btn-group');
    extraBtnsGroup.style.setProperty('flex-shrink', '0');

    const wrapper = document.createElement('div');
    wrapper.id = LSSM.$stores.root.nodeAttribute(`${MODULE_ID}-wrapper`, true);
    wrapper.style.setProperty('display', 'flex');
    wrapper.style.setProperty('margin-bottom', '1rem');
    wrapper.style.setProperty('justify-content', 'space-between');

    const fixedFilters = await getSetting('fixedFilters');

    const fixedWhiteSpace = document.createElement('div');

    if (fixedFilters) {
        LSSM.$stores.root.addStyles([
            {
                selectorText: `#${wrapper.id}`,
                style: {
                    'position': 'absolute',
                    'width': 'calc(100% - 4 * 15px)',
                    'z-index': 10,
                },
            },
            {
                selectorText: `body.bigMap #${wrapper.id}`,
                style: {
                    width: 'calc(100% - 2 * 5px)',
                },
            },
        ]);
        fixedWhiteSpace.style.setProperty('margin-bottom', '1rem');
        wrapper.after(fixedWhiteSpace);
    }

    const insertIntoDocument = () => {
        if (!selectGroup) return;

        wrapper.innerHTML = '';
        selectGroup.innerHTML = '';
        extraBtnsGroup.innerHTML = '';

        selectGroup.before(wrapper);
        wrapper.append(selectGroup, extraBtnsGroup);

        let breakElement: HTMLElement | null;
        while (
            (breakElement = document.querySelector<HTMLElement>(
                `#${wrapper.id} + br`
            ))
        )
            breakElement.remove();

        if (fixedFilters) wrapper.after(fixedWhiteSpace);
    };

    interface Filter {
        contentType: 'icon' | 'text';
        icon_style: 'fab' | 'far' | 'fas';
        title: string;
        buildings: number[];
        state: 'disabled' | 'enabled';
    }
    const filters = [
        {
            contentType: 'text',
            icon_style: 'fas',
            title: '',
            buildings: [],
            state: 'enabled',
        },
        ...(await getSetting<{ value: Filter[]; enabled: boolean }>('filters'))
            .value,
    ];

    let btns: [FilterBtn, number[]][] = [];

    const filterHideClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-filter-hidden`
    );
    const searchHideClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-search-not-matching`
    );
    const reversedListClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-reversed-buildinglist`
    );

    const applyFilter = (buildings: number[], show: boolean) =>
        buildings.length &&
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
                b.classList[show ? 'remove' : 'add'](filterHideClass);
            });

    const enable = (btn: FilterBtn, buildings: number[], index: number) => {
        btn.classList.replace('btn-danger', 'btn-success');
        if (!index) {
            filters.forEach(
                (filter, index) => index && enable(...btns[index], index)
            );
        } else if (buildings.length) {
            applyFilter(buildings, true);
        }
        filters[index].state = 'enabled';
    };
    const disable = (btn: FilterBtn, buildings: number[], index: number) => {
        btn.classList.replace('btn-success', 'btn-danger');
        if (!index) {
            filters.forEach(
                (filter, index) => index && disable(...btns[index], index)
            );
        } else if (buildings.length) {
            applyFilter(buildings, false);
        }
        filters[index].state = 'disabled';
    };

    const updateSettings = () =>
        setSetting('filters', { value: filters.slice(1), enabled: true });

    const smallBuildings = LSSM.$t('small_buildings') as unknown as Record<
        number,
        number
    >;

    let updateBuildingsArrayHookAttached = false;

    LSSM.$stores.root.addStyles([
        {
            selectorText: `.${searchHideClass}`,
            style: {
                display: 'none !important',
            },
        },
        {
            selectorText: `.${filterHideClass}`,
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
    ]);

    const updateFilters = async () => {
        selectGroup = document.querySelector<HTMLDivElement>(
            '#btn-group-building-select'
        );
        if (!selectGroup) return;
        selectGroup.querySelectorAll('a').forEach(a => a.remove());
        btns = [];

        insertIntoDocument();

        const buildingsByType = LSSM.$stores.api.buildingsByType;
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

        btns.splice(0);
        filters.forEach(
            ({ contentType, title, icon_style, buildings, state }, index) => {
                const btn: FilterBtn = document.createElement('button');
                btn.classList.add('btn', 'btn-xs', 'btn-success');
                if (contentType === 'text') {
                    if (title) btn.textContent = title;
                    else btn.innerHTML = '&nbsp;';
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
                btn.reload = () => {
                    applyFilter(
                        buildings,
                        btn.classList.contains('btn-success')
                    );
                };
                if (index) {
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
                }
                btns.push([btn, buildings]);
                selectGroup?.append(btn);
            }
        );

        const buildingList =
            document.querySelector<HTMLUListElement>('#building_list');
        if (!buildingList) return;

        const buildings: [HTMLLIElement, string][] = [];

        const updateBuildingsArray = () => {
            buildings.splice(
                0,
                buildings.length,
                ...Array.from(
                    buildingList.querySelectorAll<HTMLLIElement>(
                        'li.building_list_li'
                    )
                ).map<[HTMLLIElement, string]>(building => [
                    building,
                    building
                        .querySelector<HTMLAnchorElement>(
                            '.building_list_caption a.map_position_mover'
                        )
                        ?.textContent?.toLowerCase() ?? '',
                ])
            );
            buildings.forEach(building =>
                building[0].classList.remove(
                    'building-filtered-by-type',
                    'building-filtered-by-search'
                )
            );
        };

        if (!updateBuildingsArrayHookAttached) {
            LSSM.$stores.root.hook({
                event: 'buildingMarkerBulkContentCacheDraw',
                callback() {
                    updateBuildingsArray();
                    btns.forEach(([btn], index) => index && btn.reload?.());
                },
            });
            updateBuildingsArrayHookAttached = true;
        }

        updateBuildingsArray();

        // dcv = dispatchCenterView
        const dcvBtn = document.createElement('a');
        dcvBtn.classList.add('btn', 'btn-xs', 'btn-default', 'lightbox-open');
        dcvBtn.style.setProperty('margin-top', '-4px');
        dcvBtn.href = '/leitstellenansicht';
        const dcvIcon = document.createElement('i');
        dcvIcon.classList.add('fas', 'fa-table');

        dcvBtn.append(dcvIcon);

        const sortBtn = document.createElement('button');
        sortBtn.classList.add('btn', 'btn-xs', 'btn-default');
        sortBtn.style.setProperty('margin-top', '-4px');
        const sortIcon = document.createElement('i');
        sortIcon.classList.add('fas', 'fa-sort-alpha-down');

        sortBtn.append(sortIcon);

        sortBtn.addEventListener('click', () => {
            const icon = sortBtn.querySelector('svg');
            if (!icon) return;
            const state = buildingList.classList.toggle(reversedListClass);
            if (state) icon.setAttribute('data-icon', 'arrow-up-a-z');
            else icon.setAttribute('data-icon', 'arrow-down-z-a');
            setSetting('sortDesc', state);
        });

        if (await getSetting('sortDesc')) sortBtn.click();

        let searchTimeout = null as number | null;

        const searchBtn = document.createElement('button');
        searchBtn.classList.add('btn', 'btn-xs', 'btn-default');
        searchBtn.style.setProperty('margin-top', '-4px');
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fas', 'fa-search');

        searchBtn.append(searchIcon);

        const search = document.createElement('input');
        search.type = 'search';
        search.classList.add('search_input_field', 'hidden');
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

        extraBtnsGroup.append(searchBtn, search, sortBtn, dcvBtn);

        if (fixedFilters) {
            fixedWhiteSpace.style.setProperty(
                'height',
                getComputedStyle(wrapper).height
            );
            LSSM.$stores.root.hook({
                event: 'bigMapWindowSizeChanged',
                callback() {
                    fixedWhiteSpace.style.setProperty(
                        'height',
                        getComputedStyle(wrapper).height
                    );
                },
            });
        } else {
            selectGroup.style.setProperty('width', '100%');
        }
        window.buildingsVehicleLoadVisible();
    };

    const observer = new MutationObserver(updateFilters);

    const buildingsElement =
        document.querySelector<HTMLDivElement>('#buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });

    await updateFilters();
});
