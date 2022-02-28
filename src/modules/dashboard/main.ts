import type { ModuleMainFunction } from 'typings/Module';

export default (({ LSSM, $m }) => {
    LSSM.$store.dispatch('addMenuItem', $m('name').toString()).then(element =>
        element.addEventListener('click', async () => {
            await LSSM.$store.dispatch('api/registerBuildingsUsage', {
                autoUpdate: true,
                feature: 'dashboard',
            });
            await LSSM.$store.dispatch('api/registerVehiclesUsage', {
                autoUpdate: true,
                feature: 'dashboard',
            });
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/dashboard/dashboard" */ './dashboard.vue'
                    ),
                {},
                { name: 'dashboard', height: '96%', width: '96%' }
            );
        })
    );
}) as ModuleMainFunction;
