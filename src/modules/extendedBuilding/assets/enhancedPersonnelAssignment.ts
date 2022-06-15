import type { Schooling } from 'typings/Schooling';
import type { $m, ModuleMainFunction } from 'typings/Module';
import type { Building, InternalBuilding } from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m
): Promise<void> => {
    await LSSM.$stores.api.getBuildings(
        `${MODULE_ID}-enhancedPersonnelAssignment`
    );
    await LSSM.$stores.api.getVehicles(
        `${MODULE_ID}-enhancedPersonnelAssignment`
    );

    const personnel = Array.from(
        document.querySelectorAll<HTMLTableRowElement>(
            '#personal_table tbody tr'
        )
    );

    const vehicleId = parseInt(
        window.location.pathname.match(/\d+(?=\/zuweisung)/u)?.[0] || '-1'
    );

    const vehicle =
        LSSM.$stores.api.vehiclesById[vehicleId] ??
        (await LSSM.$stores.api.getVehicle(
            vehicleId,
            `${MODULE_ID}-enhancedPersonnelAssignment`
        ));
    const vehicleTypes: Record<number, InternalVehicle> =
        LSSM.$store.getters.$tVehicles;

    if (vehicleId < 0 || !vehicle) return;

    const buildingType = (
        LSSM.$store.getters.$tBuildings as Record<number, InternalBuilding>
    )[
        LSSM.$stores.api.buildings.find(({ id }) => id === vehicle.building_id)
            ?.building_type ?? -1
    ];

    const schools =
        'schoolingTypes' in buildingType ? buildingType.schoolingTypes : null;

    if (!schools) return;

    const schoolingStaffListByCaption = Object.fromEntries(
        schools.map(school => [
            school,
            Object.fromEntries(
                (
                    LSSM.$t('schoolings') as unknown as Record<
                        string,
                        Schooling[]
                    >
                )[school].map(({ caption, staffList }) => [caption, staffList])
            ),
        ])
    );

    const hasSchooling = vehicleTypes[vehicle.vehicle_type].schooling;

    const fittingRows: HTMLTableRowElement[] = hasSchooling ? [] : personnel;
    if (hasSchooling) {
        schools.forEach(school => {
            const schoolings = Object.keys(
                vehicleTypes[vehicle.vehicle_type].schooling?.[school] ?? {}
            );
            schoolings.forEach(schoolingCaption => {
                const staffList =
                    schoolingStaffListByCaption[school][schoolingCaption];
                personnel.forEach(row => {
                    if (
                        (row.textContent?.match(
                            LSSM.$utils.escapeRegex(staffList)
                        ) ||
                            row.textContent?.match(
                                LSSM.$utils.escapeRegex(schoolingCaption)
                            )) &&
                        !fittingRows.includes(row)
                    )
                        fittingRows.push(row);
                });
            });
        });
    }
    const nonFittingRows = personnel.filter(row => !fittingRows.includes(row));

    const toggleId = LSSM.$store.getters.nodeAttribute(
        'toggle-fitting-personnel',
        true
    );
    const checkboxSetting = await getSetting(
        'enhancedPersonnelAssignmentCheckbox'
    );

    const settingsBar = document.createElement('form');
    settingsBar.classList.add('form-group');
    settingsBar.style.setProperty('display', 'inline-block');
    settingsBar.style.setProperty('margin-left', '1em');
    const toggleFittingWrapper = document.createElement('div');
    toggleFittingWrapper.classList.add('checkbox');
    const toggleFittingLabel = document.createElement('label');
    toggleFittingLabel.setAttribute('for', toggleId);
    toggleFittingLabel.classList.add('checkbox');
    const toggleFittingInput = document.createElement('input');
    toggleFittingInput.type = 'checkbox';
    toggleFittingInput.id = toggleId;
    toggleFittingLabel.append(
        toggleFittingInput,
        $m('enhancedPersonnelAssignment.toggleFittingPersonnel').toString()
    );
    toggleFittingInput.checked = checkboxSetting;
    toggleFittingWrapper.append(toggleFittingLabel);
    settingsBar.append(toggleFittingWrapper);
    if (checkboxSetting) {
        const mode = toggleFittingInput.checked ? 'add' : 'remove';
        nonFittingRows.forEach(row => row.classList[mode]('hidden'));
    }
    toggleFittingInput.addEventListener('change', () => {
        const mode = toggleFittingInput.checked ? 'add' : 'remove';
        nonFittingRows.forEach(row => row.classList[mode]('hidden'));
        setSetting(
            'enhancedPersonnelAssignmentCheckbox',
            toggleFittingInput.checked
        );
    });

    document
        .querySelector<HTMLDivElement>('.vehicles-education-filter-box')
        ?.append(settingsBar);
};
