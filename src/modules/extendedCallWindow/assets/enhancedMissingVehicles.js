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
    missingRequirements.forEach(requirement => {
        if (!vehicleGroups.hasOwnProperty(requirement.vehicle)) {
            extras += `, ${requirement.missing.toLocaleString()} ${
                requirement.vehicle
            }`;
            requirement.vehicle = null;
            return;
        }
        requirement.driving = Object.values(vehicleGroups[requirement.vehicle])
            .map(
                vehicleType =>
                    document.querySelectorAll(
                        `#mission_vehicle_driving tbody tr td a[vehicle_type_id^="${vehicleType}"]`
                    ).length
            )
            .reduce((a, b) => a + b, 0);
        requirement.total = requirement.missing - requirement.driving;
    });
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
