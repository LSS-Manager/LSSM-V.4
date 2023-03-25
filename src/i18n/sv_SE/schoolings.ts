import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    Brandstation: [
        {
            caption: 'Farligt gods',
            duration: '3 dagar',
            staffList: 'Farligt gods',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Mobil ledning',
            duration: '5 dagar',
            staffList: 'Mobilt ledningsvehicle',
            key: 'elw2',
        },
        {
            caption: 'Flygbrandsträning',
            staffList: 'Flygbrandsträning',
            duration: '3 dagar',
            key: 'arff',
        },
        {
            caption: 'Livräddning',
            duration: '3 dagar',
            staffList: 'Livräddning',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Havsnavigering',
            staffList: 'Havsnavigering',
            duration: '5 dagar',
            key: 'ocean_navigation',
        },
        {
            caption: 'Dykarutbildning',
            duration: '5 dagar',
            staffList: 'Dykarutbildning',
            key: 'gw_taucher',
        },
        {
            caption: 'Luftburen brandbekämparutbildning',
            duration: '5 dagar',
            staffList: 'Luftburen brandbekämparutbildning',
            key: 'airborne_firefighting',
        },
        {
            caption: 'Insatsutbildning',
            duration: '3 dagar',
            staffList: 'Insatsutbildning',
            key: 'coresponder',
        },
        {
            caption: 'Intensivvårdsutbildning',
            duration: '5 dagar',
            staffList: 'Intensivvårdsutbildning',
            key: 'critical_care',
        },
        {
            caption: 'MC-Ambulans',
            duration: '3 dagar',
            staffList: 'MC-Ambulans',
            key: 'rapid_response_motorcycle',
        },
    ],
    Polis: [
        {
            caption: 'Polishelikopterpilotutbildning',
            duration: '7 dagar',
            staffList: 'Polishelikopterpilotutbildning',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Insatspolisutbildning',
            duration: '5 dagar',
            staffList: 'Insatspolisutbildning',
            key: 'swat',
        },
        {
            caption: 'Hundförarutbildning',
            duration: '5 dagar',
            staffList: 'Hundförarutbildning',
            key: 'k9',
        },
        {
            caption: 'MC-Polisutbildning',
            duration: '3 dagar',
            staffList: 'Polismotorcykel',
            key: 'police_motorcycle',
        },
        {
            caption: 'Rytteriutbildning',
            duration: '3 dagar',
            staffList: 'Rytteriutbildning',
            key: 'police_horse',
        },
        {
            caption: 'Trafikpolisutbildning',
            duration: '5 dagar',
            staffList: 'Trafikpolisutbildning',
            key: 'traffic_police',
        },
        {
            caption: 'Bombskyddsutbildning',
            duration: '5 dagar',
            staffList: 'Bombskyddsutbildning',
            key: 'fbi_bomb_tech',
        },
        {
            caption: 'Utbildning till yttrebefäl',
            duration: '5 dagar',
            staffList: 'Utbildning till yttrebefäl',
            key: 'police_service_group_leader',
        },
    ],
    ['Rädda']: [
        {
            caption: 'Intensivvårdsutbildning',
            duration: '5 dagar',
            staffList: 'Intensivvårdsutbildning',
            key: 'critical_care',
        },
        {
            caption: 'MC-Ambulans',
            duration: '3 dagar',
            staffList: 'MC-Ambulans',
            key: 'rapid_response_motorcycle',
        },
    ],
    ['Vattenräddning']: [
        {
            caption: 'Utbildning av livräddare',
            staffList: 'Utbildning av livräddare',
            duration: '5 dagar',
            key: 'coastal_rescue',
        },
        {
            caption: 'Utbildning av Kustflygs',
            staffList: 'Utbildning av Kustflygs',
            duration: '5 dagar',
            key: 'coastal_rescue_pilot',
        },
        {
            caption: 'Utbildning av systemoperatörer',
            staffList: 'Utbildning av systemoperatörer',
            duration: '5 dagar',
            key: 'heavy_machinery',
        },
        {
            caption: 'Havsnavigering',
            staffList: 'Havsnavigering',
            duration: '5 dagar',
            key: 'ocean_navigation',
        },
    ],
} satisfies SchoolingsBySchool;
