import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Caserma dei vigili del fuoco': [
        {
            caption: 'N.B.C.R.',
            duration: '3 giorni',
            staffList: 'N.B.C.R.',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Corso per funzionario (UCL)',
            duration: '5 giorni',
            staffList: 'Comando mobile',
            key: 'elw2',
        },
        {
            caption: 'Servizio antincendio aeroportuale in addestramento',
            duration: '3 giorni',
            staffList: 'Servizio antincendio aeroportuale in addestramento',
            key: 'arff',
        },
        {
            caption: 'Corso per operatore tecnico SAF',
            duration: '3 giorni',
            staffList: 'Corso per operatore tecnico SAF',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Navigazione in oceano',
            duration: '5 giorni',
            staffList: 'Navigazione in oceano',
            key: 'ocean_navigation',
        },
        {
            caption: 'Corso autista di Autogrù',
            duration: '3 giorni',
            staffList: 'Autogrù',
            key: 'fwk',
        },
        {
            caption: 'Corso medico di emergenza',
            duration: '7 giorni',
            staffList: 'Medico di emergenza',
            key: 'notarzt',
        },
        {
            caption: 'Corso per operatore tecnico NSSA',
            duration: '5 giorni',
            staffList: 'Corso per operatore tecnico NSSA',
            key: 'gw_taucher',
        },
        {
            caption: 'Autista Movimento Terra',
            duration: '3 giorni',
            staffList: 'Autista Movimento Terra',
            key: 'heavy_machinery',
        },
        {
            caption: 'Pilota Velivoli Antincendio',
            duration: '5 giorni',
            staffList: 'Pilota Velivoli Antincendio',
            key: 'airborne_firefighting',
        },
        {
            caption: 'Direttore Operazioni Spegnimento',
            duration: '3 giorni',
            staffList: 'Direttore Operazioni Spegnimento',
            key: 'elw3',
        },
        {
            caption: 'Autista Mezzi Pesanti',
            duration: '2 giorni',
            staffList: 'Autista Mezzi Pesanti',
            key: 'truck_drivers_license',
        },
        {
            caption: 'Corso Operatore MaxiEmergenze',
            duration: '5 giorni',
            staffList: 'Operatore MaxiEmergenze',
            key: 'mass_casualty',
        },
    ],
    'Polizia': [
        {
            caption: 'Reparto volo della polizia',
            duration: '7 giorni',
            staffList: 'Reparto volo della polizia',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Specializzazione antisommossa/UOPI',
            duration: '5 giorni',
            staffList: 'Specializzazione antisommossa/UOPI',
            key: 'swat',
        },
        {
            caption: 'Specializzazione unità cinofila',
            duration: '5 giorni',
            staffList: 'Specializzazione unità cinofila',
            key: 'k9',
        },
        {
            caption: 'Specializzazione motociclista',
            duration: '3 giorni',
            staffList: 'Specializzazione motociclista',
            key: 'police_motorcycle',
        },
        {
            caption: 'Corso Artificieri',
            duration: '3 giorni',
            staffList: 'Corso Artificieri',
            key: 'fbi_bomb_tech',
        },
        {
            caption: 'Operatore Idrante Antisommossa',
            duration: '3 giorni',
            staffList: 'Operatore Idrante Antisommossa',
            key: 'police_wasserwerfer',
        },
    ],
    'Soccorso': [
        {
            caption: 'Corso medico di emergenza',
            duration: '7 giorni',
            staffList: 'Medico di emergenza',
            key: 'notarzt',
        },
        {
            caption: 'Corso Operatore MaxiEmergenze',
            duration: '5 giorni',
            staffList: 'Operatore MaxiEmergenze',
            key: 'mass_casualty',
        },
    ],
    'Caserma soccorso acquatico VVF': [
        {
            caption: 'Pilota Guardia Costiera',
            duration: '5 giorni',
            staffList: 'Pilota Guardia Costiera',
            key: 'coastal_rescue_pilot',
        },
        {
            caption: 'Polizia Marittima',
            duration: '3 giorni',
            staffList: 'Polizia Marittima',
            key: 'law_enforcement_marine',
        },
        {
            caption: 'Navigazione in Oceano',
            duration: '5 giorni',
            staffList: 'Navigazione in Oceano',
            key: 'ocean_navigation',
        },
    ],
} satisfies SchoolingsBySchool;
