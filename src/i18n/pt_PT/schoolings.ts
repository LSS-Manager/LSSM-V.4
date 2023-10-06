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
            caption: 'Resgate e Combate a Incêndios em Aeronaves',
            duration: '3 Dias',
            staffList: 'Resgate e Combate a Incêndios em Aeronaves',
            key: 'arff',
        },
        {
            caption: 'Condutor de Embarcações de Socorro',
            duration: '5 Dias',
            staffList: 'Condutor de Embarcações de Socorro',
            key: 'ocean_navigation',
        },
        {
            caption: 'Salvamento em Grande Ângulo ',
            duration: '3 Dias',
            staffList: 'Salvamento em Grande Ângulo ',
            key: 'fwk',
        },
        {
            caption: 'Carta de Manobrador de Máquinas',
            duration: '3 Dias',
            staffList: 'Carta de Manobrador de Máquinas',
            key: 'heavy_machinery',
        },
        {
            caption: 'Carta de Pesados',
            duration: '2 Dias',
            staffList: 'Carta de Pesados',
            key: 'truck_drivers_license',
        },
        {
            caption: 'Brevet',
            duration: '5 Dias',
            staffList: 'Brevet',
            key: 'airborne_firefighting',
        },
        {
            caption: 'Equipa de Reconhecimento e Avaliação da Situação ',
            duration: '5 Dias',
            staffList: 'Equipa de Reconhecimento e Avaliação da Situação ',
            key: 'elw3',
        },
        {
            caption: 'Curso de Mergulho',
            duration: '5 Dias',
            staffList: 'Curso de Mergulho',
            key: 'gw_taucher',
        },
        {
            caption: 'Operadores de Sistemas de Assistência e Socorro',
            duration: '2 Dias',
            staffList: 'Operadores de Sistemas de Assistência e Socorro',
            key: 'elw_airport',
        },
        {
            caption: 'Resgate e Combate Especial a Incêndios em Aeronaves',
            duration: '2 Dias',
            staffList: 'Resgate e Combate Especial a Incêndios em Aeronaves',
            key: 'piercing_nozzle',
        },
        {
            caption: 'Operador de Escadas',
            duration: '5 Dias',
            staffList: 'Operador de Escadas',
            key: 'rettungstreppe',
        },
    ],
    ['Policia']: [
        {
            caption: 'Inativação de Explosivos e Segurança em Subsolo',
            duration: '3 Dias',
            staffList: 'Inativação de Explosivos e Segurança em Subsolo',
            key: 'fbi_bomb_tech',
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
            caption: 'Comando Avançado',
            duration: '7 Días',
            staffList: 'Comando Avançado',
            key: 'riot_police_command',
        },
        {
            caption: 'Controlador de Trânsito',
            staffList: 'Controlador de Trânsito',
            duration: '5 Días',
            key: 'traffic_police',
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
    'Resgate aquático': [
        {
            caption: 'Polícia Marítima',
            duration: '5 Días',
            staffList: 'Polícia Marítima',
            key: 'coastal_rescue',
        },
        {
            caption: 'Grupo de Ações Táticas',
            duration: '3 Días',
            staffList: 'Grupo de Ações Táticas',
            key: 'law_enforcement_marine',
        },
        {
            caption: 'Navegação em Oceano',
            duration: '5 Días',
            staffList: 'Navegação em Oceano',
            key: 'coastal_ocean_navigation',
        },
    ],
} satisfies SchoolingsBySchool;
