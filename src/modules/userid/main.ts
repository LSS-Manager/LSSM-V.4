import {
    ExtendedWindow,
    IndexedExtendedWindow,
} from '../../../typings/helpers';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            navbar: {
                type: 'toggle',
                default: false,
            },
        },
    });

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
                `<li><a class="lightbox-open" href="/profile/${
                    ((window as unknown) as ExtendedWindow).user_id
                }">${((window as unknown) as ExtendedWindow).user_id}</a></li>`
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
})(((window as unknown) as IndexedExtendedWindow)[PREFIX]);
