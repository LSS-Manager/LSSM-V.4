import { InternalVehicle, Vehicle } from 'typings/Vehicle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    getSetting: (key: string) => Promise<boolean>,
    $m: $m
): Promise<void> => {
    const personnel = Array.from(
        document.querySelectorAll('#personal_table tbody tr') as NodeListOf<
            HTMLTableRowElement
        >
    );

    const vehicleId = parseInt(
        window.location.pathname.match(/\d+(?=\/zuweisung)/)?.[0] || '-1'
    );

    await LSSM.$store.dispatch('api/initialUpdate', 'vehicles');
    const vehicle =
        LSSM.$store.getters['api/vehicle'](vehicleId) ??
        ((await LSSM.$store.dispatch(
            'api/fetchVehicle',
            vehicleId
        )) as Vehicle);
    const vehicleTypes = LSSM.$t('vehicles') as {
        [id: number]: InternalVehicle;
    };
    if (vehicleId < 0 || !vehicle) return;

    const fittingRows = [] as HTMLTableRowElement[];
    const nonFittingRows = [] as HTMLTableRowElement[];
    const schooling = vehicleTypes[vehicle.vehicle_type].shownSchooling;
    personnel.forEach(row => {
        (!schooling ||
        (schooling &&
            row.textContent?.match(LSSM.$utils.escapeRegex(schooling)))
            ? fittingRows
            : nonFittingRows
        ).push(row);
    });

    const toggleId = LSSM.$store.getters.nodeAttribute(
        'toggle-fitting-personnel',
        true
    );
    const checkboxSetting = await getSetting(
        'enhancedPersonnelAssignmentCheckbox'
    );

    const settingsBar = document.createElement('form');
    settingsBar.classList.add('form-group');
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

    document.getElementById('personal_table')?.before(settingsBar);
};
