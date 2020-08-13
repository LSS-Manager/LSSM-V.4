import enhancedMissingVehicles from '../components/enhancedMissingVehicles.vue';
import { Requirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

export default (LSSM: Vue): void => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(
            `modules.extendedCallWindow.enhancedMissingVehicles.${key}`,
            args
        );

    const missingDialog = document.getElementById('missing_text');
    if (!missingDialog) return;
    const missingRequirementsText = missingDialog.textContent
        ?.trim()
        .replace(/(^[^:]*:)|(\.$)/g, '')
        .trim();
    if (!missingRequirementsText) return;
    const missingRequirements = missingRequirementsText
        .split(/,(?![^(]*?\))/g)
        .map(req => ({
            missing: parseInt(req.trim().match(/^\d+/)?.[0] || '0'),
            vehicle: req
                .trim()
                .replace(/^\d+/, '')
                .trim(),
            selected: 0,
        })) as Requirement[];
    const last = missingRequirements[missingRequirements.length - 1];
    let extras = '';
    if (last.vehicle.match(/\..*$/)) {
        extras = last.vehicle.match(/\..*$/)?.[0].replace(/^\./, '') || '';
        last.vehicle = last.vehicle.replace(/\..*$/, '');
    }
    const vehicleGroups = ($m('vehiclesByRequirement') as unknown) as {
        [group: string]: number[];
    };
    const drivingTable = document.querySelector(
        '#mission_vehicle_driving tbody'
    );
    if (drivingTable) {
        const drivingRows = drivingTable.innerHTML;
        missingRequirements.forEach(requirement => {
            const vehicleGroupRequirement = Object.keys(
                vehicleGroups
            ).find(group =>
                requirement.vehicle.match(
                    new RegExp(group.replace(/(^\/)|(\/$)/g, ''))
                )
            );
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
            requirement.total = requirement.missing - requirement.driving;
        });
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
                },
            }),
    }).$mount(missingDialog);
};
