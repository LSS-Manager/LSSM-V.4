import getSchoolings from './assets/getSchoolings';
import openSchoolingTabs from './components/openSchoolingTabs.vue';
import ownSchoolingTabs from './components/ownSchoolingTabs.vue';
import schoolingOverview from './schoolingOverview.vue';

import { ModuleMainFunction } from 'typings/Module';

export default (LSSM => {
    const { ownSchoolings, openSchoolings } = getSchoolings(LSSM);

    const clear = document.querySelector('.clear');
    if (clear) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h =>
                h(schoolingOverview, {
                    props: {
                        ownSchoolings: ownSchoolings.amounts,
                        openSchoolings: openSchoolings.amounts,
                    },
                }),
        }).$mount(clear);
    }

    const ownTable = document.getElementById('schooling_own_table');
    if (ownTable) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h =>
                h(ownSchoolingTabs, { props: { tabs: ownSchoolings.tabs } }),
        }).$mount(ownTable);
    }

    const openTable = document.getElementById('schooling_opened_table');
    if (openTable) {
        document
            .querySelector(
                '.search_input_field[search_class="schooling_opened_table_searchable"]'
            )
            ?.remove();
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h =>
                h(openSchoolingTabs, { props: { tabs: openSchoolings.tabs } }),
        }).$mount(openTable);
    }
}) as ModuleMainFunction;
