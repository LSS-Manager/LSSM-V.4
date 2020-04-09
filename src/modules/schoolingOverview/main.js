import schoolingOverview from './schoolingOverview.vue';
import openSchoolingTabs from './components/openSchoolingTabs.vue';
import ownSchoolingTabs from './components/ownSchoolingTabs.vue';

let clear = document.querySelector('.clear');
new window.lssmv4.Vue({
    store: window.lssmv4.$store,
    i18n: window.lssmv4.$i18n,
    render: h => h(schoolingOverview),
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
