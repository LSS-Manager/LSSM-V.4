import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ LSSM, $m }) => {
    LSSM.$stores.root
        .addMenuItem($m('name').toString())
        .addEventListener('click', async () => {
            await LSSM.$stores.api.getBuildings('dashboard');
            await LSSM.$stores.api.getVehicles('dashboard');
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/dashboard/dashboard" */ './DashboardLightbox.vue'
                    ),
                {},
                { name: 'dashboard', height: '96%', width: '96%' }
            );
        });
});
