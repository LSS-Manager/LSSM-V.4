window.lssmv4.$store.dispatch('settings/register', {
    moduleId: MODULE_ID,
    settings: {
        navbar: {
            type: 'toggle',
            default: false,
        },
    },
});

(async () => {
    const getSetting = settingId => {
        return window.lssmv4.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (window.location.pathname === '/' && (await getSetting('navbar'))) {
        document
            .querySelector('#navbar-main-collapse > ul')
            .insertAdjacentHTML(
                'beforeend',
                `<li><a class="lightbox-open" href="/profile/${window.user_id}">${window.user_id}</a></li>`
            );
    }
    if (window.location.pathname.match(/\/profile\/\d+/)) {
        document.querySelector(
            'h1'
        ).innerHTML += `&nbsp;<small>(${window.location.pathname.replace(
            /\D+/g,
            ''
        )})</small>`;
    }
})();
