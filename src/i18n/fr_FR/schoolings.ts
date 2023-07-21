import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Centre de secours': [
        {
            caption: 'Véhicules risques chimiques',
            duration: '3 jours',
            staffList: 'Véhicules risques chimiques',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Commandement mobile',
            duration: '5 jours',
            staffList: 'VPC',
            key: 'elw2',
        },
        {
            caption: 'SSLIA',
            duration: '3 jours',
            staffList: 'Formation SSLIA',
            key: 'arff',
        },
        {
            caption: 'SAV (Sauvetage Aquatique)',
            duration: '3 jours',
            staffList: 'SAV (Sauvetage Aquatique)',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Certificat de surveillance et sauvetage aquatique',
            duration: '5 jours',
            staffList: 'Navigation maritime',
            key: 'ocean_navigation',
        },
        {
            caption: 'IMP (Intervention en Milieu Périlleux)',
            duration: '4 jours',
            staffList: 'Spécialiste IMP',
            key: 'gw_hoehenrettung',
        },
        {
            caption: 'PLG (Plongeur)',
            duration: '5 jours',
            staffList: 'PLG (Plongeur)',
            key: 'gw_taucher',
        },
        {
            caption: 'Médecin',
            duration: '5 jours',
            staffList: 'Médecin urgentiste',
            key: 'critical_care',
        },
    ],
    'Secours': [
        {
            caption: 'DSM',
            duration: '7 jours',
            staffList: 'Directeur des Secours Médicaux',
            key: 'orgl',
        },
        {
            caption: 'Médecin',
            duration: '5 jours',
            staffList: 'Médecin urgentiste',
            key: 'critical_care',
        },
    ],
    'Poste de police': [
        {
            caption: 'Licence de Pilote',
            duration: '7 jours',
            staffList: 'Aviation policière',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Maître chien',
            duration: '5 jours',
            staffList: 'Brigade canine',
            key: 'k9',
        },
        {
            caption: 'Formation Motocycliste',
            duration: '3 jours',
            staffList: 'Policier motocycliste',
            key: 'police_motorcycle',
        },
        {
            caption: 'Commandement Mobile',
            duration: '7 jours',
            staffList: 'Commandement Mobile',
            key: 'riot_police',
        },
        {
            caption: "Lanceur d'eau",
            duration: '7 jours',
            staffList: 'Opérateur ELE',
            key: 'police_wasserwerfer',
        },
        {
            caption: 'Armurier',
            duration: '7 jours',
            staffList: 'Armurier',
            key: 'riot_police_equipment',
        },
    ],
    'Secours nautique': [
        {
            caption: "Formation Pilote d'Intervention",
            duration: '5 jours',
            staffList: "Pilote d'hélicoptère",
            key: 'intervention_pilot',
        },
        {
            caption: 'BNSSA',
            duration: '5 jours',
            staffList: 'Sauveteur aquatique',
            key: 'coastal_rescue',
        },
        {
            caption: 'Accréditation nautique',
            duration: '3 jours',
            staffList: 'Gendarme Maritime',
            key: 'law_enforcement_marine',
        },
        {
            caption: 'Certificat de surveillance et sauvetage aquatique',
            duration: '5 jours',
            staffList: 'Sauveteur en Mer',
            key: 'ocean_navigation',
        },
        {
            caption: 'Formation de mécanicien',
            duration: '5 jours',
            staffList: 'Formation de mécanicien',
            key: 'airborne_firefighting',
        },
    ],
} satisfies SchoolingsBySchool;
