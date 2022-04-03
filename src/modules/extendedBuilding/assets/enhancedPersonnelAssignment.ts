import type { $m } from 'typings/Module';
import type { Schooling } from 'typings/Schooling';
import type { Building, InternalBuilding } from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    getSetting: (key: string) => Promise<boolean>,
    $m: $m
): Promise<void> => {
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: `${MODULE_ID}-enhancedPersonnelAssignment`,
    });
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: `${MODULE_ID}-enhancedPersonnelAssignment`,
    });

    const personnel = Array.from(
        document.querySelectorAll<HTMLTableRowElement>(
            '#personal_table tbody tr'
        )
    );

    const vehicleId = parseInt(
        window.location.pathname.match(/\d+(?=\/zuweisung)/u)?.[0] || '-1'
    );

    const vehicle =
        LSSM.$store.getters['api/vehicle'](vehicleId) ??
        ((await LSSM.$store.dispatch('api/fetchVehicle', {
            id: vehicleId,
            feature: `${MODULE_ID}-enhancedPersonnelAssignment`,
        })) as Vehicle);
    const vehicleTypes = LSSM.$t('vehicles') as Record<number, InternalVehicle>;
    if (vehicleId < 0 || !vehicle) return;

    const schools = (LSSM.$t('buildings') as Record<number, InternalBuilding>)[
        (LSSM.$store.state.api.buildings as Building[]).find(
            ({ id }) => id === vehicle.building_id
        )?.building_type ?? -1
    ]?.schoolingTypes;

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
        LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'enhancedPersonnelAssignmentCheckbox',
            value: toggleFittingInput.checked,
        });
    });

    document
        .querySelector<HTMLDivElement>('.vehicles-education-filter-box')
        ?.append(settingsBar);
};
