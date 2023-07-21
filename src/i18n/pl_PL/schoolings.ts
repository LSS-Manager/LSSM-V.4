import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    ['Posterunek straży pożarnej']: [
        {
            caption: 'Ratownictwo chemiczne',
            staffList: 'Ratownictwo chemiczne',
            duration: '3 Dni',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Szkolenie w dowodzeniu',
            staffList: 'Szkolenie w dowodzeniu',
            duration: '5 Dni',
            key: 'elw2',
        },
        {
            caption: 'Szkolenie SP LSP',
            staffList: 'Szkolenie SP LSP',
            duration: '3 Dni',
            key: 'arff',
        },
        {
            caption: 'Szybkie ratownictwo wodne',
            staffList: 'Szybkie ratownictwo wodne',
            duration: '4 Dni',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Kurs Nurka MSWiA',
            staffList: 'Kurs Nurka MSWiA',
            duration: '5 Dni',
            key: 'gw_taucher',
        },
        {
            caption: 'Nawigacja oceaniczna',
            staffList: 'Nawigacja oceaniczna',
            duration: '5 Dni',
            key: 'ocean_navigation',
        },
        {
            caption: 'Ratownictwo wysokościowe',
            staffList: 'Ratownictwo wysokościowe',
            duration: '5 Dni',
            key: 'gw_hoehenrettung',
        },
        {
            caption: 'Lekarz',
            staffList: 'Lekarz',
            duration: '3 Dni',
            key: 'critical_care',
        },
        {
            caption: 'Ratownictwo poszukiwawczo - ratownicze',
            staffList: 'Ratownictwo poszukiwawczo - ratownicze',
            duration: '3 Dni',
            key: 'search_and_rescue',
        },
        {
            caption: 'Przewodnik psa ratowniczego',
            staffList: 'Przewodnik psa ratowniczego',
            duration: '5 Dni',
            key: 'rescue_dogs',
        },
    ],
    Policja: [
        {
            caption: 'Lotnictwo policyjne',
            staffList: 'Lotnictwo policyjne',
            duration: '7 Dni',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'SPKP',
            staffList: 'SPKP',
            duration: '5 Dni',
            key: 'swat',
        },
        {
            caption: 'K-9',
            staffList: 'K-9',
            duration: '5 Dni',
            key: 'k9',
        },
        {
            caption: 'Motocykl Policyjny',
            staffList: 'Motocykl Policyjny',
            duration: '3 Dni',
            key: 'police_motorcycle',
        },
        {
            caption: 'Szkolenie WRD',
            staffList: 'Szkolenie WRD',
            duration: '3 Dni',
            key: 'traffic_police',
        },
        {
            caption: 'Szkolenie OPP',
            staffList: 'Szkolenie OPP',
            duration: '2 Dni',
            key: 'riot_police',
        },
        {
            caption: 'Policyjny ratownik medyczny',
            staffList: 'Policyjny ratownik medyczny',
            duration: '5 Dni',
            key: 'riot_police_ambulance',
        },
        {
            caption: 'Szkolenie policyjnego dowódcy',
            staffList: 'Szkolenie policyjnego dowódcy',
            duration: '7 Dni',
            key: 'police_service_group_leader',
        },
    ],
    Ratownictwo: [
        {
            caption: 'Szybkie ratownictwo wodne',
            staffList: 'Szybkie ratownictwo wodne',
            duration: '4 Dni',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Kurs Nurka MSWiA',
            staffList: 'Kurs Nurka MSWiA',
            duration: '5 Dni',
            key: 'gw_taucher',
        },
        {
            caption: 'Lekarz',
            staffList: 'Lekarz',
            duration: '3 Dni',
            key: 'critical_care',
        },
        {
            caption: 'Motoambulans',
            staffList: 'Motoambulans',
            duration: '2 Dni',
            key: 'rapid_response_motorcycle',
        },
    ],
} satisfies SchoolingsBySchool;
