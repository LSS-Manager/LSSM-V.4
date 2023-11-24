import {
    type Group,
    groups,
    type MissingRequirements,
} from './getMissingRequirements';

import type { $m } from 'typings/Module';
import type { Mission } from 'typings/Mission';
import type { MissionRequirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

// VueI18n returns lists as objects...
export type GroupTranslation = Record<
    number,
    {
        texts: Record<number, string>;
        vehicles: Record<number, number>;
        equipment?: Record<number, string>;
        conditionalVehicles?: Record<
            keyof Mission['additional'],
            Record<number, number>
        >;
    }
>;

/*
1. get selected vehicles
    * if vehicle does have equipment => store
    * if vehicle is a trailer (do not store tractors twice)
        * if vehicle has a definite tractor or only one vehicle type can pull it => store
        * if we can calculate a definite tractor => store
    * if vehicle can fulfill a staff requirement
        * get min and max from API or core translations => store
2. update selected vehicles for each requirement ✅
3. update selected for other requirements
 */

export default (
    LSSM: Vue,
    missingRequirements: MissingRequirements,
    requirements: MissingRequirements['requirements'],
    missionType: string,
    setSelected: (
        requirement: MissionRequirement,
        value: number | { min: number; max: number },
        group: Group
    ) => void,
    $m: $m
) => {
    const vehicleList = document.querySelector<HTMLTableSectionElement>(
        '#vehicle_show_table_body_all'
    );
    const occupiedList = document.querySelector<HTMLDivElement>('#occupied');

    if (!vehicleList || !occupiedList) return;

    const vehicleTypes = LSSM.$stores.translations.vehicles;

    console.log(requirements, missionType, setSelected, $m, vehicleTypes);

    const getVehicleStaff = (
        vehicleId: number
    ): { min: number; max: number } => {
        const vehicle = LSSM.$stores.api.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return { min: 0, max: 0 };
        return {
            min: vehicleTypes[vehicle.vehicle_type]?.staff.min ?? 0,
            max:
                vehicle.max_personnel_override ??
                vehicleTypes[vehicle.vehicle_type]?.staff.max ??
                0,
        };
    };

    return () => {
        const selected: Record<'staff', { min: number; max: number }[]> &
            Record<Exclude<Group, 'staff'>, number[]> = {
            vehicles: new Array(requirements.vehicles.length).fill(0),
            // this workaround is required otherwise all elements would only be references to the same object
            staff: new Array(requirements.staff.length).fill(0).map(() => ({
                min: 0,
                max: 0,
            })),
            other: new Array(requirements.other.length).fill(0),
        };

        [
            ...vehicleList.querySelectorAll<HTMLInputElement>(
                '.vehicle_checkbox:checked'
            ),
            ...occupiedList.querySelectorAll<HTMLInputElement>(
                '.vehicle_checkbox:checked'
            ),
        ].forEach(checkbox => {
            const vehicleType = parseInt(
                checkbox.getAttribute('vehicle_type_id') ?? '-1'
            );
            const vehicleID = parseInt(checkbox.getAttribute('value') ?? '-1');
            if (vehicleType < 0 || vehicleID < 0) return;

            // increase selected of all requirements that can be fulfilled by this vehicle by 1
            groups.forEach(
                group =>
                    missingRequirements.requirementsForVehicle[vehicleType]?.[
                        group
                    ]?.forEach(requirement => {
                        selected[group] ??= [];
                        // that is a weird workaround but otherwise TS complains
                        if (group === 'staff') {
                            selected[group][requirement] ??= {
                                min: 0,
                                max: 0,
                            };
                            const { min, max } = getVehicleStaff(vehicleID);
                            selected[group][requirement].min += min;
                            selected[group][requirement].max += max;
                        } else {
                            selected[group][requirement] ??= 0;
                            selected[group][requirement]++;
                        }
                    })
            );
        });

        // update selected for each requirement
        groups.forEach(group =>
            selected[group].forEach((value, i) =>
                setSelected(requirements[group][i], value, group)
            )
        );
    };
};
