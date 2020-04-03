import renameFz from './renameFz.vue';

const mount = () => {
    const vehicleTable = document.querySelector('#vehicle_table');
    const clear = document.createElement('div');
    clear.classList.add('clear');
    vehicleTable.parentNode.insertBefore(clear, vehicleTable);
    new window.lssmv4.Vue({
        store: window.lssmv4.$store,
        i18n: window.lssmv4.$i18n,
        render: h => h(renameFz),
    }).$mount(clear);
};

if (!document.querySelector('img.online_icon')) {
    if (document.getElementById('tab_vehicle')) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(record => {
                Array.from(record.addedNodes).find(
                    node => node.tagName === 'SCRIPT'
                ) && mount();
            });
        });
        observer.observe(document.querySelector('#tab_vehicle'), {
            childList: true,
        });
    } else {
        mount();
    }
}
