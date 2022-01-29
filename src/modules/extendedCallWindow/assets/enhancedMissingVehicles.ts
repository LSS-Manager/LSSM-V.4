import { $m } from 'typings/Module';
import enhancedMissingVehicles from '../components/enhancedMissingVehicles/emv.vue';
import { Requirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

export default (LSSM: Vue, MODULE_ID: string, $m: $m): void => {
    const missingDialog = document.getElementById('missing_text');
    if (!missingDialog) return;
    const missingRequirementsText = missingDialog.textContent
        ?.trim()
        .replace(/(^[^:]*:)|(\.$)/g, '')
        .trim();
    if (!missingRequirementsText) return;

    const water = $m('enhancedMissingVehicles.water').toString();
    const foam = $m('enhancedMissingVehicles.foam').toString();
    const pumping = $m('enhancedMissingVehicles.pump').toString();

    const vehicleGroupTranslation = $m(
        'enhancedMissingVehicles.vehiclesByRequirement'
    ) as unknown as
        | {
              [group: string]: number[];
          }
        | string;
    const staffGroupTranslation = $m(
        'enhancedMissingVehicles.staff'
    ) as unknown as
        | {
              [group: string]: number[];
          }
        | string;
    const vehicleGroups =
        typeof vehicleGroupTranslation === 'string'
            ? {}
            : vehicleGroupTranslation;
    const staffGroups =
        typeof staffGroupTranslation === 'string' ? {} : staffGroupTranslation;

    const numRegex = '\\d{1,3}(([,.]|\\s)?\\d{3})*';
    const groupsRegex = Object.keys({
        ...vehicleGroups,
        ...staffGroups,
    })
        .map(r => r.replace(/^\/\^|\$\/$/g, ''))
        .join('|');
    const innerRegex = `${LSSM.$utils.escapeRegex(
        water
    )}|${LSSM.$utils.escapeRegex(foam)}|${LSSM.$utils.escapeRegex(
        pumping
    )}|${groupsRegex}`;

    const requirementRegex = new RegExp(
        `((${numRegex}\\s+(${innerRegex}))|(${innerRegex}):\\s*${numRegex})(?=[,.]|$)`,
        'g'
    );
    const missingRequirementMatches =
        missingRequirementsText.match(requirementRegex);
    const staffPrefix = $m('enhancedMissingVehicles.staffPrefix') as unknown as
        | Record<number, RegExp>
        | string;
    const extras = missingRequirementsText
        .replace(requirementRegex, '')
        .replace(/^\./, '')
        .trim()
        .replace(
            new RegExp(
                Object.values(
                    typeof staffPrefix === 'string' ? {} : staffPrefix
                ).join('|'),
                'g'
            ),
            ''
        )
        .replace(/(, )+/g, ', ')
        .trim()
        .replace(/(^[,.] ?)|([,.] ?$)/g, '')
        .trim();
    if (!missingRequirementMatches) return;
    const missingRequirements = missingRequirementMatches.map(req => {
        const requirement = req.trim();
        const isColonMode = !!requirement.match(/^.*:\s*\d+$/);
        const vehicle = requirement
            .trim()
            .replace(isColonMode ? /:\s*\d+$/ : /^\d+/, '')
            .trim();
        return {
            missing: parseInt(
                requirement.match(isColonMode ? /\d+$/ : /^\d+/)?.[0] || '0'
            ),
            vehicle,
            selected: Object.keys(staffGroups).find(group =>
                vehicle.match(new RegExp(group.replace(/(^\/)|(\/$)/g, '')))
            )
                ? { min: 0, max: 0 }
                : 0,
        };
    }) as Requirement[];
    const drivingTable = document.querySelector(
        '#mission_vehicle_driving tbody'
    );
    if (drivingTable) {
        const drivingRows = drivingTable.innerHTML;
        missingRequirements.forEach(requirement => {
            const isWater = requirement.vehicle === water;
            const isFoam = requirement.vehicle === foam;
            const isPumping = requirement.vehicle === pumping;
            if (isWater) {
                requirement.driving = LSSM.$utils.getNumberFromText(
                    document.querySelector<HTMLDivElement>(
                        '[id^="mission_water_holder_"] div.progress-bar-mission-window-water.progress-bar-warning'
                    )?.textContent ?? '',
                    false,
                    0
                );
            } else if (isFoam) {
                requirement.driving = LSSM.$utils.getNumberFromText(
                    document.querySelector<HTMLDivElement>(
                        '[id^="mission_foam_holder_"] div.progress-bar-mission-window-water.progress-bar-warning'
                    )?.textContent ?? '',
                    false,
                    0
                );
            } else if (isPumping) {
                requirement.driving = LSSM.$utils.getNumberFromText(
                    document.querySelector<HTMLDivElement>(
                        '[id^="mission_pump_holder_"] div.progress-bar-mission-window-water.progress-bar-warning'
                    )?.textContent ?? '',
                    false,
                    0
                );
            } else {
                const vehicleGroupRequirement = Object.keys(vehicleGroups).find(
                    group =>
                        requirement.vehicle.match(
                            new RegExp(group.replace(/(^\/)|(\/$)/g, ''))
                        )
                );

                const staffGroupRequirement = Object.keys(staffGroups).find(
                    group =>
                        requirement.vehicle.match(
                            new RegExp(group.replace(/(^\/)|(\/$)/g, ''))
                        )
                );
                if (staffGroupRequirement) {
                    const vehicleTypes: number[] = Object.values(
                        staffGroups[staffGroupRequirement]
                    );
                    let drivingStaff = 0;
                    drivingTable
                        .querySelectorAll<HTMLTableRowElement>('tbody tr')
                        .forEach(vehicle => {
                            const vehicleType = parseInt(
                                vehicle
                                    .querySelector('[vehicle_type_id]')
                                    ?.getAttribute('vehicle_type_id') ?? '-1'
                            );
                            if (vehicleTypes.includes(vehicleType)) {
                                drivingStaff += parseInt(
                                    vehicle
                                        .querySelector('td:nth-of-type(5)')
                                        ?.getAttribute('sortvalue') ?? '0'
                                );
                            }
                        });
                    requirement.driving = drivingStaff;
                } else {
                    if (!vehicleGroupRequirement) {
                        requirement.vehicle = '';
                        return;
                    }
                    requirement.driving = Object.values(
                        vehicleGroups[vehicleGroupRequirement]
                    )
                        .map(
                            vehicleType =>
                                (
                                    drivingRows.match(
                                        new RegExp(
                                            `vehicle_type_id="${vehicleType}"`,
                                            'g'
                                        )
                                    ) || []
                                ).length
                        )
                        .reduce((a, b) => a + b, 0);
                }
            }
            requirement.total = requirement.missing - requirement.driving;
        });
    }
    LSSM.$store
        .dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'pushRight',
            defaultValue: false,
        })
        .then(pushedRight => {
            if (pushedRight) {
                document
                    .getElementById('mission-form')
                    ?.insertAdjacentElement('afterbegin', missingDialog);
            }

            new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h =>
                    h(enhancedMissingVehicles, {
                        props: {
                            missingRequirements: missingRequirements.filter(
                                req => !!req.vehicle
                            ),
                            extras,
                            missingText: missingDialog.textContent,
                        },
                    }),
            }).$mount(missingDialog);
        });
};
