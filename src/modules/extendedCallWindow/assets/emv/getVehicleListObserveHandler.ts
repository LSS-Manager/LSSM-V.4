import {
    type Group,
    groups,
    type MissingRequirements,
} from './getMissingRequirements';

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
        factors?: Record<`${number | string}`, number>;
    }
>;

export default (
    LSSM: Vue,
    missingRequirements: MissingRequirements,
    requirements: MissingRequirements['requirements'],
    setSelected: (
        requirement: MissionRequirement,
        value: number | { min: number; max: number },
        group: Group
    ) => void
) => {
    const vehicleList = document.querySelector<HTMLTableSectionElement>(
        '#vehicle_show_table_body_all'
    );
    const occupiedList = document.querySelector<HTMLDivElement>('#occupied');

    if (!vehicleList || !occupiedList) return;

    const vehicleTypes = LSSM.$stores.translations.vehicles;

    const reqsByTractives: Record<number, Record<Group, Set<number>>> = {};
    Object.entries(vehicleTypes).forEach(([id, vehicle]) => {
        if (!('tractiveVehicles' in vehicle)) return undefined;
        const allReqs: Record<Group, Set<number>> = {
            vehicles: new Set<number>(),
            staff: new Set<number>(),
            other: new Set<number>(),
        };
        groups.forEach(group => {
            allReqs[group] = new Set<number>(
                missingRequirements.requirementsForVehicle[
                    vehicle.tractiveVehicles[0]
                ]?.[group] ?? new Set()
            );
            vehicle.tractiveVehicles.slice(1).forEach(tractiveVehicle => {
                const reqs =
                    missingRequirements.requirementsForVehicle[
                        tractiveVehicle
                    ]?.[group] ?? new Set<number>();
                allReqs[group].forEach(req => {
                    if (!reqs.has(req)) allReqs[group]?.delete(req);
                });
            });
        });
        reqsByTractives[parseInt(id)] = allReqs;
    });

    const getVehicleStaff = (
        vehicleId: number
    ): { min: number; max: number } => {
        const vehicle = LSSM.$stores.api.vehicles[vehicleId];
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

        const trailerTypesWithTractiveNeeded: Record<number, number> = {};

        const selectedVehicles = new Set<number>();

        const increaseSelected = <Type extends number | string>(
            type: Type,
            id: Type,
            getStaff: (id: Type) => {
                min: number;
                max: number;
            } = () => ({
                min: 0,
                max: 0,
            })
        ) => {
            const reqs =
                typeof type === 'number' ?
                    missingRequirements.requirementsForVehicle[type]
                :   missingRequirements.requirementsForEquipment[
                        type.toString()
                    ];
            groups.forEach(group =>
                reqs?.[group]?.forEach(requirement => {
                    selected[group] ??= [];
                    // that is a weird workaround but otherwise TS complains
                    if (group === 'staff') {
                        selected[group][requirement] ??= {
                            min: 0,
                            max: 0,
                        };
                        const { min, max } = getStaff(id);
                        selected[group][requirement].min += min;
                        selected[group][requirement].max += max;
                    } else {
                        selected[group][requirement] ??= 0;
                        const reqItem = requirements[group][requirement];
                        if (
                            (group === 'vehicles' || group === 'other') &&
                            'additional' in reqItem
                        ) {
                            selected[group][requirement] +=
                                reqItem.additional.factors?.[type.toString()] ??
                                1;
                        } else {
                            selected[group][requirement]++;
                        }
                    }
                })
            );
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

            selectedVehicles.add(vehicleID);

            // increase selected of all requirements that can be fulfilled by this vehicle by 1
            increaseSelected(vehicleType, vehicleID, getVehicleStaff);

            // get selected equipment for this vehicle
            (checkbox.dataset.equipmentTypes ?? '')
                .split(',')
                .filter(Boolean)
                .forEach(equipment => increaseSelected(equipment, ''));

            // find tractive vehicle for this vehicle
            const tractiveVehicleId = parseInt(
                checkbox.getAttribute('tractive_vehicle_id') ?? '-1'
            );
            const tractiveVehicle =
                LSSM.$stores.api.vehicles[tractiveVehicleId];
            // tractive vehicle is explicitly set
            if (
                tractiveVehicle &&
                checkbox.getAttribute('tractive_random') === '0'
            ) {
                if (!selectedVehicles.has(tractiveVehicleId)) {
                    increaseSelected(
                        tractiveVehicle.vehicle_type,
                        tractiveVehicleId,
                        getVehicleStaff
                    );
                }
            } else {
                trailerTypesWithTractiveNeeded[vehicleType] ??= 0;
                trailerTypesWithTractiveNeeded[vehicleType]++;
            }
        });

        // update selected for each requirement
        groups.forEach(group => {
            // process possible trailers
            Object.entries(trailerTypesWithTractiveNeeded).forEach(
                ([trailerType, amount]) =>
                    reqsByTractives[parseInt(trailerType)]?.[group]?.forEach(
                        req => {
                            const value = selected[group][req];
                            if (
                                typeof value === 'number' &&
                                typeof amount === 'number'
                            )
                                selected[group][req] = value + amount;
                        }
                    )
            );

            // update requirements by previously determined selected vehicles
            selected[group].forEach((value, i) =>
                setSelected(requirements[group][i], value, group)
            );

            // update progress bar requirements
            missingRequirements.requirements[group].forEach(
                (requirement, i) => {
                    if (!('bar' in requirement)) return;
                    setSelected(
                        requirements[group][i],
                        LSSM.$utils.getNumberFromText(
                            document.querySelector(
                                `[id^="mission_${requirement.bar}_holder"] [class*="mission_water_bar_selected_"]`
                            )?.textContent ?? '',
                            false,
                            0
                        ),
                        group
                    );
                }
            );
        });
    };
};
