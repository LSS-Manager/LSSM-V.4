import missionHelper from './missionHelper.vue';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            'title': {
                type: 'toggle',
                default: true,
            },
            'id': {
                type: 'toggle',
                default: false,
            },
            'type': {
                type: 'toggle',
                default: false,
            },
            'prerequisites': {
                type: 'toggle',
                default: false,
            },
            'place': {
                type: 'toggle',
                default: true,
            },
            'vehicles.title': {
                type: 'toggle',
                default: true,
            },
            'vehicles.content': {
                type: 'toggle',
                default: true,
            },
            'vehicles.sort': {
                type: 'select',
                values: ['caption', 'amount', 'percentage'],
                default: 'caption',
            },
            'vehicles.patient_additionals': {
                type: 'toggle',
                default: true,
            },
            'chances.normal': {
                type: 'toggle',
                default: true,
            },
            'chances.100': {
                type: 'toggle',
                default: false,
            },
            'multifunctionals.heavy_rescue_vehicles': {
                type: 'toggle',
                default: false,
            },
            'multifunctionals.battalion_chief_vehicles': {
                type: 'toggle',
                default: false,
            },
            'multifunctionals.platform_trucks': {
                type: 'toggle',
                default: false,
            },
            'optioinalAlternatives.allow_rw_instead_of_lf': {
                type: 'toggle',
                default: false,
            },
            'patients.title': {
                type: 'toggle',
                default: true,
            },
            'patients.content': {
                type: 'toggle',
                default: true,
            },
            'patients.live': {
                type: 'toggle',
                default: true,
            },
            'patients.hideWhenNoNeed': {
                type: 'toggle',
                default: false,
            },
            'prisoners.title': {
                type: 'toggle',
                default: true,
            },
            'prisoners.content': {
                type: 'toggle',
                default: true,
            },
            'prisoners.live': {
                type: 'toggle',
                default: true,
            },
            'generatedBy': {
                type: 'toggle',
                default: false,
            },
            'credits': {
                type: 'toggle',
                default: true,
            },
            'expansaions': {
                type: 'toggle',
                default: true,
            },
            'followup': {
                type: 'toggle',
                default: true,
            },
        },
    });

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
})(window[PREFIX] as Vue);
