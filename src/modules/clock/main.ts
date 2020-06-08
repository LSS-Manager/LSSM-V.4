// import moment from 'moment';
import { IndexedExtendedWindow } from '../../../typings/helpers';

(async (LSSM: Vue) => {
    // LSSM.$store.dispatch('settings/register', {
    //     moduleId: MODULE_ID,
    // });
    await LSSM.$store.dispatch('storage/set', {
        key: 'test',
        value: MODULE_ID,
    });
})(((window as unknown) as IndexedExtendedWindow)[PREFIX]);
// window.lssmv4.$store.dispatch('settings/register', {
//     moduleId: MODULE_ID,
//     settings: {
//         displayNav: {
//             type: 'toggle',
//             default: true,
//         },
//         navFormat: {
//             type: 'text',
//             default: 'LTS',
//         },
//     },
// });
//
// (async () => {
//     const getSetting = settingId => {
//         return window.lssmv4.$store.dispatch('settings/getSetting', {
//             moduleId: MODULE_ID,
//             settingId,
//         });
//     };
//     const className = window.lssmv4.$store.getters.nodeId('clock');
//
//     if (await getSetting('displayNav')) {
//         document
//             .querySelector('.navbar-header')
//             .insertAdjacentHTML(
//                 'beforeend',
//                 `<a class="${className} navbar-brand" format="${await getSetting(
//                     'navFormat'
//                 )}"></a>`
//             );
//     }
//
//     moment.locale(BUILD_LANG);
//
//     let clocks = document.querySelectorAll(`.${className}`);
//     setInterval(() => {
//         clocks.forEach(clock => {
//             clock.textContent = moment().format(clock.getAttribute('format'));
//         });
//     }, 1000);
// })();
