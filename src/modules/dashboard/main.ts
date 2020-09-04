import { ModuleMainFunction } from 'typings/Module';

export default ((LSSM, _, $m) => {
    LSSM.$store.dispatch('addMenuItem', $m('name').toString()).then(
        element =>
            (element.onclick = async () => {
                await LSSM.$store.dispatch('api/registerBuildingsUsage', true);
                await LSSM.$store.dispatch('api/registerVehiclesUsage', true);
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "dashboard/dashboard" */ './dashboard.vue'
                        ),
                    {},
                    { name: 'dashboard', height: '96%', width: '96%' }
                );
            })
    );
}) as ModuleMainFunction;
