import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    Brandweer: [
        {
            caption: 'Verkenningseenheid Brandweer',
            duration: '3 Dagen',
            staffList: 'VEB',
            key: 'gw_messtechnik',
        },
        {
            caption: 'Hoofd Officier van Dienst - Brandweer',
            duration: '7 Dagen',
            staffList: 'HOvD-B',
            key: 'elw2',
        },
        {
            caption: 'Adviseur Gevaarlijke Stoffen',
            duration: '6 Dagen',
            staffList: 'AGS',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Brandweerchauffeur-zwaar',
            duration: '2 Dagen',
            staffList: 'Brandweerchauffeur-zwaar',
            key: 'wechsellader',
        },
        {
            caption: 'Duiker/Duikploegleider',
            duration: '7 Dagen',
            staffList: 'Duiker/Duikploegleider',
            key: 'gw_taucher',
        },
        {
            caption: 'Vliegtuigbrandbestrijding',
            duration: '7 Dagen',
            staffList: 'Vliegtuigbrandbestrijding',
            key: 'arff',
        },
        {
            caption: 'Airport Fire Officer / On Scene Commander',
            duration: '7 Dagen',
            staffList: 'Airport Fire Officer / On Scene Commander',
            key: 'elw_airport',
        },
        {
            caption: 'Oppervlakteredder',
            duration: '7 Dagen',
            staffList: 'Oppervlakteredder',
            key: 'oppervlakteredder',
        },
        {
            caption: 'Voorlichter',
            duration: '5 Dagen',
            staffList: 'Voorlichter',
            key: 'spokesman',
        },
        {
            caption: 'Waterredding',
            duration: '3 Dagen',
            staffList: 'Waterredding',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Weginspecteur',
            duration: '3 Dagen',
            staffList: 'Weginspecteur',
            key: 'technical_aid',
        },
    ],
    Politie: [
        {
            caption: 'Politiehelikopter',
            duration: '7 Dagen',
            staffList: 'Politiehelikopter',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Officier van Dienst - Politie',
            duration: '7 Dagen',
            staffList: 'Officier van Dienst - Politie',
            key: 'ovd_p',
        },
        {
            caption: 'Mobiele Eenheid',
            duration: '4 Dagen',
            staffList: 'Mobiele Eenheid',
            key: 'police_mobiele_eenheid',
        },
        {
            caption: 'Hondengeleider',
            duration: '7 Dagen',
            staffList: 'Hondengeleider',
            key: 'hondengeleider',
        },
        {
            caption: 'Operator AT',
            duration: '10 Dagen',
            staffList: 'Operator AT',
            key: 'operator_at',
        },
        {
            caption: 'Biketeam',
            duration: '3 Dagen',
            staffList: 'Biketeam',
            key: 'bike_police',
        },
        {
            caption: 'ME - Aanhoudingseenheid',
            duration: '5 Dagen',
            staffList: 'AE-er',
            key: 'detention_unit',
        },
        {
            caption: 'Bereden Brigade',
            duration: '4 Dagen',
            staffList: 'Bereden Brigade',
            key: 'police_horse',
        },
        {
            caption: 'ME - Waterwerper',
            duration: '5 Dagen',
            staffList: 'Waterwerper',
            key: 'police_wasserwerfer',
        },
    ],
    Ambulance: [
        {
            caption: 'MMT-Bemanningslid',
            duration: '7 Dagen',
            staffList: 'MMT-Bemanningslid',
            key: 'notarzt',
        },
        {
            caption: 'Officier van Dienst Geneeskunde',
            duration: '10 Dagen',
            staffList: 'Officier van Dienst Geneeskunde',
            key: 'orgl',
        },
    ],
    Waterredding: [
        {
            caption: 'SAR Helicopter',
            duration: '7 Dagen',
            staffList: 'SAR Piloot',
            key: 'coastal_rescue_pilot',
        },
        {
            caption: 'Water handhaving',
            duration: '5 Dagen',
            staffList: 'Waterhandhaving',
            key: 'law_enforcement_marine',
        },
        {
            caption: 'Groot vaarbewijs',
            duration: '7 Dagen',
            staffList: 'Kapitein',
            key: 'ocean_navigation',
        },
        {
            caption: 'Waterredding',
            duration: '3 Dagen',
            staffList: 'Waterredder',
            key: 'gw_wasserrettung',
        },
    ],
} satisfies SchoolingsBySchool;
