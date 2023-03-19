import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Parque de bomberos': [
        {
            caption: 'Hazmat',
            duration: '3 Días',
            staffList: 'Hazmat',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Mando móvil',
            duration: '5 Días',
            staffList: 'Mando móvil',
            key: 'elw2',
        },
        {
            caption: 'Formación CBA',
            duration: '3 Días',
            staffList: 'Formación CBA',
            key: 'arff',
        },
        {
            caption: 'Rescate acuático rápido',
            duration: '4 Días',
            staffList: 'Rescate acuático rápido',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Navegación en océano',
            duration: '5 Días',
            staffList: 'Navegación en océano',
            key: 'ocean_navigation',
        },
    ],
    ['Policía']: [
        {
            caption: 'Piloto de Helicóptero',
            duration: '7 Días',
            staffList: 'Piloto de Helicóptero',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Fuerzas Especiales',
            duration: '5 Días',
            staffList: 'Fuerzas Especiales',
            key: 'swat',
        },
        {
            caption: 'Guía Canino',
            duration: '5 Días',
            staffList: 'Guía Canino',
            key: 'k9',
        },
        {
            caption: 'Motorista',
            duration: '3 Días',
            staffList: 'Motorista',
            key: 'police_motorcycle',
        },
        {
            caption: 'Educación de la policía antidisturbios',
            duration: '2 Días',
            staffList: 'Educación de la policía antidisturbios',
            key: 'riot_police',
        },
        {
            caption: 'Entrenamiento de mando de policía antidisturbios ',
            duration: '7 Días',
            staffList: 'Entrenamiento de mando de policía antidisturbios ',
            key: 'riot_police_command',
        },
        {
            caption: 'Educación sobre el equipo de la policía antidisturbios',
            staffList: 'Educación sobre el equipo de la policía antidisturbios',
            duration: '5 Días',
            key: 'riot_police_equipment',
        },
        {
            caption: 'Capacitación en operación de cañones de agua',
            staffList: 'Capacitación en operación de cañones de agua',
            duration: '7 Días',
            key: 'police_wasserwerfer',
        },
        {
            caption: 'Entrenamiento de líder de equipo de policía',
            staffList: 'Entrenamiento de líder de equipo de policía',
            duration: '5 Días',
            key: 'police_service_group_leader',
        },
        {
            caption: 'Entrenamiento Montado',
            staffList: 'Entrenamiento Montado',
            duration: '4 Días',
            key: 'police_horse',
        },
    ],
    'Rescate': [
        {
            caption: 'Formación en cuidados intensivos',
            duration: '5 Días',
            staffList: 'Formación en cuidados intensivos',
            key: 'critical_care',
        },
        {
            caption: 'Motocicleta de intervención rápida',
            duration: '3 Días',
            staffList: 'Motocicleta de intervención rápida',
            key: 'rapid_response_motorcycle',
        },
    ],
} satisfies SchoolingsBySchool;
