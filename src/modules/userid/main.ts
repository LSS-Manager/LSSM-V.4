import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = (settingId: string) => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (window.location.pathname === '/' && (await getSetting('navbar'))) {
        document
            .querySelector('#navbar-main-collapse > ul')
            ?.insertAdjacentHTML(
                'beforeend',
                `<li><a class="lightbox-open" href="/profile/${window.user_id}">${window.user_id}</a></li>`
            );
    }
    const addProfileId = (redesign = false) => {
        const h1 = document.querySelector(
            `h1${redesign ? '.redesign-profile-title' : ''}`
        );
        if (h1) {
            const smallId = LSSM.$store.getters.nodeAttribute(
                'userid-profile',
                true
            );
            const small = h1.querySelector<HTMLElement>(`small#${smallId}`);
            const content = `(${
                redesign
                    ? h1.getAttribute('id')
                    : window.location.pathname.replace(/\D+/g, '')
            })`;
            if (small) small.textContent = content;
            else
                h1.innerHTML += `&nbsp;<small id="${smallId}">${content}</small>`;
        }
    };
    LSSM.$store
        .dispatch('event/addListener', {
            name: 'redesign-finished-loading',
            listener(e: CustomEvent) {
                if (e.detail.type === 'profile') addProfileId(true);
            },
        })
        .then();
    if (window.location.pathname.match(/\/profile\/\d+/)) addProfileId();
}) as ModuleMainFunction;
