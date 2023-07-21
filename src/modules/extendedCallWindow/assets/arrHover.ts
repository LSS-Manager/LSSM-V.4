import type { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    specs: boolean,
    time: boolean,
    MODULE_ID: string,
    $m: $m
): void => {
    const ARRContainer =
        document.querySelector<HTMLDivElement>('#mission-aao-group');

    if (!ARRContainer) return;

    const ARRSpecTranslations = $m(`arrHover.arrSpecs`) as unknown as Record<
        string,
        string
    >;

    const infoBox = document.createElement('div');
    infoBox.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-arrHover-infobox`,
        true
    );
    infoBox.classList.add('btn', 'disabled', 'hidden');

    const isGroupClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-arrHover-infobox_is-vehicle_group`
    );

    let arrTime: HTMLElement | undefined;
    let arrSpecs: HTMLTableSectionElement | undefined;
    const specsHeads: HTMLTableCellElement[] = [];
    const arrSpecsHeadKeys = ['set', 'attribute', 'free', 'max'];
    let resetNote: HTMLElement | undefined;
    let maxAmountNode: HTMLSpanElement | undefined;

    if (time) {
        arrTime = document.createElement('b');
        infoBox.append(arrTime);
    }

    if (specs) {
        maxAmountNode = document.createElement('span');
        maxAmountNode.id = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}-arrHover-maxAmount`,
            true
        );
        maxAmountNode.classList.add('pull-right');
        resetNote = document.createElement('b');
        resetNote.classList.add('hidden');
        resetNote.textContent = $m(`arrHover.reset`).toString();
        resetNote.style.display = 'block';
        infoBox.append(maxAmountNode, resetNote);
        const specsTable = document.createElement('table');
        specsTable.style.width = '100%';
        specsTable.style.color = 'black';
        const specsHeader = document.createElement('thead');
        specsHeader.style.backgroundColor = 'limegreen';
        const specsHeadRow = specsHeader.insertRow();
        arrSpecsHeadKeys.forEach(title => {
            const titleEl = specsHeadRow.insertCell();
            specsHeads.push(titleEl);
            titleEl.textContent = $m(`arrHover.headers.${title}`).toString();
            titleEl.setAttribute(
                'title',
                $m(`arrHover.titles.${title}`).toString()
            );
        });
        arrSpecs = document.createElement('tbody');
        const arrSpecsId = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}_arrHover_specslist`,
            true
        );
        arrSpecs.id = arrSpecsId;
        specsTable.append(specsHeader, arrSpecs);
        infoBox.append(specsTable);
        LSSM.$stores.root.addStyles([
            {
                selectorText: `#${infoBox.id}`,
                style: {
                    'cursor': 'default',
                    'color': 'black',
                    'position': 'absolute',
                    'display': 'block',
                    'background': 'green',
                    'z-index': '10',
                    'opacity': '1',
                },
            },
            {
                selectorText: `#${maxAmountNode.id}::after`,
                style: {
                    content: '"x"',
                },
            },
            {
                selectorText: `#${arrSpecsId}`,
                style: {
                    padding: '0',
                    color: 'black',
                },
            },
            {
                selectorText: `#${arrSpecsId} tr`,
                style: {
                    'background-color': 'green',
                    'text-align': 'left',
                },
            },
            {
                selectorText: `#${infoBox.id}.${isGroupClass} table tr td:not(:nth-of-type(2))`,
                style: {
                    'text-align': 'center',
                },
            },
            {
                selectorText: `#${infoBox.id}.${isGroupClass} table tr td:nth-of-type(4)`,
                style: {
                    display: 'none',
                },
            },
            {
                selectorText: `#${arrSpecsId} tr:not(.bg-danger):nth-of-type(2n)`,
                style: {
                    'background-color': 'forestgreen',
                },
            },
            {
                selectorText: `#${arrSpecsId} tr.bg-danger:nth-of-type(2n+1)`,
                style: {
                    'background-color': '#a94442',
                },
            },
            {
                selectorText: `#${arrSpecsId} tr.bg-danger:nth-of-type(2n)`,
                style: {
                    'background-color': '#bb5654',
                },
            },
            {
                selectorText: `#${arrSpecsId} tr td:not(:last-child):not(:first-child)`,
                style: {
                    'padding-left': '1ch',
                    'padding-right': '1ch',
                },
            },
        ]);
    }

    const check_amount_available = (
        buildings: number[],
        attributes: Record<string, number>,
        custom: Record<string, number>
    ): Record<string, number> => {
        let hlf_or_rw_lf = 0;
        let naw_or_rtw_nef = 0;
        let naw_or_rtw_nef_rth = 0;

        const amounts: Record<string, number> = {};

        document
            .querySelectorAll<HTMLInputElement>(
                '#all .vehicle_checkbox:not(:checked):not([ignore_aao="1"])'
            )
            .forEach(vehicle => {
                if (
                    !vehicle.checked &&
                    window.aao_building_check(buildings, window.$(vehicle)) &&
                    vehicle.getAttribute('vehicle_type_ignore_default_aao') !==
                        '1'
                ) {
                    Object.keys(attributes).forEach(attr => {
                        if (!amounts.hasOwnProperty(attr)) amounts[attr] = 0;
                        switch (attr) {
                            case 'hlf_or_rw_and_lf':
                                if (vehicle.getAttribute('hlf_only') === '1') {
                                    amounts[attr]++;
                                    break;
                                } else if (
                                    vehicle.getAttribute('rw_only') === '1'
                                ) {
                                    if (hlf_or_rw_lf > 0) amounts[attr]++;
                                    hlf_or_rw_lf--;
                                } else if (
                                    vehicle.getAttribute('lf_only') === '1'
                                ) {
                                    if (hlf_or_rw_lf < 0) amounts[attr]++;
                                    hlf_or_rw_lf++;
                                }
                                break;
                            case 'naw_or_rtw_and_nef':
                                if (vehicle.getAttribute('naw') === '1') {
                                    amounts[attr]++;
                                    break;
                                } else if (
                                    vehicle.getAttribute('rtw') === '1'
                                ) {
                                    if (naw_or_rtw_nef > 0) amounts[attr]++;
                                    naw_or_rtw_nef--;
                                } else if (
                                    vehicle.getAttribute('nef_only') === '1'
                                ) {
                                    if (naw_or_rtw_nef < 0) amounts[attr]++;
                                    naw_or_rtw_nef++;
                                }
                                break;
                            case 'naw_or_rtw_and_nef_or_rth':
                                if (vehicle.getAttribute('naw') === '1') {
                                    amounts[attr]++;
                                    break;
                                } else if (
                                    vehicle.getAttribute('rtw') === '1'
                                ) {
                                    if (naw_or_rtw_nef_rth > 0) amounts[attr]++;
                                    naw_or_rtw_nef_rth--;
                                } else if (
                                    vehicle.getAttribute('nef') === '1'
                                ) {
                                    if (naw_or_rtw_nef_rth < 0) amounts[attr]++;
                                    naw_or_rtw_nef_rth++;
                                }
                                break;
                            default:
                                if (
                                    (!Number.isNaN(parseInt(attr)) &&
                                        attr ===
                                            vehicle.getAttribute(
                                                'vehicle_type_id'
                                            )) ||
                                    vehicle.getAttribute(attr) === '1'
                                ) {
                                    amounts[attr]++;
                                } else if (attr === 'wasser_amount') {
                                    amounts[attr] += parseInt(
                                        vehicle.getAttribute(attr) || '0'
                                    );
                                }
                                break;
                        }
                    });
                }
            });

        Object.keys(custom).forEach(
            vehicleType =>
                (amounts[vehicleType] =
                    document.querySelectorAll<HTMLInputElement>(
                        `#all tr[vehicle_type="${vehicleType.replace(
                            /["\\]/gu,
                            '\\$&'
                        )}"] .vehicle_checkbox:not(:checked):not([ignore_aao="1"])`
                    ).length)
        );

        return amounts;
    };

    const updateSpecsForArr = (
        buildingIds: number[],
        arr: HTMLAnchorElement
    ) => {
        infoBox.classList.remove(isGroupClass);

        const ingameSpecs: Record<string, number> = {};
        Array.from(arr.attributes).forEach(({ name, value }) => {
            if (name === 'vehicle_type_ids') {
                Object.entries(
                    JSON.parse(value) as Record<string, string>
                ).forEach(
                    ([id, amount]) => (ingameSpecs[id] = parseInt(amount))
                );
            } else {
                const amount = parseInt(value);
                if (
                    ARRSpecTranslations.hasOwnProperty(name) &&
                    amount &&
                    !Number.isNaN(amount)
                )
                    ingameSpecs[name] = amount;
            }
        });
        const customSpecs = Object.fromEntries(
            Object.entries(
                JSON.parse(arr.getAttribute('custom') || '{}') as Record<
                    string,
                    number
                >
            ).filter(([, amount]) => amount > 0)
        );
        const availabilities = check_amount_available(
            buildingIds,
            ingameSpecs,
            customSpecs
        );
        if (specs && ingameSpecs && arrSpecs) {
            resetNote?.classList[
                arr.getAttribute('reset') === 'true' ? 'remove' : 'add'
            ]('hidden');
            arrTime?.classList.remove('hidden');
            specsHeads.forEach(
                (head, index) =>
                    (head.textContent = $m(
                        `arrHover.headers.${arrSpecsHeadKeys[index]}`
                    ).toString())
            );
            arrSpecs.innerHTML = '';
            let minimumAvailable = Infinity;
            const vehicleTypeCaptionsAttr: Record<string, string> = JSON.parse(
                arr.getAttribute('vehicle_type_captions') ?? '{}'
            );
            arrSpecs.append(
                ...(
                    Object.entries({
                        ...ingameSpecs,
                        ...customSpecs,
                    }).map(([name, amount]) => [
                        name,
                        ARRSpecTranslations[name] ??
                            vehicleTypeCaptionsAttr[name] ??
                            name,
                        amount,
                    ]) as [string, string, number][]
                )
                    .sort(([, a], [, b]) => (a < b ? -1 : a > b ? 1 : 0))
                    .map(([attr, name, amount]) => {
                        const rowElement = document.createElement('tr');
                        const available = availabilities[attr] || 0;
                        if (available < amount)
                            rowElement.classList.add('bg-danger');
                        rowElement.insertCell().textContent = `${amount.toLocaleString()}x`;
                        rowElement.insertCell().textContent = name;
                        rowElement.insertCell().textContent =
                            available.toLocaleString();
                        const max = Math.floor(available / amount);
                        rowElement.insertCell().textContent =
                            max.toLocaleString();
                        if (max < minimumAvailable) minimumAvailable = max;
                        return rowElement;
                    })
            );
            if (maxAmountNode)
                maxAmountNode.textContent = minimumAvailable.toLocaleString();
        }
    };

    const updateSpecsForGroup = (group: HTMLAnchorElement) => {
        resetNote?.classList.add('hidden');
        arrTime?.classList.add('hidden');
        infoBox.classList.add(isGroupClass);

        if (!specs || !arrSpecs) return;

        specsHeads[0].textContent = $m(`arrHover.headers.free`).toString();
        specsHeads[2].textContent = $m(`arrHover.headers.status`).toString();
        arrSpecs.innerHTML = '';

        let allAvailable = true;

        arrSpecs.append(
            ...(
                JSON.parse(group.getAttribute('vehicles') ?? '[]') as [
                    number,
                    string,
                ][]
            ).map(([vehicleId, vehicleName]) => {
                const vehicleRow = document.querySelector<HTMLTableRowElement>(
                    `#vehicle_element_content_${vehicleId}`
                );
                const row = document.createElement('tr');

                const available = document.createElement('td');
                const availableIcon = document.createElement('i');
                availableIcon.classList.add(
                    'fa-solid',
                    `fa-${vehicleRow ? 'check' : 'xmark'}`
                );
                available.append(availableIcon);

                const name = document.createElement('td');
                name.textContent = vehicleName;

                const status = document.createElement('td');
                if (vehicleRow) {
                    status.append(
                        vehicleRow
                            .querySelector('.building_list_fms')
                            ?.cloneNode(true) ?? '–'
                    );
                } else {
                    allAvailable = false;
                }

                row.append(available, name, status);
                return row;
            })
        );

        if (maxAmountNode)
            maxAmountNode.textContent = (allAvailable ? 1 : 0).toLocaleString();
    };

    LSSM.$stores.root.hook({
        event: 'aao_available',
        callback(id: number) {
            const arr = document.querySelector<HTMLAnchorElement>(`#aao_${id}`);
            if (!arr) return;
            const buildingIds: number[] = JSON.parse(
                arr.getAttribute('building_ids') || '[]'
            );
            updateSpecsForArr(buildingIds, arr);
        },
    });

    let currentTimeout = null as number | null;
    let infoBoxHovered = false;
    infoBox.addEventListener('mouseover', () => (infoBoxHovered = true));
    infoBox.addEventListener('mouseout', () => (infoBoxHovered = false));

    const handle = (arr: HTMLAnchorElement) => {
        arr.removeAttribute('title');
        const arrId = parseInt(arr.getAttribute('aao_id') || '-1');
        const vehicleGroupId = parseInt(
            arr.getAttribute('vehicle_group_id') || '-1'
        );
        const isArr = arrId >= 0;
        const isVehicleGroup = vehicleGroupId >= 0;
        if (!isArr && !isVehicleGroup) return;
        if (time && arrTime) arrTime.id = `aao_timer_${arrId}`;
        arr.append(infoBox);
        if (isArr) window.aao_available(arrId, time);
        else updateSpecsForGroup(arr);
        infoBox.classList.remove('hidden');
        infoBox.parentElement?.style.setProperty('z-index', '1');
    };

    ARRContainer.addEventListener('mouseover', e => {
        const target = (e.target as HTMLElement)?.closest(
            `.aao, .vehicle_group, #${infoBox.id}`
        ) as HTMLAnchorElement | null;
        if (target)
            currentTimeout = window.setTimeout(() => handle(target), 500);
    });

    ARRContainer.addEventListener('mouseout', e => {
        const target = (e.target as HTMLElement)?.closest(
            `.aao, .vehicle_group, #${infoBox.id}`
        ) as HTMLAnchorElement | null;
        if (!target) return;
        if (currentTimeout) window.clearTimeout(currentTimeout);
        if (!infoBoxHovered) {
            const hideInterval = window.setInterval(() => {
                if (!infoBoxHovered) {
                    infoBox.classList.add('hidden');
                    infoBox.parentElement?.style.removeProperty('z-index');
                    clearInterval(hideInterval);
                }
            }, 100);
        }
    });
};
