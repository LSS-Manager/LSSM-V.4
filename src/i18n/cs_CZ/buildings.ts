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
        caption: 'Požární stanice',
        color: '#bb0000',
        coins: 30,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(37).fill(100_000)],
            coins: [10, 15, ...Array(37).fill(20)],
        },
        extensions: [
            {
                caption: 'Rozšíření záchranné služby',
                credits: 100_000,
                coins: 20,
                duration: '7 dní',
            },
            {
                caption: 'Rozšíření vyprošťovacích prací',
                credits: 125_000,
                coins: 25,
                duration: '3 dny',
            },
            {
                caption: 'Rozšíření vodní záchranné služby',
                credits: 50_000,
                coins: 10,
                duration: '3 dny',
            },
            {
                caption: 'Rozšíření letiště',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Prodloužení čerpadla při poškození vodou',
                credits: 100_000,
                coins: 15,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro sorbentový kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro chemický kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro pěnidlový kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro plynový hasící kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro hadicový kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro technický kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro kontejnerovou elektrocentrálu',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro lodní kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro kontejner pro nouzové zastřešení',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Stání pro týlový kontejner',
                credits: 100_000,
                coins: 20,
                duration: '5 dní',
            },
            {
                caption: 'Přidáno stání pro kontejner',
                credits: 100_000,
                coins: 20,
                duration: '7 dní',
            },
            {
                caption: 'Přidáno stání pro kontejner',
                credits: 100_000,
                coins: 20,
                duration: '7 dní',
            },
            {
                caption: 'Velká požární stanice',
                credits: 1_000_000,
                coins: 50,
                duration: '7 dny',
                maxExtensionsFunction: buildingsByType =>
                    Math.floor(
                        ((Object.keys(buildingsByType[0] ?? {})?.length ?? 0) +
                            (Object.keys(buildingsByType[18] ?? {})?.length ??
                                0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[0][9] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-39. 100.000'],
        maxBuildings: 'Bez limitů',
        maxLevel: 24,
        special:
            'Po vybudování 25 stanic cena těchto staveb roste. Aktuálně se cena stanic počítá podle následujícího vzorečku: <code>100.000+(200.000*log<sub>2</sub>(počet vybudovyných stanic − 22))</code>. Cena v mincích zůstává stále stejná!',
        startPersonnel: 10,
        startVehicles: ['CAS 20', 'CAS 30'],
        startParkingLots: 1,
        schoolingTypes: ['Školní a výcvikové zařízení HZS'],
        schools: [1],
        icon: 'fire-flame-curved',
    },
    1: {
        caption: 'Školní a výcvikové zařízení HZS',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Více tříd',
                credits: 400_000,
                coins: 40,
                duration: '7 dní',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Bez limitu',
        maxLevel: 0,
        startClassrooms: 1,
        school: '',
        special:
            "Správci financí a administrátoři mohou stavět / rozšiřovat hasičské školy pomocí kreditů z alianční pokladny. Správci školení a administrátoři mohou zahájit školení na hasičských školách aliance.",
        icon: 'graduation-cap',
    },
    2: {
        caption: 'Výjezdové stanoviště ZZS',
        color: '#ffa500',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(37).fill(100_000)],
            coins: [10, 15, ...Array(37).fill(20)],
        },
        extensions: [
            {
                caption: 'Velká stanice záchranné služby',
                credits: 1_000_000,
                coins: 50,
                duration: '7 dny',
                maxExtensionsFunction: buildingsByType =>
                    Math.floor(
                        ((Object.keys(buildingsByType[2] ?? {}).length ?? 0) +
                            (Object.keys(buildingsByType[20] ?? {}).length ??
                                0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[2][0] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-39. 100.000'],
        maxBuildings: 'Bez limitu',
        maxLevel: 14,
        special: '',
        startPersonnel: 3,
        startParkingLots: 1,
        startVehicles: ['RZP'],
        schoolingTypes: ['Zdravotnická akademie'],
        schools: [3],
        icon: 'house-medical',
    },
    3: {
        caption: 'Zdravotnická akademie',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Additional classroom',
                credits: 400_000,
                coins: 40,
                duration: '7 dní',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Bez limitu',
        maxLevel: 0,
        startClassrooms: 1,
        school: '',
        special:
            "Správci financí a administrátoři mohou stavět / rozšiřovat zdravotnické akademie pomocí kreditů z alianční pokladny. Správci školení a administrátoři mohou zahájit školení na zdravotnické akademii aliance.",
        icon: 'graduation-cap',
    },
    4: {
        caption: 'Nemocnice',
        color: '#bbe944',
        coins: 25,
        credits: 200_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Všeobecný internista',
                credits: 10_000,
                coins: 10,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Všeobecný chirurg',
                credits: 10_000,
                coins: 10,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Gynekologie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Urologie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Úrazová chirurgie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Neurologie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Neurochirurgie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Kardiologie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Kardiochirurgie',
                credits: 70_000,
                coins: 15,
                duration: '7 dní',
                cannotDisable: true,
            },
            {
                caption: 'Velká nemocnice',
                credits: 200_000,
                coins: 50,
                duration: '7 dni',
                maxExtensionsFunction: buildingsByType =>
                    Math.floor(
                        (Object.keys(buildingsByType[4] ?? {}).length ?? 4) / 5
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[4][9] ?? 0) < maxExtensions,
                newBeds: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1.-20. 19.000 Kreditů / 11 Mincí'],
        maxBuildings: 'Bez limitu',
        maxLevel: 20,
        startBeds: 10,
        special:
            'Správci financí a administrátoři mohou stavět / rozšiřovat nemocnice pomocí kreditů z alianční pokladny.',
        icon: 'hospital',
    },
    5: {
        caption: 'Základna Letecké záchranné služby',
        color: '#e7ad2f',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'see specials',
        maxLevel: 0,
        special:
            'Do 100 stanic jakéhokoliv druhu = 4 základny vrtulníků nebo úrovně základen. Každých 10 stanic jakéhokoliv druhu nad 100. stanici (tj. 110, 120, 130 atd.) přidá možnost postavit jednu základnu vrtulníku nebo jednu úroveň základny',
        startPersonnel: 0,
        startVehicles: [],
        startParkingLots: 1,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 100
                ? 4
                : Math.floor(buildingsAmountTotal / 10),
        schoolingTypes: ['Zdravotnická akademie'],
        schools: [3],
        icon: 'circle-h',
    },
    6: {
        caption: 'Obvodní oddělení Policie',
        color: '#007700',
        coins: 35,
        credits: 100_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            ...multiplyExtension(
                {
                    caption: 'Vězeňská cela',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 dní',
                    newCells: 1,
                    cannotDisable: true,
                },
                10
            ),
            {
                caption: 'Rozšíření pořádkové jednotky',
                credits: 200_000,
                coins: 25,
                duration: '5 dní',
            },
            {
                caption: 'Rozšiřující kapacita pro policejní antony',
                credits: 100_000,
                coins: 15,
                duration: '5 dní',
            },
            {
                caption: 'Rozšiřující kapacita pro vodní stříkače PČR',
                credits: 100_000,
                coins: 15,
                duration: '5 dní',
            },
            {
                caption: 'Rozšiřující kapacita pro vozidla velitele PČR',
                credits: 100_000,
                coins: 15,
                duration: '5 dní',
            },
            {
                caption: 'Velká policejní stanice',
                credits: 1_000_000,
                coins: 50,
                duration: '7 dni',
                maxExtensionsFunction: buildingsByType =>
                    Math.floor(
                        ((Object.keys(buildingsByType[6] ?? {}).length ?? 0) +
                            (Object.keys(buildingsByType[19] ?? {}).length ??
                                0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[6][14] ?? 0) < maxExtensions,
                isVehicleExtension: true,
                givesParkingLots: 10,
                cannotDisable: true,
            },
            {
                caption: 'Velké vězení',
                credits: 200_000,
                coins: 50,
                duration: '7 dni',
                maxExtensionsFunction: buildingsByType =>
                    Math.floor(
                        ((Object.keys(buildingsByType[6] ?? {}).length ?? 0) +
                            (Object.keys(buildingsByType[19] ?? {}).length ??
                                0)) /
                            10
                    ),
                canBuyByAmount: (boughtExtensionsAmountByType, maxExtensions) =>
                    (boughtExtensionsAmountByType[6][15] ?? 0) < maxExtensions,
                newCells: 10,
                cannotDisable: true,
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-39. 100.000'],
        maxBuildings: 'Bez limitu',
        maxLevel: 39,
        special:
            'Po vybudování 25 stanic cena těchto staveb roste. Aktuálně se cena stanic počítá podle následujícího vzorečku: <code>100.000+(200.000*log<sub>2</sub>(počet vybudovyných stanic − 22))</code>. Cena v mincích zůstává stále stejná!',
        startPersonnel: 2,
        startParkingLots: 1,
        startCells: 0,
        startVehicles: ['Policejní automobil'],
        schoolingTypes: ['Policejní Akademie'],
        schools: [8],
        icon: 'building-shield',
    },
    7: {
        caption: 'Operační středisko',
        color: '#24c3ae',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'All 25 buildings one control center',
        maxLevel: 0,
        special: 'Operační středisko je administrativní budova.',
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            Math.floor(buildingsAmountTotal / 25) + 1,
        isDispatchCenter: true,
        icon: 'tower-broadcast',
    },
    8: {
        caption: 'Policejní Akademie',
        color: '#225522',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Více tříd',
                credits: 400_000,
                coins: 40,
                duration: '7 dní',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Bez limitu',
        maxLevel: 0,
        startClassrooms: 1,
        school: '',
        special:
            "Správci financí a administrátoři mohou stavět / rozšiřovat policejní akademie pomocí kreditů z alianční pokladny. Správci školení a administrátoři mohou zahájit školení na policejní akademii aliance.",
        icon: 'graduation-cap',
    },
    13: {
        caption: 'Základna Letecké služby PČR',
        color: '#148423',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [1_000_000],
            coins: [50],
        },
        extensions: [],
        levelcost: ['1. 1.000.000 Kreditů / 50 Mincí'],
        maxBuildings: 'see specials',
        maxLevel: 1,
        special:
            'Do 100 stanic jakéhokoliv druhu = 4 základny vrtulníků nebo úrovně základen. Každých 10 stanic jakéhokoliv druhu nad 100. stanici (tj. 110, 120, 130 atd.) přidá možnost postavit jednu základnu vrtulníku nebo jednu úroveň základny',
        startPersonnel: 3,
        startVehicles: [],
        startParkingLots: 1,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 100
                ? 4
                : Math.floor(buildingsAmountTotal / 10),
        schoolingTypes: ['Policejní Akademies'],
        schools: [8],
        icon: 'helicopter',
    },
    14: {
        caption: 'Přípravná oblast',
        color: '#c259b5',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 4,
        maxLevel: 0,
        special:
            'Přípravnou plochu lze vybudovat zdarma a zpočátku je k dispozici po dobu 24 hodin. Jednotky mohou po tuto dobu využívat tuto oblast jako svou základnu a být z ní vyslány do akce.',
        maxBuildingsFunction: (): number => 4,
        isStagingArea: true,
        icon: 'warehouse',
    },
    15: {
        caption: 'Vodní záchranná služba ČČK',
        color: '#ffa500',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(37).fill(100_000)],
            coins: [10, 15, ...Array(37).fill(20)],
        },
        extensions: [],
        levelcost: ['1. 10.000', '2. 50.000', '3.-39. 100.000'],
        maxBuildings: 'Bez limitu',
        maxLevel: 39,
        special: '',
        startPersonnel: 3,
        startVehicles: [],
        startParkingLots: 1,
        schoolingTypes: ['Školící středisko VZS ČČK'],
        schools: [3],
        icon: 'person-swimming',
    },
    18: {
        caption: 'Požární stanice (malá)',
        color: '#aa1111',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Rozšiřte na normální Požární stanici',
        ],
        maxBuildings: 'Bez limitu',
        maxLevel: 5,
        special: '',
        startPersonnel: 10,
        startVehicles: ['CAS 20', 'CAS 30'],
        startParkingLots: 1,
        schoolingTypes: ['Školní a výcvikové zařízení HZS'],
        schools: [2],
        icon: 'fire-flame-curved',
    },
    19: {
        caption: 'Obvodní oddělení Policie (malé)',
        color: '#116611',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(2).fill(100_000)],
            coins: [10, 15, ...Array(2).fill(20)],
        },
        extensions: [],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Rozšiřte na normální Policejní stanici',
        ],
        maxBuildings: 'No limit',
        maxLevel: 4,
        special: '',
        startPersonnel: 2,
        startVehicles: ['Policejní automobil'],
        startParkingLots: 1,
        schoolingTypes: ['Policejní Akademie'],
        schools: [8],
        icon: 'building-shield',
    },
    20: {
        caption: 'Výjezdové stanoviště ZZS (malá)',
        color: '#eeb611',
        coins: 25,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Rozšiřte na normální Záchranářskou stanici',
        ],
        maxBuildings: 'Bez limitu',
        maxLevel: 5,
        special: '',
        startPersonnel: 3,
        startParkingLots: 1,
        startVehicles: ['RZP'],
        schoolingTypes: ['Zdravotnická akademie'],
        schools: [3],
        icon: 'house-medical',
    },
    21: {
        caption: 'Pyrotechnická služba PČR',
        color: '#663300',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [],
        levelcost: ['1. 10.000', '2. 50.000', '3.-5. 100.000'],
        maxBuildings: 'Bez limitu',
        maxLevel: 5,
        special: '',
        startPersonnel: 4,
        startVehicles: [],
        startParkingLots: 2,
        schoolingTypes: ['Policejní Akademie'],
        schools: [8],
        icon: 'explosion',
    },
    22: {
        caption: 'Školící středisko VZS ČČK',
        color: '#225522',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Více tříd',
                credits: 400_000,
                coins: 40,
                duration: '7 dní',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Bez limitu',
        maxLevel: 0,
        special:
            "Správci financí a administrátoři mohou stavět / rozšiřovat školící středisko VZS ČČK pomocí kreditů z alianční pokladny. Správci školení a administrátoři mohou zahájit školení na školící středisko VZS ČČK aliance.",
        startClassrooms: 1,
        school: '',
        icon: 'graduation-cap',
    },
    25: {
        caption: 'Stáje jízdní policie',
        color: '#2fcee7',
        coins: 25,
        credits: 150_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'Bez limitu',
        maxLevel: 0,
        special: '',
        startPersonnel: 4,
        startVehicles: [],
        startParkingLots: 3,
        schoolingTypes: ['Policejní Akademie'],
        schools: [8],
        icon: 'horse-head',
    },
} satisfies Record<number, InternalBuilding>;
