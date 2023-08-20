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
        caption: 'Brandstation',
        color: '#bb0000',
        coins: 30,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(22).fill(100_000)],
            coins: [10, 15, ...Array(22).fill(20)],
        },
        extensions: [
            {
                caption: 'Ambulansutbyggnad',
                credits: 50_000,
                coins: 20,
                duration: '7 dagar',
            },
            {
                caption: 'Skogsexpansionen',
                credits: 50_000,
                coins: 13,
                duration: '7 dagar',
            },
            {
                caption: 'Brandstöds Expansionen',
                credits: 150_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Sjöräddning',
                credits: 100_000,
                coins: 20,
                duration: '7 dagar',
            },
        ],
        levelcost: ['1. 10.000 ', '2. 50.000', '3.-24. 100.000'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 24,
        special:
            'Priset på dina positioner ökar när du äger 25. Så hastigheten på progressionen är konstant när du har en stor inkomstström på dessa spelnivåer. Den nuvarande formeln för att beräkna priset på positioner är följande: <kod> 100.000+ (200.000 * LOGG <sub> 2 </sub> (Antal befintliga brandstationer - 22)) </code>.',
        startPersonnel: 10,
        startVehicles: ['BAS 1 - Släckbil', 'BAS 2 - Släckbil'],
        schoolingTypes: ['Brandstation'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    1: {
        caption: 'Brandskola',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Fler klassrum',
                credits: 400_000,
                coins: 40,
                duration: '7 dagar',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Ingen gräns',
        maxLevel: 0,
        special:
            'CFO och administratörer kan förbättra byggnaden genom Alliance Bank. <br> Utbildningsledare och administratörer kan initiera utbildningar.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    2: {
        caption: 'Ambulansstation',
        color: '#ffa500',
        coins: 35,
        credits: 200_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(12).fill(100_000)],
            coins: [10, 15, ...Array(12).fill(20)],
        },
        extensions: [
            {
                caption: 'Intensivvårdsavdelning',
                credits: 200_000,
                coins: 25,
                duration: '7 dagar',
            },
        ],
        levelcost: ['1. 10.000', '2. 50.000 ', '3.-14. 100.000'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 14,
        special: '',
        startPersonnel: 3,
        startVehicles: ['Ambulans'],
        schoolingTypes: ['Rädda'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    3: {
        caption: 'Vård- och hälsohögskola',
        color: '#992222',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Fler klassrum',
                credits: 400_000,
                coins: 40,
                duration: '7 dagar',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Ingen gräns',
        maxLevel: 0,
        special:
            'CFO och administratörer kan förbättra byggnaden genom Alliance Bank. <br> Utbildningsledare och administratörer kan initiera utbildningar.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    4: {
        caption: 'Sjukhus',
        color: '#bbe944',
        coins: 25,
        credits: 200_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Allmänt internt',
                credits: 10_000,
                coins: 10,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Allmän kirurg',
                credits: 10_000,
                coins: 10,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Gynekologi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Urologi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Traumatologi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Neurology',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Neurokirurgi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Kardiologi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
            {
                caption: 'Hjärtkirurgi',
                credits: 70_000,
                coins: 15,
                duration: '7 dagar',
                cannotDisable: true,
            },
        ],
        levelcost: ['1.-20. 19.000 Credits / 11 coins'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 20,
        special:
            'Ekonomichefen och administratörerna kan bygga och utöka sjukhusgranserna vid alliansbanken',
        startBeds: 10,
        icon: 'hospital',
    },
    5: {
        caption: 'Ambulanshelikopterstation',
        color: '#e7ad2f',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'se Specialfunktioner',
        maxLevel: 0,
        special: 'Max antal stationer: antal buildings dividerat med 25.',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: ['Rädda'],
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 125
                ? 4
                : Math.floor(buildingsAmountTotal / 25),
        startParkingLots: 1,
        icon: 'circle-h',
    },
    6: {
        caption: 'Polisstation',
        color: '#007700',
        coins: 35,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(12).fill(100_000)],
            coins: [10, 15, ...Array(12).fill(20)],
        },
        extensions: [
            {
                caption: 'Fängelsecell',
                credits: 25_000,
                coins: 5,
                duration: '7 dagar',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Fler celler',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 dagar',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
            {
                caption: 'Trafikpolisutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Cykelpolisutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Bombskyddsutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Yttrebefäl',
                credits: -1,
                coins: 25,
                duration: '7 dagar',
            },
            {
                caption: 'Polisens transportenhet',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
        ],
        levelcost: ['1. 10.000', '2. 50 000', '3.-14. 100.000'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 14,
        startPersonnel: 2,
        startVehicles: ['Radiobil'],
        schoolingTypes: ['Polis'],
        startParkingLots: 1,
        startCells: 0,
        special: '',
        icon: 'building-shield',
    },
    7: {
        caption: 'Svarpunkt',
        color: '#24c3ae',
        coins: 0,
        credits: 0,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: [],
        maxBuildings: 'En CTA för varje 25 buildings',
        maxLevel: 0,
        special: 'CTA är det administrativa centrumet.',
        isDispatchCenter: true,
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            Math.floor(buildingsAmountTotal / 25) + 1,
        icon: 'tower-broadcast',
    },
    8: {
        caption: 'Polishögskola',
        color: '#225522',
        coins: 50,
        credits: 500_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: multiplyExtension(
            {
                caption: 'Fler klassrum',
                credits: 400_000,
                coins: 40,
                duration: '7 dagar',
                newClassrooms: 1,
                cannotDisable: true,
            },
            3
        ),
        levelcost: [],
        maxBuildings: 'Ingen gräns',
        maxLevel: 0,
        special:
            'Finansministrar och administratörer kan (utöka) föreningspolisskolor med hjälp av poäng från föreningens finans. Kursmästare och administratörer kan starta kurser på föreningens polisskolor.',
        startClassrooms: 1,
        icon: 'graduation-cap',
    },
    13: {
        caption: 'Polisflyg',
        color: '#148423',
        coins: 50,
        credits: 1_000_000,
        levelPrices: {
            credits: [1_000_000],
            coins: [50],
        },
        extensions: [],
        levelcost: ['1. 1.000.000 Credits / 50 coins'],
        maxBuildings: 'se Specialfunktioner',
        maxLevel: 1,
        special:
            'Upp till 7 landningsplatser kan byggas per station (expansionssteg). Upp till den 125: e byggnaden (av alla typer) totalt max. Fyra landningsplatser kommer att byggas. Sedan ökar antalet med 1 var 25: e byggnad (börjar vid 125: e).',
        startPersonnel: 0,
        startVehicles: [],
        schoolingTypes: ['Polis'],
        maxBuildingsFunction: (buildingsAmountTotal: number): number =>
            buildingsAmountTotal < 125
                ? 4
                : Math.floor(buildingsAmountTotal / 25),
        startParkingLots: 1,
        icon: 'helicopter',
    },
    14: {
        caption: 'Uppsamlingsområde',
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
            'Du kan bygga mittzonen gratis. Detta fungerar som en plattform och låter dig parkera och tillfälligt distribuera dina enheter. Det försvinner efter 24 timmar. Välj den eller de enheter du vill distribuera här. ',
        isStagingArea: true,
        maxBuildingsFunction: (): number => 1,
        icon: 'warehouse',
    },
    16: {
        caption: 'Fängelse',
        color: '#00ff00',
        coins: -1,
        credits: 100_000,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [
            {
                caption: 'Fängelsecell',
                credits: 25_000,
                coins: 5,
                duration: '7 dagar',
                newCells: 1,
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Fler celler',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 dagar',
                    newCells: 1,
                    cannotDisable: true,
                },
                9
            ),
            ...multiplyExtension(
                {
                    caption: 'Fler celler',
                    credits: 50_000,
                    coins: 5,
                    duration: '7 dagar',
                    newCells: 1,
                    cannotDisable: true,
                },
                10
            ),
        ],
        levelcost: [],
        maxBuildings: 'Ingen gräns',
        maxLevel: 0,
        special:
            'Denna byggnad kan endast byggas av CFO eller administratörer med Alliance Bank-credits. Celler är tillgängliga för alla alliansmedlemmar.',
        startCells: 1,
        icon: 'border-all',
    },
    18: {
        caption: 'Brandstation (liten)',
        color: '#aa1111',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [
            {
                caption: 'Ambulansutbyggnad',
                credits: 50_000,
                coins: 20,
                duration: '7 dagar',
            },
            {
                caption: 'Skogsexpansionen',
                credits: 50_000,
                coins: 13,
                duration: '7 dagar',
            },
            {
                caption: 'Brandstöds Expansionen',
                credits: 150_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Sjöräddning',
                credits: 100_000,
                coins: 20,
                duration: '7 dagar',
            },
        ],
        levelcost: [
            '1. 10.000 ',
            '2. 50.000 ',
            '3.-5. 100_000',
            'Det här är en liten kasern. Om du vill bygga utbuildings eller öka antalet vehiclesplatser måste du uppgradera den för att göra den till en vanlig kasern. Denna process tar 24 timmar.',
        ],
        maxBuildings: 'Ingen gräns',
        maxLevel: 5,
        special:
            'Priset på dina positioner ökar när du äger 25. Så hastigheten på progressionen är konstant när du har en stor inkomstström på dessa spelnivåer. Den nuvarande formeln för att beräkna priset på positioner är följande: <kod> (50.000+100.000 * LOGG <sub> 2 </sub> (Antal befintliga brandstationer - 22)) </code>.',
        startPersonnel: 10,
        startVehicles: ['BAS 1 - Släckbil', 'BAS 2 - Släckbil'],
        schoolingTypes: ['Brandstation'],
        startParkingLots: 1,
        icon: 'fire-flame-curved',
    },
    19: {
        caption: 'Polisstation (liten)',
        color: '#116611',
        coins: 25,
        credits: 50_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(2).fill(100_000)],
            coins: [10, 15, ...Array(2).fill(20)],
        },
        extensions: [
            {
                caption: 'Fängelsecell',
                credits: 25_000,
                coins: 5,
                duration: '7 dagar',
                newCells: 1,
                cannotDisable: true,
            },
            {
                caption: 'Fler celler',
                credits: 25_000,
                coins: 5,
                duration: '7 dagar',
                newCells: 1,
                cannotDisable: true,
            },
            {
                caption: 'Trafikpolisutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Cykelpolisutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Bombskyddsutbyggnad',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
            {
                caption: 'Yttrebefäl',
                credits: -1,
                coins: 25,
                duration: '7 dagar',
            },
            {
                caption: 'Polisens transportenhet',
                credits: 50_000,
                coins: 15,
                duration: '5 dagar',
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-4. 100.000',
            'Det här är en liten polisstation. Om du vill utöka det eller bygga fler extensions måste du bygga om det till en vanlig polisstation. Denna process tar 24 timmar. ',
        ],
        maxBuildings: 'Ingen gräns',
        maxLevel: 4,
        special:
            'Priset på dina positioner ökar när du äger 25. Så hastigheten på progressionen är konstant när du har en stor inkomstström på dessa spelnivåer. Den nuvarande formeln för att beräkna priset på positioner är följande: <kod> (50.000+100.000 * LOGG <sub> 2 </sub> (Antal befintliga brandstationer - 22)) </code>.',
        startPersonnel: 2,
        startVehicles: ['Radiobil'],
        schoolingTypes: ['Polis'],
        startParkingLots: 1,
        icon: 'building-shield',
    },
    20: {
        caption: 'Ambulansstation (liten)',
        color: '#eeb611',
        coins: 25,
        credits: 100_000,
        levelPrices: {
            credits: [10_000, 50_000, ...Array(3).fill(100_000)],
            coins: [10, 15, ...Array(3).fill(20)],
        },
        extensions: [
            {
                caption: 'Intensivvårdsavdelning',
                credits: 200_000,
                coins: 25,
                duration: '7 dagar',
            },
        ],
        levelcost: [
            '1. 10.000',
            '2. 50.000',
            '3.-5. 100.000',
            'Det här är en liten ambulansstation. Om du vill utöka det eller bygga fler extensions måste du bygga om det till en vanlig Paramedic Post. Denna process tar 24 timmar. ',
        ],
        maxBuildings: 'Ingen gräns',
        maxLevel: 5,
        special: '',
        startPersonnel: 3,
        startVehicles: ['Ambulans'],
        schoolingTypes: ['Räddar'],
        startParkingLots: 1,
        icon: 'house-medical',
    },
    21: {
        caption: 'Brandflygsstation',
        color: '#db7918',
        coins: 65,
        credits: 1_500_000,
        levelPrices: {
            credits: [1_500_000],
            coins: [65],
        },
        extensions: [],
        levelcost: ['1. 1.500.000'],
        maxBuildings: 'No limit',
        maxLevel: 2,
        special: '',
        startPersonnel: 2,
        startVehicles: ['Brandhelikopter'],
        schoolingTypes: ['Brandstation'],
        startParkingLots: 1,
        icon: 'helicopter',
    },
    22: {
        caption: 'Stort komplex',
        color: '#8B4513',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['För dyrt'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 5,
        special: 'FÖR DYRT, KÖP DET INTE, BYGG INTE UT DET',
        startPersonnel: 0,
        startVehicles: [''],
        schoolingTypes: [],
        startParkingLots: 0,
        icon: 'poo',
    },
    23: {
        caption: 'Litet komplex',
        color: '#8B4513',
        coins: -1,
        credits: -1,
        levelPrices: {
            credits: [],
            coins: [],
        },
        extensions: [],
        levelcost: ['För dyrt'],
        maxBuildings: 'Ingen gräns',
        maxLevel: 5,
        special: 'FÖR DYRT, KÖP DET INTE, BYGG INTE UT DET',
        startPersonnel: 0,
        startVehicles: [''],
        schoolingTypes: [],
        startParkingLots: 0,
        icon: 'poo',
    },
} satisfies Record<number, InternalBuilding>;
