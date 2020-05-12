window.lssmv4.$store.dispatch('settings/register', {
    moduleId: MODULE_ID,
    settings: {
        generationDate: {
            type: 'toggle',
            default: true,
        },
        enhancedMissingVehicles: {
            type: 'toggle',
            default: false,
        },
    },
});

(() => {
    if (
        !window.location.href.match(/\/missions\/\d+/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const getSetting = settingId => {
        return window.lssmv4.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    getSetting('generationDate').then(setting => {
        if (!setting) return;
        require('./assets/generationDate');
    });

    getSetting('enhancedMissingVehicles').then(setting => {
        if (!setting) return;
        require('./assets/enhancedMissingVehicles');
    });
})();
