import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'Pumper',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 2000,
    },
    1: {
        caption: 'Medium Tanker',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
    },
    2: {
        caption: 'Ladder Platform',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required once you have built 3 firehouses',
    },
    3: {
        caption: 'Support Vehicle',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required once you have built 6 firehouses',
    },
    4: {
        caption: 'Major Rescue Vehicle',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required once you have built 4 firehouses',
    },
    5: {
        caption: 'Ambulance',
        color: '#9c691c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    6: {
        caption: 'Bulk Water Tanker',
        color: '#aa0000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 11_000,
        special: 'Required once you have built 7 firehouses',
    },
    7: {
        caption: 'HAZMAT Truck',
        color: '#990000',
        credits: 17_300,
        coins: 25,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Fire Station': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required once you have built 11 firehouses',
    },
    8: {
        caption: 'Police car',
        color: '#0b6911',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'Air Ambulance',
        color: '#ba9d0b',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 4,
            training: {
                Rescue: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'BASU',
        color: '#ca1616',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required from 5 fire stations',
    },
    11: {
        caption: 'MCV',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Fire Station': {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required once you have built 13 firehouses',
    },
    12: {
        caption: 'Rescue Pumper',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins. <br>Rescue Pumper acts as a MRU and a Fire Truck.',
    },
    13: {
        caption: 'Aerial Pumper',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins. <br>Aerial Pumper acts as a Turntable Ladder and a Fire Truck.',
    },
    14: {
        caption: 'Police helicopter',
        color: '#0e661d',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Police: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [13],
    },
    15: {
        caption: 'TOG Armoured Bearcat',
        color: '#257513',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
            max: 10,
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
        special: 'Required once you have built 8 police stations',
    },
    16: {
        caption: 'K-9 Unit',
        color: '#15791a',
        credits: 7000,
        coins: 25,
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
        special: 'Required once you have built 6 police stations',
    },
    17: {
        caption: 'Police Motorcycle',
        color: '#346622',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                Police: {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    18: {
        caption: 'TOG SUV',
        color: '#2c642e',
        credits: 7000,
        coins: 23,
        staff: {
            min: 2,
            max: 4,
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
        special: 'Required once you have built 8 police stations',
    },
    19: {
        caption: 'Heavy Tanker',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 4000,
    },
    20: {
        caption: 'SES Vehicle',
        color: '#22997d',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'SES & Water Rescue': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    21: {
        caption: 'Rescue Boat',
        color: '#229b7a',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special: 'SES Vehicle & SES Rescue Truck Are the towing vehicles',
    },
    22: {
        caption: 'Mounted Police',
        color: '#105d36',
        credits: 15_000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
            training: {
                Police: {
                    police_horse: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Towing Vehicle is Police Car',
    },
    23: {
        caption: 'Paramedic Supervisor',
        color: '#ba9d0b',
        credits: 20_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
        special: 'Required once you have built 6 Rescue stations',
    },
    24: {
        caption: 'ICP',
        color: '#ba9d0b',
        credits: 12_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Fire Station': {
                    critical_care: {
                        all: true,
                    },
                },
                'Rescue': {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    25: {
        caption: 'ICS',
        color: '#ba9d0b',
        credits: 12_000,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Fire Station': {
                    critical_care: {
                        all: true,
                    },
                },
                'Rescue': {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
    },
    26: {
        caption: 'Ambulance Rescue',
        color: '#ba9d0b',
        credits: 10_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
        special: 'Can work as MRU',
    },
    27: {
        caption: 'Mass Casualty Unit',
        color: '#ba9d0b',
        credits: 25_000,
        coins: 25,
        staff: { min: 4, max: 10 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20],
        special:
            'You can buy 1 Mass Casualty Vehicle for every 20 ambulance stations (respectively 15 with premium account).',
    },
    28: {
        caption: 'Ultra-Light Tanker',
        color: '#bb0000',
        credits: 5000,
        coins: 5,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 500,
    },
    29: {
        caption: 'Light Tanker',
        color: '#bb0000',
        credits: 8000,
        coins: 8,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1800,
    },
    30: {
        caption: 'Pumper Tanker',
        color: '#bb0000',
        credits: 19_000,
        coins: 15,
        staff: { min: 4, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
    },
    31: {
        caption: 'Fire Helicopter',
        color: '#bb0000',
        credits: 300_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [23],
        waterTank: 1500,
    },
    32: {
        caption: 'Bomber',
        color: '#bb0000',
        credits: 1_000_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [23],
        waterTank: 3200,
    },
    33: {
        caption: 'Large Air Tanker',
        color: '#bb0000',
        credits: 1_500_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [23],
        waterTank: 13_000,
    },
    34: {
        caption: 'Riot Police SUV',
        color: '#105d36',
        credits: 15_000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'May be replaced by TOG units.',
    },
    35: {
        caption: 'Riot Police Group Vehicle',
        color: '#105d36',
        credits: 15_000,
        coins: 10,
        staff: { min: 1, max: 8 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'May be replaced by TOG units.',
    },
    36: {
        caption: 'Riot Police Equipment Vehicles',
        color: '#105d36',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    riot_police_equipment: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    37: {
        caption: 'Senior Sergeant',
        color: '#105d36',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    police_service_group_leader: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    38: {
        caption: 'VMR Quad',
        color: '#22997d',
        credits: 5000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [24],
        special: '',
    },
    39: {
        caption: 'VMR Boat',
        color: '#22997d',
        credits: 45_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                'SES & Water Rescue': {
                    ocean_navigation: {
                        min: 1,
                    },
                    coastal_rescue: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [24],
    },
    40: {
        caption: 'SES Rescue Truck',
        color: '#105d36',
        credits: 15_000,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [15],
        special: 'Acts a MRV',
    },
    41: {
        caption: 'SES Mobile Command',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'SES & Water Rescue': {
                    water_rescue_elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    42: {
        caption: 'SES Storm Trailer',
        color: '#105d36',
        credits: 15_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special: 'Can be towed by SES Vehicle or SES Rescue Truck',
    },
} satisfies Record<number, InternalVehicle>;
