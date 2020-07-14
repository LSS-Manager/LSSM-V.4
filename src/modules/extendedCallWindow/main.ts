import generationDate from './assets/generationDate';
import enhancedMissingVehicles from './assets/enhancedMissingVehicles';
import patientSummary from './assets/patientSummary';
import arrCounter from './assets/arrCounter';
import arrMatchHighlight from './assets/arrMatchHighlight';
import alarmTime from './assets/alarmTime';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            generationDate: {
                type: 'toggle',
                default: true,
            },
            enhancedMissingVehicles: {
                type: 'toggle',
                default: false,
            },
            patientSummary: {
                type: 'toggle',
                default: true,
            },
            arrCounter: {
                type: 'toggle',
                default: false,
            },
            arrClickHighlight: {
                type: 'toggle',
                default: false,
            },
            arrClickHighlightColor: {
                type: 'color',
                default: '#008000',
                dependsOn: '.arrClickHighlight',
            },
            arrClickHighlightWidth: {
                type: 'number',
                default: 2,
                dependsOn: '.arrClickHighlight',
            },
            arrCounterResetSelection: {
                type: 'toggle',
                default: false,
            },
            arrMatchHighlight: {
                type: 'toggle',
                default: false,
            },
            alarmTime: {
                type: 'toggle',
                default: false,
            },
        },
    });

    if (
        !window.location.pathname.match(/^\/missions\/\d+$/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    await LSSM.$store.dispatch('addStyle', {
        selectorText: '.vehicle_prisoner_select a.btn-danger',
        style: {
            'pointer-events': 'none',
            'opacity': '0.65',
        },
    });

    if (await getSetting('generationDate')) generationDate(LSSM);
    if (await getSetting('enhancedMissingVehicles'))
        enhancedMissingVehicles(LSSM);
    if (await getSetting('patientSummary')) patientSummary(LSSM);
    if (
        (await getSetting('arrCounter')) ||
        (await getSetting('arrClickHighlight')) ||
        (await getSetting('arrCounterResetSelection'))
    )
        await arrCounter(LSSM, getSetting);
    if (await getSetting('arrMatchHighlight')) arrMatchHighlight(LSSM);
    if (await getSetting('alarmTime')) alarmTime(LSSM);
})(window[PREFIX] as Vue);
