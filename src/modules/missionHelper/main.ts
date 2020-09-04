import missionHelper from './missionHelper.vue';
import { ModuleMainFunction } from 'typings/Module';

export default (async LSSM => {
    if (
        !window.location.href.match(/\/missions\/\d+/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const clear = document.createElement('div');
    clear.classList.add('clearfix');
    const missionForm = document.getElementById('mission-form');
    missionForm?.insertBefore(clear, missionForm.childNodes[0]);

    new LSSM.$vue({
        store: LSSM.$store,
        i18n: LSSM.$i18n,
        render: h => h(missionHelper),
    }).$mount(clear);
}) as ModuleMainFunction;
