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
menuItem.innerHTML = `${window.lssmv4.$t(
    'modules.support.name'
)} <span id="${window.lssmv4.$store.getters.nodeId(
    'support-badge'
)}" class="badge">0</span>`;
window.lssmv4.$store.dispatch('addMenuItem', { menuItem });

menuItem.onclick = openSupport;

const get_support_chats = () =>
    window.lssmv4.$store
        .dispatch('api/request', {
            url: `${window.lssmv4.$store.state.server}await_get_support_chats.php`,
        })
        .then(res => res.json())
        .then(data => {
            window.lssmv4.$store.commit('updateSupportChats', data);
            const badge = document.getElementById(
                window.lssmv4.$store.getters.nodeId('support-badge')
            );
            const badgeCounter = window.lssmv4.$store.getters.supportCounter;
            badge.innerText = badgeCounter;
            badge.classList[badgeCounter ? 'add' : 'remove'](
                'lssm_notice_bg',
                'highlight'
            );
            setTimeout(async () => await get_support_chats(), 10000);
        });

get_support_chats();
