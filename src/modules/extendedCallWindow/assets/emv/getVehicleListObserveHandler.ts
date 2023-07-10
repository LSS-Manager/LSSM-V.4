import type { $m } from 'typings/Module';
import type { EnhancedMissingVehiclesProps } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';
import type { Mission } from 'typings/Mission';

type Requirements = EnhancedMissingVehiclesProps['missingRequirements'];

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

export default (
    LSSM: Vue,
    missingRequirements: Requirements,
    requirements: Requirements,
    missionType: string,
    setSelected: (
        requirement: Requirements[0],
        value: number | { min: number; max: number }
    ) => void,
    $m: $m
) => {
    const vehicleList = document.querySelector<HTMLTableSectionElement>(
        '#vehicle_show_table_body_all'
    );
    const occupiedList = document.querySelector<HTMLDivElement>('#occupied');

    const vehicleTypes = LSSM.$stores.translations.vehicles;

    if (!vehicleList || !occupiedList) return;

    const getRequirementsByIDs = (translations: GroupTranslation) => {
        const requirements: Record<number, Requirements> = {};

        Object.values(translations).forEach(
            ({ texts, vehicles, conditionalVehicles }) => {
                const requirement = missingRequirements.find(({ vehicle }) =>
                    Object.values(texts)
                        .map(t => t.toLowerCase())
                        .includes(vehicle.toLowerCase())
                );
                if (requirement) {
                    const vehicleTypes = Object.values(vehicles);
                    Object.entries(conditionalVehicles ?? {}).forEach(
                        ([condition, vehicles]) => {
                            if (
                                LSSM.$stores.api.missions[missionType]
                                    ?.additional[condition]
                            )
                                vehicleTypes.push(...Object.values(vehicles));
                        }
                    );
                    vehicleTypes.forEach(vehicle => {
                        if (!requirements.hasOwnProperty(vehicle))
                            requirements[vehicle] = [];
                        requirements[vehicle].push(requirement);
                    });
                }
            }
        );
        return requirements;
    };

    const getRequirementsByEquipment = (translations: GroupTranslation) => {
        const requirements: Record<string, Requirements> = {};

        Object.values(translations).forEach(({ texts, equipment }) => {
            const requirement = missingRequirements.find(({ vehicle }) =>
                Object.values(texts)
                    .map(t => t.toLowerCase())
                    .includes(vehicle.toLowerCase())
            );
            if (requirement) {
                Object.values(equipment ?? {}).forEach(eq => {
                    if (!requirements.hasOwnProperty(eq)) requirements[eq] = [];
                    requirements[eq].push(requirement);
                });
            }
        });
        return requirements;
    };

    const getSpecialRequirement = (requirement: string) =>
        requirements.find(({ vehicle }) =>
            vehicle.match(
                new RegExp(
                    $m(requirement)
                        .toString()
                        .replace(/^\/|\/[ADJUgimux]*$/gu, '')
                )
            )
        );

    const vbrTranslation = $m('vehiclesByRequirement') as unknown as
        | GroupTranslation
        | string;
    const requirementsByVehicleID =
        typeof vbrTranslation === 'string'
            ? {}
            : getRequirementsByIDs(vbrTranslation);
    const requirementsByEquipment =
        typeof vbrTranslation === 'string'
            ? {}
            : getRequirementsByEquipment(vbrTranslation);
    const staffTranslation = $m('staff') as unknown as
        | GroupTranslation
        | string;
    const staffByVehicleID =
        typeof staffTranslation === 'string'
            ? {}
            : getRequirementsByIDs(staffTranslation);

    const towingVehicles = $m('towingVehicles') as unknown as Record<
        number,
        Record<number, number>
    >;

    const specialRequirementList = ['water', 'foam', 'pump'];

    const specialRequirements: Record<
        string,
        EnhancedMissingVehiclesProps['missingRequirements'][0]
    > = Object.fromEntries(
        specialRequirementList
            .map(req => [req, getSpecialRequirement(req)])
            .filter(([, req]) => req)
    );

    const getProgressBarSelected = (requirement: string) =>
        LSSM.$utils.getNumberFromText(
            document.querySelector<HTMLDivElement>(
                `[id^="mission_${requirement}_holder_"] div[class*="mission_water_bar_selected"]`
            )?.textContent ?? '',
            false,
            0
        );

    return () => {
        const selectedVehicles: Record<number, number[]> = {};
        const selectedEquipment: Record<string, number> = {};
        const definiteTractives: Record<number, number> = {};
        const possibleTractives: Record<number, number> = {};

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

            if (!selectedVehicles.hasOwnProperty(vehicleType))
                selectedVehicles[vehicleType] = [];
            selectedVehicles[vehicleType].push(vehicleID);

            (checkbox.dataset.equipmentTypes ?? '')
                .split(',')
                .forEach(equipment => {
                    if (!selectedEquipment.hasOwnProperty(equipment))
                        selectedEquipment[equipment] = 0;
                    selectedEquipment[equipment]++;
                });

            const tractiveVehicleID = checkbox.getAttribute(
                'tractive_vehicle_id'
            );
            let tractiveCounted = false;
            if (
                tractiveVehicleID &&
                checkbox.getAttribute('tractive_random') === '0' &&
                tractiveVehicleID !== '0'
            ) {
                const tractive =
                    LSSM.$stores.api.vehiclesById[parseInt(tractiveVehicleID)];
                const tractiveType = tractive.vehicle_type;
                if (tractive) {
                    if (!selectedVehicles.hasOwnProperty(tractiveType))
                        selectedVehicles[tractiveType] = [];
                    selectedVehicles[tractiveType].push(
                        parseInt(tractiveVehicleID)
                    );
                    if (!definiteTractives.hasOwnProperty(tractiveType))
                        definiteTractives[tractiveType] = 0;
                    definiteTractives[tractiveType]++;
                    tractiveCounted = true;
                }
            }
            if (
                !tractiveCounted &&
                towingVehicles.hasOwnProperty(vehicleType)
            ) {
                const tractiveType = towingVehicles[vehicleType][0];
                if (!possibleTractives.hasOwnProperty(tractiveType))
                    possibleTractives[tractiveType] = 0;
                possibleTractives[tractiveType]++;
            }
        });

        requirements.forEach(requirement =>
            setSelected(
                requirement,
                typeof requirement.selected === 'number'
                    ? 0
                    : { min: 0, max: 0 }
            )
        );

        Object.entries(possibleTractives).forEach(([tractiveType, amount]) => {
            const type = parseInt(tractiveType);
            if (!selectedVehicles.hasOwnProperty(type))
                selectedVehicles[type] = [];
            while (
                selectedVehicles[type].length <
                amount + (definiteTractives[type] ?? 0)
            )
                selectedVehicles[type].push(selectedVehicles[type].length * -1);
        });
        Object.entries(selectedVehicles).forEach(([vehicleType, vehicles]) => {
            const vehicleIds = [...new Set(vehicles)];

            requirementsByVehicleID[parseInt(vehicleType)]?.forEach(
                requirement =>
                    setSelected(
                        requirement,
                        typeof requirement.selected === 'number'
                            ? requirement.selected + vehicleIds.length
                            : requirement.selected
                    )
            );

            const type = vehicleTypes[parseInt(vehicleType)];

            staffByVehicleID[parseInt(vehicleType)]?.forEach(requirement => {
                setSelected(
                    requirement,
                    typeof requirement.selected === 'number'
                        ? requirement.selected + 1
                        : {
                              min:
                                  requirement.selected.min +
                                  type.staff.min * vehicleIds.length,
                              max:
                                  requirement.selected.max +
                                  vehicleIds
                                      .map(
                                          id =>
                                              LSSM.$stores.api.vehiclesById[id]
                                                  ?.max_personnel_override ??
                                              type.staff.max
                                      )
                                      .reduce((a, b) => a + b, 0),
                          }
                );
            });
        });
        Object.entries(selectedEquipment).forEach(
            ([equipment, amount]) =>
                requirementsByEquipment[equipment]?.forEach(requirement =>
                    setSelected(
                        requirement,
                        typeof requirement.selected === 'number'
                            ? requirement.selected + amount
                            : requirement.selected
                    )
                )
        );
        Object.entries(specialRequirements).forEach(([key, requirement]) =>
            setSelected(requirement, getProgressBarSelected(key))
        );
    };
};
