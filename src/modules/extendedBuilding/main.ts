import enhanceVehicleList from './assets/enhanceVehicleList';

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
})(window[PREFIX] as Vue);
