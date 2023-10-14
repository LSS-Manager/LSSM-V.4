import type { Building, InternalBuilding } from 'typings/Building';

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
        caption: 'Brandweer kazerne',
        color: '#bb0000',
        coins: 30,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(22).fill(100_000)],
            coins: [10, 15, ...Array(22).fill(20)],
        },
        extensions: [
            {
                caption: 'Ambulance standplaats',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [16, 30, 52, 63],
            },
            ...multiplyExtension(
                {
                    caption: 'Haakarmbak parkeerplaats',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Dagen',
                    isVehicleExtension: true,
                    givesParkingLots: 1,
                    unlocksVehicleTypes: [26, 27, 29, 32, 45, 51, 61],
                    parkingLotReservations: [[27, 29, 32, 45, 51, 61]],
                    cannotDisable: true,
                },
                5
            ),
            {
                caption: 'Waterongevallenbestrijding',
                credits: 400_000,
                coins: 25,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [33, 36, 49, 50],
            },
            {
                caption: 'Haakarmbak parkeerplaats',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                unlocksVehicleTypes: [26, 27, 29, 32, 45, 51, 61],
                parkingLotReservations: [[27, 29, 32, 45, 51, 61]],
                cannotDisable: true,
            },
            {
                caption: 'Vliegtuigbrandbestrijding',
                credits: 400_000,
                coins: 25,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [41, 42, 43, 44],
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number => Math.floor((buildingsByType[0]?.length ?? 0) / 10),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[0][8] ?? 0) +
                        (boughtExtensionsAmountByType[17][8] ?? 0) <
                    maxExtensions,
            },
            ...multiplyExtension(
                {
                    caption: 'Haakarmbak parkeerplaats',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Dagen',
                    isVehicleExtension: true,
                    givesParkingLots: 1,
                    unlocksVehicleTypes: [26, 27, 29, 32, 45, 51, 61],
                    parkingLotReservations: [[27, 29, 32, 45, 51, 61]],
                    cannotDisable: true,
                },
                4
            ),
            {
                caption: 'Schuimblussing',
                credits: 150_000,
                coins: 15,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [68, 69, 70],
            },
            {
                caption: 'Signalisatie',
                credits: 150_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [83],
                cannotDisable: true,
            },
            {
                caption: 'Natuurbrandbestrijding',
                credits: 100_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [86, 87, 88, 89],
                cannotDisable: true,
            },
            {
                caption: 'Urban Search and Rescue',
                credits: 150_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [92, 93, 94, 95, 96, 97],
                cannotDisable: true,
            },
            {
                caption: 'Specialisme Technische Hulpverlening',
                credits: 150_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [90, 91],
                cannotDisable: true,
            },
            {
                caption: 'Grote brandweerkazerne',
                credits: 1_000_000,
                coins: 50,
                duration: '7 dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number =>
                    Math.floor(
                        ((buildingsByType[0]?.length ?? 0) +
                            (buildingsByType[17]?.length ?? 0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[0][9] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-24. 100.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 24,
        special:
            'Vanaf de 25e brandweerkazerne stijgen de kosten voor de bouw van een nieuwe brandweerkazerne volgens de volgende formule: <code>100.000+200.000*LOG<sub>2</sub>(Aantal brandweerposten − 22)</code>. De Coins prijs blijft gelijk!',
        startPersonnel: 10,
        startVehicles: [
            'SI-2',
            'TS 8/9',
            'TST 8/9',
            'TST 6/7',
            'TST 4/5',
            'TS 4/5',
            'TST-NB 8/9',
            'TST-NB 6/7',
            'TST-NB 4/5',
            'TS 6/7',
        ],
        schoolingTypes: ['Brandweer'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    1: {
        caption: 'Meldkamer',
        color: '#24c3ae',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'Elke 25 gebouwen mag je 1 meldkamer bouwen',
        maxLevel: 0,
        special:
            'De meldkamer is het administratief centrum. Hier kan je diverse instellingen bewerken.',
        isDispatchCenter: true,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            Math.floor(buildingsAmountTotal / 25) + 1,
        icon: 'tower-broadcast',
    },
    2: {
        caption: 'Ziekenhuis',
        color: '#bbe944',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Interne Geneeskunde',
                credits: 10_000,
                coins: 10,
                duration: '7 Dagen',
                cannotDisable: true,
            },
            {
                caption: 'Algemene Heelkunde',
                credits: 10_000,
                coins: 10,
                duration: '7 Dagen',
                cannotDisable: true,
            },
            {
                caption: 'Gynaecologie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [1],
            },
            {
                caption: 'Urologie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [1],
            },
            {
                caption: 'Traumatologie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [1],
            },
            {
                caption: 'Neurologie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [0],
            },
            {
                caption: 'Neurochirurgie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [1],
            },
            {
                caption: 'Cardiologie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [0],
            },
            {
                caption: 'Cardiochirurgie',
                credits: 70_000,
                coins: 15,
                duration: '7 Dagen',
                cannotDisable: true,
                requiredExtensions: [1],
            },
            {
                caption: 'Groot ziekenhuis',
                credits: 200_000,
                coins: 50,
                duration: '7 Dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number => Math.floor((buildingsByType[2]?.length ?? 2) / 5),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[4][9] ?? 0) < maxExtensions,
                newBeds: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1.-20. 19.000 Credits / 11 Coins'],
        maxBuildings: 'Geen limiet',
        maxLevel: 20,
        special:
            'Penningmeesters en Admins kunnen de Team ziekenhuizen met behulp van de credits van de Teamkas uitbreiden.',
        startBeds: 10,
        icon: 'hospital',
    },
    3: {
        caption: 'Ambulancestandplaats',
        color: '#ffa500',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(17).fill(100_000)],
            coins: [10, 15, ...Array(17).fill(20)],
        },
        extensions: [
            {
                caption: 'Grote ambulancepost',
                credits: 1_000_000,
                coins: 50,
                duration: '7 Dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number =>
                    Math.floor(
                        ((buildingsByType[3]?.length ?? 0) +
                            (buildingsByType[13]?.length ?? 0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[2][0] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-19. 100.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 19,
        special: '',
        startPersonnel: 3,
        startVehicles: ['Ambulance'],
        schoolingTypes: ['Ambulance'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    4: {
        caption: 'Brandweer academie',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Extra klaslokaal',
                credits: 400_000,
                coins: 40,
                duration: '7 Dagen',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special:
            'Penningmeesters en Admins kunnen de Team Brandweeracademie met behulp van de credits van de Teamkas uitbreiden.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    5: {
        caption: 'Politie opkomstbureau',
        color: '#007700',
        coins: 35,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(37).fill(100_000)],
            coins: [10, 15, ...Array(37).fill(20)],
        },
        extensions: [
            {
                caption: 'Gevangeniscel',
                credits: 25_000,
                coins: 5,
                duration: '7 Dagen',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Extra cel',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Dagen',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
            {
                caption: 'Groot politiebureau',
                credits: 1_000_000,
                coins: 50,
                duration: '7 Dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number =>
                    Math.floor(
                        ((buildingsByType[5]?.length ?? 0) +
                            (buildingsByType[18]?.length ?? 0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[6][14] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
            {
                caption: 'Grote gevangenis',
                credits: 200_000,
                coins: 50,
                duration: '7 Dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number =>
                    Math.floor(
                        ((buildingsByType[5]?.length ?? 0) +
                            (buildingsByType[18]?.length ?? 0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[6][15] ?? 0) < maxExtensions,
                newCells: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-19. 100.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 19,
        special:
            'Vanaf het 25e opkomstbureau stijgen de kosten voor de bouw van een nieuw opkomstbureau volgens de volgende formule: <code>100.000+200.000*LOG<sub>2</sub>(Aantal opkomstbureaus − 22)</code>. De Coins prijs blijft gelijk!',
        startPersonnel: 2,
        startVehicles: ['DA Noodhulp'],
        schoolingTypes: ['Politie'],
        startParkingLots: 1,
        startCells: 0,
        icon: 'building-shield',
    },
    6: {
        caption: 'MMT Standplaats',
        color: '#ffd500',
        coins: 50,
        credits: 800_000,
        levelPrices: {
            credits: [10_000, 50_000, 100_000],
            coins: [10, 15, 20],
        },
        extensions: [],
        levelcost: ['1. 10.000', '2. 50.000', '3. 100.000'],
        maxBuildings: 'Maximaal 1 gebouw per 10 ambulance gebouwen',
        maxLevel: 3,
        special: '',
        startPersonnel: 3,
        startVehicles: [],
        schoolingTypes: ['Ambulance'],
        startParkingLots: 1,
        icon: 'circle-h',
    },
    7: {
        caption: 'Universiteit Geneeskunde',
        color: '#ffc400',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Extra klaslokaal',
                credits: 400_000,
                coins: 40,
                duration: '7 Dagen',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special:
            'Penningmeesters en Admins kunnen de Team Universiteiten geneeskunde met behulp van de credits van de Teamkas uitbreiden.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    8: {
        caption: 'Politie academie',
        color: '#225522',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Extra klaslokaal',
                credits: 400_000,
                coins: 40,
                duration: '7 Dagen',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special:
            'Penningmeesters en Admins kunnen de Team Politieacademie met behulp van de credits van de Teamkas uitbreiden.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    9: {
        caption: 'Politiehelikopter standplaats',
        color: '#e7ad2f',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'Zie bijzonderheden',
        maxLevel: 0,
        special:
            'Tot het 125ste gebouw (van alle soorten) kunnen maximaal 4 landingsplaatsen worden gebouwd. Dan groeit het aantal met 1 per 25 gebouwen (vanaf 125).',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: ['Politie'],
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 125
                ? 4
                : Math.floor(buildingsAmountTotal / 25),
        startParkingLots: 1,
        icon: 'helicopter',
    },
    10: {
        caption: 'Uitgangsstelling (UGS)',
        color: '#404040',
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
            'Je kan zo veel voertuigen als je wilt sturen naar een UGS, teamleden kunnen de UGS ook gebruiken om voertuigen. Een UGS blijft 24 uur bestaan, maar je kan het elk moment weer reseten naar 24 uur.',
        isStagingArea: true,
        maxBuildingsFunction: (): number => 1,
        icon: 'warehouse',
    },
    11: {
        caption: 'Politie Hoofdbureau',
        color: '#663300',
        coins: 50,
        credits: 400_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: '2e OvD-P',
                credits: 40_000,
                coins: 5,
                duration: '3 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                unlocksVehicleTypes: [],
                parkingLotReservations: [[35]],
            },
            {
                caption: 'Mobiele Eenheid, Sectie',
                credits: 100_000,
                coins: 20,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 4,
                unlocksVehicleTypes: [39, 40],
                parkingLotReservations: [[39], [40], [40], [40]],
            },
            {
                caption: 'Hondenbrigade',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 4,
                unlocksVehicleTypes: [47, 48],
                parkingLotReservations: [[47], [47], [48], [48]],
            },
            {
                caption: 'Arrestatieteam',
                credits: 200_000,
                coins: 20,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 6,
                unlocksVehicleTypes: [53, 54, 55],
                parkingLotReservations: [[53], [54], [54], [54], [54], [55]],
            },
            {
                caption: 'Arrestantenvervoer',
                credits: 100_000,
                coins: 10,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 2,
                unlocksVehicleTypes: [58],
                parkingLotReservations: [[58], [58]],
            },
            {
                caption: 'Mobiele Eenheid, Aanhoudingseenheid',
                credits: 100_000,
                coins: 20,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                unlocksVehicleTypes: [64],
                parkingLotReservations: [[64]],
            },
            {
                caption: 'Mobiele Eenheid, 2e Sectie',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 3,
                unlocksVehicleTypes: [40],
                parkingLotReservations: [[40], [40], [40]],
            },
            {
                caption: 'Bereden Brigade',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 6,
                unlocksVehicleTypes: [73, 74, 75],
                parkingLotReservations: [
                    [75],
                    [75],
                    [75],
                    [73, 74],
                    [73, 74],
                    [73, 74],
                ],
            },
            {
                caption: 'Waterwerper Uitbreiding',
                credits: 100_000,
                coins: 15,
                duration: '4 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                unlocksVehicleTypes: [84],
                parkingLotReservations: [[84]],
            },
        ],
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special: '',
        startPersonnel: 1,
        startVehicles: ['Officier van Dienst - Politie'],
        schoolingTypes: ['Politie'],
        startParkingLots: 1,
        startParkingLotReservations: [[35]],
        icon: 'shield-halved',
    },
    12: {
        caption: 'Cellencomplex',
        color: '#800000',
        coins: -1,
        credits: 100_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Gevangeniscel',
                credits: 25_000,
                coins: 5,
                duration: '7 Dagen',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Extra cel',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Dagen',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
            {
                caption: 'Grote gevangenis',
                credits: 200_000,
                coins: 50,
                duration: '7 Dagen',
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number =>
                    Math.floor((buildingsByType[12]?.length ?? 0) / 10),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[6][15] ?? 0) < maxExtensions,
                newCells: 10,
                cannotDisable: true,
            },
        ],
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special:
            'Penningmeesters en Admins kunnen de Team cellencomplex met behulp van de credits van de Teamkas uitbreiden.',
        startCells: 1,
        icon: 'border-all',
    },
    13: {
        caption: 'Ambulance VWS-post',
        color: '#eeb611',
        coins: 25,
        credits: 100_000,
        levelPrices: {
            credits: [10_000],
            coins: [10],
        },
        extensions: [],
        levelcost: ['1. 10.000', 'Upgraden naar normale post: 100.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 1,
        special: '',
        startPersonnel: 3,
        startVehicles: ['Ambulance'],
        schoolingTypes: ['Ambulance'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    14: {
        caption: 'Groot gebouwencomplex',
        color: '#ffffff',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['Te duur'],
        maxBuildings: 'Geen limiet',
        maxLevel: 5,
        special:
            'We weten niet wat het nut is behalve dat je een hoop credits of coins kwijt bent.',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: [],
        startParkingLots: 0,
        icon: 'poo',
    },
    15: {
        caption: 'Klein gebouwencomplex',
        color: '#ffffff',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['Te duur'],
        maxBuildings: 'Geen limiet',
        maxLevel: 5,
        special:
            'We weten niet wat het nut is behalve dat je een hoop credits of coins kwijt bent.',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: [],
        startParkingLots: 0,
        icon: 'poo',
    },
    16: {
        caption: 'Waterreddingspost',
        color: '#f5a42a',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [
                10_000,
                25_000,
                50_000,
                75_000,
                ...Array(5).fill(100_000),
                ...Array(5).fill(150_000),
                ...Array(6).fill(200_000),
            ],
            coins: [
                10,
                10,
                15,
                15,
                ...Array(10).fill(20),
                ...Array(6).fill(25),
            ],
        },
        extensions: [
            {
                caption: 'Boten',
                credits: 100_000,
                coins: 15,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [78, 79],
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 25.000',
            '3. 50.000',
            '4. 75.000',
            '5-9. 100.000',
            '10-14. 150.000',
            '15-20. 200.000',
        ],
        maxBuildings: 'Geen limiet',
        maxLevel: 20,
        special: '',
        startPersonnel: 4,
        startVehicles: [],
        schoolingTypes: ['Waterredding'],
        startParkingLots: 1,
        icon: 'person-swimming',
    },
    17: {
        caption: 'Brandweer, Kazerne (klein)',
        color: '#bb0000',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [
            {
                caption: 'Ambulance standplaats',
                credits: 100_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [16, 30, 52, 63],
            },
            ...multiplyExtension(
                {
                    caption: 'Haakarmbak parkeerplaats',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Dagen',
                    isVehicleExtension: true,
                    givesParkingLots: 1,
                    unlocksVehicleTypes: [26, 27, 29, 32, 45, 51, 61],
                    parkingLotReservations: [[27, 29, 32, 45, 51, 61]],
                    cannotDisable: true,
                },
                2
            ),
            null,
            null,
            null,
            {
                caption: 'Waterongevallenbestrijding',
                credits: 400_000,
                coins: 25,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [33, 36, 49, 50],
            },
            null,
            {
                caption: 'Vliegtuigbrandbestrijding',
                credits: 400_000,
                coins: 25,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [41, 42, 43, 44],
                maxExtensionsFunction: (
                    buildingsByType: Record<number, Building[]>
                ): number => Math.floor((buildingsByType[0]?.length ?? 0) / 10),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[0][8] ?? 0) +
                        (boughtExtensionsAmountByType[17][8] ?? 0) <
                    maxExtensions,
            },
            null,
            null,
            null,
            null,
            {
                caption: 'Schuimblussing',
                credits: 150_000,
                coins: 15,
                duration: '5 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [68, 69, 70],
            },
            {
                caption: 'Signalisatie',
                credits: 150_000,
                coins: 20,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [83],
                cannotDisable: true,
            },
            {
                caption: 'Natuurbrandbestrijding',
                credits: 100_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [86, 87, 88, 89],
                cannotDisable: true,
            },
            {
                caption: 'Urban Search and Rescue',
                credits: 150_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [92, 93, 94, 95, 96, 97],
                cannotDisable: true,
            },
            {
                caption: 'Specialisme Technische Hulpverlening',
                credits: 150_000,
                coins: 15,
                duration: '7 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 0,
                unlocksVehicleTypes: [90, 91],
                cannotDisable: true,
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Upgraden naar normale post : Verschil prijs naar normale post',
        ],
        maxBuildings: 'Geen limiet',
        maxLevel: 6,
        special:
            'Vanaf de 25e brandweerkazerne stijgen de kosten voor de bouw van een nieuwe brandweerkazerne volgens de volgende formule: <code>50.000+100.000*LOG<sub>2</sub>(Aantal brandweerposten − 22)</code>. max. 1 miljoen credits. De Coins prijs blijft gelijk!',
        startPersonnel: 10,
        startVehicles: [
            'SI-2',
            'TS 8/9',
            'TST 8/9',
            'TST 6/7',
            'TST 4/5',
            'TS 4/5',
            'TST-NB 8/9',
            'TST-NB 6/7',
            'TST-NB 4/5',
            'TS 6/7',
        ],
        schoolingTypes: ['Brandweer'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    18: {
        caption: 'Politie opkomstbureau (klein)',
        color: '#007700',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(2).fill(100_000)],
            coins: [10, 15, ...Array(2).fill(20)],
        },
        extensions: [
            {
                caption: 'Gevangeniscel',
                credits: 25_000,
                coins: 5,
                duration: '7 Dagen',
                newCells: 1,
                cannotDisable: true,
            },
            {
                caption: 'Extra cel',
                credits: 25_000,
                coins: 5,
                duration: '7 Dagen',
                newCells: 1,
                cannotDisable: true,
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-4. 100.000',
            'Upgraden naar normale post : Verschil prijs naar normale post',
        ],
        maxBuildings: 'Geen limiet',
        maxLevel: 4,
        special:
            'Vanaf het 25e opkomstbureau stijgen de kosten voor de bouw van een nieuw opkomstbureau volgens de volgende formule: <code>50.000+100.000*LOG<sub>2</sub>(Aantal opkomstbureaus − 22)</code>. De Coins prijs blijft gelijk!',
        startPersonnel: 2,
        startVehicles: ['DA Noodhulp'],
        schoolingTypes: ['Politie'],
        startParkingLots: 1,
        startCells: 0,
        icon: 'building-shield',
    },
    19: {
        caption: 'Kustwacht haven',
        color: '#f5a42a',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [
                10_000,
                25_000,
                50_000,
                75_000,
                ...Array(5).fill(100_000),
                ...Array(5).fill(150_000),
                ...Array(6).fill(200_000),
            ],
            coins: [
                10,
                10,
                15,
                15,
                ...Array(10).fill(20),
                ...Array(6).fill(25),
            ],
        },
        extensions: [],
        levelcost: [
            '1. 10.000',
            '2. 25.000',
            '3. 50.000',
            '4. 75.000',
            '5-9. 100.000',
            '10-14. 150.000',
            '15-20. 200.000',
        ],
        maxBuildings: 'Geen limiet',
        maxLevel: 20,
        special:
            'Je kan een generatiegebied instellen om meldingen op zee te krijgen.',
        startPersonnel: 5,
        startVehicles: [],
        schoolingTypes: ['Waterredding'],
        startParkingLots: 1,
        icon: 'person-swimming',
    },
    20: {
        caption: 'SAR academie',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Extra klaslokaal',
                credits: 400_000,
                coins: 40,
                duration: '7 Dagen',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Geen limiet',
        maxLevel: 0,
        special:
            'Penningmeesters en Admins kunnen de Team SAR academie met behulp van de credits van de Teamkas uitbreiden.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    21: {
        caption: 'SAR Helikopter platform',
        color: '#11858d',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'SAR Helicopter Hangar',
                credits: 10_000,
                coins: 1,
                duration: '0 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                unlocksVehicleTypes: [80],
                parkingLotReservations: [[80]],
            },
            {
                caption: 'Extra SAR Helikopter Hangar',
                credits: 200_000,
                coins: 15,
                duration: '4 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                requiredExtensions: [0],
                unlocksVehicleTypes: [80],
                parkingLotReservations: [[80]],
            },
            {
                caption: 'Extra SAR Helikopter Hangar',
                credits: 200_000,
                coins: 15,
                duration: '4 Dagen',
                isVehicleExtension: true,
                givesParkingLots: 1,
                requiredExtensions: [1],
                unlocksVehicleTypes: [80],
                parkingLotReservations: [[80]],
            },
        ],
        levelcost: [],
        maxBuildings: '',
        maxLevel: 0,
        special: '',
        startPersonnel: 2,
        startVehicles: [],
        schoolingTypes: ['Waterredding'],
        startParkingLots: 0,
        icon: 'spaghetti-monster-flying',
    },
    22: {
        caption: 'Steunpunt Rijkswaterstaat',
        color: '#f5a42a',
        coins: 50,
        credits: 100_000,
        levelPrices: {
            credits: [25_000],
            coins: [10],
        },
        extensions: [],
        levelcost: ['1. 25.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 10,
        special: '',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: ['Brandweer'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    23: {
        caption: 'Militaire hangar',
        color: '#af1313',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [250_000],
            coins: [10],
        },
        extensions: [],
        levelcost: ['1. 250.000'],
        maxBuildings: 'Geen limiet',
        maxLevel: 10,
        special: '',
        startPersonnel: 2,
        startVehicles: [],
        schoolingTypes: ['Brandweer'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
} satisfies Record<number, InternalBuilding>;
