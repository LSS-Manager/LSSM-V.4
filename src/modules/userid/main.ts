import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, getSetting }) => {
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
            const smallId = LSSM.$stores.root.nodeAttribute(
                'userid-profile',
                true
            );
            const small = h1.querySelector<HTMLElement>(`small#${smallId}`);
            const content = `(${
                redesign
                    ? h1.getAttribute('id')
                    : window.location.pathname.replace(/\D+/gu, '')
            })`;
            if (small) {
                small.textContent = content;
            } else {
                h1.innerHTML += `${
                    redesign ? '' : '&nbsp;'
                }<small id="${smallId}">${content}</small>`;
            }
        }
    };
    LSSM.$stores.event.addListener({
        name: 'redesign-finished-loading',
        listener(e: CustomEvent) {
            if (e.detail.type === 'profile') addProfileId(true);
        },
    });
    if (/\/profile\/\d+/u.test(window.location.pathname)) addProfileId();
}) as ModuleMainFunction;
