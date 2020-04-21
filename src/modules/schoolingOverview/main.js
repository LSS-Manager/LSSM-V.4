import schoolingOverview from './schoolingOverview.vue';
import openSchoolingTabs from './components/openSchoolingTabs.vue';
import ownSchoolingTabs from './components/ownSchoolingTabs.vue';

const ownSchoolings = {};
document
    .querySelectorAll('#schooling_own_table tbody tr')
    .forEach(schooling => {
        let name = schooling.querySelector('a.btn-success').innerText;
        if (!ownSchoolings.hasOwnProperty(name)) ownSchoolings[name] = 0;
        ownSchoolings[name]++;
    });

const openSchoolings = {};
document
    .querySelectorAll(
        '#schooling_opened_table tr.schooling_opened_table_searchable'
    )
    .forEach(schooling => {
        let name = schooling.querySelector('a.btn-success').innerText;
        if (!openSchoolings.hasOwnProperty(name))
            openSchoolings[name] = {
                amount: 0,
                seats: 0,
            };
        openSchoolings[name].amount++;
        openSchoolings[name].seats += parseInt(
            schooling.querySelector('td:nth-of-type(2)').innerText
        );
    });
Object.values(window.lssmv4.$t('modules.schoolingOverview.schoolings')).forEach(
    schooling =>
        !openSchoolings.hasOwnProperty(schooling) &&
        (openSchoolings[schooling] = { amount: 0, seats: 0 })
);

let clear = document.querySelector('.clear');
new window.lssmv4.Vue({
    store: window.lssmv4.$store,
    i18n: window.lssmv4.$i18n,
    render: h =>
        h(schoolingOverview, {
            props: {
                ownSchoolings,
                openSchoolings,
            },
        }),
}).$mount(clear);

let openTable = document.getElementById('schooling_opened_table');
if (openTable) {
    document
        .querySelector(
            '.search_input_field[search_class="schooling_opened_table_searchable"]'
        )
        .remove();
    new window.lssmv4.Vue({
        store: window.lssmv4.$store,
        i18n: window.lssmv4.$i18n,
        render: h => h(openSchoolingTabs),
    }).$mount(openTable);
}

let ownTable = document.getElementById('schooling_own_table');
ownTable &&
    new window.lssmv4.Vue({
        store: window.lssmv4.$store,
        i18n: window.lssmv4.$i18n,
        render: h => h(ownSchoolingTabs),
    }).$mount(ownTable);
