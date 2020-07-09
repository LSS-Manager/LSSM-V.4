import support from './support.vue';

const get_support_chats = (loop = false) =>
    window.lssmv4.$store
        .dispatch('api/request', {
            url: `${window.lssmv4.$store.state.server}support/get_support_chats.php`,
        })
        .then((res) => res.json())
        .then((data) => {
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
            if (loop)
                setTimeout(async () => await get_support_chats(loop), 10000);
        })
        .catch(() => {});

const openSupport = () =>
    window.lssmv4.$modal.show(
        support,
        {
            updateFn: get_support_chats,
        },
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

get_support_chats(true);
