import getSchoolings from './assets/getSchoolings';
import OpenSchoolingTabs from './components/OpenSchoolingTabs.vue';
import OwnSchoolingTabs from './components/OwnSchoolingTabs.vue';
import SchoolingOverview from './SchoolingOverview.vue';

import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ LSSM }) => {
    const { ownSchoolings, openSchoolings } = getSchoolings(LSSM);

    const clear = document.querySelector('.clear');
    if (clear) {
        new LSSM.$vue({
            pinia: LSSM.$pinia,
            i18n: LSSM.$i18n,
            render: h =>
                h(SchoolingOverview, {
                    props: {
                        ownSchoolings: ownSchoolings.amounts,
                        openSchoolings: openSchoolings.amounts,
                    },
                }),
        }).$mount(clear);
    }

    const ownTable = document.querySelector<HTMLTableElement>(
        '#schooling_own_table'
    );
    if (ownTable) {
        ownTable.previousElementSibling?.remove();
        new LSSM.$vue({
            pinia: LSSM.$pinia,
            i18n: LSSM.$i18n,
            render: h =>
                h(OwnSchoolingTabs, { props: { tabs: ownSchoolings.tabs } }),
        }).$mount(ownTable);
    }

    const openTable = document.querySelector<HTMLTableElement>(
        '#schooling_opened_table'
    );
    if (openTable) {
        openTable.previousElementSibling?.previousElementSibling?.remove();
        document
            .querySelector(
                '.search_input_field[search_class="schooling_opened_table_searchable"]'
            )
            ?.remove();
        new LSSM.$vue({
            pinia: LSSM.$pinia,
            i18n: LSSM.$i18n,
            render: h =>
                h(OpenSchoolingTabs, { props: { tabs: openSchoolings.tabs } }),
        }).$mount(openTable);
    }
});
