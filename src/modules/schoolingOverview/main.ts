import schoolingOverview from './schoolingOverview.vue';
import openSchoolingTabs from './components/openSchoolingTabs.vue';
import ownSchoolingTabs from './components/ownSchoolingTabs.vue';
import {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';
import { Schooling } from 'typings/Schooling';
import { ModuleMainFunction } from 'typings/Module';

export default (LSSM => {
    const ownSchoolings = {} as OwnSchoolings;
    document
        .querySelectorAll('#schooling_own_table tbody tr')
        .forEach(schooling => {
            const name = schooling.querySelector('a.btn-success')?.textContent;
            if (!name) return;
            if (!ownSchoolings.hasOwnProperty(name)) ownSchoolings[name] = 0;
            ownSchoolings[name]++;
        });

    const openSchoolings = {} as OpenSchoolings;
    document
        .querySelectorAll(
            '#schooling_opened_table tr.schooling_opened_table_searchable'
        )
        .forEach(schooling => {
            const name = schooling.querySelector('a.btn-success')?.textContent;
            if (!name) return;
            if (!openSchoolings.hasOwnProperty(name)) {
                openSchoolings[name] = {
                    amount: 0,
                    seats: 0,
                };
            }
            openSchoolings[name].amount++;
            openSchoolings[name].seats += parseInt(
                schooling.querySelector('td:nth-of-type(2)')?.textContent || '0'
            );
        });
    Object.values(
        Object.entries(
            (LSSM.$t('schoolings') as unknown) as {
                [category: string]: Schooling[];
            }
        ).flatMap(([cat, schoolings]) =>
            Object.values(schoolings).map(
                ({ caption }) => `${cat} - ${caption}`
            )
        )
    ).forEach(
        schooling =>
            !openSchoolings.hasOwnProperty(schooling) &&
            (openSchoolings[schooling] = { amount: 0, seats: 0 })
    );

    const clear = document.querySelector('.clear');
    if (clear) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h =>
                h(schoolingOverview, {
                    props: {
                        ownSchoolings,
                        openSchoolings,
                    },
                }),
        }).$mount(clear);
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
            render: h => h(openSchoolingTabs),
        }).$mount(openTable);
    }

    const ownTable = document.getElementById('schooling_own_table');
    if (ownTable) {
        new LSSM.$vue({
            store: LSSM.$store,
            i18n: LSSM.$i18n,
            render: h => h(ownSchoolingTabs),
        }).$mount(ownTable);
    }
}) as ModuleMainFunction;
