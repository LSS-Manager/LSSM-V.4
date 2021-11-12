import creditsextension from './creditsextension.vue';

import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const wrapper = document.querySelector('#navigation_top')?.parentElement;
    if (wrapper) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h => h(creditsextension, { props: { MODULE_ID } }),
        }).$mount(wrapper);
        document.querySelector('#coins_top')?.parentElement?.remove();
    }
});
