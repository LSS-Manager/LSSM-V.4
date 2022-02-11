import type { ModuleMainFunction } from 'typings/Module';

export default (({ LSSM }) => {
    LSSM.$store.dispatch('addMenuItem', 'LSSMAQL Console').then(element =>
        element.addEventListener('click', () =>
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
        )
    );
}) as ModuleMainFunction;
