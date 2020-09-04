import { ModuleMainFunction } from 'typings/Module';

export default ((LSSM, _, $m) => {
    const openOverview = (): void =>
        LSSM.$modal.show(
            () =>
                import(
                    /* webpackChunkName: "overview/overview" */ './overview.vue'
                ),
            {},
            {
                name: 'overview',
                height: '96%',
                width: '96%',
            }
        );

    LSSM.$store
        .dispatch('addMenuItem', $m('name').toString())
        .then(element => (element.onclick = openOverview));
}) as ModuleMainFunction;
