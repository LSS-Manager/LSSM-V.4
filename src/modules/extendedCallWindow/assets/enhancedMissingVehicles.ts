// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';
import enhancedMissingVehicles from '../components/enhancedMissingVehicles.vue';
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
    const vehicleGroupTranslation = ($m(
        'enhancedMissingVehicles.vehiclesByRequirement'
    ) as unknown) as
        | {
              [group: string]: number[];
          }
        | string;
    const staffGroupTranslation = ($m(
        'enhancedMissingVehicles.staff'
    ) as unknown) as
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

    const missingRequirementMatches = missingRequirementsText.match(
        new RegExp(
            `\\d{1,3}([,.]?\\d{3})*\\s+(${LSSM.$utils.escapeRegex(
                water
            )}|${Object.keys({ ...vehicleGroups, ...staffGroups })
                .map(r => r.replace(/^\/\^|\$\/$/g, ''))
                .join('|')})(?=[,.]|$)`,
            'g'
        )
    );
    if (!missingRequirementMatches) return;
    const missingRequirements = missingRequirementMatches.map(req => {
        const requirement = req.trim();
        const isColonMode = !!requirement.match(/^.*: \d+$/);
        return {
            missing: parseInt(
                requirement.match(isColonMode ? /\d+$/ : /^\d+/)?.[0] || '0'
            ),
            vehicle: requirement
                .trim()
                .replace(isColonMode ? /: \d+$/ : /^\d+/, '')
                .trim(),
            selected: 0,
        };
    }) as Requirement[];
    let extras = '';
    const drivingTable = document.querySelector(
        '#mission_vehicle_driving tbody'
    );
    if (drivingTable) {
        const drivingRows = drivingTable.innerHTML;
        missingRequirements.forEach(requirement => {
            const isWater = requirement.vehicle === water;
            if (isWater) {
                requirement.driving = parseInt(
                    document
                        .querySelector<HTMLDivElement>(
                            'div.progress-bar-mission-window-water.progress-bar-warning'
                        )
                        ?.textContent?.match(/\d{1,3}([,.]?\d{3})*/)?.[0]
                        ?.replace(/[,.]/g, '') ?? '0'
                );
            } else {
                const vehicleGroupRequirement = Object.keys(
                    vehicleGroups
                ).find(group =>
                    requirement.vehicle.match(
                        new RegExp(group.replace(/(^\/)|(\/$)/g, ''))
                    )
                );

                const staffGroupRequirement = Object.keys(
                    staffGroups
                ).find(group =>
                    requirement.vehicle.match(
                        new RegExp(group.replace(/(^\/)|(\/$)/g, ''))
                    )
                );
                if (staffGroupRequirement) {
                    requirement.driving = 0;
                } else {
                    if (!vehicleGroupRequirement) {
                        extras += `, ${requirement.missing.toLocaleString()} ${
                            requirement.vehicle
                        }`;
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
