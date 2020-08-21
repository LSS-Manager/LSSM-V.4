export default (LSSM: Vue, specs: boolean, time: boolean): void => {
    const ARRContainer = document.getElementById(
        'mission-aao-group'
    ) as HTMLDivElement;

    if (!ARRContainer) return;

    const ARRSpecTranslations = (LSSM.$t(
        `modules.${MODULE_ID}.arrHover.arrSpecs`
    ) as unknown) as {
        [spec: string]: string;
    };

    const infoBox = document.createElement('div');
    infoBox.id = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-arrHover-infobox`
    );
    infoBox.classList.add('btn', 'disabled', 'hidden');

    let arrTime: HTMLElement | undefined;
    let arrSpecs: HTMLTableSectionElement | undefined;
    let resetNote: HTMLElement | undefined;
    let maxAmountNode: HTMLSpanElement | undefined;

    if (time) {
        arrTime = document.createElement('b');
        infoBox.append(arrTime);
    }

    if (specs) {
        maxAmountNode = document.createElement('span');
        maxAmountNode.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}-arrHover-maxAmount`
        );
        maxAmountNode.classList.add('pull-right');
        resetNote = document.createElement('b');
        resetNote.classList.add('hidden');
        resetNote.textContent = LSSM.$t(
            `modules.${MODULE_ID}.arrHover.reset`
        ).toString();
        resetNote.style.display = 'block';
        infoBox.append(maxAmountNode, resetNote);
        const specsTable = document.createElement('table');
        specsTable.style.width = '100%';
        specsTable.style.color = 'black';
        const specsHeader = document.createElement('thead');
        specsHeader.style.backgroundColor = 'limegreen';
        const specsHeadRow = specsHeader.insertRow();
        ['set', 'attribute', 'free', 'max'].forEach(title => {
            const titleEl = specsHeadRow.insertCell();
            titleEl.textContent = title;
            titleEl.setAttribute(
                'title',
                LSSM.$t(
                    `modules.${MODULE_ID}.arrHover.titles.${title}`
                ).toString()
            );
        });
        arrSpecs = document.createElement('tbody');
        const arrSpecsId = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_arrHover_specslist`
        );
        arrSpecs.id = arrSpecsId;
        specsTable.append(specsHeader, arrSpecs);
        infoBox.append(specsTable);
        LSSM.$store
            .dispatch('addStyles', [
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
            ])
            .then();
    }

    const check_amount_available = (
        buildings: string[],
        attributes: NamedNodeMap
    ): { [attribute: string]: number } => {
        const attributeNames = Array.from(attributes)
            .filter(
                ({ name, value }) =>
                    (ARRSpecTranslations.hasOwnProperty(name) ||
                        name.startsWith('vehicle_type_caption')) &&
                    value !== '0'
            )
            .map(({ name }) => name);
        let hlf_or_rw_lf = 0;
        let naw_or_rtw_nef = 0;
        let naw_or_rtw_nef_rth = 0;

        const amounts = {} as { [attribute: string]: number };

        (document.querySelectorAll(
            '#all .vehicle_checkbox:not(:checked)'
        ) as NodeListOf<HTMLInputElement>).forEach(vehicle => {
            if (!vehicle.checked)
                attributeNames.forEach(attr => {
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
                            } else if (vehicle.getAttribute('rtw') === '1') {
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
                            } else if (vehicle.getAttribute('rtw') === '1') {
                                if (naw_or_rtw_nef_rth > 0) amounts[attr]++;
                                naw_or_rtw_nef_rth--;
                            } else if (vehicle.getAttribute('nef') === '1') {
                                if (naw_or_rtw_nef_rth < 0) amounts[attr]++;
                                naw_or_rtw_nef_rth++;
                            }
                            break;
                        default:
                            if (vehicle.getAttribute(attr) === '1')
                                amounts[attr]++;
                            else if (attr === 'wasser_amount')
                                amounts[attr] += parseInt(
                                    vehicle.getAttribute(attr) || '0'
                                );
                            break;
                    }
                });
        });
        return amounts;
    };

    const updateSpecs = (buildingIds: string[], arr: HTMLAnchorElement) => {
        const availabilities = check_amount_available(
            buildingIds,
            arr.attributes
        );
        if (specs && arrSpecs) {
            resetNote?.classList[
                arr.getAttribute('reset') === 'true' ? 'remove' : 'add'
            ]('hidden');
            arrSpecs.innerHTML = '';
            let minimumAvailable = Infinity;
            arrSpecs.append(
                ...(Array.from(arr.attributes)
                    .map(attr => {
                        const name = ARRSpecTranslations[attr.name];
                        const amount = parseInt(attr.value);
                        if (
                            (!name &&
                                !attr.name.startsWith(
                                    'vehicle_type_caption'
                                )) ||
                            !amount ||
                            Number.isNaN(amount)
                        )
                            return null;
                        const rowElement = document.createElement('tr');
                        const available = availabilities[attr.name] || 0;
                        if (available < amount)
                            rowElement.classList.add('bg-danger');
                        rowElement.insertCell().textContent = `${amount.toLocaleString()}x`;
                        rowElement.insertCell().textContent =
                            name ??
                            attr.name.match(
                                /^vehicle_type_caption\[(.*)]$/
                            )?.[1] ??
                            '';
                        rowElement.insertCell().textContent = available.toLocaleString();
                        const max = Math.floor(available / amount);
                        rowElement.insertCell().textContent = max.toLocaleString();
                        if (max < minimumAvailable) minimumAvailable = max;
                        return rowElement;
                    })
                    .filter(v => !!v) as HTMLTableRowElement[]).sort((a, b) =>
                    (a.textContent || '') < (b.textContent || '')
                        ? -1
                        : (a.textContent || '') > (b.textContent || '')
                        ? 1
                        : 0
                )
            );
            if (maxAmountNode)
                maxAmountNode.textContent = minimumAvailable.toLocaleString();
        }
    };

    LSSM.$store
        .dispatch('hook', {
            event: 'aao_available',
            callback(id: number) {
                const arr = document.getElementById(
                    `aao_${id}`
                ) as HTMLAnchorElement | null;
                if (!arr) return;
                const buildingIds = JSON.parse(
                    arr.getAttribute('building_ids') || '[]'
                );
                updateSpecs(buildingIds, arr);
            },
        })
        .then();

    let currentTimeout = null as number | null;
    let infoBoxHovered = false;
    infoBox.addEventListener('mouseover', () => (infoBoxHovered = true));
    infoBox.addEventListener('mouseout', () => (infoBoxHovered = false));

    const handle = (arr: HTMLAnchorElement) => {
        arr.removeAttribute('title');
        const arrId = parseInt(arr.getAttribute('aao_id') || '-1');
        if (arrId < 0) return;
        if (time && arrTime) arrTime.id = `aao_timer_${arrId}`;
        arr.append(infoBox);
        window.aao_available(arrId, time);
        infoBox.classList.remove('hidden');
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
                    clearInterval(hideInterval);
                }
            }, 100);
        }
    });
};
