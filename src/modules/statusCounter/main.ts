import counter from './counter.vue';

import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const settings = await LSSM.$store.dispatch(
        'settings/getModule',
        MODULE_ID
    );
    const wrapper = document.createElement('span');
    document.getElementById('radio_panel_heading')?.append(wrapper);
    new LSSM.$vue({
        store: LSSM.$store,
        i18n: LSSM.$i18n,
        render: h => h(counter, { props: { settings } }),
    }).$mount(wrapper);
});
