import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    Brannstasjon: [
        {
            caption: 'CBRNe-enhet',
            duration: '3 dager',
            staffList: 'CBRNe-enhet',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Skadestedsledelse',
            duration: '5 dager',
            staffList: 'Skadestedsledelse',
            key: 'elw2',
        },
        {
            caption: 'ARFF-Training',
            duration: '3 dager',
            staffList: 'ARFF-Training',
            key: 'arff',
        },
        {
            caption: 'Sjønavigering',
            duration: '5 dager',
            staffList: 'Sjønavigering',
            key: 'ocean_navigation',
        },
        {
            caption: 'Redningsdykker kurs',
            duration: '4 dager',
            staffList: 'Redningsdykker kurs',
            key: 'gw_taucher',
        },
        {
            caption: 'Skogbrann helikopterutdanning',
            duration: '5 dager',
            staffList: 'Skogbrann helikopterutdanning',
            key: 'airborne_firefighting',
        },
        {
            caption: 'ATV',
            duration: '3 dager',
            staffList: 'ATV',
            key: 'atv',
        },
    ],
    Politi: [
        {
            caption: 'Politihelikopterflyvning',
            duration: '7 dager',
            staffList: 'Politihelikopterflyvning',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Våpentrening',
            duration: '5 dager',
            staffList: 'Våpentrening',
            key: 'swat',
        },
        {
            caption: 'Hundepatrulje',
            duration: '5 dager',
            staffList: 'Hundepatrulje',
            key: 'k9',
        },
        {
            caption: 'Politimotorsykkel',
            duration: '3 dager',
            staffList: 'Politimotorsykkel',
            key: 'police_motorcycle',
        },
        {
            caption: 'Utrykningspoliti',
            duration: '3 dager',
            staffList: 'Utrykningspoliti',
            key: 'traffic_police',
        },
        {
            caption: 'Demonstrasjon',
            duration: '2 dager',
            staffList: 'Demonstrasjon',
            key: 'riot_police',
        },
        {
            caption: 'Ridekurs',
            duration: '4 dager',
            staffList: 'Ridekurs',
            key: 'police_horse',
        },
        {
            caption: 'Demonstrasjonstrent',
            staffList: 'Demonstrasjonstrent',
            duration: '7 dager',
            key: 'riot_police_command',
        },
        {
            caption: 'Droneoperatør',
            staffList: 'Droneoperatør',
            duration: '4 dager',
            key: 'fbi_drone_operator',
        },
        {
            caption: 'Innsatsledelse',
            staffList: 'Innsatsledelse',
            duration: '5 dager',
            key: 'police_service_group_leader',
        },
    ],
    Redning: [
        {
            caption: 'Intensivbehandling',
            duration: '5 dager',
            staffList: 'Intensivbehandling',
            key: 'critical_care',
        },
        {
            caption: 'Ambulansemotorsykkel',
            duration: '3 dager',
            staffList: 'Ambulansemotorsykkel',
            key: 'rapid_response_motorcycle',
        },
    ],
} satisfies SchoolingsBySchool;
