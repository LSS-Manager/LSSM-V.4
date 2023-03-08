import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'ABP',
        color: '#bf0a0a',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 8000,
        foamTank: 250,
    },
    1: {
        caption: 'AS',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 3 caserme dei pompieri',
    },
    2: {
        caption: 'AV/FNZ',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 6 caserme dei pompieri',
    },
    3: {
        caption: 'CA/POLI',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 4 caserme dei pompieri',
    },
    4: {
        caption: 'Ambulanza BLSD',
        color: '#9c6d1c',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    5: {
        caption: 'KILO',
        color: '#990000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 18_000,
        special: 'Richiesta dopo aver costruito 7 caserme dei pompieri',
    },
    6: {
        caption: 'AF/NBCR',
        color: '#770000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Caserma dei vigili del fuoco': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 11 caserme dei pompieri',
    },
    7: {
        caption: 'Volante',
        color: '#2c8123',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    8: {
        caption: 'Elisoccorso',
        color: '#e69b19',
        credits: 300_000,
        coins: 30,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    9: {
        caption: 'APS',
        color: '#bb0000',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 2500,
        foamTank: 400,
    },
    10: {
        caption: 'AF/ARIA',
        color: '#aa0000',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver cstruito 5 caserme dei pompieri.',
    },
    11: {
        caption: 'UCL',
        color: '#791515',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Caserma dei vigili del fuoco': {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 13 caserme dei pompieri',
    },
    12: {
        caption: 'AG',
        color: '#dc1818',
        credits: 18_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Caserma dei vigili del fuoco': {
                    fwk: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Richiesto dopo aver costruito 8 caserme dei pompieri',
    },
    13: {
        caption: 'Elicottero della Polizia',
        color: '#227723',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 5,
            training: {
                Polizia: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [13],
        special:
            'Può essere acquistato con i crediti all raggiungimento del Rango:Caporeparto esperto.',
    },
    14: {
        caption: 'Furgone antisommossa',
        color: '#12a521',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
            max: 9,
            training: {
                Polizia: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 21],
        special: 'Richiesto dopo aver costruito 8 stazioni di polizia ',
    },
    15: {
        caption: 'Unità cinofila antidroga',
        color: '#36aa22',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polizia: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 21],
        special: 'Richiesta dopo aver costruito 6 stazioni di polizia',
    },
    16: {
        caption: 'Moto della Polizia',
        color: '#296622',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                Polizia: {
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
        caption: 'UOPI SUV',
        color: '#178813',
        credits: 7000,
        coins: 23,
        staff: {
            min: 2,
            max: 4,
            training: {
                Polizia: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 21],
        special: 'Richiesto dopo aver costruito 8 stazioni di polizia',
    },
    18: {
        caption: 'VLV',
        color: '#685d12',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                'Caserma dei vigili del fuoco': {
                    notarzt: {
                        all: true,
                    },
                },
                'Soccorso': {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
        special: 'Richiesto dopo aver costruito 3 stazioni di soccorso ',
    },
    19: {
        caption: 'MSA',
        color: '#f59f00',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Caserma dei vigili del fuoco': {
                    notarzt: {
                        all: true,
                    },
                },
                'Soccorso': {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    20: {
        caption: 'Ambulanza ordinaria',
        color: '#e09200',
        credits: 5000,
        coins: 20,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    21: {
        caption: 'Volante Finanza',
        color: '#001bcc',
        credits: 15_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [21],
    },
    22: {
        caption: 'Furgone artificieri',
        color: '#0a2bff',
        credits: 35_000,
        coins: 35,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polizia: {
                    fbi_bomb_tech: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    23: {
        caption: 'Camion NSSA',
        color: '#7181e7',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Caserma dei vigili del fuoco': {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 15],
    },
    24: {
        caption: 'Pickup SAF',
        color: '#6b7dee',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                'Caserma dei vigili del fuoco': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 15],
    },
    25: {
        caption: 'Barca',
        color: '#7187ff',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 15],
        special: 'Mezzo di rimorchio necessario (Pickup SAF, Camion NSSA)',
    },
    26: {
        caption: 'AF/BUS',
        color: '#9b1624',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    27: {
        caption: 'DTS',
        color: '#e09200',
        credits: 20_000,
        coins: 25,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special: 'Richiesto dopo aver costruito 6 stazioni di soccorso',
    },
    28: {
        caption: 'Pickup con Modulo Boschivo',
        color: '#dc1818',
        credits: 5000,
        coins: 5,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 400,
    },
    29: {
        caption: 'Autocarro AIB - AF/BOSC',
        color: '#dc1818',
        credits: 8000,
        coins: 8,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 1000,
    },
    30: {
        caption: 'Autobotte AIB',
        color: '#dc1818',
        credits: 19_000,
        coins: 15,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 4000,
    },
    31: {
        caption: 'Funzionario AIB - DOS',
        color: '#dc1818',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Caserma dei vigili del fuoco': {
                    elw3: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    32: {
        caption: 'Camion con Rimorchio',
        color: '#dc1818',
        credits: 5000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Caserma dei vigili del fuoco': {
                    heavy_machinery: {
                        min: 0,
                    },
                    truck_drivers_license: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    33: {
        caption: 'Scavatore su Rimorchio',
        color: '#dc1818',
        credits: 20_000,
        coins: 15,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        special:
            'Richiede 1 persona addestrata per il veicolo trainante (Autista Movimento Terra)',
    },
    34: {
        caption: 'Elicottero Antincendio',
        color: '#dc1818',
        credits: 300_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Caserma dei vigili del fuoco': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
        waterTank: 2000,
    },
    35: {
        caption: 'Canadair',
        color: '#dc1818',
        credits: 600_000,
        coins: 25,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Caserma dei vigili del fuoco': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
        waterTank: 6000,
    },
    36: {
        caption: 'P.M.A.',
        color: '#f59f00',
        credits: 50_000,
        coins: 15,
        staff: {
            min: 1,
            max: 4,
            training: {
                'Caserma dei vigili del fuoco': {
                    mass_casualty: {
                        all: true,
                    },
                },
                'Soccorso': {
                    mass_casualty: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2],
    },
    37: {
        caption: 'ACT/SCHIUMA',
        color: '#dc1818',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 2000,
    },
    38: {
        caption: 'Pattuglia Polizia Stradale',
        color: '#0a2bff',
        credits: -1,
        coins: -1,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    39: {
        caption: 'Moto Polizia Stradale',
        color: '#0a2bff',
        credits: -1,
        coins: -1,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    40: {
        caption: 'Pattuglia Forestale',
        color: '#0a2bff',
        credits: -1,
        coins: -1,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    41: {
        caption: 'Idrante Antisommossa',
        color: '#0a2bff',
        credits: -1,
        coins: -1,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
} satisfies Record<number, InternalVehicle>;
