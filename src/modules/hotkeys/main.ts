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
                default: '',
            },
        },
    });
})(window[PREFIX] as Vue);

// Note: https://craig.is/killing/mice
