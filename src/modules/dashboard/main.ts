import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ LSSM, $m }) => {
    LSSM.$stores.root.addMenuItem($m('name').toString()).then(element =>
        element.addEventListener('click', async () => {
            await LSSM.$stores.api.autoUpdateBuildings('dashboard');
            await LSSM.$stores.api.autoUpdateVehicles('dashboard');
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
});
