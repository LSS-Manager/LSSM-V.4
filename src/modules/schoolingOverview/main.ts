import openSchoolingTabs from './components/openSchoolingTabs.vue';
import ownSchoolingTabs from './components/ownSchoolingTabs.vue';
import schoolingOverview from './schoolingOverview.vue';

import { ModuleMainFunction } from 'typings/Module';
import { Schooling } from 'typings/Schooling';
import {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

export const getSchoolings = (
    LSSM: Vue,
    doc = document
): {
    ownSchoolings: OwnSchoolings;
    openSchoolings: OpenSchoolings;
} => {
    const allTab = LSSM.$t('modules.schoolingOverview.all').toString();
    const ownSchoolings: OwnSchoolings = {
        amounts: {},
        tabs: {
            [allTab]: [],
        },
    };
    document
        .querySelectorAll('#schooling_own_table tbody tr')
        .forEach(schooling => {
            const btn = schooling.querySelector(
                'a.btn-success'
            ) as HTMLLinkElement;
            if (!btn) return;
            const name = btn.textContent || '';
            if (!ownSchoolings.amounts.hasOwnProperty(name))
                ownSchoolings.amounts[name] = 0;
            ownSchoolings.amounts[name]++;
            const category =
                name
                    ?.match(/^.*?-/)?.[0]
                    .replace('-', '')
                    .trim() || '';
            const endNode = schooling.querySelector('td:nth-of-type(2)');
            const owner = schooling.querySelector('td:nth-of-type(3)');
            if (!endNode || !owner) return;
            const end = parseInt(endNode.getAttribute('sortvalue') || '0');
            if (!ownSchoolings.tabs.hasOwnProperty(category))
                ownSchoolings.tabs[category] = [];
            const element = {
                id: btn.href.replace(/\D+/g, ''),
                name,
                end,
                owner: owner.innerHTML,
            };
            ownSchoolings.tabs[category].push(element);
            ownSchoolings.tabs[allTab].push(element);
        });

    const openSchoolings: OpenSchoolings = {
        amounts: {},
        tabs: {
            [allTab]: [],
        },
    };
    document
        .querySelectorAll(
            '#schooling_opened_table tr.schooling_opened_table_searchable'
        )
        .forEach(schooling => {
            const btn = schooling.querySelector(
                'a.btn-success'
            ) as HTMLLinkElement;
            if (!btn) return;
            const name = btn.textContent || '';
            const category =
                name
                    ?.match(/^.*?-/)?.[0]
                    .replace('-', '')
                    .trim() || '';
            if (!openSchoolings.amounts.hasOwnProperty(name))
                openSchoolings.amounts[name] = { amount: 0, seats: 0 };
            openSchoolings.amounts[name].amount++;
            const seatNode = schooling.querySelector('td:nth-of-type(2)');
            const endNode = schooling.querySelector('td:nth-of-type(4)');
            const owner = schooling.querySelector('td:nth-of-type(5)');
            if (!seatNode || !endNode || !owner) return;
            const seats = parseInt(seatNode.textContent || '0');
            openSchoolings.amounts[name].seats += seats;
            const price =
                schooling.querySelector('td:nth-of-type(3)')?.textContent || '';
            const end = parseInt(endNode.getAttribute('sortvalue') || '0');
            if (!openSchoolings.tabs.hasOwnProperty(category))
                openSchoolings.tabs[category] = [];
            const element = {
                id: btn.href.replace(/\D+/g, ''),
                name,
                seats,
                price,
                end,
                owner: owner.innerHTML,
            };
            openSchoolings.tabs[category].push(element);
            openSchoolings.tabs[allTab].push(element);
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
            !openSchoolings.amounts.hasOwnProperty(schooling) &&
            (openSchoolings.amounts[schooling] = { amount: 0, seats: 0 })
    );

    return { ownSchoolings, openSchoolings };
};

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
