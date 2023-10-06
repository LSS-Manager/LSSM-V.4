const modules = {
    appstore: {
        save: 'Guardar',
        reset: 'Restabelecer',
        noMapkit:
            '¡Este módulo não funciona com o tipo de mapa "Mapkit" devido às limitações do Mapkit!',
        dev: 'Este módulo continua em desenvolvimento. Ativa-lo pode provocar funcionalidades incompletas e defeituosas!',
        closeWarning: {
            title: 'Alterações não guardadas',
            text: 'Fizeste alterações na AppStore que não foram guardadas. Reinicia-as ou guarda-as para fechar a AppStore.',
            abort: 'Cancelar',
            saveAndExit: 'Guardar e Sair',
            exit: 'Sair sem guardar',
        },
    },
    settings: {
        name: 'Configurações',
        save: 'Guardar',
        discard: 'Descartar as alterações',
        reset: 'Restabelecer',
        export: 'Exportar',
        import: 'Importar',
        donate: 'Doar Voluntariamente',
        resetWarning: {
            title: 'Restabelecer a configuração',
            text: 'Realmente deseja restabelecer a configuração aos seus valores inicais? Isto não se pode desfazer!',
            close: 'Cancelar',
            total: 'Todos os configurações',
            module: 'Só neste módulo',
        },
        resetWarningSetting: {
            title: 'Restabelecer configurações',
            text: 'Quere restablecer esta configuração <b>{setting}</b> do módulo <b>{module}</b> aos seus valores iniciais?',
            close: 'Cancelar',
            reset: 'Restabelecer',
        },
        closeWarning: {
            title: 'Alterações não guardadas',
            text: 'Fizeste alterações nas configurações que não foram guardadas. Restabelece, descarta ou guarda para fechar as configurações.',
            close: 'Fechar a mensagem',
        },
        changeList: {
            true: 'On',
            false: 'Off',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    buildingCategories: {
        Bombeiros: {
            buildings: [0, 1, 18, 24],
            color: '#ff2d2d',
        },
        Ambulâncias: {
            buildings: [2, 3, 5, 20, 21],
            color: '#ffa500',
        },
        ['Polícia']: {
            buildings: [6, 16, 19],
            color: '#00ac00',
        },
        ['Resgate na água']: {
            buildings: [25, 26],
            color: '#00ac00',
        },
        Outros: {
            buildings: [4, 7, 14, 22, 23],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Bombeiros': {
            vehicles: {
                'Camião dos Bombeiros': [0, 1, 11],
                'Tanque de Água': [6],
                'Veículos Especializados': [
                    53, 2, 7, 14, 24, 30, 29, 4, 15, 16, 28, 3, 10, 21,
                ],
                'Veículos Florestais': [22, 23],
                'Carros de Bombeiros de Aeroporto': [
                    46, 47, 48, 49, 50, 51, 52,
                ],
                'Resgate aquático': [42, 43, 44, 45],
                'Avião dos bombeiros': [25, 26, 27],
            },
            color: '#ff2d2d',
        },
        'Veículos de Resgate': {
            vehicles: {
                'Ambulâncias': [5, 19],
                'Helicópteros de Emergência Médica': [9],
                'Outros Veículos de Resgate': [17, 18, 20],
            },
            color: '#ffa500',
        },
        'Carros da Polícia': {
            vehicles: {
                'Carro de Patrulha': [8],
                'Mota da Polícia': [13],
                'UEP': [12, 31, 32, 33],
                'Outro Veículo de Polícia': [34, 35, 36],
            },
            color: '#00ac00',
        },
        'Veículos Salva-vidas': {
            vehicles: {
                Carros: [37, 38],
                Barcos: [39, 40, 41, 45],
            },
            color: '#58b658',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    amount: 'Quantidade',
    search: 'Procurar',
    mapSearch: 'Procurar localização',
    alliance: 'Aliança',
    premiumNotice:
        'Esta função amplia uma função premium do jogo e, por isso, só está disponível para jogadores com uma conta premium do jogo!',
    credits: 'Créditos',
    coins: 'Moedas',
    close: 'Fechar',
    fullscreen: {
        expand: 'Activar o modo tela cheia',
        compress: 'Desactivar o modo tela cheia',
    },
    hideTitle: 'Mostrar título | Ocultar título',
    vehicle: 'Carros | Carro | Carros',
    building: 'Edifícios',
    station: 'Estações | Estação | Estações',
    distance: 'Distância | Distâncias',
    vehicleType: 'Tipo de veículo',
    noOptions: 'Temos pena, não há opções que coincidem.',
    fmsReal2Show: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        9: 9,
    },
    pois: [
        'Parque',
        'Lago',
        'Hospital',
        'Floresta',
        'Paragem de Autocarro',
        'Paragem de Elétrico',
        'Estação de Comboios (tráfego regional)',
        'Estação de Comboios (tráfego regional e viagem de longa distância)',
        'Estação de Mercadorias',
        'Supermercado',
        'Hipermercado',
        'Bomba de Gasolina',
        'Escola',
        'Museu',
        'Centro Comercial',
        'Oficina Automóvel',
        'Saída de Auto-Estrada',
        'Mercado de Natal',
        'Armazém',
        'Discoteca',
        'Estádio',
        'Quinta',
        'Edifício de Escritórios',
        'Piscina',
        'Passagem de Nível',
        'Teatro',
        'Feira',
        'Rio',
        'Aeródromo',
        'Aeroporto',
        'Terminal de Aeroporto',
        'Banco',
        'Depósito',
        'Ponte',
        'Restaurante Fast Food',
        'Porto de Carga',
        'Centro de Reciclagem',
        'Arranha-Céus',
        'Porto de Cruzeiros',
        'Marina',
        'Cruzamento Ferroviário',
        'Túnel',
        'Armazém Refrigerado',
        'Central Elétrica',
        'Fábrica',
        'Sucata',
        'Estação de Metro',
        'Depósito de Químicos (Pequeno)',
        'Depósito de Químicos (Grande)',
        'Hotel',
        'Bar',
        'Aterro Sanitário',
        'Garagem de Estacionamento',
        'Silo',
        'Restaurante',
        'Carpintaria',
        'Centro da Cidade',
        'Mercado Ambulante',
        'Colina',
        'Falésia',
        'Campo',
        'Terreno Baldio',
        'Pantano',
        'Cabana',
        'Parque de Campismo',
        'Refinaria',
        'Igreja',
        'Estaleiro',
        'Praia',
        'Barragem',
        'Festival',
        'Sauna',
        'Arquivos Nacionais',
    ],
    only_alliance_missions: [57, 74],
    transfer_missions: [],
    ranks: {
        missionchief: {
            0: 'Estagiário',
            200: 'Bombeiro',
            10_000: 'Adjunto de Comando',
            100_000: '2º Comandante',
            1_000_000: 'Comandante',
            5_000_000: 'Adjunto Distrital',
            20_000_000: '2º Comandante Distrital',
            50_000_000: 'Comandante Distrital',
            1_000_000_000: 'Adjunto Nacional',
            2_000_000_000: '2º Comandante Nacional',
            5_000_000_000: 'Comandante Nacional',
        },
    },
};
