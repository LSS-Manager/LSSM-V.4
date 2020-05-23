import missionHelper from './missionHelper.vue';

(async () => {
    if (
        !window.location.href.match(/\/missions\/\d+/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const clear = document.createElement('div');
    clear.classList.add('clearfix');
    const missionForm = document.getElementById('mission-form');
    missionForm.insertBefore(clear, missionForm.childNodes[0]);

    new window.lssmv4.Vue({
        store: window.lssmv4.$store,
        i18n: window.lssmv4.$i18n,
        render: h => h(missionHelper),
    }).$mount(clear);
})();
