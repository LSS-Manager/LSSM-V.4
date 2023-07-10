import type { $m } from 'typings/Module';

export default async (
    LSSM: Vue,
    BUILDING_MODE: 'building' | 'dispatch',
    getSetting: (key: string) => Promise<boolean>,
    $m: $m,
    MODULE_ID: string
): Promise<void> => {
    const callback = async () => {
        const vehicles = Array.from(
            document.querySelectorAll<HTMLTableRowElement>(
                '#vehicle_table tbody tr'
            )
        );

        if (!vehicles.length) return;

        const fmsSwitch = await getSetting('fmsSwitch');
        const personnelAssignmentBtn = await getSetting(
            'personnelAssignmentBtn'
        );
        const vehicleTypes = await getSetting('vehicleTypes');
        const vehicleTypesOnlyOwn = await getSetting('vehicleTypesOnlyOwn');
        const lastRowSettings = {
            vehiclesPersonnelMax: await getSetting('vehiclesPersonnelMax'),
            vehiclesPersonnelCurrent: await getSetting(
                'vehiclesPersonnelCurrent'
            ),
            vehiclesPersonnelAssigned: await getSetting(
                'vehiclesPersonnelAssigned'
            ),
        } as Record<string, boolean>;

        const internalVehicleTypes = LSSM.$stores.translations.vehicles;

        const tableHead = document.querySelector('#vehicle_table thead tr');

        if (!tableHead) return;

        if (vehicleTypes) {
            const typeHeader = document.createElement('th');
            typeHeader.textContent = LSSM.$t('vehicleType').toString();
            tableHead.insertBefore(
                typeHeader,
                tableHead.querySelector('th:nth-of-type(2)')
            );
        }

        if (fmsSwitch) {
            LSSM.$stores.root.addStyle({
                selectorText: '.building_list_fms_2, .building_list_fms_6',
                style: {
                    cursor: 'pointer',
                },
            });
        }

        const lastRowItems = [
            'vehiclesPersonnelCurrent',
            'vehiclesPersonnelAssigned',
            'vehiclesPersonnelMax',
        ].filter(setting => lastRowSettings[setting]);

        if (
            lastRowItems.length &&
            BUILDING_MODE === 'building' &&
            tableHead.lastElementChild
        ) {
            tableHead.lastElementChild.textContent = `(${lastRowItems
                .map(setting => $m(`vehiclePersonnel.${setting}`).toString())
                .join(' / ')})`;
        }

        vehicles.forEach(vehicle => {
            const vehicleId = parseInt(
                vehicle
                    .querySelector('a[href^="/vehicles/"]')
                    ?.getAttribute('href')
                    ?.match(/\d+$/u)?.[0] || '0'
            );
            const editBtn = vehicle.querySelector(
                'a[href^="/vehicles/"][href$="/edit"]'
            );

            const linkWrapper = (
                BUILDING_MODE === 'dispatch'
                    ? document.querySelector<HTMLSpanElement>(
                          `#vehicle_caption_${vehicleId}`
                      )
                    : vehicle.querySelector<HTMLAnchorElement>(
                          `a[href="/vehicles/${vehicleId}"]`
                      )
            )?.parentElement;

            if (!vehicleId || !linkWrapper) return;

            const storedVehicle = LSSM.$stores.api.vehicles.find(
                v => v.id === vehicleId
            );

            if (fmsSwitch) {
                const fmsBtn = vehicle.querySelector('.building_list_fms');
                fmsBtn?.addEventListener('click', () => {
                    if (
                        !fmsBtn.classList.contains('building_list_fms_2') &&
                        !fmsBtn.classList.contains('building_list_fms_6')
                    )
                        return;
                    const nextFms = fmsBtn.classList.contains(
                        'building_list_fms_2'
                    )
                        ? 6
                        : 2;
                    LSSM.$stores.api
                        .request({
                            url: `/vehicles/${vehicleId}/set_fms/${nextFms}`,
                            feature: `${MODULE_ID}-enhanceVehicleList-fmsSwitch`,
                        })
                        .then(({ status }) => {
                            if (status === 200) {
                                fmsBtn.classList.replace(
                                    `building_list_fms_${
                                        nextFms === 2 ? 6 : 2
                                    }`,
                                    `building_list_fms_${nextFms}`
                                );
                                fmsBtn.textContent = (
                                    LSSM.$t(
                                        'fmsReal2Show'
                                    ) as unknown as Record<number, number>
                                )[nextFms].toString();
                            }
                        });
                });
            }
            if (vehicleTypes) {
                const typeWrapper = document.createElement('td');
                linkWrapper.before(typeWrapper);
                if (storedVehicle) {
                    if (
                        !vehicleTypesOnlyOwn ||
                        !storedVehicle.vehicle_type_caption
                    ) {
                        const vehicleTypeNode = document.createElement('a');
                        vehicleTypeNode.classList.add(
                            'btn',
                            'btn-default',
                            'btn-xs',
                            'disabled'
                        );
                        vehicleTypeNode.textContent =
                            internalVehicleTypes[storedVehicle.vehicle_type]
                                ?.caption;
                        typeWrapper.append(vehicleTypeNode);
                    }
                    if (storedVehicle.vehicle_type_caption) {
                        const customTypeNode = document.createElement('a');
                        customTypeNode.classList.add(
                            'btn',
                            'btn-default',
                            'btn-xs',
                            'disabled'
                        );
                        customTypeNode.textContent =
                            storedVehicle.vehicle_type_caption;
                        typeWrapper.append(customTypeNode);
                    }
                }
            }
            if (BUILDING_MODE === 'building') {
                if (personnelAssignmentBtn) {
                    if (!editBtn?.parentElement) return;
                    const actionsWrapper = document.createElement('div');
                    actionsWrapper.classList.add('btn-group');
                    editBtn.parentElement.append(actionsWrapper);
                    actionsWrapper.append(editBtn);
                    const pABtn = document.createElement('a');
                    pABtn.classList.add('btn', 'btn-default', 'btn-xs');
                    pABtn.setAttribute(
                        'href',
                        `/vehicles/${vehicleId}/zuweisung`
                    );
                    pABtn.innerHTML = '<i class="fas fa-users"></i>';
                    actionsWrapper.append(pABtn);
                }
                if (lastRowItems.length && storedVehicle) {
                    (async () => {
                        let currentPersonnel = 0;
                        if (lastRowItems.includes('vehiclesPersonnelCurrent')) {
                            currentPersonnel = await LSSM.$stores.api
                                .request({
                                    url: `/vehicles/${vehicleId}`,
                                    feature: `${MODULE_ID}-enhanceVehicleList-personnel`,
                                })
                                .then(res => res.text())
                                .then(
                                    res =>
                                        document
                                            .createRange()
                                            .createContextualFragment(res)
                                            .querySelectorAll(
                                                '#vehicle_details table#vehicle-attr-personnel tbody tr'
                                            ).length
                                );
                        }
                        const assigned_personnel_count =
                            storedVehicle.assigned_personnel_count || 0;
                        const maxPersonnel =
                            storedVehicle.max_personnel_override ??
                            internalVehicleTypes[storedVehicle.vehicle_type]
                                ?.staff.max ??
                            0;
                        const assignedPersonnel = (await getSetting(
                            'vehiclesPersonnelColorized'
                        ))
                            ? `<span style="color: ${
                                  assigned_personnel_count < maxPersonnel
                                      ? 'red'
                                      : 'green'
                              };">${assigned_personnel_count}</span>`
                            : assigned_personnel_count;
                        if (vehicle.lastElementChild) {
                            vehicle.lastElementChild.innerHTML = `(${lastRowItems
                                .map(
                                    item =>
                                        (
                                            ({
                                                vehiclesPersonnelCurrent:
                                                    currentPersonnel,
                                                vehiclesPersonnelMax:
                                                    maxPersonnel,
                                                vehiclesPersonnelAssigned:
                                                    assignedPersonnel,
                                            }) as Record<string, number>
                                        )[item]
                                )
                                .join(' / ')})`;
                        }
                    })();
                }
            }
        });
    };

    if (
        BUILDING_MODE === 'dispatch' &&
        window.location.hash !== '#tab_vehicle'
    ) {
        await LSSM.$stores.api.getVehicles(`${MODULE_ID}-enhanceVehicleList`);
        LSSM.$stores.root.observeAsyncTab({
            tabSelector: '#tab_vehicle',
            callback,
        });
    } else {
        const path = window.location.pathname.split('/').filter(s => !!s);
        const buildingId = parseInt(path.at(-1) ?? '-1');
        await LSSM.$stores.api.getVehiclesAtBuilding(
            buildingId,
            `${MODULE_ID}-enhanceVehicleList`
        );
        await callback();
    }
};
