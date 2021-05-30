import dailyCreditssummary from './dailyCreditsSummary.vue';
import getEntries from './assets/getEntries';
import { ModuleMainFunction } from 'typings/Module';

export default (async LSSM => {
    const { entries, creditsTypes } = await getEntries(LSSM);
    const clear = document.querySelector('.clear');
    if (clear) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h =>
                h(dailyCreditssummary, {
                    props: {
                        entries,
                        creditsTypes,
                    },
                }),
        }).$mount(clear);
    }
}) as ModuleMainFunction;
