import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Fire Station': [
        {
            caption: 'HAZMAT Course',
            duration: '3 Days',
            staffList: 'HazMat Unit',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Mobile command',
            duration: '5 Days',
            staffList: 'Mobile command',
            key: 'elw2',
        },
        {
            caption: 'ULFV Crash Tender-Training',
            duration: '3 Days',
            staffList: 'ULFV Crash Tender',
            key: 'arff',
        },
        {
            caption: 'Airborne firefighting',
            duration: '5 Days',
            staffList: 'Airborne firefighting',
            key: 'airborne_firefighting',
        },
        {
            caption: 'Intensive Care Education',
            duration: '5 Days',
            staffList: 'Intensive Care Paramedic',
            key: 'critical_care',
        },
        {
            caption: 'Emergency Stairs Training',
            duration: '7 Days',
            staffList: 'Emergency Stairs Operator',
            key: 'rettungstreppe',
        },
    ],
    'Police': [
        {
            caption: 'Police Air Wing',
            duration: '7 Days',
            staffList: 'Police Air Wing',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'TOG',
            duration: '5 Days',
            staffList: 'TOG',
            key: 'swat',
        },
        {
            caption: 'K-9',
            duration: '5 Days',
            staffList: 'K-9',
            key: 'k9',
        },
        {
            caption: 'Police Motorcycle',
            duration: '3 Days',
            staffList: 'Motor Officer',
            key: 'police_motorcycle',
        },
        {
            caption: 'Mounted Police Training',
            duration: '3 Days',
            staffList: 'Mounted Police Training',
            key: 'police_horse',
        },
        {
            caption: 'Riot Police Equipment Training',
            duration: '5 Days',
            staffList: 'Riot Police Equipment Training',
            key: 'riot_police_equipment',
        },
        {
            caption: 'Senior Sergeant',
            duration: '5 Days',
            staffList: 'Senior Sergeant',
            key: 'police_service_group_leader',
        },
    ],
    'Rescue': [
        {
            caption: 'Intensive Care Education',
            duration: '5 Days',
            staffList: 'Intensive Care Paramedic',
            key: 'critical_care',
        },
    ],
    'SES & Water Rescue': [
        {
            caption: 'Ocean Navigation',
            duration: '5 Days',
            staffList: 'Ocean Navigation',
            key: 'ocean_navigation',
        },
        {
            caption: 'SES Rescue',
            duration: '5 Days',
            staffList: 'SES Rescue',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Boat Captain Training',
            duration: '5 Days',
            staffList: 'Boat Captain Training',
            key: 'coastal_rescue',
        },
        {
            caption: 'Mobile Command Training',
            duration: '5 Days',
            staffList: 'Mobile Command Training',
            key: 'water_rescue_elw2',
        },
    ],
} satisfies SchoolingsBySchool;
