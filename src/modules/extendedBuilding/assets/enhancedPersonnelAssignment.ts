import { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default (LSSM: Vue): void => {
    const personnel = Array.from(
        document.querySelectorAll('#personal_table tbody tr') as NodeListOf<
            HTMLTableRowElement
        >
    );

    const vehicleId = parseInt(
        window.location.pathname.match(/\d+(?=\/zuweisung)/)?.[0] || '-1'
    );
    const vehicle = (LSSM.$store.state.api.vehicles as Vehicle[]).find(
        v => v.id === vehicleId
    );
    const vehicleTypes = Object.values(
        LSSM.$t('vehicles')
    ) as InternalVehicle[];
    if (vehicleId < 0 || !vehicle) return;

    const fittingRows = [] as HTMLTableRowElement[];
    const nonFittingRows = [] as HTMLTableRowElement[];
    personnel.forEach(row => {
        const schooling = vehicleTypes[vehicle.vehicle_type].shownSchooling;
        (!schooling ||
        (schooling &&
            row.textContent?.match(LSSM.$utils.escapeRegex(schooling)))
            ? fittingRows
            : nonFittingRows
        ).push(row);
    });

    const toggleId = LSSM.$store.getters.nodeAttribute(
        'toggle-fitting-personnel'
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
        LSSM.$t(
            `modules.${MODULE_ID}.enhancedPersonnelAssignment.toggleFittingPersonnel`
        ).toString()
    );
    toggleFittingWrapper.append(toggleFittingLabel);
    settingsBar.append(toggleFittingWrapper);

    toggleFittingInput.addEventListener('change', () => {
        const mode = toggleFittingInput.checked ? 'add' : 'remove';
        nonFittingRows.forEach(row => row.classList[mode]('hidden'));
    });

    document.getElementById('personal_table')?.before(settingsBar);
};
