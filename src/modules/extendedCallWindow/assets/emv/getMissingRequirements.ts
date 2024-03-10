import type Vue from 'vue';

import type { $m } from 'typings/Module';
import type { GroupTranslation } from './getVehicleListObserveHandler';
import type { Mission } from 'typings/Mission';
import type { MissionRequirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

export const groups = ['vehicles', 'staff', 'other'] as const;
Object.seal(groups);

export type Group = (typeof groups)[number];
export type MissingRequirements = Exclude<
    Awaited<ReturnType<typeof getMissingRequirements>>,
    undefined
>;

const getMissingRequirements = (
    LSSM: Vue,
    missingDialog: HTMLDivElement,
    missionType: Mission | undefined,
    $m: $m
) => {
    if (!missingDialog.textContent?.trim()) return;

    const getRequirementTexts = (req: Group) => {
        const typeAttribute = req === 'staff' ? 'personnel' : req;

        const reqEl = missingDialog.querySelector<HTMLDivElement>(
            `[data-requirement-type="${typeAttribute}"]`
        );
        if (!reqEl) return null;

        // the text in the bold part
        const infoText =
            reqEl.querySelector<HTMLElement>('b')?.textContent?.trim() ?? '';
        // all requirements as a continuous string
        const reqText =
            reqEl.textContent
                ?.trim()
                ?.replace(infoText, '')
                .trim()
                .replace(/\s/gu, ' ') ?? '';
        // raw: will not change, remaining: processed requirements will be removed
        return { infoText, raw: reqText, remaining: reqText };
    };

    const requirementTexts = {
        vehicles: getRequirementTexts('vehicles'),
        staff: getRequirementTexts('staff'),
        other: getRequirementTexts('other'),
    } satisfies Record<Group, ReturnType<typeof getRequirementTexts>>;

    // there are no texts at all, so don't do anything
    if (Object.values(requirementTexts).every(text => !text)) return;

    const requirements: Record<Group, MissionRequirement[]> = {
        vehicles: [],
        staff: [],
        other: [],
    };

    const requirementsForVehicle: Record<
        number,
        Partial<Record<Group, Set<number>>>
    > = {};
    const requirementsForEquipment: Record<
        string,
        Partial<Record<Group, Set<number>>>
    > = {};

    const numRegex = '\\d{1,3}(([,.]|\\s)?\\d{3})*x?';
    const getRequirementRegex = (text: string[] | string) => {
        const textRegex =
            Array.isArray(text) ?
                text.map(LSSM.$utils.escapeRegex).join('|')
            :   LSSM.$utils.escapeRegex(text);
        // detects requirements in the forms "x VehicleType" and "VehicleType: x"
        return new RegExp(
            `((${numRegex}\\s+(${textRegex}))|(${textRegex}):\\s*${numRegex})(?=[,.]|$)`,
            'gi'
        );
    };

    const splitMissingFromVehicle = (req: string) => {
        const isColonMode = !!req.match(/^.*:\s*\d+$/u);
        return {
            vehicle: req
                .replace(isColonMode ? /:\s*\d+$/u : /^\d+x?/u, '')
                .trim(),
            missing: parseInt(
                req.match(isColonMode ? /\d+$/u : /^\d+/u)?.[0] || '0'
            ),
        };
    };

    groups.forEach(group => {
        const reqTextGroup = requirementTexts[group];
        if (!reqTextGroup) return;

        // other requirements are handled differently (progress bars)
        if (group === 'other') {
            (['water', 'foam', 'pump'] as const).forEach(type => {
                const translation = $m(
                    `enhancedMissingVehicles.${type}`
                ).toString();
                const typeRegex = getRequirementRegex(translation);
                const match = reqTextGroup.remaining.match(typeRegex)?.[0];
                if (!match) return;

                // we have a match! remove the match from the remaining text and get values from the progress bar
                const progressBar = document.querySelector<HTMLDivElement>(
                    `[id^="mission_${type}_holder"]`
                );
                if (!progressBar) return;
                const getProgressValue = (
                    type: 'driving' | 'missing' | 'selected'
                ) =>
                    LSSM.$utils.getNumberFromText(
                        progressBar.querySelector(
                            `[class*="mission_water_bar_${type}_"]`
                        )?.textContent ?? '',
                        false,
                        0
                    );
                reqTextGroup.remaining = reqTextGroup.remaining.replace(
                    match,
                    ''
                );
                const driving = getProgressValue('driving');
                requirements.other.push({
                    requirement: splitMissingFromVehicle(match.trim()).vehicle,
                    missing: getProgressValue('missing') + driving,
                    driving,
                    selected: getProgressValue('selected'),
                    bar: type,
                });
            });
        }

        // on some languages, some preprocessing is needed because
        // a vehicle requirement may be written as "Need x VehicleType" but we don't want the "Need" part
        if (group === 'vehicles' || group === 'other') {
            const vehiclePreprocessor = $m(
                'enhancedMissingVehicles.vehiclePreprocessor'
            ) as Record<string, string> | string;
            if (typeof vehiclePreprocessor !== 'string') {
                Object.entries(vehiclePreprocessor).forEach(
                    ([reg, replace]) => {
                        reqTextGroup.remaining.replace(
                            new RegExp(reg, 'gu'),
                            replace
                        );
                    }
                );
            }
        }

        // get all requirements for this group
        const groupReqs = $m(
            `enhancedMissingVehicles.${
                group === 'vehicles' || group === 'other' ?
                    'vehiclesByRequirement'
                :   group
            }`
        ) as unknown as GroupTranslation | string;
        // there is no translation for this group
        if (typeof groupReqs === 'string') return;

        const addRequirementToVehicles = (vehicles: number[]) => {
            const requirementIndex = requirements[group].length;
            vehicles.forEach(vehicleType => {
                requirementsForVehicle[vehicleType] ??= {};
                requirementsForVehicle[vehicleType][group] ??=
                    new Set<number>();
                requirementsForVehicle[vehicleType][group]?.add(
                    requirementIndex
                );
            });
        };

        // for each group item, check if it is in the remaining text
        Object.values(groupReqs).forEach(groupReq => {
            const reqRegex = getRequirementRegex(Object.values(groupReq.texts));
            const match = reqTextGroup.remaining.match(reqRegex)?.[0];
            if (!match) return;

            // we have a match! remove the match from the remaining text and parse missing
            reqTextGroup.remaining = reqTextGroup.remaining.replace(match, '');
            const { vehicle, missing } = splitMissingFromVehicle(match.trim());

            addRequirementToVehicles(Object.values(groupReq.vehicles));
            Object.values(groupReq.equipment ?? {}).forEach(equipment => {
                requirementsForEquipment[equipment] ??= {};
                requirementsForEquipment[equipment][group] ??=
                    new Set<number>();
                requirementsForEquipment[equipment][group]?.add(
                    requirements[group].length
                );
            });

            Object.entries(groupReq.conditionalVehicles ?? {}).forEach(
                ([condition, vehicles]) => {
                    if (missionType?.additional[condition])
                        addRequirementToVehicles(Object.values(vehicles));
                }
            );

            requirements[group].push({
                requirement: vehicle,
                missing,
                driving: 0,
                selected: group === 'staff' ? { min: 0, max: 0 } : 0,
                additional: groupReq,
            });
        });
    });

    // clean up the remaining texts (remove unnecessary commas and trim)
    groups.forEach(group => {
        const reqTextGroup = requirementTexts[group];
        if (!reqTextGroup) return;
        reqTextGroup.remaining = reqTextGroup.remaining
            .replace(/,\s*(?=,|$)/gmu, '') // commas with no text after them
            .replace(/^,\s*/gmu, '') // leading comma
            .trim();
    });

    const getFactor = (
        type: number | string,
        group: Group,
        req: number,
        defaultFactor = 1
    ) => {
        const reqItem = requirements[group][req];
        if (
            (group === 'vehicles' || group === 'other') &&
            'additional' in reqItem
        )
            return reqItem.additional.factors?.[type] ?? defaultFactor;

        return defaultFactor;
    };

    // iterate over the table of vehicles en route and update the driving information accordingly
    document
        .querySelectorAll<HTMLTableRowElement>(
            '#mission_vehicle_driving tbody tr'
        )
        .forEach(row => {
            const vehicleType = parseInt(
                row
                    .querySelector('[vehicle_type_id]')
                    ?.getAttribute('vehicle_type_id') ?? '-1'
            );
            if (vehicleType >= 0) {
                groups.forEach(group => {
                    let amount = 1;
                    if (group === 'staff') {
                        amount = parseInt(
                            row
                                .querySelector('td:nth-of-type(5)')
                                ?.getAttribute('sortvalue') ?? '-1'
                        );
                    }
                    if (amount <= 0) return;
                    requirementsForVehicle[vehicleType]?.[group]?.forEach(
                        req =>
                            (requirements[group][req].driving += getFactor(
                                vehicleType,
                                group,
                                req,
                                amount
                            ))
                    );
                });
            }

            row.querySelectorAll<HTMLSpanElement>(
                '[data-equipment-type]'
            ).forEach(equipment => {
                const equipmentType = equipment.dataset.equipmentType;
                if (!equipmentType) return;
                groups.forEach(group =>
                    requirementsForEquipment[equipmentType]?.[group]?.forEach(
                        req =>
                            (requirements[group][req].driving += getFactor(
                                equipmentType,
                                group,
                                req
                            ))
                    )
                );
            });
        });

    return {
        requirements,
        requirementTexts,
        requirementsForVehicle,
        requirementsForEquipment,
    };
};

export default getMissingRequirements;
