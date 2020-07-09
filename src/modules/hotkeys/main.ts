(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            prevNextElement: {
                type: 'toggle',
                default: false,
            },
            prevElementKey: {
                type: 'hotkey',
                default: 'left',
                dependsOn: '.prevNextElement',
            },
            nextElementKey: {
                type: 'hotkey',
                default: 'right',
                dependsOn: '.prevNextElement',
            },
        },
    });
})(window[PREFIX] as Vue);
