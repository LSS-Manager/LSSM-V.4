import enhanceVehicleList from './assets/enhanceVehicleList';
import personnelDemands from './assets/personnelDemands';
import schoolingSummary from './assets/schoolingSummary';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            enhanceVehicleList: {
                type: 'toggle',
                default: true,
            },
            vehicleTypes: {
                type: 'toggle',
                default: true,
                dependsOn: '.enhanceVehicleList',
            },
            fmsSwitch: {
                type: 'toggle',
                default: true,
                dependsOn: '.enhanceVehicleList',
            },
            personnelAssignmentBtn: {
                type: 'toggle',
                default: true,
                dependsOn: '.enhanceVehicleList',
            },
            personnelDemands: {
                type: 'toggle',
                default: true,
            },
            schoolingSummary: {
                type: 'toggle',
                default: true,
            },
        },
    });

    if (
        !window.location.pathname.match(
            /^\/buildings\/\d+(\/personals)?\/?$/
        ) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

    await LSSM.$store.dispatch('api/registerVehiclesUsage', true);
    await LSSM.$store.dispatch('api/registerBuildingsUsage', true);

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (!window.location.pathname.match('personals')) {
        const BUILDING_MODE = document.getElementById('tab_protocol')
            ? 'dispatch'
            : 'building';

        if (await getSetting('enhanceVehicleList'))
            await enhanceVehicleList(LSSM, BUILDING_MODE, getSetting);

        if (
            BUILDING_MODE === 'building' &&
            (await getSetting('personnelDemands'))
        )
            personnelDemands(LSSM);
    } else {
        if (await getSetting('schoolingSummary')) schoolingSummary(LSSM);
    }
})(window[PREFIX] as Vue);
