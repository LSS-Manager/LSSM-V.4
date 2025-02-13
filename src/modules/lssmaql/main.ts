import type { ModuleMainFunction } from 'typings/Module';

export default (({ LSSM, $m }) => {
    LSSM.$stores.root
        .addMenuItem(`LSSMAQL ${$m('console')}`)
        .addEventListener('click', () =>
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/lssmaql/lssmaql" */ './lssmaql.vue'
                    ),
                {},
                {
                    name: 'lssmaql',
                    height: '96%',
                    width: '96%',
                }
            )
        );
}) as ModuleMainFunction;
