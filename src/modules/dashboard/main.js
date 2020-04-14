import dashboard from './dashboard.vue';

let menuItem = document.createElement('a');
menuItem.href = '#';
menuItem.innerText = window.lssmv4.$t('modules.dashboard.name');
window.lssmv4.$store.dispatch('addMenuItem', { menuItem });

menuItem.onclick = () =>
    window.lssmv4.$modal.show(
        dashboard,
        {},
        {
            name: 'dashboard',
            height: '96%',
            width: '96%',
        }
    );
