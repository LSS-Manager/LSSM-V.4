((LSSM: Vue) => {
    LSSM.$store.dispatch('addMenuItem', 'LSSMAQL Console').then(
        element =>
            (element.onclick = () =>
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "lssmaql/lssmaql" */ './lssmaql.vue'
                        ),
                    {},
                    {
                        name: 'lssmaql',
                        height: '96%',
                        width: '96%',
                    }
                ))
    );
})(window[PREFIX] as Vue);
