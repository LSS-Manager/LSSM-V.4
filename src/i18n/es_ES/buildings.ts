import type { InternalBuilding } from 'typings/Building';

type Extension = InternalBuilding['extensions'][0];

const multiplyExtension = (
    extension: Extension | ((index: number) => Extension),
    amount: number
): Extension[] =>
    typeof extension === 'function'
        ? new Array(amount).fill('0').map((_, index) => extension(index))
        : new Array(amount).fill(extension);

export default {
    0: {
        caption: 'Parque de bomberos',
        color: '#bb0000',
        coins: 30,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(22).fill(100_000)],
            coins: [10, 15, ...Array(22).fill(20)],
        },
        extensions: [
            {
                caption: 'Extensión de ambulancia',
                credits: 100_000,
                coins: 20,
                duration: '7 días',
            },
            {
                caption: 'Ampliación de apoyo en incendios',
                credits: 150_000,
                coins: 15,
                duration: '5 días',
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-24. 100.000'],
        maxBuildings:
            '6.000 edificios junto con pequeñas estaciones de bomberos',
        maxLevel: 25,
        special:
            'A partir del 24º parque de bomberos en adelante, el coste de construcción de un nuevo parque de bomberos aumenta según la siguiente fórmula: <code>100.000+200.000*LOG<sub>2</sub>(Number of existing fire stations − 22)</code>. ¡El precio de las monedas es constante!',
        startPersonnel: 10,
        startVehicles: ['Camión BUP', 'Camión BUL', 'Vehículo de rescate'],
        schoolingTypes: ['Parque de bomberos'],
        startParkingLots: 1,
        maxBuildingsFunction: (): number => 6000,
        icon: 'fire-flame-curved',
    },
    1: {
        caption: 'Academia de bomberos',
        color: '#24c3ae',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Más aulas',
                credits: 400_000,
                coins: 40,
                duration: '7 Days',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'No hay límite',
        maxLevel: 0,
        special:
            'Los ministros y administradores de finanzas pueden (expandir) las escuelas del departamento de bomberos con la ayuda de créditos de la tesorería de la asociación. Los maestros y administradores de cursos de capacitación pueden comenzar cursos de capacitación en las escuelas del cuerpo de bomberos de la asociación.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    2: {
        caption: 'Parque de ambulancias',
        color: '#bbe944',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(12).fill(100_000)],
            coins: [10, 15, ...Array(12).fill(20)],
        },
        extensions: [
            {
                caption: 'Expansión de cuidados de emergencia',
                credits: 200_000,
                coins: 25,
                duration: '7 Días',
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-14. 100.000'],
        maxBuildings: 'No hay límite',
        maxLevel: 14,
        special: '',
        startPersonnel: 0,
        startVehicles: ['Ambulancia'],
        schoolingTypes: ['Rescate'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    3: {
        caption: 'Academia de servicios de emergencia',
        color: '#24c3ae',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Más aulas',
                credits: 400_000,
                coins: 40,
                duration: '7 Days',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'No hay límite',
        maxLevel: 0,
        special:
            'Los ministros y administradores de finanzas pueden (expandir) las escuelas del departamento de bomberos con la ayuda de créditos de la tesorería de la asociación. Los maestros y administradores de cursos de capacitación pueden comenzar cursos de capacitación en las escuelas del cuerpo de bomberos de la asociación.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    4: {
        caption: 'Hospital',
        color: '#ffa500',
        coins: 25,
        credits: 200_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Medicina interna general',
                credits: 10_000,
                coins: 10,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Cirugía general',
                credits: 10_000,
                coins: 10,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Ginecología',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Urología',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Traumatología',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Neurología',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Neurocirugía',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Cardiología',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
            {
                caption: 'Cirugía cardiovascular',
                credits: 70_000,
                coins: 15,
                duration: '7 Days',
                cannotDisable: true,
            },
        ],
        levelcost: ['1.-20. 19.000 / 11 Monedas'],
        maxBuildings: 'No hay límite',
        maxLevel: 20,
        special:
            'Los ministros de finanzas y los administradores pueden (ampliar) los hospitales de la alianza con la ayuda de créditos de la tesorería de la alianza.',
        startBeds: 10,
        icon: 'hospital',
    },
    5: {
        caption: 'Helipuerto médico',
        color: '#e7ad2f',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'Ver especialidades',
        maxLevel: 0,
        special:
            'Hasta el edificio 125 (de todos los tipos) un total de máx. 4 helipuertos médicos se pueden construir. Después de eso, el número aumenta en 1 cada 25 edificios (comenzando en el 125).',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: ['Rescate'],
        startParkingLots: 1,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 125
                ? 4
                : Math.floor(buildingsAmountTotal / 25),
        icon: 'circle-h',
    },
    6: {
        caption: 'Comisaría de policía',
        color: '#007700',
        coins: 35,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(12).fill(100_000)],
            coins: [10, 15, ...Array(12).fill(20)],
        },
        extensions: [
            {
                caption: 'Calabozo',
                credits: 25_000,
                coins: 5,
                duration: '7 Días',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Más celdas',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Días',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-14. 100.000'],
        maxBuildings:
            '1.700 comisarías de policía junto con pequeñas comisarías',
        maxLevel: 14,
        special:
            'A partir de la comisaría 24 en adelante, los costes de la nueva construcción de una comisaría aumentan según la siguiente fórmula: <code>100.000+200.000*LOG<sub>2</sub>(Number of existing police stations − 22)</code>. ¡El precio de las monedas es constante!',
        startPersonnel: 2,
        startParkingLots: 1,
        startCells: 0,
        startVehicles: ['Coche patrulla'],
        schoolingTypes: ['Policía'],
        maxBuildingsFunction: (): number => 1700,
        icon: 'building-shield',
    },
    7: {
        caption: 'Centralita',
        color: '#225522',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'Cada 25 edificios una centralita',
        maxLevel: 0,
        special: 'La centralita es el centro administrativo',
        isDispatchCenter: true,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            Math.floor(buildingsAmountTotal / 25) + 1,
        icon: 'tower-broadcast',
    },
    8: {
        caption: 'Academia de Policía',
        color: '#225522',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Más aulas',
                credits: 400_000,
                coins: 40,
                duration: '7 Days',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'No hay límite',
        maxLevel: 0,
        special:
            'Los ministros y administradores de finanzas pueden (expandir) las escuelas de policía de la alianza con la ayuda de créditos de la tesorería de la alianza. Los maestros y administradores de cursos de formación pueden comenzar cursos de formación en las escuelas de policía de la alianza.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    13: {
        caption: 'Helipuerto Policial',
        color: '#148423',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [1_000_000],
            coins: [50],
        },
        extensions: [],
        levelcost: ['1. 1.000.000 Créditos / 50 Monedas'],
        maxBuildings: 'Ver especialidades',
        maxLevel: 1,
        special:
            'Se pueden construir hasta 2 sitios de aterrizaje por estación (etapas de expansión). Hasta el edificio 125 (de todos los tipos) un total de máx. 4 lugares de aterrizaje se pueden construir. Después de eso, el número aumenta en 1 cada 25 edificios (comenzando en el 125).',
        startPersonnel: 3,
        startVehicles: [],
        schoolingTypes: ['Policía'],
        startParkingLots: 1,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 125
                ? 4
                : Math.floor(buildingsAmountTotal / 25),
        icon: 'helicopter',
    },
    14: {
        caption: 'Zona de preparación',
        color: '#c259b5',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 1,
        maxLevel: 0,
        special:
            'Puede estacionar tantos vehículos propios como desee en un área de preparación, los miembros de la alianza pueden usar la zona de preparación. Un área de preparación permanece durante 24 horas, pero puede restablecerla a 24 horas en cualquier momento.',
        isStagingArea: true,
        maxBuildingsFunction: (): number => 1,
        icon: 'warehouse',
    },
    16: {
        caption: 'Prisión',
        color: '#00ff00',
        coins: -1,
        credits: 100_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Calabozo',
                credits: 25_000,
                coins: 5,
                duration: '7 Días',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Más celdas',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Días',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
        ],
        levelcost: [],
        maxBuildings: 'No hay límite',
        maxLevel: 0,
        special:
            "This building can only be built and developed by admins and finance ministers with credits from the association's treasury.The built Prison Cells are available to all members of the association.",
        startCells: 1,
        icon: 'border-all',
    },
    18: {
        caption: 'Parque de bomberos (pequeño) ',
        color: '#aa1111',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [
            {
                caption: 'Extensión de ambulancia',
                credits: 100_000,
                coins: 20,
                duration: '7 días',
            },
            {
                caption: 'Ampliación de apoyo en incendios',
                credits: 150_000,
                coins: 15,
                duration: '5 días',
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Convertir a parque de bombero normal: precio de la diferencia a parque de bombero normal',
        ],
        maxBuildings:
            '6.000 parques de bomberos junto con parques de bomberos pequeños',
        maxLevel: 5,
        special:
            'A partir del 24º parque de bomberos en adelante, el coste de construcción de un nuevo parque de bomberos aumenta según la siguiente fórmula: <code>(50.000+100.000*LOG<sub>2</sub>(Number of existing fire stations − 22)) / 2</code>. max. 1 Million Credits. ¡El precio de las monedas es constante!',
        startPersonnel: 10,
        startVehicles: ['Camión BUP', 'Camión BUL', 'Vehículo de rescate'],
        schoolingTypes: ['Parque de bomberos'],
        maxBuildingsFunction: (): number => 6000,
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    19: {
        caption: 'Comisaría de policía (pequeño)',
        color: '#116611',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(2).fill(100_000)],
            coins: [10, 15, ...Array(2).fill(20)],
        },
        extensions: [
            {
                caption: 'Calabozo',
                credits: 25_000,
                coins: 5,
                duration: '7 Días',
                newCells: 1,
                cannotDisable: true,
            },
            {
                caption: 'Más celdas',
                credits: 25_000,
                coins: 5,
                duration: '7 Días',
                newCells: 1,
                cannotDisable: true,
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-4. 100.000',
            'Convertir a comisaria de policía normal: precio de la diferencia a comisaría de policía normal',
        ],
        maxBuildings:
            '1.700 comisarías de polcía junto con comisarías de policías pequeños',
        maxLevel: 4,
        special:
            'A partir de la comisaría 24º en adelante, los costes de la nueva construcción de una comisaría se calculan de acuerdo con la siguiente fórmula: <code>(50.000+100.000*LOG<sub>2</sub>(Number of existing police stations − 22)) / 2</code>. ¡El precio de las monedas es constante!',
        startPersonnel: 2,
        startVehicles: ['Coche patrulla'],
        schoolingTypes: ['Policía'],
        startParkingLots: 1,
        startCells: 0,
        maxBuildingsFunction: (): number => 1700,
        icon: 'building-shield',
    },
    20: {
        caption: 'Parque de ambulancias (pequeño)',
        color: '#eeb611',
        coins: 25,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(2).fill(100_000)],
            coins: [10, 15, ...Array(2).fill(20)],
        },
        extensions: [
            {
                caption: 'Expansión de cuidados de emergencia',
                credits: 200_000,
                coins: 25,
                duration: '7 Días',
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Convertir a parque de ambulancia normal: precio de la diferencia a parque de ambulancia normal',
        ],
        maxBuildings: 'No hay límite',
        maxLevel: 5,
        special: '',
        startPersonnel: 3,
        startVehicles: ['Ambulancia'],
        schoolingTypes: ['Rescate'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    21: {
        caption: 'Gran complejo',
        color: '#8B4513',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['Demasiado caro'],
        maxBuildings: 'Keine Grenze',
        maxLevel: 5,
        special: 'Demasiado caro, NO LO COMPRES, NO LO AMPLÍES',
        startPersonnel: 0,
        startVehicles: [''],
        startParkingLots: 0,
        schoolingTypes: [],
        icon: 'poo',
    },
    22: {
        caption: 'Pequeño complejo',
        color: '#8B4513',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['Demasiado caro'],
        maxBuildings: 'Keine Grenze',
        maxLevel: 5,
        special: 'Demasiado caro, NO LO COMPRES, NO LO AMPLÍES',
        startPersonnel: 0,
        startVehicles: [''],
        startParkingLots: 0,
        schoolingTypes: [],
        icon: 'poo',
    },
} satisfies Record<number, InternalBuilding>;
