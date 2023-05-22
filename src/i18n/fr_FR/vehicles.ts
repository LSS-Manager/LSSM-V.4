import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'FPT',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 4, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        pumpCapacity: 1000,
        pumpType: 'fire',
    },
    1: {
        caption: 'FPTL',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 4, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 2000,
        pumpCapacity: 1000,
        pumpType: 'fire',
    },
    2: {
        caption: 'EPA',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 3 bases de pompiers',
    },
    3: {
        caption: 'VLCG',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
    },
    4: {
        caption: 'VSR',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 4 bases de pompiers',
    },
    5: {
        caption: 'ASSU',
        color: '#9c691c',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    6: {
        caption: 'CCGC',
        color: '#aa0000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 11_000,
        special:
            'Nécessaire dès lors que vous avez construit 7 bases de pompiers',
    },
    7: {
        caption: 'VIRT',
        color: '#770000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 4,
            training: {
                'Centre de secours': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 11 bases de pompiers',
    },
    8: {
        caption: 'Véhicule de patrouille',
        color: '#3a8b18',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'HéliSMUR',
        color: '#e68a19',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Secours nautique': {
                    intervention_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'VAR',
        color: '#d90e0e',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 5 bases de pompiers',
    },
    11: {
        caption: 'VPC',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Centre de secours': {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 13 bases de pompiers',
    },
    12: {
        caption: 'FPTSR',
        color: '#b80000',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special: 'Vous devez posséder au moins le grade : Sergent-chef.',
    },
    13: {
        caption: 'VTU',
        color: '#d71919',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        pumpCapacity: 1000,
        pumpType: 'fire',
        special:
            'Nécessaire dès lors que vous avez construit 4 bases de pompiers',
    },
    14: {
        caption: 'VGRIMP',
        color: '#ca3516',
        credits: 19_000,
        coins: 25,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Centre de secours': {
                    gw_hoehenrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 12 bases de pompiers',
    },
    15: {
        caption: 'BEA',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    16: {
        caption: 'VPL',
        color: '#2285bb',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                'Centre de secours': {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        special: 'Nécessite une formation spéciale (PLG (Plongeur))',
    },
    17: {
        caption: 'BLS',
        color: '#225f77',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        special: 'Remorqueuse nécessaire (VPL, VTU)',
    },
    18: {
        caption: 'Choucas',
        color: '#36a21e',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Poste de police': {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [13],
    },
    19: {
        caption: 'Equipe cynophile',
        color: '#27aa22',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Poste de police': {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special:
            'Nécessaire dès lors que vous avez construit 6 postes de police.',
    },
    20: {
        caption: 'Unité motocycliste',
        color: '#22aa30',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Poste de police': {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    21: {
        caption: 'CCFS',
        color: '#d71919',
        credits: 19_000,
        coins: 25,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 14_500,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special:
            'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
    },
    22: {
        caption: 'CCFM',
        color: '#d71919',
        credits: 8000,
        coins: 8,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special:
            'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
    },
    23: {
        caption: 'CCFL',
        color: '#d71919',
        credits: 5000,
        coins: 5,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 2000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special:
            'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
    },
    24: {
        caption: 'VLHR',
        color: '#d71919',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
    },
    25: {
        caption: 'VSAV',
        color: '#9c691c',
        credits: 5000,
        coins: 25,
        staff: { min: 3, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    26: {
        caption: 'VL SSSM',
        color: '#9c691c',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Centre de secours': {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    27: {
        caption: 'VLM',
        color: '#9c691c',
        credits: 4000,
        coins: 20,
        staff: {
            min: 3,
            max: 3,
            training: {
                Secours: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    28: {
        caption: 'AR',
        color: '#9c691c',
        credits: 10_000,
        coins: 30,
        staff: {
            min: 3,
            max: 3,
            training: {
                Secours: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    29: {
        caption: 'PC DSM',
        color: '#9c691c',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                Secours: {
                    orgl: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special:
            'Nécessaire dès lors que vous avez construit 6 postes de secours',
    },
    30: {
        caption: 'Ambulance Type A',
        color: '#9c691c',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    31: {
        caption: 'VTP',
        color: '#d71919',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    32: {
        caption: 'CCRL',
        color: '#d71919',
        credits: 15_000,
        coins: 10,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1400,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special: 'Vous devez posséder au moins le grade : Adjudant.',
    },
    33: {
        caption: 'CCRM',
        color: '#d71919',
        credits: 18_000,
        coins: 10,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special: 'Vous devez posséder au moins le grade : Adjudant.',
    },
    34: {
        caption: 'CCRSR',
        color: '#d71919',
        credits: 30_000,
        coins: 15,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special: 'Vous devez posséder au moins le grade : Adjudant.',
    },
    35: {
        caption: 'FMOGP',
        color: '#d71919',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 12_000,
    },
    36: {
        caption: 'CDHR',
        color: '#d71919',
        credits: 15_000,
        coins: 10,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterBonus: 25,
        pumpCapacity: 1000,
        pumpType: 'fire',
    },
    37: {
        caption: 'FDGP',
        color: '#d71919',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterBonus: 35,
        pumpCapacity: 1000,
        pumpType: 'fire',
    },
    38: {
        caption: 'MPR',
        color: '#d71919',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterBonus: 15,
        pumpCapacity: 1000,
        pumpType: 'fire',
        special:
            'Remorqueuse nécessaire (FPT, FPTL, CCFS, CCFM, CCFL, CCRL, CCRM, CCGC, FMOGP, VLHR, CDHR, FDGP, VTU)',
    },
    39: {
        caption: 'VR',
        color: '#225CB5',
        credits: 10_000,
        coins: 5,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    40: {
        caption: 'VCT',
        color: '#225CB5',
        credits: 25_000,
        coins: 10,
        staff: {
            min: 1,
            max: 4,
            training: {
                'Poste de police': {
                    riot_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    41: {
        caption: 'RAM',
        color: '#225CB5',
        credits: 25_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Poste de police': {
                    riot_police_equipment: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    42: {
        caption: 'VTP',
        color: '#225CB5',
        credits: 15_000,
        coins: 10,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    43: {
        caption: 'ELE',
        color: '#225CB5',
        credits: 35_000,
        coins: 10,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Poste de police': {
                    police_wasserwerfer: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    44: {
        caption: 'ReBP',
        color: '#225CB5',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [11],
        special: 'Remorqueuse nécessaire (VR)',
    },
    45: {
        caption: 'VAT',
        color: '#225CB5',
        credits: 25_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    46: {
        caption: 'Buggy',
        color: '#225CB5',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Secours nautique': {
                    coastal_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11, 23],
    },
    47: {
        caption: 'CSL',
        color: '#225CB5',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [11, 23],
        special: 'Remorqueuse nécessaire (Buggy)',
    },
    48: {
        caption: 'CTT',
        color: '#225CB5',
        credits: 50_000,
        coins: 15,
        staff: {
            min: 2,
            max: 8,
            training: {
                'Secours nautique': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [23],
    },
    49: {
        caption: 'VCSM',
        color: '#225CB5',
        credits: 75_000,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [24],
    },
    50: {
        caption: 'Dragon',
        color: '#225CB5',
        credits: 300_000,
        coins: 30,
        staff: { min: 2, max: 5 },
        icon: 'car-side',
        possibleBuildings: [26],
    },
    51: {
        caption: 'VIM',
        color: '#225CB5',
        credits: 45_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Centre de secours': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 9000,
    },
    52: {
        caption: 'VSA',
        color: '#225CB5',
        credits: 20_000,
        coins: 20,
        staff: {
            min: 2,
            max: 3,
            training: {
                'Centre de secours': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    53: {
        caption: 'MAH',
        color: '#225CB5',
        credits: 60_000,
        coins: 30,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Centre de secours': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    54: {
        caption: 'VIRP',
        color: '#225CB5',
        credits: 35_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Centre de secours': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 600,
    },
    55: {
        caption: 'VLCM',
        color: '#225CB5',
        credits: 20_000,
        coins: 20,
        staff: {
            min: 0,
            max: 2,
            training: {
                'Centre de secours': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    56: {
        caption: 'VPCE',
        color: '#225CB5',
        credits: 5000,
        coins: 12,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    57: {
        caption: 'CEEP',
        color: '#225CB5',
        credits: 35_000,
        coins: 20,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        pumpCapacity: 1500,
        pumpType: 'fire',
        special: 'Remorqueuse nécessaire (VPCE)',
    },
    58: {
        caption: 'Pélican',
        color: '#225CB5',
        credits: 400_000,
        coins: 30,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Secours nautique': {
                    intervention_pilot: {
                        all: true,
                    },
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [26],
        waterTank: 6000,
    },
    59: {
        caption: 'Dash Milan',
        color: '#225CB5',
        credits: 500_000,
        coins: 30,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Secours nautique': {
                    intervention_pilot: {
                        all: true,
                    },
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [26],
        waterTank: 10_000,
    },
    60: {
        caption: 'HBE',
        color: '#225CB5',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Secours nautique': {
                    intervention_pilot: {
                        all: true,
                    },
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [26],
        waterTank: 1000,
    },
} satisfies Record<number, InternalVehicle>;
