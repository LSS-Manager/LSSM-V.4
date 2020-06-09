import moment from 'moment';
import { IndexedExtendedWindow } from '../../../typings/helpers';

((LSSM: Vue) => {
    LSSM.$store
        .dispatch('settings/register', {
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
        })
        .then(async () => {
            const getSetting = (settingId: string) =>
                LSSM.$store.dispatch('settings/getSetting', {
                    moduleId: MODULE_ID,
                    settingId,
                });
            const className = LSSM.$store.getters.nodeAttribute('clock');

            moment.locale(BUILD_LANG);

            if (await getSetting('displayNav'))
                document
                    .querySelector('.navbar-header')
                    ?.insertAdjacentHTML(
                        'beforeend',
                        `<a class="${className} navbar-brand" format="${await getSetting(
                            'navFormat'
                        )}"></a>`
                    );

            const clocks = document.querySelectorAll(`.${className}`);
            setInterval(() => {
                clocks.forEach(clock => {
                    clock.textContent = moment().format(
                        clock.getAttribute('format')?.toString()
                    );
                });
            }, 1000);
        });
})(((window as unknown) as IndexedExtendedWindow)[PREFIX]);
