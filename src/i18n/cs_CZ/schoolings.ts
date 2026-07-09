import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Hasiči': [
        {
            caption: 'Školení Nebezpečné Látky',
            duration: '3 dny',
            staffList: 'Nebezpečné látky',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Školení MOS',
            duration: '5 dní',
            staffList: 'mobilní operační středisko',
            key: 'elw2',
        },
        {
            caption: 'Školení letištních hasičů',
            duration: '5 dní',
            staffList: 'Letištní hasič',
            key: 'arff',
        },
        {
            caption: 'Školení Záchrany z vody',
            duration: '3 dny',
            staffList: 'Záchrana z vody',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Školení Potápěče',
            duration: '5 dní',
            staffList: 'Potápěč',
            key: 'gw_taucher',
        },
        {
            caption: 'Kurz jeřábníka',
            duration: '4 dny',
            staffList: 'Jeřábník',
            key: 'fwk',
        },
        {
            caption: 'Školení na obsluhu záchranných evakuačních schodů',
            duration: '7 dní',
            staffList: 'Obsluhu záchranných evakuačních schodů',
            key: 'rettungstreppe',
        },
        {
            caption: 'Kurz Obsluhy nosiče kontejnerů',
            duration: '3 dny',
            staffList: 'Obsluha nosiče kontejnerů',
            key: 'pod_tractive',
        },
    ],
    'Policie': [
        {
            caption: 'Kurz Letecké služby PČR',
            duration: '7 dní',
            staffList: 'Pilot Letecké služby PČR',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Kurz URNA',
            duration: '5 dní',
            staffList: 'URNA',
            key: 'swat',
        },
        {
            caption: 'Kurz Kynologové Policie',
            duration: '5 dní',
            staffList: 'Kynolog Policie',
            key: 'k9',
        },
        {
            caption: 'Kurz Policejní motocykl',
            duration: '3 dny',
            staffList: 'Policejní motocykl',
            key: 'police_motorcycle',
        },
        {
            caption: 'Kurz Policejního pyrotechnika',
            duration: '3 dny',
            staffList: 'Policejní pyrotechnik',
            key: 'fbi_bomb_tech',
        },
        {
            caption: 'Kurz Vyšetřovatele DN',
            duration: '3 dny',
            staffList: 'Vyšetřovatel DN',
            key: 'traffic_police',
        },
        {
            caption: 'Školení velitele složky PČR',
            duration: '7 dní',
            staffList: 'Velitel složky PČR',
            key: 'riot_police_command',
        },
        {
            caption: 'Školení Jezdece na koni',
            duration: '4 dny',
            staffList: 'Jezdec na koni',
            key: 'police_horse',
        },
        {
            caption: 'Školení pořádkové policie',
            duration: '2 dny',
            staffList: 'Pořádková policie',
            key: 'riot_police',
        },
    ],
    'Záchranáři': [
        {
            caption: 'Školení inspektora provozu',
            duration: '3 dny',
            staffList: 'Inspektor provozu',
            key: 'orgl',
        },
        {
            caption: 'Školení lékaře',
            duration: '5 dní',
            staffList: 'Lékař',
            key: 'critical_care',
        },
    ],
    'VZS ČČK': [
        {
            caption: 'Školení Vodní záchranné služby',
            duration: '3 dny',
            staffList: 'Personál vodní záchranné služby',
            key: 'water_rescue_service',
        },
    ],
} satisfies SchoolingsBySchool;
