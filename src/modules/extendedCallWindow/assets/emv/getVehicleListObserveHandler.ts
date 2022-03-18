import type { $m } from 'typings/Module';
import type { EnhancedMissingVehiclesProps } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';
import type { InternalVehicle } from 'typings/Vehicle';

type Requirements = EnhancedMissingVehiclesProps['missingRequirements'];

export default (
    LSSM: Vue,
    missingRequirements: Requirements,
    requirements: Requirements,
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

    const vehicleTypes = LSSM.$t('vehicles') as Record<number, InternalVehicle>;

    if (!vehicleList || !occupiedList) return;

    type GroupTranslation = Record<string, Record<number, number>>;

    const getRequirementsByIDs = (translations: GroupTranslation) => {
        const requirements: Record<number, Requirements> = {};

        Object.entries(translations).forEach(([reg, vehicles]) => {
            const regex = new RegExp(reg.replace(/^\/|\/[ADJUgimux]*$/gu, ''));
            const requirement = missingRequirements.find(({ vehicle }) =>
                vehicle.match(regex)
            );
            if (requirement) {
                Object.values(vehicles).forEach(vehicle => {
                    if (!requirements.hasOwnProperty(vehicle))
                        requirements[vehicle] = [];
                    requirements[vehicle].push(requirement);
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

    const requirementsByVehicleID = getRequirementsByIDs(
        $m('vehiclesByRequirement') as unknown as GroupTranslation
    );
    const staffByVehicleID = getRequirementsByIDs(
        $m('staff') as unknown as GroupTranslation
    );

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

            const tractiveVehicleID = checkbox.getAttribute(
                'tractive_vehicle_id'
            );
            let tractiveCounted = false;
            if (
                tractiveVehicleID &&
                checkbox.getAttribute('tractive_random') === '0' &&
                tractiveVehicleID !== '0'
            ) {
                const tractive = LSSM.$store.getters['api/vehicle'](
                    parseInt(tractiveVehicleID)
                );
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
                                  type.minPersonnel * vehicleIds.length,
                              max:
                                  requirement.selected.max +
                                  vehicleIds
                                      .map(
                                          id =>
                                              LSSM.$store.getters[
                                                  'api/vehicle'
                                              ](id)?.max_personnel_override ??
                                              type.maxPersonnel
                                      )
                                      .reduce((a, b) => a + b, 0),
                          }
                );
            });
        });
        Object.entries(specialRequirements).forEach(([key, requirement]) =>
            setSelected(requirement, getProgressBarSelected(key))
        );
    };
};
