import support from './support.vue';

const openSupport = () =>
    window.lssmv4.$modal.show(
        support,
        {},
        { name: 'support', height: 'auto' },
        {}
    );

let menuItem = document.createElement('a');
menuItem.href = '#';
menuItem.innerText = window.lssmv4.$t('modules.support.name');
window.lssmv4.$store.dispatch('addMenuItem', { menuItem });

menuItem.onclick = openSupport;
