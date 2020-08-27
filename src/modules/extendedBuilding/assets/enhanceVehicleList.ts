import { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default async (
    LSSM: Vue,
    BUILDING_MODE: 'building' | 'dispatch',
    getSetting: (key: string) => Promise<boolean>
): Promise<void> => {
    const callback = async () => {
        const vehicles = Array.from(
            document.querySelectorAll('#vehicle_table tbody tr') as NodeListOf<
                HTMLTableRowElement
            >
        );

        const fmsSwitch = await getSetting('fmsSwitch');
        const personnelAssignmentBtn = await getSetting(
            'personnelAssignmentBtn'
        );
        const vehicleTypes = await getSetting('vehicleTypes');
        const lastRowSettings = {
            vehiclesPersonnelMax: await getSetting('vehiclesPersonnelMax'),
            vehiclesPersonnelCurrent: await getSetting(
                'vehiclesPersonnelCurrent'
            ),
            vehiclesPersonnelAssigned: await getSetting(
                'vehiclesPersonnelAssigned'
            ),
        } as {
            [setting: string]: boolean;
        };

        const internalVehicleTypes = Object.values(
            LSSM.$t('vehicles')
        ) as InternalVehicle[];

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

        if (personnelAssignmentBtn) LSSM.$store.commit('useFontAwesome');

        if (fmsSwitch)
            await LSSM.$store.dispatch('addStyle', {
                selectorText: '.building_list_fms_2, .building_list_fms_6',
                style: {
                    cursor: 'pointer',
                },
            });

        const lastRowItems = [
            'vehiclesPersonnelCurrent',
            'vehiclesPersonnelAssigned',
            'vehiclesPersonnelMax',
        ]
            .filter(setting => lastRowSettings[setting])
            .map(setting =>
                LSSM.$t(
                    `modules.${MODULE_ID}.vehiclePersonnel.${setting}`
                ).toString()
            );

        if (lastRowItems.length) {
            tableHead.children[
                tableHead.children.length - 1
            ].textContent = `(${lastRowItems.join(' / ')})`;
        }

        vehicles.forEach(vehicle => {
            const vehicleId = parseInt(
                vehicle
                    .querySelector('a[href^="/vehicles/"]')
                    ?.getAttribute('href')
                    ?.match(/\d+$/)?.[0] || '0'
            );
            const editBtn = vehicle.querySelector(
                'a[href^="/vehicles/"][href$="/edit"]'
            );

            const linkWrapper = (BUILDING_MODE === 'dispatch'
                ? document.getElementById(`vehicle_caption_${vehicleId}`)
                : vehicle.querySelector(`a[href="/vehicles/${vehicleId}"]`)
            )?.parentElement;

            if (!vehicleId || !linkWrapper) return;

            const storedVehicle = (LSSM.$store.state.api
                .vehicles as Vehicle[]).find(v => v.id === vehicleId);

            if (fmsSwitch) {
                const fmsBtn = vehicle.querySelector('.building_list_fms');
                fmsBtn?.addEventListener('click', () => {
                    const nextFms = fmsBtn.classList.contains(
                        'building_list_fms_2'
                    )
                        ? 6
                        : 2;
                    LSSM.$store
                        .dispatch('api/request', {
                            url: `/vehicles/${vehicleId}/set_fms/${nextFms}`,
                        })
                        .then(({ status }) => {
                            if (status === 200) {
                                fmsBtn.classList.replace(
                                    `building_list_fms_${
                                        nextFms === 2 ? 6 : 2
                                    }`,
                                    `building_list_fms_${nextFms}`
                                );
                                fmsBtn.textContent = ((LSSM.$t(
                                    'fmsReal2Show'
                                ) as unknown) as { [status: number]: number })[
                                    nextFms
                                ].toString();
                            }
                        });
                });
            }
            if (vehicleTypes) {
                const typeWrapper = document.createElement('td');
                vehicle.insertBefore(typeWrapper, linkWrapper);
                if (storedVehicle) {
                    const vehicleTypeNode = document.createElement('a');
                    vehicleTypeNode.classList.add(
                        'btn',
                        'btn-default',
                        'btn-xs',
                        'disabled'
                    );
                    vehicleTypeNode.textContent =
                        internalVehicleTypes[
                            storedVehicle.vehicle_type
                        ]?.caption;
                    typeWrapper.append(vehicleTypeNode);
                    if (storedVehicle.vehicle_type_caption) {
                        const customTypeNode = document.createElement('button');
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
                    editBtn.parentElement.appendChild(actionsWrapper);
                    actionsWrapper.appendChild(editBtn);
                    const pABtn = document.createElement('a');
                    pABtn.classList.add('btn', 'btn-default', 'btn-xs');
                    pABtn.setAttribute(
                        'href',
                        `/vehicles/${vehicleId}/zuweisung`
                    );
                    pABtn.innerHTML = '<i class="fas fa-users"></i>';
                    actionsWrapper.appendChild(pABtn);
                }
            }
        });
    };

    if (BUILDING_MODE === 'dispatch' && window.location.hash !== '#tab_vehicle')
        await LSSM.$store.dispatch('observeAsyncTab', {
            tabSelector: '#tab_vehicle',
            callback,
        });
    else await callback();
};
