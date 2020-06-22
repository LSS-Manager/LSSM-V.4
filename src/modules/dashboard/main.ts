import dashboard from './dashboard.vue';

((LSSM: Vue) => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.dashboard.${key}`, args);

    LSSM.$store.dispatch('addMenuItem', $m('name').toString()).then(
        element =>
            (element.onclick = async () => {
                await LSSM.$store.dispatch('api/registerBuildingsUsage', true);
                await LSSM.$store.dispatch('api/registerVehiclesUsage', true);
                LSSM.$modal.show(
                    dashboard,
                    {},
                    { name: 'dashboard', height: '96%', width: '96%' }
                );
            })
    );
})(window[PREFIX] as Vue);
