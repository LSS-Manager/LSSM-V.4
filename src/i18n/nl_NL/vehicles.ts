import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'SI-2',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'shuttle-van',
        possibleBuildings: [0, 17],
        waterTank: 500,
    },
    1: {
        caption: 'TS 8/9',
        color: '#990000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 2000,
    },
    2: {
        caption: 'Autoladder',
        color: '#791515',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 3 brandweerposten.',
    },
    3: {
        caption: 'DA - Officier van Dienst',
        color: '#a51212',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 6 brandweerposten.',
    },
    4: {
        caption: 'Hulpverleningsvoertuig',
        color: '#aa2222',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 4 brandweerposten.',
    },
    5: {
        caption: 'Adembeschermingsvoertuig',
        color: '#8b1818',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 5 brandweerposten.',
    },
    6: {
        caption: 'TST 8/9',
        color: '#880000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 3000,
    },
    7: {
        caption: 'TST 6/7',
        color: '#9c1c1c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 7 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 3000,
    },
    8: {
        caption: 'TST 4/5',
        color: '#d92626',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 2000,
    },
    9: {
        caption: 'TS 4/5',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 1500,
    },
    10: {
        caption: 'Slangenwagen',
        color: '#882222',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special:
            'Benodigd vanaf 7 brandweerposten. De slangenwagen zorgt dat de aanwezige waterhoeveelheid wordt verhoogd met 15%',
    },
    11: {
        caption: 'Verkenningseenheid Brandweer',
        color: '#662222',
        credits: 18_300,
        coins: 25,
        staff: {
            min: 1,
            max: 4,
            training: {
                Brandweer: {
                    gw_messtechnik: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 10 brandweerposten.',
    },
    12: {
        caption: 'TST-NB 8/9',
        color: '#770000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 4000,
    },
    14: {
        caption: 'TST-NB 6/7',
        color: '#aa0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 7 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 4000,
    },
    15: {
        caption: 'TST-NB 4/5',
        color: '#d02525',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 4000,
    },
    16: {
        caption: 'Ambulance',
        color: '#f59f00',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [0, 3, 13, 17],
    },
    17: {
        caption: 'TS 6/7',
        color: '#ad1f1f',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 7 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 2000,
    },
    18: {
        caption: 'Hoogwerker',
        color: '#992222',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 3 brandweerposten.',
    },
    19: {
        caption: 'DA - Hoofdofficier van Dienst',
        color: '#b81414',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandweer: {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 13 brandweerposten.',
    },
    20: {
        caption: 'DA',
        color: '#ca1616',
        credits: 2000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 17],
    },
    21: {
        caption: 'DB Klein',
        color: '#cc2222',
        credits: 2500,
        coins: 12,
        staff: { min: 1, max: 9 },
        icon: 'shuttle-van',
        possibleBuildings: [0, 17],
    },
    22: {
        caption: 'DA Noodhulp',
        color: '#001bcc',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [5, 18],
    },
    23: {
        caption: 'Lifeliner',
        color: '#e09200',
        credits: 500_000,
        coins: 30,
        staff: {
            min: 1,
            max: 4,
            training: {
                Ambulance: {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'helicopter',
        possibleBuildings: [6],
        special:
            'Per 25 gebouwen (alle gebouwen) kan één Lifeliner gekocht worden',
    },
    24: {
        caption: 'DA - Adviseur Gevaarlijke stoffen',
        color: '#e61919',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Brandweer: {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 11 brandweerposten.',
    },
    25: {
        caption: 'DB Noodhulp',
        color: '#142ab8',
        credits: 6000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'shuttle-van',
        possibleBuildings: [5, 18],
    },
    26: {
        caption: 'Haakarmvoertuig',
        color: '#bb2222',
        credits: 5000,
        coins: 12,
        staff: {
            min: 1,
            max: 3,
            training: {
                Brandweer: {
                    wechsellader: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-pickup',
        possibleBuildings: [0, 17],
    },
    27: {
        caption: 'Adembeschermingshaakarmbak',
        color: '#552222',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        special: 'Haakarmvoertuig benodigd',
    },
    28: {
        caption: 'Politiehelikopter',
        color: '#3131e8',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Politie: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'helicopter',
        possibleBuildings: [9],
    },
    29: {
        caption: 'Watertankhaakarmbak',
        color: '#332222',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        waterTank: 10_000,
        special: 'Haakarmvoertuig benodigd',
    },
    30: {
        caption: 'Zorgambulance',
        color: '#ffb61a',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [0, 3, 13, 17],
    },
    31: {
        caption: 'Commandovoertuig',
        color: '#dc1818',
        credits: 27_500,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Brandweer: {
                    wechsellader: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 14 brandweerposten.',
    },
    32: {
        caption: 'Commandohaakarmbak',
        color: '#442222',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        special: 'Haakarmvoertuig benodigd',
    },
    33: {
        caption: 'Waterongevallenvoertuig',
        color: '#bf2222',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 4,
            max: 6,
            training: {
                Brandweer: {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [0, 17],
    },
    34: {
        caption: 'Watertankwagen',
        color: '#772222',
        credits: 17_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 15_000,
        special: 'Benodigd vanaf 7 brandweerposten.',
    },
    35: {
        caption: 'Officier van Dienst - Politie',
        color: '#0006b9',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Politie: {
                    ovd_p: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    36: {
        caption: 'Waterongevallenaanhanger',
        color: '#288f28',
        credits: 9000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [0, 17],
        special:
            'TS, TST, TST-NB, WO, HV, DB-K, SL, VEB, PM-OR of TS-OR benodigd',
    },
    37: {
        caption: 'MMT-Auto',
        color: '#c47f00',
        credits: 30_000,
        coins: 12,
        staff: {
            min: 1,
            max: 4,
            training: {
                Ambulance: {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6],
        special:
            'Per 10 Ambulanceposten (Standplaatsen, VWS-posten en uitbreidingen) kan één MMT-Auto gekocht worden',
    },
    38: {
        caption: 'Officier van Dienst - Geneeskunde',
        color: '#b07914',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Ambulance: {
                    orgl: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [3, 6, 13],
        special: 'Benodigd vanaf de 8 gebouwen en/of uitbreiding',
    },
    39: {
        caption: 'ME Commandovoertuig',
        color: '#000080',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                Politie: {
                    police_mobiele_eenheid: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    40: {
        caption: 'ME Flexbus',
        color: '#000073',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 4,
            max: 8,
            training: {
                Politie: {
                    police_mobiele_eenheid: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    41: {
        caption: 'Crashtender (8x8)',
        color: '#ad0e0e',
        credits: 60_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                Brandweer: {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 13_300,
        foamTank: 1600,
    },
    42: {
        caption: 'Crashtender (6x6)',
        color: '#9c0b0b',
        credits: 40_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                Brandweer: {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 10_000,
        foamTank: 1300,
    },
    43: {
        caption: 'Crashtender (4x4)',
        color: '#f04242',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                Brandweer: {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 6000,
        foamTank: 500,
    },
    44: {
        caption: 'Airport Fire Officer / On Scene Commander',
        color: '#8b0707',
        credits: 12_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Brandweer: {
                    elw_airport: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 17],
    },
    45: {
        caption: 'Dompelpomphaakarmbak',
        color: '#681212',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        special:
            'Haakarmvoertuig benodigd. Deze haakarmbak zorgt dat de aanwezige waterhoeveelheid wordt verhoogd met 25%',
    },
    46: {
        caption: 'DM Noodhulp',
        color: '#0008e7',
        credits: 2500,
        coins: 18,
        staff: { min: 1, max: 1 },
        icon: 'motorcycle',
        possibleBuildings: [5, 18],
    },
    47: {
        caption: 'DA Hondengeleider',
        color: '#0d0d73',
        credits: 8000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politie: {
                    hondengeleider: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    48: {
        caption: 'DB Hondengeleider',
        color: '#000090',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politie: {
                    hondengeleider: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    49: {
        caption: 'PM-OR | Materieelvoertuig - Oppervlakteredding',
        color: '#450c0c',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 4,
            max: 9,
            training: {
                Brandweer: {
                    oppervlakteredder: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
    },
    50: {
        caption: 'TS-OR | Tankautospuit - Oppervlakteredding',
        color: '#220000',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 4,
            max: 9,
            training: {
                Brandweer: {
                    oppervlakteredder: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 2000,
    },
    51: {
        caption: 'HulpverleningsHaakarmbak',
        color: '#440000',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        special: 'Haakarmvoertuig benodigd',
    },
    52: {
        caption: 'Rapid Responder',
        color: '#b16b00',
        credits: 2500,
        coins: 18,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 13, 17],
    },
    53: {
        caption: 'AT-Commandant',
        color: '#0000e1',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politie: {
                    operator_at: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    54: {
        caption: 'AT-Operator',
        color: '#0000b4',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                Politie: {
                    operator_at: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    55: {
        caption: 'AT-Materiaalwagen',
        color: '#1a1aff',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politie: {
                    operator_at: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    56: {
        caption: 'DA Voorlichter',
        color: '#570f0f',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandweer: {
                    spokesman: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 17],
        special: 'Benodigd vanaf 14 brandweerposten.',
    },
    57: {
        caption: 'DA Officier van Dienst - Geneeskundig / Rapid Responder',
        color: '#dd8600',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Ambulance: {
                    orgl: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [3, 6, 13],
        special:
            'Per 10 Ambulanceposten (Standplaatsen, VWS-posten en uitbreidingen) kan één OVDG-RR gekocht worden',
    },
    58: {
        caption: 'DB Arrestantenvervoer',
        color: '#0B21F7',
        credits: 20_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'shuttle-van',
        possibleBuildings: [11],
        special:
            'Dit voertuig kan 5 arrestanten tegelijk vervoeren vanaf een melding',
    },
    59: {
        caption: 'Noodhulp - Onopvallend',
        color: '#0A20F7',
        credits: 6000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [5, 18],
    },
    60: {
        caption: 'DB Biketeam',
        color: '#091FF7',
        credits: 8000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politie: {
                    bike_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [5, 18],
    },
    61: {
        caption: 'Slangenhaakarmbak',
        color: '#550000',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        special:
            'Haakarmvoertuig benodigd. Deze haakarmbak zorgt dat de aanwezige waterhoeveelheid wordt verhoogd met 15%',
    },
    62: {
        caption: 'TS-HV | Tankautospuit-Hulpverlening',
        color: '#881b1b',
        credits: 20_000,
        coins: 25,
        staff: { min: 3, max: 7 },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 2000,
        special: 'Per 10 brandweerposten kan één TS-HV gekocht worden.',
    },
    63: {
        caption: 'DM - Rapid Responder',
        color: '#9f6000',
        credits: 2500,
        coins: 18,
        staff: { min: 1, max: 1 },
        icon: 'motorcycle',
        possibleBuildings: [0, 3, 13, 17],
    },
    64: {
        caption: 'ME Aanhoudingseenheid',
        color: '#00005c',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 6,
            max: 8,
            training: {
                Politie: {
                    detention_unit: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    65: {
        caption: 'DA Terreinwaardig - Reddingsbrigade',
        color: '#F49A13',
        credits: 7500,
        coins: 15,
        staff: {
            min: 2,
            max: 4,
            training: {
                Waterredding: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [16],
    },
    66: {
        caption: 'Kusthulpverleningsvoertuig',
        color: '#F5A42A',
        credits: 8000,
        coins: 15,
        staff: {
            min: 2,
            max: 6,
            training: {
                Waterredding: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [16],
    },
    67: {
        caption: 'Bootaanhanger Reddingsbrigade',
        color: '#F5A42A',
        credits: 5000,
        coins: 15,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [16],
        special: 'DAT-RB of KHV benodigd',
    },
    68: {
        caption: 'SB',
        color: '#770000',
        credits: 35_000,
        coins: 10,
        staff: {
            min: 2,
            max: 3,
            training: {
                Brandweer: {
                    wechsellader: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
        waterTank: 10_000,
        foamTank: 1000,
    },
    69: {
        caption: 'SBH',
        color: '#950000',
        credits: 10_000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 17],
        waterTank: 8000,
        foamTank: 1000,
    },
    70: {
        caption: 'SBA',
        color: '#ba0000',
        credits: 15_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [0, 17],
        foamTank: 500,
        special:
            'Het gaat hier om een aanhanger dat een trekkend voertuig nodig heeft. (SI-2, TS 8/9, TS-OR, PM-OR, TS-HV, TS 4/5, TS 6/7, HV, AB, SL, DA, DB-K, TST 4/5, TST 6/7, TST 8/9, TST-NB 4/5, TST-NB 6/7, TST-NB 8/9, DB-VEB)',
    },
    71: {
        caption: 'MSA',
        color: '#800000',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [0, 17],
        special:
            'Het gaat hier om een aanhanger dat een trekkend voertuig nodig heeft. (SI-2, TS 8/9, TS-OR, PM-OR, TS-HV, TS 4/5, TS 6/7, HV, AB, SL, DA, DB-K, TST 4/5, TST 6/7, TST 8/9, TST-NB 4/5, TST-NB 6/7, TST-NB 8/9, DB-VEB). Deze aanhanger zorgt dat de aanwezige waterhoeveelheid wordt verhoogd met 5%',
    },
    72: {
        caption: 'DPA',
        color: '#a80000',
        credits: 15_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [0, 17],
        special:
            'Het gaat hier om een aanhanger dat een trekkend voertuig nodig heeft. (SI-2, TS 8/9, TS-OR, PM-OR, TS-HV, TS 4/5, TS 6/7, HV, AB, SL, DA, DB-K, TST 4/5, TST 6/7, TST 8/9, TST-NB 4/5, TST-NB 6/7, TST-NB 8/9, DB-VEB). Deze aanhanger zorgt dat de aanwezige waterhoeveelheid wordt verhoogd met 10%',
    },
    73: {
        caption: 'Vrachtwagen - Bereden Brigade',
        color: '#00005c',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 1,
            max: 4,
            training: {
                Politie: {
                    police_horse: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    74: {
        caption: 'Bereden Brigade Aanhanger',
        color: '#00005c',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            training: {
                Politie: {
                    police_horse: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11],
        special:
            'Het gaat hier om een aanhanger dat een trekkend voertuig nodig heeft. (DAT-NH). Benodigd 1 persoon met een speciale opleiding in het trekkende voertuig (Bereden Brigade)',
    },
    75: {
        caption: 'Dienstauto terreinvaardig - Noodhulp',
        color: '#00005c',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'shuttle-van',
        possibleBuildings: [11],
    },
    76: {
        caption: 'Quad',
        color: '#f5c929',
        credits: 5000,
        coins: 10,
        staff: {
            min: 1,
            max: 1,
            training: {
                Waterredding: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [16],
    },
    77: {
        caption: 'KW-boot',
        color: '#f5b829',
        credits: 50_000,
        coins: 25,
        staff: {
            min: 2,
            max: 6,
            training: {
                Waterredding: {
                    ocean_navigation: {
                        min: 1,
                    },
                    law_enforcement_marine: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [19],
    },
    78: {
        caption: 'RB-K',
        color: '#f59629',
        credits: 35_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                Waterredding: {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [16, 19],
    },
    79: {
        caption: 'RB-G',
        color: '#f5a329',
        credits: 45_000,
        coins: 25,
        staff: {
            min: 2,
            max: 6,
            training: {
                Waterredding: {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [16, 19],
    },
    80: {
        caption: 'SAR-heli',
        color: '#fec039',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 3,
            training: {
                Waterredding: {
                    coastal_rescue_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [21],
    },
    81: {
        caption: 'DA-RWS | Dienstvoertuig weginspecteur Rijkswaterstaat',
        color: '#450c0c',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Brandweer: {
                    technical_aid: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [22],
    },
    82: {
        caption: 'DM-RWS | Dienstmotor weginspecteur Rijkswaterstaat',
        color: '#450c0c',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
            training: {
                Brandweer: {
                    technical_aid: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [22],
    },
    83: {
        caption: 'DA-SIG | Signalisatievoertuig',
        color: '#450c0c',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Brandweer: {
                    technical_aid: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 17],
    },
    84: {
        caption: 'Waterwerper',
        color: '#00788c',
        credits: 50_000,
        coins: 25,
        staff: {
            min: 4,
            max: 4,
            training: {
                Politie: {
                    police_wasserwerfer: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shower',
        possibleBuildings: [0, 17],
    },
} satisfies Record<number, InternalVehicle>;
