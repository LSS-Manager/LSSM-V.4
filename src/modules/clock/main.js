import moment from 'moment';

window.lssmv4.$store.dispatch('settings/register', {
    moduleId: MODULE_ID,
    settings: {
        displayNav: {
            type: 'toggle',
            default: true,
        },
        navFormat: {
            type: 'text',
            default: 'LTS',
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
    const className = window.lssmv4.$store.getters.nodeId('clock');

    if (await getSetting('displayNav')) {
        document
            .querySelector('.navbar-header')
            .insertAdjacentHTML(
                'beforeend',
                `<a class="${className} navbar-brand" format="${await getSetting(
                    'navFormat'
                )}"></a>`
            );
    }

    moment.locale(window.I18n.locale);

    let clocks = document.querySelectorAll(`.${className}`);
    setInterval(() => {
        clocks.forEach(clock => {
            clock.textContent = moment().format(clock.getAttribute('format'));
        });
    }, 1000);
})();
