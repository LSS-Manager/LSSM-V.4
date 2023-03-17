import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'Type 1 fire engine',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 750,
        foamTank: 25,
    },
    1: {
        caption: 'Type 2 fire engine',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 500,
        foamTank: 25,
    },
    2: {
        caption: 'Platform truck',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        special: 'Required once you have built 3 firehouses',
    },
    3: {
        caption: 'Battalion chief unit',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        special: 'Required once you have built 6 firehouses',
    },
    4: {
        caption: 'Heavy rescue vehicle',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        special: 'Required once you have built 4 firehouses',
    },
    5: {
        caption: 'ALS Ambulance',
        color: '#9c6d1c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
    },
    6: {
        caption: 'Mobile air',
        color: '#aa0000',
        credits: 11_860,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        special: 'Required once you have built 5 firehouses',
    },
    7: {
        caption: 'Water Tanker',
        color: '#990000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 3000,
        special: 'Required once you have built 7 firehouses',
    },
    8: {
        caption: 'Utility unit',
        color: '#880000',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 11, 12, 13],
        special: 'Required once you have built 4 firehouses',
    },
    9: {
        caption: 'HazMat',
        color: '#770000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Fire Station': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        special: 'Required once you have built 11 firehouses',
    },
    10: {
        caption: 'Patrol Car',
        color: '#488b18',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [5, 15],
    },
    11: {
        caption: 'HEMS',
        color: '#e68319',
        credits: 300_000,
        coins: 30,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [6],
    },
    12: {
        caption: 'Mobile command vehicle',
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
        possibleBuildings: [0, 13],
        special: 'Required once you have built 13 firehouses',
    },
    13: {
        caption: 'Quint',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 500,
        foamTank: 25,
        special:
            'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins. <br>Quint acts as a Platform Truck and a Fire Truck.',
    },
    14: {
        caption: 'Police helicopter',
        color: '#70ca16',
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
        possibleBuildings: [8],
    },
    15: {
        caption: 'Fly-Car',
        color: '#b88f14',
        credits: 4000,
        coins: 20,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 12, 14, 16],
    },
    16: {
        caption: 'SWAT Armoured Vehicle',
        color: '#68a512',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
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
        possibleBuildings: [5, 15],
        special: 'Required once you have built 8 police stations',
    },
    17: {
        caption: 'ARFF Crash Tender',
        color: '#cc2222',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Fire Station': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 4500,
        foamTank: 650,
    },
    18: {
        caption: 'Rescue Engine',
        color: '#bb2222',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 750,
        foamTank: 25,
        special:
            'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins.<br> The Rescue Engine acts as a Heavy Rescue and a Fire Engine.',
    },
    19: {
        caption: 'K-9 Unit',
        color: '#30aa22',
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
        possibleBuildings: [5, 15],
        special: 'Required from 6 Police stations',
    },
    20: {
        caption: 'Mass Casualty Unit',
        color: '#996d22',
        credits: 25_000,
        coins: 25,
        staff: { min: 6, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 16],
        special:
            'Then 7 patients can be treated and removed simultaneously in the MCU.You can buy 1 Mass Casualty Vehicle for every 20 ambulance stations (respectively 15 with premium account).',
    },
    21: {
        caption: 'Heavy Rescue + Light Boat',
        color: '#882222',
        credits: 19_000,
        coins: 25,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Fire Station': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        special:
            'Combines the Heavy Rescue Vehicle/Utility Vehicle with an integrated boat.<br> No need for a boat trailer.',
    },
    22: {
        caption: 'Light Boat Trailer',
        color: '#772222',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 11, 12],
        special:
            'Accessory boat that can be towed with the Utility Unit. Requires Swift Water Rescue trained personnel to operate.<br> The boat trailer cannot be assigned personnel, <br>either assign your trained personnel to the towing vehicle, or assign them to a separate unit en route.',
    },
    23: {
        caption: 'Police Motorcycle',
        color: '#638a2a',
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
        possibleBuildings: [5, 15],
    },
    24: {
        caption: 'Large Fireboat',
        color: '#552222',
        credits: 35_000,
        coins: 35,
        staff: {
            min: 2,
            max: 7,
            training: {
                'Fire Station': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    25: {
        caption: 'Large Rescue Boat',
        color: '#92702e',
        credits: 35_000,
        coins: 35,
        staff: {
            min: 2,
            max: 6,
            training: {
                'Fire Station': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [12],
    },
    26: {
        caption: 'SWAT SUV',
        color: '#415a30',
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
        possibleBuildings: [5, 15],
        special: 'Required once you have built 8 police stations',
    },
    27: {
        caption: 'BLS Ambulance',
        color: '#a4752e',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
    },
    28: {
        caption: 'EMS Rescue',
        color: '#f59f00',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special:
            'No missions require a EMS Rescue at this time, however it is able to treat patients. And Works as a Heavy Rescue',
    },
    29: {
        caption: 'EMS Chief',
        color: '#e09200',
        credits: 10_000,
        coins: 20,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special: 'Required once you have built 10 Rescue stations',
    },
    30: {
        caption: 'Type 3 engine',
        color: '#440000',
        credits: 19_000,
        coins: 19,
        staff: { min: 3, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 500,
        foamTank: 20,
    },
    31: {
        caption: 'Type 5 engine',
        color: '#b01d2f',
        credits: 8000,
        coins: 8,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 400,
    },
    32: {
        caption: 'Type 7 engine',
        color: '#a01717',
        credits: 5000,
        coins: 5,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 50,
    },
    33: {
        caption: 'Pumper Tanker',
        color: '#570f0f',
        credits: 19_000,
        coins: 19,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 2500,
        foamTank: 25,
    },
    34: {
        caption: 'Crew Carrier',
        color: '#bf2222',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 12 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
    },
    35: {
        caption: 'Water drop helicopter',
        color: '#800e20',
        credits: 300_000,
        coins: 130,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [17],
        waterTank: 2000,
    },
    36: {
        caption: 'Air Tanker',
        color: '#450c0c',
        credits: 1_000_000,
        coins: 50,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [17],
        waterTank: 7200,
    },
    37: {
        caption: 'Heavy air tanker',
        color: '#5f0606',
        credits: 1_500_000,
        coins: 65,
        staff: {
            min: 2,
            max: 5,
            training: {
                'Fire Station': {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [17],
        waterTank: 12_000,
    },
    38: {
        caption: 'Type 4 engine',
        color: '#9f0d13',
        credits: 10_000,
        coins: 10,
        staff: { min: 3, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 750,
    },
    39: {
        caption: 'Type 6 engine',
        color: '#a70e0e',
        credits: 5000,
        coins: 5,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 150,
    },
    40: {
        caption: 'Dozer Trailer',
        color: '#a30021',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Fire Station': {
                    heavy_machinery: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
        special:
            "Dozer Trailer that can be towed with the Crew cap semi. Requires Heavy Machinery Operating and Truck Driver's License trained personnel to operate.<br> The dozer trailer cannot be assigned personnel, <br>either assign your trained personnel to the towing vehicle, or assign them to a separate unit en route.",
    },
    41: {
        caption: 'Crew cap semi',
        color: '#9f1616',
        credits: 5000,
        coins: 12,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Fire Station': {
                    truck_drivers_license: {
                        all: true,
                    },
                },
                'Rescue': {
                    truck_drivers_license: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 3, 13],
    },
    42: {
        caption: 'FBI Unit',
        color: '#001bcc',
        credits: 10_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    43: {
        caption: 'FBI Investigation Wagon',
        color: '#001ee0',
        credits: 10_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    44: {
        caption: 'FBI Mobile Command Center',
        color: '#0021f5',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 4,
            training: {
                Police: {
                    fbi_mcc: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    45: {
        caption: 'FBI Bomb Technician Vehicle',
        color: '#0a2bff',
        credits: 35_500,
        coins: 35,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    fbi_bomb_tech: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    46: {
        caption: 'FBI Surveillance Drone',
        color: '#4282f0',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Police: {
                    fbi_drone_operator: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    47: {
        caption: 'Police Supervisor / Sheriff Unit',
        color: '#58ad0e',
        credits: 15_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    sheriff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [5, 15],
    },
    48: {
        caption: 'EMS Fire Engine/Ambulance',
        color: '#cb9240',
        credits: 25_000,
        coins: 30,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Fire Station': {
                    ambulance_fire_truck: {
                        all: true,
                    },
                },
                'Rescue': {
                    ambulance_fire_truck: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special: 'Works as Fire Engine and Ambulance',
    },
    49: {
        caption: 'Tactical Ambulance',
        color: '#a7741e',
        credits: 25_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Fire Station': {
                    ambulance_police_car: {
                        all: true,
                    },
                },
                'Rescue': {
                    ambulance_police_car: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special: 'Works as Police Car and Ambulance',
    },
    50: {
        caption: 'Hazmat Ambulance',
        color: '#bc893d',
        credits: 30_000,
        coins: 35,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Fire Station': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
                'Rescue': {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special:
            'Required once you have built 11 firehouses, works as HazMat and Ambulance',
    },
    51: {
        caption: 'DEA Unit',
        color: '#4282f0',
        credits: 10_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    52: {
        caption: 'DEA Clan Lab',
        color: '#4282f0',
        credits: 15_000,
        coins: 20,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    53: {
        caption: 'ATF Unit',
        color: '#4282f0',
        credits: 10_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    54: {
        caption: 'ATF Lab Vehicle',
        color: '#4282f0',
        credits: 15_000,
        coins: 20,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [18],
    },
    55: {
        caption: 'Patrol Boat',
        color: '#4282f0',
        credits: 30_000,
        coins: 30,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    56: {
        caption: "Warden's Truck",
        color: '#4282f0',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    game_warden: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    57: {
        caption: 'EMS Mass Casualty Trailer (large)',
        color: '#bc893d',
        credits: 30_000,
        coins: 30,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [3],
        special:
            'Needed towing vehicle (Crew cab semi). Works like the Mass Casualty Unit but without transport.',
    },
    58: {
        caption: 'EMS Mass Casualty Trailer (small)',
        color: '#bc893d',
        credits: 15_000,
        coins: 15,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [3],
        special:
            'Needed towing vehicle (Fly-Car, EMS Rescue, EMS Chief). Works like the Mass Casualty Unit but without transport.',
    },
    59: {
        caption: 'EMS Operations Support',
        color: '#bc893d',
        credits: 25_000,
        coins: 20,
        staff: { min: 3, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special:
            'You can buy 1 EMS Operations Support Unit for every 20 ambulance stations (respectively 15 with premium account).',
    },
    60: {
        caption: 'EMS Mobile Command Unit',
        color: '#bc893d',
        credits: 40_000,
        coins: 35,
        staff: {
            min: 6,
            max: 6,
            training: {
                'Fire Station': {
                    ems_mobile_command: {
                        all: true,
                    },
                },
                'Rescue': {
                    ems_mobile_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
    },
    61: {
        caption: 'ALS Rescue Ambulance',
        color: '#bc893d',
        credits: 25_000,
        coins: 30,
        staff: { min: 3, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 3, 14, 16],
        special:
            'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 30 Coins.<br>Works as Heavy Rescue and Ambulance',
    },
    62: {
        caption: 'Fire Investigator Unit',
        color: '#9f1616',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Fire Station': {
                    fire_investigator: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 22],
    },
    63: {
        caption: 'Fire Prevention Unit',
        color: '#9f1616',
        credits: 15_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 22],
    },
    64: {
        caption: 'Foam Tender',
        color: '#9f1616',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 6500,
    },
    65: {
        caption: 'Foam Trailer',
        color: '#9f1616',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 650,
        special:
            'Needed towing vehicle (Utility unit, Type 6 engine, Battalion chief unit, mcv)',
    },
    66: {
        caption: 'Lifeguard Truck',
        color: '#882222',
        credits: 10_000,
        coins: 10,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 13, 23, 26],
        special: '',
    },
    67: {
        caption: 'Lifeguard Rescue',
        color: '#882222',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Water Rescue School': {
                    coastal_rescue: {
                        all: true,
                    },
                },
                'Fire Station': {
                    coastal_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 13, 23, 26],
        special: '',
    },
    68: {
        caption: 'Lifeguard Supervisor',
        color: '#882222',
        credits: 25_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Water Rescue School': {
                    coastal_command: {
                        all: true,
                    },
                },
                'Fire Station': {
                    coastal_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 13, 23, 26],
        special: '',
    },
    69: {
        caption: 'Small Coastal Boat',
        color: '#882222',
        credits: 50_000,
        coins: 15,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [23],
        special: '',
    },
    70: {
        caption: 'Large Coastal Boat',
        color: '#882222',
        credits: 75_000,
        coins: 25,
        staff: {
            min: 2,
            max: 6,
            training: {
                'Water Rescue School': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [23],
        special: '',
    },
    71: {
        caption: 'Coastal Helicopter',
        color: '#882222',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Water Rescue School': {
                    coastal_rescue_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
        special: '',
    },
    72: {
        caption: 'Coastal Guard Plane',
        color: '#882222',
        credits: 500_000,
        coins: 30,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Water Rescue School': {
                    coastal_rescue_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
        special: '',
    },
    73: {
        caption: 'Small Coastal Boat Trailer',
        color: '#882222',
        credits: 50_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue School': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
                'Fire Station': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 13, 26],
        special: '',
    },
    74: {
        caption: 'Wildfire MCC',
        color: '#9f1616',
        credits: 20_000,
        coins: 20,
        staff: {
            min: 6,
            max: 6,
            training: {
                'Fire Station': {
                    elw3: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    75: {
        caption: 'Wildland Lead Plane',
        color: '#9f1616',
        credits: 750_000,
        coins: 20,
        staff: {
            min: 3,
            max: 3,
            training: {
                'Fire Station': {
                    brush_air_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [17],
    },
    76: {
        caption: 'Smoke Jumper Plane',
        color: '#9f1616',
        credits: 500_000,
        coins: 20,
        staff: {
            min: 10,
            max: 20,
            training: {
                'Fire Station': {
                    smoke_jumper: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [17],
    },
    77: {
        caption: 'Tanker Semi Truck Trailer',
        color: '#9f1616',
        credits: 20_000,
        coins: 15,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 10_000,
        special: 'Towed by Crew cab semi',
    },
    78: {
        caption: 'Tanker Trailer',
        color: '#9f1616',
        credits: 5000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 13],
        waterTank: 1000,
        special:
            'Towed by Battalion chief unit, Utility unit, Type 2 fire engine, Crew Carrier, Type 5 engine, Type 7 engine, ',
    },
} satisfies Record<number, InternalVehicle>;
