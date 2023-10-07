export default {
    amount: 'Quantidade',
    charts: {
        income: 'Receita',
        expenses: 'Despesas',
    },
    categories: {
        allianceMission: {
            regex: /^\[ALIANÇA]/u,
            title: 'Missões da Aliança',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Sistema de Alarme de Incêndio\\))?( - Falso Alarme)?$',
            title: 'Missões Próprias',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Sistema de Alarme de Incêndio\\))? - [cC]ancelado$',
            title: 'Missões Canceladas',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Veículo Comprado/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Recompensa de Login Diário/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Edifício Construído|Edifício demolido sem reembolso|Edifício Reembolsado)/u,
            title: 'Edifício Construído/Demolido',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Estação (atualizada(da estação pequena)|construída)|Guarda extendida|Cancelar:|Atualização de Edifícop Reembolsada|Especialização (construída|cancelada))/u,
            title: 'Estação construída/extendida',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Tarefa Completada («.*?»|".*?")/u,
            title: 'Tarefa Completada',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /(Transporte de Patiente|Tratamento de Patiente)/u,
            title: 'Patientes',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Hospital - Aliança/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Polícia - Aliança/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Prisioneiro? Transportado/u,
            title: 'Prisioneiro',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Aplicação para Treino de Aliança|educação)/u,
            title: 'Educação',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Edifício anexado à Base de Conjunto de Edifícios|Atualizado Base de Conjunto de Edifícios|Atualizado para Conjunto de Edifícios|Atualização da Base de Conjunto de Edifícios terminada)/u,
            title: 'Conjunto de Edifícios',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Falso Alarme/u,
            titel: 'Alarmes Falsos',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Categoria',
    title: 'Sumário',
    total: 'Total',
    others: 'Outros',
    export: {
        export: 'Exportar',
        json: {
            raw: 'cru',
            prettified: 'embelezado',
        },
    },
};
