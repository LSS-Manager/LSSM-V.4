import creditsextension from './creditsextension.vue';

import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async ({ LSSM, MODULE_ID, getSetting }) => {
    const wrapper = document.getElementById('navigation_top')?.parentElement;
    if (wrapper) {
        const settings = {
            showSales: await getSetting('showSales'),
            highlightSales: await getSetting('highlightSales'),
        };
        new LSSM.$vue({
            pinia: LSSM.$pinia,
            i18n: LSSM.$i18n,
            render: h =>
                h(creditsextension, {
                    props: { MODULE_ID, ...settings, getSetting },
                }),
        }).$mount(wrapper);
        document.getElementById('coins_top')?.parentElement?.remove();
    }
});
