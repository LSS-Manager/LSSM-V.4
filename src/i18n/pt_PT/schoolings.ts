import type { SchoolingsBySchool } from 'typings/Schooling';

export default {
    'Corpod de Bombeiros': [
        {
            caption: 'Matérias Perigosas',
            duration: '3 Dias',
            staffList: 'Matérias Perigosas',
            key: 'gw_gefahrgut',
        },
        {
            caption: 'Comando Avançado',
            duration: '5 Dias',
            staffList: 'Comando Avançado',
            key: 'elw2',
        },
        {
            caption: 'Equipa de Reconhecimento e Avaliação da Situação',
            duration: '3 Dias',
            staffList: 'Equipa de Reconhecimento e Avaliação da Situação',
            key: 'arff',
        },
        {
            caption: 'Curso de Mergulho',
            duration: '4 Dias',
            staffList: 'Curso de Mergulho',
            key: 'gw_wasserrettung',
        },
        {
            caption: 'Condutor de Embarcações de Socorro',
            duration: '5 Dias',
            staffList: 'Condutor de Embarcações de Socorro',
            key: 'ocean_navigation',
        },
    ],
    ['Policia']: [
        {
            caption: 'Piloto de Helicóptero',
            duration: '7 Dias',
            staffList: 'Piloto de Helicóptero',
            key: 'polizeihubschrauber',
        },
        {
            caption: 'Operações Especiais',
            duration: '5 Días',
            staffList: 'Operações Especiais',
            key: 'swat',
        },
        {
            caption: 'Cinotécnia',
            duration: '5 Días',
            staffList: 'Cinotécnia',
            key: 'k9',
        },
        {
            caption: 'Carta de Motociclo',
            duration: '3 Días',
            staffList: 'Carta de Motociclo',
            key: 'police_motorcycle',
        },
        {
            caption: 'Corpo/Unidade de Intervenção - Ordem Publica',
            duration: '2 Días',
            staffList: 'Corpo/Unidade de Intervenção - Ordem Publica',
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
    'Resgate': [
        {
            caption: 'Suporte Avançado de Vida',
            duration: '5 Días',
            staffList: 'Formación en cuidados intensivos',
            key: 'critical_care',
        },
        {
            caption: 'Carta de Motociclo',
            duration: '3 Días',
            staffList: 'Carta de Motociclo',
            key: 'rapid_response_motorcycle',
        },
    ],
} satisfies SchoolingsBySchool;
