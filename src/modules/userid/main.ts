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
    if (window.location.pathname.match(/\/profile\/\d+/)) {
        const h1 = document.querySelector('h1');
        if (h1)
            h1.innerHTML += `&nbsp;<small>(${window.location.pathname.replace(
                /\D+/g,
                ''
            )})</small>`;
    }
}) as ModuleMainFunction;
