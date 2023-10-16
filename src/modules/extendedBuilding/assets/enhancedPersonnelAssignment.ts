import type { InternalVehicle } from 'typings/Vehicle';
import type { $m, ModuleMainFunction } from 'typings/Module';

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m
): Promise<void> => {
    // extract the vehicle ID out of the URL
    const vehicleId = parseInt(
        window.location.pathname.match(/\d+(?=\/zuweisung)/u)?.[0] || '-1'
    );

    // Fetch the current state of the vehicle and its building
    const vehicle = await LSSM.$stores.api.getVehicle(
        vehicleId,
        `${MODULE_ID}-enhancedPersonnelAssignment`
    );
    const building = await LSSM.$stores.api.getBuilding(
        vehicle.building_id,
        `${MODULE_ID}-enhancedPersonnelAssignment`
    );

    const vehicleType =
        LSSM.$stores.translations.vehicles[vehicle.vehicle_type];

    // find the schooling types of the building
    const buildingType =
        LSSM.$stores.translations.buildings[building.building_type];
    const schoolTypes =
        'schoolingTypes' in buildingType ? buildingType.schoolingTypes : [];

    // if there are no schooling types, we don't need to do anything and can abort here
    if (!schoolTypes.length) return;

    const schoolingIDs: Record<
        'equipment' | 'self' | 'trailers',
        Set<string>
    > = {
        self: new Set<string>(),
        trailers: new Set<string>(),
        equipment: new Set<string>(),
    };

    const findSchoolingIDs = (
        type: InternalEquipment<string> | InternalVehicle
    ): Set<string> => {
        if (typeof type.staff.training === 'undefined')
            return new Set<string>();

        // if the type has an ID, we can assume that it is an equipment
        if ('id' in type) {
            return new Set(
                schoolTypes
                    .flatMap(
                        schoolType => type.staff.training?.[schoolType] ?? ''
                    )
                    .filter(Boolean)
            );
        }
        // otherwise it is a vehicle
        return new Set(
            schoolTypes.flatMap(schoolType =>
                Object.keys(type.staff.training?.[schoolType] ?? {})
            )
        );
    };

    const findEquipmentsSchoolingIds = (vehicleType: InternalVehicle) => {
        const ids = new Set<string>();
        Object.values(LSSM.$stores.translations.equipment)
            .filter(
                equipment =>
                    equipment.size <= (vehicleType.equipmentCapacity ?? 0)
            )
            .map(findSchoolingIDs)
            .forEach(idSet => idSet.forEach(id => ids.add(id)));
        return ids;
    };

    // find the schooling IDs of the vehicle
    findSchoolingIDs(vehicleType).forEach(id => schoolingIDs.self.add(id));
    // find the schooling IDs of the vehicle's trailers
    Object.values(LSSM.$stores.translations.vehicles)
        .filter(
            iterVehicle =>
                iterVehicle.isTrailer &&
                iterVehicle.tractiveVehicles.includes(vehicle.vehicle_type)
        )
        .forEach(trailer => {
            // trailers staff
            findSchoolingIDs(trailer).forEach(id =>
                schoolingIDs.trailers.add(id)
            );
            // equipment of this trailer
            findEquipmentsSchoolingIds(trailer).forEach(id =>
                schoolingIDs.equipment.add(id)
            );
        });
    // find the schooling IDs of the vehicle's equipment
    if (vehicleType.equipmentCapacity) {
        findEquipmentsSchoolingIds(vehicleType).forEach(id =>
            schoolingIDs.equipment.add(id)
        );
    }

    // there aren't any schoolings for this vehicle => abort
    if (
        !schoolingIDs.self.size &&
        !schoolingIDs.trailers.size &&
        !schoolingIDs.equipment.size
    )
        return;

    // add a settings bar to the DOM
    const settingsBar = document.createElement('form');
    settingsBar.classList.add('form-group');
    settingsBar.style.setProperty('display', 'inline-block');
    settingsBar.style.setProperty('margin', '0');

    document
        .querySelector<HTMLDivElement>('.vehicles-education-filter-box')
        ?.append(settingsBar);

    settingsBar.addEventListener('change', e => console.log(e));

    // a function to create and add a checkbox to the DOM
    const addCheckbox = async (
        type:
            | 'toggleFittingEquipment'
            | 'toggleFittingPersonnel'
            | 'toggleFittingTrailers',
        eventListener: (checkbox: HTMLInputElement) => void
    ): Promise<HTMLInputElement> => {
        const settingKey = `enhancedPersonnelAssignment.${type}`;
        const toggleId = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}-epa-${type}`,
            true
        );

        const wrapper = document.createElement('div');
        wrapper.classList.add('checkbox');
        wrapper.style.setProperty('margin', '0');
        wrapper.style.setProperty('margin-left', '1em');
        wrapper.style.setProperty('display', 'inline-block');

        const label = document.createElement('label');
        label.classList.add('checkbox');
        label.style.setProperty('margin', '0');
        label.setAttribute('for', toggleId);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', toggleId);
        checkbox.addEventListener('change', () => {
            setSetting(settingKey, checkbox.checked);
            eventListener(checkbox);
        });

        label.append(
            checkbox,
            $m(`enhancedPersonnelAssignment.${type}`).toString()
        );
        wrapper.append(label);
        settingsBar.append(wrapper);

        checkbox.checked = await getSetting(settingKey, false);
        checkbox.dispatchEvent(new Event('change'));
        return checkbox;
    };

    // add the checkboxes to the DOM
    const toggleCheckbox = await addCheckbox(
        'toggleFittingPersonnel',
        ({ id, checked }) => {
            settingsBar
                .querySelectorAll<HTMLInputElement>(`input:not([id="${id}"])`)
                .forEach(checkbox => {
                    checkbox.disabled = !checked;

                    checkbox
                        .closest('div.checkbox')
                        ?.classList[checked ? 'remove' : 'add']('disabled');
                });
        }
    );
    if (schoolingIDs.trailers.size)
        await addCheckbox('toggleFittingTrailers', () => {});
    if (schoolingIDs.equipment.size)
        await addCheckbox('toggleFittingEquipment', () => {});

    toggleCheckbox.dispatchEvent(new Event('change'));

    console.log(schoolingIDs, getSetting, setSetting, $m);
};
