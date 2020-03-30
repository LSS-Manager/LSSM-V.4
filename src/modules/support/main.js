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

const get_support_amount = () =>
    window.lssmv4.$store
        .dispatch('api/request', {
            url: `${window.lssmv4.$store.state.server}await_get_support_chats.php`,
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // setTimeout(async () => await get_support_amount(), 1000);
        });

get_support_amount();
