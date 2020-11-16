// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    tabs: { name: string; vehicleTypes: number[] }[],
    stagingMode: boolean,
    $m: $m
): void => {
    const missionHelpBtn = document.getElementById('mission_help');
    const isDiyMission = !missionHelpBtn;
    let missionTypeID = -1;
    if (!isDiyMission)
        missionTypeID = parseInt(
            missionHelpBtn
                ?.getAttribute('href')
                ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1'
        );
    if (
        !stagingMode &&
        Object.values(
            (LSSM.$t('transfer_missions') as unknown) as number[]
        ).includes(missionTypeID)
    )
        return;
    Array.from(
        document.querySelectorAll(
            '#tabs > li > a:not([href="#all"]):not([href="#occupied"])'
        ) as NodeListOf<HTMLAnchorElement>
    ).map(e => {
        const target = e.getAttribute('href');
        target && document.querySelector(target)?.remove();
        e.parentElement?.remove();
    });

    let tabList = document.getElementById('tabs');
    let allTab = tabList?.querySelector('#tabs > li:first-child');
    let occupiedTab = tabList?.querySelector('#tabs > li:last-child');
    let panelWrapper = document.querySelector(
        '#vehicle_list_step .tab-content'
    );

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
        document.querySelector('#vehicle_list_step')?.appendChild(tabList);
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
        allTabA.innerText = $m(`tailoredTabs.allTab`) as string;
        allTab.appendChild(allTabA);
        tabList.appendChild(allTab);
    }
    if (!occupiedTab) {
        occupiedTab = document.createElement('li');
        occupiedTab.setAttribute('role', 'presentation');
        occupiedTab.classList.add('hidden');
        const occupiedTabA = document.createElement('a');
        occupiedTabA.setAttribute('href', '#occupied');
        occupiedTabA.setAttribute('tabload', 'occupied');
        occupiedTabA.innerText = <string>$m(`tailoredTabs.occupiedTab`);
        occupiedTab.appendChild(occupiedTabA);
        tabList.appendChild(occupiedTab);
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
        panelWrapper.appendChild(panelDiv);
        document.querySelector('#vehicle_list_step')?.appendChild(panelWrapper);
    }

    const panels = {} as {
        [key: string]: HTMLDivElement;
    };
    const tabBar = {
        all: { tablesorterId: null },
        occupied: { tablesorterId: 'vehicle_show_table_occupied' },
    } as {
        [key: string]: {
            tablesorterId: string | null;
        };
    };
    const vehicleTypeMap = {} as {
        [id: string]: number[];
    };
    tabs.forEach(({ name, vehicleTypes }) => {
        if (!tabList || !allTab || !occupiedTab || !panelWrapper) return;
        const tabId = LSSM.$store.getters.nodeAttribute(
            `tailoredtabs-${name}`,
            true
        );

        const tabSelector = document.createElement('li');
        tabSelector.setAttribute('role', 'presentation');
        const tabLink = document.createElement('a');
        tabLink.href = `#${tabId}`;
        tabLink.setAttribute('tabload', tabId);
        tabLink.textContent = name;
        tabSelector.appendChild(tabLink);
        tabList.insertBefore(tabSelector, occupiedTab);

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

        searchLink.appendChild(searchSpan);
        searchHead.appendChild(searchLink);
        headRow.appendChild(searchHead);
        headRow.appendChild(emptyHead);
        headRow.appendChild(vehicleHead);
        headRow.appendChild(distanceHead);
        headRow.appendChild(stationHead);
        thead.appendChild(headRow);
        searchWrapper.appendChild(searchInput);
        searchRow.appendChild(searchWrapper);
        thead.appendChild(searchRow);
        tabTable.appendChild(thead);
        tabTable.appendChild(tbody);
        tabPane.appendChild(tabTable);

        panelWrapper.appendChild(tabPane);

        panels[tabId] = tabPane;
        tabBar[tabId] = { tablesorterId: `vehicle_show_table_${tabId}` };
        vehicleTypeMap[tabId] = vehicleTypes;
    });

    tabList.addEventListener('click', e => {
        if (!tabList || !allTab || !occupiedTab || !panelWrapper) return;
        const tabSelector = (e.target as HTMLElement)?.closest('a[tabload]');
        const tab = tabSelector?.getAttribute('tabload');
        if (!tabSelector || !tab || ['all', 'occupied'].includes(tab)) return;
        e.preventDefault();

        tabList.querySelector('li.active')?.classList.remove('active');
        tabSelector.parentElement?.classList.add('active');
        document.getElementById('all')?.classList.remove('active');
        document.getElementById('occupied')?.classList.remove('active');
        Object.entries(panels).forEach(([id, panel]) =>
            panel.classList[id === tab ? 'add' : 'remove']('active')
        );

        const tableSorterId = tabBar[tab].tablesorterId;
        if (!tableSorterId) return;
        const tableSorterEl = document.getElementById(tableSorterId);
        if (!tableSorterEl) return;

        const vehicles = Array.from(
            document.querySelectorAll(
                '#vehicle_show_table_body_all tr td[vehicle_type_id]'
            ) as NodeListOf<HTMLTableDataCellElement>
        )
            .filter(v =>
                vehicleTypeMap[tab].includes(
                    parseInt(v.getAttribute('vehicle_type_id') || '-1')
                )
            )
            .map(v => v.parentElement)
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
};
