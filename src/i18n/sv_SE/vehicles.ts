import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'BAS 1 - Släckbil',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
    },
    1: {
        caption: 'BAS 2 - Släckbil',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1500,
    },
    2: {
        caption: 'Stegbil',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Krävs när du har byggt 3 brandstationer',
    },
    3: {
        caption: 'Brandbefäl',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Krävs när du har byggt 6 brandstationer',
    },
    4: {
        caption: 'Lastväxlare',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Krävs när du har byggt 4 brandstationer',
    },
    5: {
        caption: 'Ambulans',
        color: '#9c5e1c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    6: {
        caption: 'Tankbil',
        color: '#aa0000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 6000,
        special: 'Krävs när du har byggt 7 brandstationer',
    },
    7: {
        caption: 'Kemskyddsenhet',
        color: '#770000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brandstation: {
                    'Farligt gods': {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Krävs när du har byggt 11 brandstationer',
    },
    8: {
        caption: 'Radiobil',
        color: '#277a3a',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'Ambulanshelikopter',
        color: '#e68319',
        credits: 300_000,
        coins: 30,
        staff: { min: 3, max: 5 },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'Luftfordon',
        color: '#d90e0e',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Krävs när du har byggt 5 brandstationer',
    },
    11: {
        caption: 'Räddningsledning',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brandstation: {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Nödvändigt när du har byggt 13 Brandstationbaser',
    },
    12: {
        caption: 'Räddningsbil',
        color: '#b80000',
        credits: 19_000,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
    },
    13: {
        caption: 'Polishelikopter',
        color: '#258900',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 4,
            training: {
                Polis: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [13],
    },
    14: {
        caption: 'Bepansrat insatsfordon',
        color: '#158900',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 8,
            max: 8,
            training: {
                Polis: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    15: {
        caption: 'Hundenhet',
        color: '#1e8900',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polis: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Krävs från 6 polisstationer',
    },
    16: {
        caption: 'Polismotorcykel',
        color: '#008902',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                Polis: {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    17: {
        caption: 'Insatsfordon',
        color: '#00891e',
        credits: 6000,
        coins: 12,
        staff: {
            min: 3,
            max: 5,
            training: {
                Polis: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Krävs när du har byggt 8 polisstationer',
    },
    18: {
        caption: 'Dykbil',
        color: '#226baa',
        credits: 19_000,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brandstation: {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    19: {
        caption: 'Tryckkammarbil',
        color: '#226baa',
        credits: 19_000,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brandstation: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    20: {
        caption: 'Liten räddningsbåt',
        color: '#2264aa',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        special:
            'Tillbehörsbåt som kan bogseras med verktygenheten. Kräver att Liten räddningsbåt-utbildad personal ska fungera. <br> Båttrailern kan inte tilldelas personal, <br> antingen tilldela din utbildade personal till dragvehicleet eller tilldela dem till en separat enhet på väg.',
    },
    21: {
        caption: 'Terrängbil',
        color: '#d71919',
        credits: 19_000,
        coins: 19,
        staff: { min: 3, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0],
        special: '',
    },
    22: {
        caption: 'Bandvagn',
        color: '#d71919',
        credits: 8000,
        coins: 8,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        special: '',
    },
    23: {
        caption: 'ATV',
        color: '#d71919',
        credits: 5000,
        coins: 5,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0],
        special: '',
    },
    24: {
        caption: 'Polishäst',
        color: '#158900',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 0,
            max: 0,
            training: {
                Polis: {
                    police_horse: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Nödvändigt dragvehicle (Radiobil)',
    },
    25: {
        caption: 'Brandhelikopter',
        color: '#226baa',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 5,
            training: {
                Brandstation: {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [21],
        waterTank: 7500,
    },
    26: {
        caption: 'Vattenbombare',
        color: '#226baa',
        credits: 1_000_000,
        coins: 50,
        staff: {
            min: 2,
            max: 5,
            training: {
                Brandstation: {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [21],
        waterTank: 7200,
    },
    27: {
        caption: 'Stor Vattenbombare',
        color: '#226baa',
        credits: 1_500_000,
        coins: 65,
        staff: {
            min: 2,
            max: 5,
            training: {
                Brandstation: {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [21],
        waterTank: 12_000,
    },
    28: {
        caption: 'Akutläkarbil',
        color: '#e68319',
        credits: 4000,
        coins: 20,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    29: {
        caption: 'FIP',
        color: '#e68319',
        credits: 4000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandstation: {
                    coresponder: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    30: {
        caption: 'Lättvårdsambulans',
        color: '#e68319',
        credits: 5000,
        coins: 12,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    31: {
        caption: 'Ledningsfordon',
        color: '#e68319',
        credits: 25_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special: 'Krävs när du har byggt 6 ambulansstationer',
    },
    32: {
        caption: 'Jourläkare',
        color: '#e68319',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandstation: {
                    critical_care: {
                        all: true,
                    },
                },
                ['Räddar']: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2],
    },
    33: {
        caption: 'IVPA',
        color: '#e68319',
        credits: 4000,
        coins: 20,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [2],
    },
    34: {
        caption: 'MC-Ambulans',
        color: '#e68319',
        credits: 12_000,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandstation: {
                    rapid_response_motorcycle: {
                        all: true,
                    },
                },
                ['Räddar']: {
                    rapid_response_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    35: {
        caption: 'Slangbil',
        color: '#d71919',
        credits: 15_000,
        coins: 10,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    36: {
        caption: 'Slangbil med pump',
        color: '#d71919',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    37: {
        caption: 'Skumenhet',
        color: '#d71919',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 3000,
    },
    38: {
        caption: 'Motorspruta',
        color: '#d71919',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        special:
            'Nödvändigt dragfordon (BAS 1 - Släckbil, BAS 2 - Släckbil, Tankbil, Skumenhet, Slangbil, Slangbil med pump)',
    },
    39: {
        caption: 'Trafikpolis',
        color: '#158900',
        credits: -1,
        coins: -1,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    40: {
        caption: 'Cykelpolis',
        color: '#158900',
        credits: -1,
        coins: -1,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    41: {
        caption: 'NBS',
        color: '#158900',
        credits: -1,
        coins: -1,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    42: {
        caption: 'YB',
        color: '#158900',
        credits: -1,
        coins: -1,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    43: {
        caption: 'Häktesbuss',
        color: '#158900',
        credits: -1,
        coins: -1,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    44: {
        caption: 'Polistransport',
        color: '#158900',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 2,
            max: 8,
            training: {
                Polis: {
                    Insatspolisutbildning: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
} satisfies Record<number, InternalVehicle>;
