import renameFz from './renameFz.vue';

const vehicleTable = document.querySelector('#vehicle_table');
new window.lssmv4.Vue({
    store: window.lssmv4.$store,
    i18n: window.lssmv4.$i18n,
    render: h => h(renameFz),
}).$mount(vehicleTable);
