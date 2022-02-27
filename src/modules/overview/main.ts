import type { ModuleMainFunction } from 'typings/Module';

export default (({ LSSM, $m }) => {
    const openOverview = (): void =>
        LSSM.$modal.show(
            () =>
                import(
                    /* webpackChunkName: "modules/overview/overview" */ './overview.vue'
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
        .then(element => element.addEventListener('click', openOverview));
}) as ModuleMainFunction;
