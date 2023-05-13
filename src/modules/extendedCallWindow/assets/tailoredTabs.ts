import type { $m, $mc } from 'typings/Module';

const isLightColor = (color: `#${string}`): boolean => {
    const hex = parseInt(color.replace(/^#/u, ''), 16);
    const r = hex >> 16;
    const g = (hex >> 8) & 255;
    const b = hex & 255;
    return (
        Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) > 255 / 2
    );
};

export default (
    LSSM: Vue,
    tabs: {
        name: string;
        vehicleTypes: (number | string)[];
        color: `#${string}`;
    }[],
    stagingMode: boolean,
    $m: $m,
    $mc: $mc
): void => {
    const missionHelpBtn =
        document.querySelector<HTMLAnchorElement>('#mission_help');
    const isDiyMission = !missionHelpBtn;
    let missionTypeID = '-1';
    if (!isDiyMission)
        missionTypeID = LSSM.$utils.getMissionTypeInMissionWindow();

    if (
        !stagingMode &&
        Object.values(LSSM.$t('transfer_missions') as unknown as number[])
            .map(m => m.toString())
            .includes(missionTypeID)
    )
        return;

    const activeTabName =
        document
            ?.querySelector<HTMLLIElement>('#tabs > li.active')
            ?.textContent?.trim() ?? '';

    Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
            '#tabs > li > a:not([href="#all"]):not([href="#occupied"])'
        )
    ).forEach(e => {
        const target = e.getAttribute('href');
        if (target) document.querySelector(target)?.remove();
        e.parentElement?.remove();
    });

    let tabList = document.querySelector<HTMLUListElement>('#tabs');
    let allTab = tabList?.querySelector<HTMLLIElement>(
        '#tabs > li:first-child'
    );
    let occupiedTab = tabList?.querySelector<HTMLLIElement>(
        '#tabs > li:last-child'
    );
    const occupiedTabActive =
        occupiedTab?.classList.contains('active') ?? false;
    let panelWrapper = document.querySelector<HTMLDivElement>(
        '#vehicle_list_step .tab-content'
    );

    const vehicleTypes = LSSM.$stores.translations.vehicles;

    const vehiclesInTabs = [
        ...new Set(tabs.flatMap(({ vehicleTypes }) => vehicleTypes)),
    ].map(vehicle => vehicle.toString());
    const vehiclesNotInTabs = Object.keys(vehicleTypes)
        .filter(vehicle => !vehiclesInTabs.includes(vehicle))
        .sort();

    if (vehiclesNotInTabs.length) {
        const NOT_IN_TABS_ALERTED = 'ecw_tt_not_in_tabs_alerted';

        const warningBtnWrapper = document.createElement('span');
        const warningBtn = document.createElement('i');
        warningBtn.classList.add(
            'fas',
            'fa-exclamation-triangle',
            'text-warning'
        );
        warningBtn.id = LSSM.$stores.root.nodeAttribute('ecw-tt-missingbtn');
        warningBtnWrapper.append(warningBtn);

        document
            .querySelector<HTMLDivElement>('#dispatch_buttons')
            ?.parentElement?.before(warningBtnWrapper);
        LSSM.$stores.root.addStyle({
            selectorText: `#${warningBtn.id}`,
            style: {
                cursor: 'pointer',
            },
        });

        const showAlert = () => {
            LSSM.$modal.show('dialog', {
                title: $mc(
                    'tailoredTabs.vehicleMissing.title',
                    vehiclesNotInTabs.length
                ),
                text: `${$m(
                    'tailoredTabs.vehicleMissing.text'
                )}<ul>${vehiclesNotInTabs
                    .map(
                        type =>
                            `<li>${vehicleTypes[parseInt(type)].caption}</li>`
                    )
                    .join('')}</ul>`,
                options: {},
                buttons: [
                    {
                        title: $m('tailoredTabs.vehicleMissing.hide'),
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: $m('tailoredTabs.vehicleMissing.close'),
                        handler() {
                            LSSM.$stores.storage
                                .set({
                                    key: NOT_IN_TABS_ALERTED,
                                    value: vehiclesNotInTabs,
                                })
                                .then(() => LSSM.$modal.hide('dialog'));
                        },
                    },
                ],
            });
        };

        warningBtnWrapper?.addEventListener('click', showAlert);
        LSSM.$stores.storage
            .get<string[]>({ key: NOT_IN_TABS_ALERTED, defaultValue: [] })
            .then(
                async alerted =>
                    !(await import('lodash/isEqual')).default(
                        alerted.sort(),
                        vehiclesNotInTabs
                    ) && showAlert()
            );
    }

    if (!document.querySelector('#vehicle_list_step')) {
        const vehicleListStep = document.createElement('div');
        vehicleListStep.setAttribute('id', 'vehicle_list_step');
        document
            .querySelector('form > table#vehicle_show_table_all')
            ?.parentElement?.insertBefore(
                vehicleListStep,
                document.querySelector('table#vehicle_show_table_all')
            );
    }
    if (!tabList) {
        tabList = document.createElement('ul');
        tabList.classList.add('nav', 'nav-tabs');
        tabList.setAttribute('role', 'tablist');
        tabList.setAttribute('id', 'tabs');
        document.querySelector('#vehicle_list_step')?.append(tabList);
    }
    if (!allTab) {
        allTab = document.createElement('li');
        allTab.setAttribute('role', 'presentation');
        allTab.classList.add('active');
        const allTabA = document.createElement('a');
        allTabA.setAttribute('href', '#all');
        allTabA.setAttribute('tabload', 'all');
        allTabA.setAttribute('aria-controls', 'all');
        allTabA.setAttribute('role', 'tab');
        allTabA.setAttribute('data-toggle', 'tab');
        allTabA.setAttribute('aria-expanded', 'true');
        allTabA.textContent = $m(`tailoredTabs.allTab`) as string;
        allTab.append(allTabA);
        tabList.append(allTab);
    }
    if (!occupiedTab) {
        occupiedTab = document.createElement('li');
        occupiedTab.setAttribute('role', 'presentation');
        occupiedTab.classList.add('hidden');
        const occupiedTabA = document.createElement('a');
        occupiedTabA.setAttribute('href', '#occupied');
        occupiedTabA.setAttribute('tabload', 'occupied');
        occupiedTabA.textContent = <string>$m(`tailoredTabs.occupiedTab`);
        occupiedTab.append(occupiedTabA);
        tabList.append(occupiedTab);
    }
    if (!panelWrapper) {
        panelWrapper = document.createElement('div');
        panelWrapper.classList.add('tab-content');
        const panelDiv = document.createElement('div');
        panelDiv.classList.add('tab-pane', 'active');
        panelDiv.setAttribute('id', 'all');
        panelDiv.setAttribute('role', 'tabpanel');
        const allVehicleTable = document.querySelector(
            '#vehicle_show_table_all'
        ) as HTMLTableElement | null;
        if (!allVehicleTable) return;
        allVehicleTable?.setAttribute('role', 'grid');
        panelDiv.append(allVehicleTable);
        panelWrapper.append(panelDiv);
        document.querySelector('#vehicle_list_step')?.append(panelWrapper);
    }

    const panels = {} as Record<string, HTMLDivElement>;
    const tabBar = {
        all: { tablesorterId: null },
        occupied: { tablesorterId: 'vehicle_show_table_occupied' },
    } as Record<
        string,
        {
            tablesorterId: string | null;
        }
    >;
    const vehicleTypeMap = {} as Record<string, string[]>;
    const idByName: Record<string, string> = {};
    tabs.forEach(({ name, vehicleTypes, color }) => {
        if (!tabList || !allTab || !occupiedTab || !panelWrapper) return;
        const tabId = LSSM.$stores.root.nodeAttribute(
            `tailoredtabs-${name}`,
            true
        );

        const tabSelector = document.createElement('li');
        tabSelector.setAttribute('role', 'presentation');
        const tabLink = document.createElement('a');
        tabLink.href = `#${tabId}`;
        tabLink.setAttribute('tabload', tabId);
        tabLink.textContent = name;
        tabSelector.append(tabLink);
        occupiedTab.before(tabSelector);

        if (color !== (LSSM.$stores.root.isDarkMode ? '#505050' : '#fff')) {
            tabLink.style.setProperty('background-color', color);
            tabLink.style.setProperty(
                'color',
                isLightColor(color) ? '#000' : '#fff'
            );
        }

        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane');
        tabPane.id = tabId;
        tabPane.setAttribute('role', 'tabpanel');

        const tabTable = document.createElement('table');
        tabTable.classList.add('table', 'table-striped');
        tabTable.id = `vehicle_show_table_${tabId}`;

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const searchHead = document.createElement('th');
        searchHead.style.width = '20px';
        const searchLink = document.createElement('a');
        searchLink.href = '#';
        searchLink.setAttribute('table_id', tabId);
        searchLink.classList.add('show_hide_search');
        const searchSpan = document.createElement('span');
        searchSpan.classList.add('glyphicon', 'glyphicon-search');
        const emptyHead = document.createElement('th');
        emptyHead.style.width = '20px';
        const vehicleHead = document.createElement('th');
        vehicleHead.textContent = LSSM.$tc('vehicle', 0);
        const distanceHead = document.createElement('th');
        distanceHead.textContent = LSSM.$tc('distance', 1).toString();
        const stationHead = document.createElement('th');
        stationHead.classList.add('hidden-xs');
        stationHead.textContent = LSSM.$tc('station', 1).toString();
        const searchRow = document.createElement('tr');
        searchRow.classList.add('mission_vehicle_search_outer');
        searchRow.id = `mission_vehicle_search_outer_${tabId}`;
        const searchWrapper = document.createElement('th');
        searchWrapper.colSpan = 5;
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.setAttribute('table_id', tabId);
        searchInput.classList.add('mission_vehicle_search_input');
        searchInput.id = `search_field_${tabId}`;

        const tbody = document.createElement('tbody');
        tbody.id = `vehicle_show_table_body_${tabId}`;

        searchLink.append(searchSpan);
        searchHead.append(searchLink);
        headRow.append(searchHead);
        headRow.append(emptyHead);
        headRow.append(vehicleHead);
        headRow.append(distanceHead);
        headRow.append(stationHead);
        thead.append(headRow);
        searchWrapper.append(searchInput);
        searchRow.append(searchWrapper);
        thead.append(searchRow);
        tabTable.append(thead);
        tabTable.append(tbody);
        tabPane.append(tabTable);

        panelWrapper.append(tabPane);

        panels[tabId] = tabPane;
        tabBar[tabId] = { tablesorterId: `vehicle_show_table_${tabId}` };
        vehicleTypeMap[tabId] = vehicleTypes.map(v => v.toString());
        idByName[name] = tabId;
    });

    if (stagingMode) {
        document
            .querySelector<HTMLTableSectionElement>(
                '#vehicle_show_table_body_all'
            )
            ?.addEventListener('change', ({ target }) => {
                const checkbox = target as HTMLInputElement;
                document
                    .querySelectorAll<HTMLInputElement>(
                        `.vehicle_checkbox[value="${checkbox.getAttribute(
                            'value'
                        )}"]`
                    )
                    .forEach(box => (box.checked = checkbox.checked));
            });
    }

    tabList.addEventListener('click', e => {
        if (!tabList || !allTab || !occupiedTab || !panelWrapper) return;
        const tabSelector = (e.target as HTMLElement)?.closest('a[tabload]');
        const tab = tabSelector?.getAttribute('tabload');
        if (!tabSelector || !tab || ['all', 'occupied'].includes(tab)) return;
        e.preventDefault();

        tabList.querySelector('li.active')?.classList.remove('active');
        tabSelector.parentElement?.classList.add('active');
        document
            .querySelector<HTMLDivElement>('#all')
            ?.classList.remove('active');
        document
            .querySelector<HTMLDivElement>('#occupied')
            ?.classList.remove('active');
        Object.entries(panels).forEach(([id, panel]) =>
            panel.classList[id === tab ? 'add' : 'remove']('active')
        );

        const tableSorterId = tabBar[tab].tablesorterId;
        if (!tableSorterId) return;
        const tableSorterEl = document.querySelector<HTMLTableElement>(
            `#${tableSorterId}`
        );
        if (!tableSorterEl) return;

        const vehicles = Array.from(
            document.querySelectorAll<HTMLInputElement>(
                '#vehicle_show_table_body_all tr td input.vehicle_checkbox[vehicle_type_id]'
            )
        )
            .filter(v => {
                const vehicleType = v.getAttribute('vehicle_type_id') ?? '';
                const customVehicleType = `${vehicleType}-${
                    v.parentElement?.parentElement?.getAttribute(
                        'vehicle_type'
                    ) ?? ''
                }`;
                const isCustomVehicleType = !v.hasAttribute('custom_');
                return (
                    vehicleTypeMap[tab].includes(vehicleType) ||
                    vehicleTypeMap[tab].includes(customVehicleType) ||
                    (!isCustomVehicleType &&
                        vehicleTypeMap[tab].includes(`${vehicleType}*`))
                );
            })
            .map(v => v.parentElement?.parentElement)
            .filter(v => !!v) as HTMLTableRowElement[];

        const tbody = tableSorterEl.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        tbody.append(...vehicles.map(v => v.cloneNode(true)));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $<HTMLTableElement>(`#${tableSorterId}`).tablesorter({
            sortList: [[3, 0]],
            headers: {
                3: {
                    sorter: 'mission_time',
                },
                5: {
                    sorter: false,
                },
                0: {
                    sorter: false,
                },
                1: {
                    sorter: false,
                },
            },
        });
    });

    tabList
        .querySelector<HTMLAnchorElement>(
            `#tabs > li > a[href="#${
                occupiedTabActive
                    ? 'occupied'
                    : idByName[activeTabName] || 'all'
            }"]`
        )
        ?.click();
};
