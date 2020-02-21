import overview from './overview.vue';

let menuItem = document.createElement('a');
menuItem.href = '#';
menuItem.innerText = window.lssmv4.$t('modules.overview.name');
window.lssmv4.$store.dispatch('addMenuItem', { menuItem });

menuItem.onclick = () =>
    window.lssmv4.$modal.show(
        overview,
        {},
        {
            name: 'overview',
            height: '96%',
            width: '96%',
        }
    );
