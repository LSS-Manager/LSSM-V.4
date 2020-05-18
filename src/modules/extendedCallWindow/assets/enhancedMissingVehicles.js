import enhancedMissingVehicles from '../components/enhancedMissingVehicles.vue';

(() => {
    const missingDialog = document.getElementById('missing_text');
    const missingRequirementsText = missingDialog.textContent
        .trim()
        .replace(/(^[^:]*:)|(\.$)/g, '')
        .trim();
    if (!missingRequirementsText) return;
    const missingRequirements = missingRequirementsText
        .split(/,(?![^(]*?\))/g)
        .map(req => ({
            missing: parseInt(req.trim().match(/^\d+/)[0]),
            req,
            trim: req.trim(),
            rep: req.trim().replace(/^\d+/, ''),
            vehicle: req
                .trim()
                .replace(/^\d+/, '')
                .trim(),
        }));
    const last = missingRequirements[missingRequirements.length - 1];
    let extras = '';
    if (last.vehicle.match(/\..*$/)) {
        extras = last.vehicle.match(/\..*$/)[0].replace(/^\./, '');
        last.vehicle = last.vehicle.replace(/\..*$/, '');
    }
    const vehicleGroups = window.lssmv4.$t(
        'modules.extendedCallWindow.enhancedMissingVehicles.vehiclesByRequirement'
    );
    const drivingTable = document.querySelector(
        '#mission_vehicle_driving tbody'
    );
    if (drivingTable) {
        const drivingRows = drivingTable.innerHTML;
        missingRequirements.forEach(requirement => {
            const vehicleGroupRequirement = Object.keys(
                vehicleGroups
            ).find(group =>
                requirement.vehicle.match(new RegExp(group.replace(/\//g, '')))
            );
            if (!vehicleGroupRequirement) {
                extras += `, ${requirement.missing.toLocaleString()} ${
                    requirement.vehicle
                }`;
                requirement.vehicle = null;
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
    new window.lssmv4.Vue({
        store: window.lssmv4.$store,
        i18n: window.lssmv4.$i18n,
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
})();
