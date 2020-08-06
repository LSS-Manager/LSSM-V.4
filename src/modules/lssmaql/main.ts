import lssmaql from './lssmaql.vue';

((LSSM: Vue) => {
    LSSM.$store.dispatch('addMenuItem', 'LSSMAQL Console').then(
        element =>
            (element.onclick = () =>
                LSSM.$modal.show(
                    lssmaql,
                    {},
                    {
                        name: 'lssmaql',
                        height: '96%',
                        width: '96%',
                    }
                ))
    );
})(window[PREFIX] as Vue);
