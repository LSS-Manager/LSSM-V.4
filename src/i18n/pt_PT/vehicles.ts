import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'VFCI',
        color: '#cc0000',
        credits: 5000,
        coins: 13,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        pumpCapacity: 1500,
        pumpType: 'fire',
    },
    1: {
        caption: 'VLCI',
        color: '#bb0000',
        credits: 5000,
        coins: 13,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1000,
        pumpCapacity: 1000,
        pumpType: 'fire',
    },
    2: {
        caption: 'VE',
        color: '#d92626',
        credits: 10_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Requer que tenhas pelo menos construído 3 Corpos de Bombeiros',
    },
    3: {
        caption: 'VCOT',
        color: '#d02525',
        credits: 10_000,
        coins: 13,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Requer que tenhas pelo menos construído 6 Corpos de Bombeiros',
    },
    4: {
        caption: 'VSAT',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 13,
        staff: { min: 2, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Requer que tenhas pelo menos construído 4 corpos de bombeiros',
    },
    5: {
        caption: 'ABSC',
        color: '#9c6d1c',
        credits: 5000,
        coins: 13,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18, 2, 20, 21],
    },
    6: {
        caption: 'VTTU',
        color: '#990000',
        credits: 17_300,
        coins: 13,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 10_000,
        special:
            'Requer que tenhas pelo menos construído 7 corpos de bombeiros',
    },
    7: {
        caption: 'VPMA',
        color: '#770000',
        credits: 19_200,
        coins: 13,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        foamTank: 50,
        special:
            'Requer que tenhas pelo menos construído 11 corpos de bombeiros',
    },
    8: {
        caption: 'CP',
        color: '#488b18',
        credits: 5000,
        coins: 13,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'HELI INEM',
        color: '#e68319',
        credits: 300_000,
        coins: 30,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'VCOC',
        color: '#791515',
        credits: 25_500,
        coins: 13,
        staff: {
            min: 1,
            max: 4,
            training: {
                'Corpos de Bombeiros': {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Requer que tenhas pelo menos construído 13 corpos de bombeiros',
    },
    11: {
        caption: 'VUCI',
        color: '#dc1818',
        credits: 19_000,
        coins: 13,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Para comprar com créditos reque o nível: Adjunto Distrital, <br>Membros com nível mais baixo podem comprar este veículos por 25 Moedas. <br>Quint acts as a Platform Truck and a Fire Truck.',
    },
    12: {
        caption: 'UEP/UI - CIEXSS',
        color: '#dc1818',
        credits: 15_000,
        coins: 10,
        staff: {
            min: 1,
            max: 4,
            training: {
                ['Policía']: {
                    fbi_bomb_tech: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special:
            'Requer que tenhas pelo menos construído 6 esquadras da polícia.',
    },
    13: {
        caption: 'EPRI',
        color: '#cc2222',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 2,
            training: {
                ['Policia']: {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    14: {
        caption: 'VP',
        color: '#d92626',
        credits: 25_000,
        coins: 13,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    15: {
        caption: 'UAAR',
        color: '#ca1616',
        credits: 19_000,
        coins: 13,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Requer 5 corpos dos bombeiros. Carrega botijas de ar.',
    },
    16: {
        caption: 'VSAE',
        color: '#ad1f1f',
        credits: 20_000,
        coins: 13,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    fwk: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Required once you have built 4 Corpos de Bombeiross. A big lorry with specialist rescue equipment, useful for Road Traffic Collisions.',
    },
    17: {
        caption: 'VMER',
        color: '#99631f',
        credits: 4000,
        coins: 10,
        staff: {
            min: 2,
            max: 2,
            training: {
                Rescue: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21],
        special:
            'Acts as a Rapid Response Vehicle and a Primary Response Vehicle. Responds to the most serious of calls, where lives are in serious danger.',
    },
    18: {
        caption: 'SIV',
        color: '#99631f',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21],
        special:
            'Acts as a Rapid Response Vehicle and a Secondary Response Vehicle. Responds to the most serious of calls, where lives are in serious danger.',
    },
    19: {
        caption: 'Mota INEM',
        color: '#996719',
        credits: 12_000,
        coins: 8,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rescue: {
                    rapid_response_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21],
        special:
            'Can only be placed at the Home Response Location. A Ambulance Rapid Response Vehicle but staffed with volunteers',
    },
    20: {
        caption: 'VIC',
        color: '#99631f',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 5,
            max: 8,
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special:
            'You can buy 1 Mass Casualty Equipment for every 20 ambulance stations (respectively 15 with premium account). It is required for missions that can spawn with over 30 patients. Requires Mass Casualty Extension.',
    },
    21: {
        caption: 'ERAS',
        color: '#9f1616',
        credits: 20_000,
        coins: 8,
        staff: {
            min: 3,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    elw3: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    22: {
        caption: 'Semi-Reboque',
        color: '#9f1616',
        credits: 5000,
        coins: 5,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Corpos de Bombeiros': {
                    truck_drivers_license: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    23: {
        caption: 'MR',
        color: '#a30021',
        credits: 20_000,
        coins: 8,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Corpos de Bombeiros': {
                    heavy_machinery: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [22],
        special:
            "Dozer Trailer that can be towed with the Crew cap semi. Requires Heavy Machinery Operating and Truck Driver's License trained personnel to operate.<br> The dozer trailer cannot be assigned personnel, <br>either assign your trained personnel to the towing vehicle, or assign them to a separate unit en route.",
    },
    24: {
        caption: 'VTTF',
        color: '#990000',
        credits: 19_000,
        coins: 13,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 7700,
        pumpCapacity: 2000,
        pumpType: 'fire',
        waterBonus: 25,
    },
    25: {
        caption: 'HEBL',
        color: '#800e20',
        credits: 300_000,
        coins: 13,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Corpos de Bombeiros': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
        waterTank: 1200,
    },
    26: {
        caption: 'AVBM',
        color: '#a4752e',
        credits: 1_000_000,
        coins: 13,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Corpos de Bombeiros': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
        waterTank: 3000,
    },
    27: {
        caption: 'AVBP',
        color: '#a7741e',
        credits: 1_500_000,
        coins: 13,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Corpos de Bombeiros': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
        waterTank: 6200,
    },
    28: {
        caption: 'VECI',
        color: '#9f1616',
        credits: 5000,
        coins: 10,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        foamTank: 1000,
    },
    29: {
        caption: 'Moto Bomba',
        color: '#570f0f',
        credits: 19_000,
        coins: 19,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterBonus: 10,
        pumpCapacity: 8000,
        pumpType: 'fire',
        isTrailer: true,
        tractiveVehicles: [30],
    },
    30: {
        caption: 'VTTP',
        color: '#bf2222',
        credits: 15_000,
        coins: 5,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    31: {
        caption: 'UEP/UI - GOE/POE',
        color: '#4282f0',
        credits: 35_000,
        coins: 13,
        staff: {
            min: 4,
            max: 6,
            training: {
                Police: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    32: {
        caption: 'UEP/UI - CI/UI',
        color: '#4282f0',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 4,
            max: 8,
            training: {
                Police: {
                    riot_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    33: {
        caption: 'UEP/UI - GOC',
        color: '#30aa22',
        credits: 7000,
        coins: 13,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Required from 6 Police stations',
    },
    34: {
        caption: 'UT/UNT',
        color: '#3a5522',
        credits: 10_000,
        coins: 35,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    traffic_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special:
            'Acts as a Traffic Car and Incident Response Vehicle. A pursuit vehicle for high speed chases as well as RTCs.',
    },
    35: {
        caption: 'Ciclopatrulha',
        color: '#4282f0',
        credits: 10_000,
        coins: 5,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 25],
    },
    36: {
        caption: 'PCO',
        color: '#58ad0e',
        credits: 15_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                Policia: {
                    riot_police_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    37: {
        caption: 'VMT',
        color: '#488b18',
        credits: 35_000,
        coins: 8,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [25],
    },
    38: {
        caption: 'EPC',
        color: '#488b18',
        credits: 25_000,
        coins: 5,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [25],
    },
    39: {
        caption: 'PM',
        color: '#488b18',
        credits: 50_000,
        coins: 8,
        staff: {
            min: 2,
            max: 5,
            training: {
                ['Resgate aquático']: {
                    coastal_ocean_navigation: {
                        min: 1,
                    },
                    coastal_rescue: {
                        min: 3,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
    },
    40: {
        caption: 'BR',
        color: '#488b18',
        credits: 75_000,
        coins: 13,
        staff: {
            min: 2,
            max: 6,
            training: {
                ['Resgate aquático']: {
                    coastal_ocean_navigation: {
                        min: 1,
                    },
                    coastal_rescue: {
                        min: 3,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
    },
    41: {
        caption: 'GAT',
        color: '#488b18',
        credits: 75_000,
        coins: 13,
        staff: {
            min: 7,
            max: 10,
            training: {
                ['Resgate aquático']: {
                    coastal_ocean_navigation: {
                        min: 1,
                    },
                    law_enforcement_marine: {
                        min: 6,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
    },
    42: {
        caption: 'VAME',
        color: '#882222',
        credits: 19_000,
        coins: 13,
        staff: {
            min: 3,
            max: 3,
            training: {
                'Corpos de Bombeiros': {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Combines the Heavy Rescue Vehicle/Utility Vehicle with an integrated boat.<br> No need for a boat trailer.',
    },
    43: {
        caption: 'VOPE',
        color: '#bf2222',
        credits: 10_000,
        coins: 10,
        staff: { min: 3, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    44: {
        caption: 'ERST',
        color: '#92702e',
        credits: 35_000,
        coins: 35,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Corpos de Bombeiros': {
                    ocean_navigation: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'car-side',
        isTrailer: true,
        tractiveVehicles: [42, 43],
        possibleBuildings: [0, 18],
    },
    45: {
        caption: 'MRSA',
        color: '#882222',
        credits: 10_000,
        coins: 5,
        staff: {
            min: 0,
            max: 0,
            training: {
                ['Resgate aquático']: {
                    gw_taucher: {
                        all: true,
                    },
                },
                'Corpos de Bombeiros': {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18, 25],
        isTrailer: true,
        tractiveVehicles: [37, 38, 42, 43, 33],
        special:
            'Needed towing vehicle (Lifeguard Truck, Lifeguard Rescue, Lifeguard Supervisor, Utility unit, Battalion chief unit, Type 2 fire engine)',
    },
    46: {
        caption: 'VIM',
        color: '#cc2222',
        credits: 45_000,
        coins: 13,
        staff: {
            min: 3,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    arff: {
                        all: true,
                    },
                    elw_airport: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 9000,
        foamTank: 1500,
    },
    47: {
        caption: 'VIM T2',
        color: '#cc2222',
        credits: 60_000,
        coins: 13,
        staff: {
            min: 3,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    arff: {
                        all: true,
                    },
                    elw_airport: {
                        all: true,
                    },
                    piercing_nozzle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 7000,
        foamTank: 1000,
    },
    48: {
        caption: 'VRDA',
        color: '#cc2222',
        credits: 20_000,
        coins: 10,
        staff: {
            min: 2,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    49: {
        caption: 'VRA',
        color: '#cc2222',
        credits: 60_000,
        coins: 13,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Corpos de Bombeiros': {
                    rettungstreppe: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    50: {
        caption: 'VIR',
        color: '#cc2222',
        credits: 35_000,
        coins: 13,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Corpos de Bombeiros': {
                    arff: {
                        all: true,
                    },
                    elw_airport: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 5000,
        foamTank: 750,
    },
    51: {
        caption: 'PCM',
        color: '#cc2222',
        credits: 20_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Corpos de Bombeiros': {
                    elw_airport: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    52: {
        caption: 'ATE',
        color: '#cc2222',
        credits: 12_000,
        coins: 13,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    53: {
        caption: 'ATRI',
        color: '#cc2222',
        credits: 12_000,
        coins: 13,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        pumpType: 'fire',
        pumpCapacity: 4000,
    },
} satisfies Record<number, InternalVehicle>;
