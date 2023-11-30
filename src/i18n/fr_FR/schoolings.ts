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
            caption: "Formation d'intervention d'élite",
            duration: '3 jours',
            staffList: "unité d'elite",
            key: 'swat',
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
        {
            caption: "Formation de médecin d'intervention",
            duration: '5 jours',
            staffList: "médecin d'intervention",
            key: 'swat_physician',
        },
        {
            caption: 'Formation de négociateur',
            duration: '5 jours',
            staffList: 'négociateur',
            key: 'swat_negotiation',
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
        {
            caption:
                'Formation des commandants d’intervention en cas de catastrophe',
            duration: '5 jours',
            staffList:
                'Formation des commandants d’intervention en cas de catastrophe',
            key: 'disaster_response_command',
        },
        {
            caption: 'Formation risques chimiques',
            duration: '4 jours',
            staffList: 'Formation risques chimiques',
            key: 'decontamination_chemicals',
        },
        {
            caption: 'Formation risques radiologiques',
            duration: '4 jours',
            staffList: 'Formation risques radiologiques',
            key: 'decontamination_radiology',
        },
        {
            caption: 'Formation démineur',
            duration: '7 jours',
            staffList: 'Formation démineur',
            key: 'fbi_bomb_tech',
        },
        {
            caption: 'Formation pilote à distance',
            duration: '4 jours',
            staffList: 'Formation pilote à distance',
            key: 'bomb_drone',
        },
        {
            caption: 'Sauvetage et déblaiement',
            duration: '4 jours',
            staffList: 'FSauvetage et déblaiement',
            key: 'disaster_response',
        },
        {
            caption: 'Formation équipe cynophile',
            duration: '3 jours',
            staffList: 'Formation équipe cynophile',
            key: 'rescue_dogs',
        },
    ],
} satisfies SchoolingsBySchool;
