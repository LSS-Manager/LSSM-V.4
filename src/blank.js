import App from './LSSMV4.vue';

if (window.location.href !== 'about:blank')
    throw 'LSSM Cannot be executed here!';

let lssm = document.createElement('div');
document.querySelector('body').appendChild(lssm);

window.lssmv4_local = new window.lssmv4.Vue({
    store: window.lssmv4.$store,
    i18n: window.lssmv4.$i18n,
    render: h => h(App),
}).$mount(lssm);
