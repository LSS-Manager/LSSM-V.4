import App from './LSSMV4.vue';
import VueJSModal from 'vue-js-modal';

if (window.location.href !== 'about:blank')
    throw 'LSSM Cannot be executed here!';

let lssm = document.createElement('div');
document.querySelector('body').appendChild(lssm);

window.lssmv4_clone = window.lssmv4;

window.lssmv4_clone.Vue.use(VueJSModal, {
    dynamic: true,
    dynamicDefaults: {
        adaptive: true,
        scrollable: true,
        clickToClose: true,
    },
    dialog: true,
    injectModalsContainer: true,
});

window.lssmv4_local = new window.lssmv4_clone.Vue({
    store: window.lssmv4_clone.$store,
    i18n: window.lssmv4_clone.$i18n,
    render: h => h(App),
}).$mount(lssm);

VueJSModal.rootInstance = window.lssmv4_local;
