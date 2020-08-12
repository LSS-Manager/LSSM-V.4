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
    infoBox.classList.add('btn', 'disabled', 'hidden');
    infoBox.style.position = 'absolute';
    infoBox.style.display = 'block';
    infoBox.style.background = 'green';
    infoBox.style.zIndex = '1';
    infoBox.style.opacity = '1';

    let arrTime: HTMLElement | undefined;
    let arrSpecs: HTMLUListElement | undefined;

    if (time) {
        arrTime = document.createElement('b');
        infoBox.append(arrTime);
    }

    const availableClass = LSSM.$store.getters.nodeAttribute(
        'arr-available-counter'
    ) as string;

    if (specs) {
        arrSpecs = document.createElement('ul');
        const arrSpecsId = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_arrHover_specslist`
        );
        arrSpecs.id = arrSpecsId;
        LSSM.$store
            .dispatch('addStyles', [
                {
                    selectorText: `#${arrSpecsId}`,
                    style: {
                        padding: '0',
                        color: 'black',
                    },
                },
                {
                    selectorText: `#${arrSpecsId} li`,
                    style: {
                        'list-style': 'none',
                        'text-align': 'left',
                    },
                },
                {
                    selectorText: `#${arrSpecsId} li::before`,
                    style: {
                        content: 'attr(data-amount) " "',
                    },
                },
                {
                    selectorText: `.${availableClass}::before`,
                    style: {
                        content: '"("',
                    },
                },
                {
                    selectorText: `.${availableClass}::after`,
                    style: {
                        content: '")"',
                    },
                },
            ])
            .then();
        infoBox.append(arrSpecs);
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

        (document.querySelectorAll('#all .vehicle_checkbox') as NodeListOf<
            HTMLInputElement
        >).forEach(vehicle => {
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

    const getAvailableId = (arrId: number, attr: string): string =>
        LSSM.$store.getters.nodeAttribute(`arr-available-${arrId}-${attr}`);

    const updateSpecs = (
        buildingIds: string[],
        arr: HTMLAnchorElement,
        arrId: number
    ) => {
        const availabilities = check_amount_available(
            buildingIds,
            arr.attributes
        );
        if (specs && arrSpecs) {
            arrSpecs.innerHTML =
                arr.getAttribute('reset') === 'true'
                    ? `<b>${LSSM.$t(`modules.${MODULE_ID}.arrHover.reset`)}</b>`
                    : '';
            arrSpecs.append(
                ...(Array.from(arr.attributes)
                    .map(attr => {
                        const name = ARRSpecTranslations[attr.name];
                        if (
                            (!name &&
                                !attr.name.startsWith(
                                    'vehicle_type_caption'
                                )) ||
                            !parseInt(attr.value)
                        )
                            return null;
                        const liEl = document.createElement('li');
                        const available = availabilities[attr.name] || 0;
                        if (available < parseInt(attr.value))
                            liEl.classList.add('bg-danger');
                        liEl.textContent =
                            name ??
                            attr.name.match(
                                /^vehicle_type_caption\[(.*)]$/
                            )?.[1] ??
                            '';
                        const availableEl = document.createElement('span');
                        availableEl.classList.add(availableClass);
                        availableEl.id = getAvailableId(arrId, attr.name);
                        availableEl.style.marginLeft = '1ch';
                        availableEl.textContent = available.toLocaleString();
                        liEl.append(availableEl);
                        liEl.setAttribute(
                            'data-amount',
                            parseInt(attr.value).toLocaleString()
                        );
                        return liEl;
                    })
                    .filter(v => !!v) as HTMLLIElement[]).sort((a, b) =>
                    (a.textContent || '') < (b.textContent || '')
                        ? -1
                        : (a.textContent || '') > (b.textContent || '')
                        ? 1
                        : 0
                )
            );
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
                updateSpecs(buildingIds, arr, id);
            },
        })
        .then();

    const handle = (arr: HTMLAnchorElement) => {
        arr.removeAttribute('title');
        const arrId = parseInt(arr.getAttribute('aao_id') || '-1');
        if (arrId < 0) return;
        if (time && arrTime) arrTime.id = `aao_timer_${arrId}`;
        window.aao_available(arrId, time);
        arr.append(infoBox);
        infoBox.classList.remove('hidden');
    };

    let currentTimeout = null as number | null;

    ARRContainer.addEventListener('mouseover', e => {
        const target = (e.target as HTMLElement)?.closest(
            '.aao, .vehicle_group'
        ) as HTMLAnchorElement | null;
        if (target)
            currentTimeout = window.setTimeout(() => handle(target), 500);
    });

    ARRContainer.addEventListener('mouseout', e => {
        const target = (e.target as HTMLElement)?.closest(
            '.aao, .vehicle_group'
        ) as HTMLAnchorElement | null;
        if (target && currentTimeout) {
            window.clearTimeout(currentTimeout);
            window.setTimeout(() => infoBox.classList.add('hidden'), 100);
        }
    });
};
