import enhanceVehicleList from './assets/enhanceVehicleList';
import personnelDemands from './assets/personnelDemands';

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
        },
    });

    if (
        !window.location.pathname.match(/^\/buildings\/\d+$/) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

    await LSSM.$store.dispatch('api/registerVehiclesUsage', true);

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const BUILDING_MODE = document.getElementById('tab_protocol')
        ? 'dispatch'
        : 'building';

    if (await getSetting('enhanceVehicleList'))
        await enhanceVehicleList(LSSM, BUILDING_MODE, getSetting);

    if (BUILDING_MODE === 'building' && (await getSetting('personnelDemands')))
        personnelDemands(LSSM);
})(window[PREFIX] as Vue);
