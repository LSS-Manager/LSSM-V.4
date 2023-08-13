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
    isStagingArea: boolean,
    $m: $m,
    $mc: $mc
): void => {
    const missionTypeID = LSSM.$utils.getMissionTypeInMissionWindow();

    const initiallyActiveTabName =
        document
            ?.querySelector<HTMLLIElement>('#tabs > li.active')
            ?.textContent?.trim()
            .toLowerCase() ?? '';

    // if this is a transfer mission, tailored tabs are not available
    if (
        !isStagingArea &&
        Object.values(LSSM.$t('transfer_missions') as unknown as number[])
            .map(m => m.toString())
            .includes(missionTypeID)
    )
        return;

    // remove all existing tabs except all and occupied
    const tabList =
        document.querySelector<HTMLUListElement>('#tabs') ??
        document.createElement('ul');
    tabList
        ?.querySelectorAll<HTMLLIElement>(
            'li > a:not([tabload="all"]):not([tabload="occupied"])'
        )
        .forEach(tab => tab.closest('li')?.remove());
    document
        .querySelectorAll<HTMLDivElement>(
            '#col_right .tab-content > div:not([id="all"]):not([id="occupied"])'
        )
        .forEach(tab => tab.remove());

    const DATASET_ATTR = 'ecwTtIndex';
    const DATASET_ATTR_SELECTOR = `data-${DATASET_ATTR.replace(
        /([A-Z])/gu,
        '-$1'
    ).toLowerCase()}`;

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
                title: `[${$m('name')} – ${$m(
                    'settings.tailoredTabs.title'
                )}]: ${$mc(
                    'tailoredTabs.vehicleMissing.title',
                    vehiclesNotInTabs.length
                )}`,
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

    // if this is a staging area, add a wrapper and tab for all vehicles
    if (isStagingArea) {
        tabList.classList.add('nav', 'nav-tabs');

        const allTab = document.createElement('li');
        allTab.classList.add('active');
        allTab.dataset[DATASET_ATTR] = '-1';
        const allTabA = document.createElement('a');
        allTabA.setAttribute('href', '#all');
        allTabA.textContent = $m(`tailoredTabs.allTab`).toString();
        allTab.append(allTabA);

        tabList.append(allTab);
        document.querySelector('#vehicle_show_table_all')?.before(tabList);
    } else {
        const originalAllTab = document.querySelector<HTMLLIElement>(
            '#tabs > li:first-child'
        );
        if (originalAllTab) originalAllTab.dataset[DATASET_ATTR] = '-1';
    }

    // add the custom tabs to tabList
    tabs.forEach(({ name, color }, index) => {
        const tabLi = document.createElement('li');
        tabLi.dataset[DATASET_ATTR] = index.toString();
        const tabA = document.createElement('a');
        tabA.setAttribute('href', `#`);
        tabA.textContent = name;

        if (color !== (LSSM.$stores.root.isDarkMode ? '#505050' : '#fff')) {
            tabA.style.setProperty('background-color', color);
            tabA.style.setProperty(
                'color',
                isLightColor(color) ? '#000' : '#fff'
            );
        }

        tabLi.append(tabA);
        tabList.append(tabLi);
    });
    // move the occupied tab to the end (if it exists)
    const occupiedTab = tabList
        .querySelector<HTMLLIElement>('li > a[tabload="occupied"]')
        ?.closest('li');
    if (occupiedTab) tabList.append(occupiedTab);

    const allTable = document.querySelector<HTMLTableElement>(
        '#vehicle_show_table_all'
    );
    const allTbody = allTable?.querySelector<HTMLTableSectionElement>('tbody');

    if (!allTable || !allTbody) return;

    const HIDDEN_CLASS = LSSM.$stores.root.nodeAttribute('ecw-tt-row_hidden');
    const LIGHT_CLASS = LSSM.$stores.root.nodeAttribute('ecw-tt-row_light');
    let isLightRow = true;

    const lightColor = LSSM.$stores.root.isDarkMode ? '#505050' : '#ffffff';
    const darkColor = LSSM.$stores.root.isDarkMode ? '#323232' : '#f9f9f9';

    LSSM.$stores.root.addStyles([
        {
            selectorText: `#vehicle_show_table_all tbody tr.${HIDDEN_CLASS}`,
            style: {
                display: 'none !important',
            },
        },
        {
            selectorText: `#vehicle_show_table_all tbody tr`,
            style: {
                'background-color': darkColor,
            },
        },
        {
            selectorText: `#vehicle_show_table_all tbody tr.${LIGHT_CLASS}`,
            style: {
                'background-color': lightColor,
            },
        },
    ]);

    const showRow = (vehicle: HTMLInputElement): void => {
        const row = vehicle.parentElement?.parentElement;
        if (!row) return;
        row.classList.remove(HIDDEN_CLASS);
        if (isLightRow) row.classList.add(LIGHT_CLASS);
        else row.classList.remove(LIGHT_CLASS);
        isLightRow = !isLightRow;
    };
    const hideRow = (vehicle: HTMLInputElement): void =>
        vehicle.parentElement?.parentElement?.classList.add(HIDDEN_CLASS);

    const filter = (vehicleTypes: string[], showAll: boolean) => {
        isLightRow = true;
        allTbody
            .querySelectorAll<HTMLInputElement>(
                'tr td input.vehicle_checkbox[vehicle_type_id]'
            )
            .forEach(checkbox => {
                if (showAll) return showRow(checkbox);

                const vehicleType =
                    checkbox.getAttribute('vehicle_type_id') ?? '';
                const customVehicleType = `${vehicleType}-${
                    checkbox.parentElement?.parentElement?.getAttribute(
                        'vehicle_type'
                    ) ?? ''
                }`;
                const isCustomVehicleType = !checkbox.hasAttribute('custom_');
                if (
                    vehicleTypes.includes(vehicleType) ||
                    vehicleTypes.includes(customVehicleType) ||
                    (!isCustomVehicleType &&
                        vehicleTypes.includes(`${vehicleType}*`))
                )
                    showRow(checkbox);
                else hideRow(checkbox);
            });
    };

    // initially show all vehicles and apply custom colors
    filter([], true);

    // handle clicks on custom tabs
    tabList.addEventListener('click', e => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const targetLi = target.closest<HTMLLIElement>(
            `li[${DATASET_ATTR_SELECTOR}]`
        );
        if (!targetLi) return;
        e.preventDefault();

        // set active class to current tab
        tabList
            .querySelector<HTMLLIElement>('li.active')
            ?.classList.remove('active');
        targetLi.classList.add('active');

        // hide occupied table and show all table
        document
            .querySelector<HTMLDivElement>('.tab-content #occupied.active')
            ?.classList.remove('active');
        document
            .querySelector<HTMLDivElement>('.tab-content #all')
            ?.classList.add('active');

        // tab index of -1 indicates all tab in staging area
        const tabIndex = parseInt(targetLi.dataset[DATASET_ATTR] ?? '-1');

        const vehicleTypes = (tabs[tabIndex]?.vehicleTypes ?? []).map(vt =>
            vt.toString()
        );

        filter(vehicleTypes, tabIndex === -1);

        if (tabIndex === -1)
            // trigger sort
            $(allTable).trigger('update');
    });

    // trigger filter after sorting as sorting re-adds rows to the table
    $(allTable).on('sortEnd', () => {
        const tabIndex = parseInt(
            tabList.querySelector<HTMLLIElement>('li.active')?.dataset[
                DATASET_ATTR
            ] ?? '-1'
        );
        if (tabIndex !== -1) {
            filter(
                tabs[tabIndex].vehicleTypes.map(vt => vt.toString()),
                false
            );
        } else {
            filter([], true);
        }
    });

    // in staging area init sorting
    if (isStagingArea) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore as we don't have the types for tableSorter-Plugin
        $(allTable).tablesorter({
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
            },
        });
    }

    const initiallyActiveTabIndex = tabs.findIndex(
        ({ name }) => name.toLowerCase() === initiallyActiveTabName
    );
    if (initiallyActiveTabIndex !== -1) {
        tabList
            .querySelector<HTMLLIElement>(
                `li[${DATASET_ATTR_SELECTOR}="${initiallyActiveTabIndex}"]`
            )
            ?.click();
    }
};
