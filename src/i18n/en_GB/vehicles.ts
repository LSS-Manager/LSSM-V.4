import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'Water Ladder',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'A standard pump used for fighting fires.',
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    1: {
        caption: 'Light 4X4 Pump (L4P)',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'A smaller pump used in rural areas, will act as a pump.',
        pumpCapacity: 1500,
        pumpType: 'fire',
    },
    2: {
        caption: 'Aerial Appliance',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Required once you have built 3 fire stations. An Aerial Asset, very useful for fighting fires in high rises and rescuing people.',
    },
    3: {
        caption: 'Fire Officer',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18, 22],
        special:
            'Required once you have built 6 fire stations. A small car used for transporting Station Managers+ to calls, not uncommon to see 6-8 of these at Major Incidents.',
    },
    4: {
        caption: 'Rescue Support Unit (RSU)',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Required once you have built 4 fire stations. A big lorry with specialist rescue equipment, useful for Road Traffic Collisions.',
        pumpCapacity: 1500,
        pumpType: 'fire',
    },
    5: {
        caption: 'Ambulance',
        color: '#9c871c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 20, 21, 25],
        special: 'A standard ambulance for tackling your medical emergencys.',
    },
    6: {
        caption: 'Water Carrier',
        color: '#aa0000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Required once you have built 7 fire stations. Used for conveying water to a fire, useful for rural fires.',
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    7: {
        caption: 'HazMat Unit',
        color: '#990000',
        credits: 17_300,
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
        possibleBuildings: [0, 18],
        special:
            'Required once you have built 11 fire stations. A HazMat unit which can be used for a range of hazardous calls. ',
    },
    8: {
        caption: 'Incident response vehicle',
        color: '#188b35',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special: 'A standard patrol car for tackling your police calls.',
    },
    9: {
        caption: 'HEMS',
        color: '#e68319',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 3,
            max: 5,
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
        special: 'An Air Ambulance for the most serious cases.',
    },
    10: {
        caption: 'Rapid Response Vehicle',
        color: '#b89d14',
        credits: 4000,
        coins: 20,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 5, 20, 21, 22, 25],
        special:
            'A fast and angile ambulance car, very useful when a ambulance has a long response time.',
    },
    11: {
        caption: 'Police Helicopter',
        color: '#0a7c16',
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
        special:
            'A Police Helicopter, useful for pursuits and firearms attacks.',
    },
    12: {
        caption: 'Dog Support Unit',
        color: '#1f7915',
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
        possibleBuildings: [6, 19, 22, 26],
        special:
            'Required once you have built 6 police stations. Acts as a Dog Support Unit (DSU) and Incident Response Vehicle. A dog for tracking and chasing criminals.',
    },
    13: {
        caption: 'Armed Response Vehicle',
        color: '#438a17',
        credits: 7000,
        coins: 23,
        staff: {
            min: 1,
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
        possibleBuildings: [6, 19, 26],
        special:
            'Required once you have built 8 police stations. Acts as a Armed Response Vehicle and Incident Response Vehicle. Firearms unit for the worst calls.',
    },
    14: {
        caption: 'BASU',
        color: '#ca1616',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Required from 5 fire stations. Carrys air tanks to a call.',
    },
    15: {
        caption: 'ICCU',
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
        special:
            'Acts as a Incident Command and Control Unit and a Fire Officer. Required once you have built 13 fire stations. A command post for Major Incidents.',
    },
    16: {
        caption: 'Rescue Pump',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'To purchase with credits it requires the rank: Captain or Superintendent, <br>Lower ranked members can purchase the vehicle for 25 Coins. A Pump with extraction tools. Perfect for your Road Traffic Collisions.',
    },
    17: {
        caption: 'CARP',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'To purchase with credits it requires the rank: Captain or Superintendent, <br>Lower ranked members can purchase the vehicle for 25 Coins. A Pump with an Aerial Asset on top, perfect for high rise fires and rescuing people form tall buildings.',
    },
    18: {
        caption: 'Co-Responder Vehicle',
        color: '#bb2222',
        credits: 4000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Fire Station': {
                    coresponder: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'A Rapid Response Vehicle operated by the fire service where there is little to no ambulance coverage.',
    },
    19: {
        caption: 'Joint Response Unit',
        color: '#48832e',
        credits: 6000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [2, 6, 19, 20, 25, 26],
        special:
            'Acts as a Rapid Response Vehicle and Incident Response Vehicle. Perfect for calls that need police and alot of ambulances.',
    },
    20: {
        caption: 'Operational Team Leader',
        color: '#997122',
        credits: 20_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21, 22, 25],
        special:
            'Required from 6 ambulance stations. A medical command unit, usefull for co-ordinating scenes.',
    },
    21: {
        caption: 'General Practitioner',
        color: '#99631f',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rescue: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [21, 22],
        special:
            'Can only be placed at the Home Response Location and Clinic. A General Practitioner that can respond as a on call doctor and a Rapid Response Vehicle.',
    },
    22: {
        caption: 'Community First Responder',
        color: '#996719',
        credits: 2500,
        coins: 12,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [22],
        special:
            'Can only be placed at the Home Response Location. A Ambulance Rapid Response Vehicle but staffed with volunteers',
    },
    23: {
        caption: 'Crew Carrier',
        color: '#662222',
        credits: 8000,
        coins: 10,
        staff: { min: 1, max: 12 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 18, 20, 25],
        special: 'Transporting many staff to a scene.',
    },
    24: {
        caption: 'Traffic Car',
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
        possibleBuildings: [6, 19, 26],
        special:
            'Acts as a Traffic Car and Incident Response Vehicle. A pursuit vehicle for high speed chases as well as RTCs.',
    },
    25: {
        caption: 'Armed Traffic Car',
        color: '#577529',
        credits: 19_000,
        coins: 35,
        staff: {
            min: 1,
            max: 2,
            training: {
                Police: {
                    swat: {
                        all: true,
                    },
                    traffic_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'Requires both, Firearms training and Roads Policing Officer Training. Works as a Traffic Car, Armed Response Vehicle and an Incident Response Vehicle. For highspeed chases and firearms incidents. ',
    },
    26: {
        caption: 'Heavy 4x4 Tanker',
        color: '#aa0000',
        credits: 25_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Unlocked at Fire Apparatus Operator or Sergeant Rank. Works as a Water Carrier and Water Ladder. Used in rural areas to save money.',
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    27: {
        caption: 'PRV',
        color: '#99631f',
        credits: 12_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    hazard_response_ems: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
        special:
            'Acts as a Rapid Response Vehicle and a Primary Response Vehicle. Responds to the most serious of calls, where lives are in serious danger.',
    },
    28: {
        caption: 'SRV',
        color: '#99631f',
        credits: 12_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    hazard_response_ems: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
        special:
            'Acts as a Rapid Response Vehicle and a Secondary Response Vehicle. Responds to the most serious of calls, where lives are in serious danger.',
    },
    29: {
        caption: 'Welfare Vehicle',
        color: '#99631f',
        credits: 15_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18, 25],
        special:
            'Acts as a Rapid Response Vehicle and a Welfare Unit. Responds to the most serious of calls, Used for Major Fires.',
    },
    30: {
        caption: 'ATV Carrier',
        color: '#99631f',
        credits: 12_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    hazard_response_ems: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [25],
        special:
            'Acts as a Rapid Response Vehicle and a ATV Carrier. Responds to the most serious of calls, where lives are in serious danger in ruarl areas.',
    },
    31: {
        caption: 'Ambulance Control Unit',
        color: '#99631f',
        credits: 50_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    elw2_ems: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21, 25],
        special:
            'Command Post run by the ambulance service for the most serious of calls.',
    },
    32: {
        caption: 'CBRN Vehicle',
        color: '#99631f',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    special_operation_response: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 21, 25],
        special: 'A HazMat run by the ambulance service.',
    },
    33: {
        caption: 'Mass Casualty Equipment',
        color: '#99631f',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rescue: {
                    special_operation_response: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 25],
        special:
            'You can buy 1 Mass Casualty Equipment for every 20 ambulance stations (respectively 15 with premium account). It is required for missions that can spawn with over 30 patients. Requires Mass Casualty Extension.',
    },
    34: {
        caption: 'Ambulance Officer',
        color: '#99631f',
        credits: 25_500,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rescue: {
                    ems_mobile_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20, 22, 25],
        special:
            'Acts as a Ambulance Officer and A Rapid Response Vehicle. Required once you have built 15 Rescue stations. It is required for missions that can spawn with over 20 patients to help command the scene. Requires Mass Casualty Extension.',
    },
    35: {
        caption: 'BFU',
        color: '#aa0000',
        credits: 17_300,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Bulk Foam Unit, Fufills the foam unit requirement on missions. Used on hazardous fires and electrical fires. Requires Foam Extension.',
    },
    36: {
        caption: 'F/WrC',
        color: '#aa0000',
        credits: 45_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Bulk Foam Unit and a Water Carrier. Used on hazardous fires and electrical fires. Requires Foam Extension.',
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    37: {
        caption: 'WrL CAFS',
        color: '#aa0000',
        credits: 17_300,
        coins: 10,
        staff: { min: 2, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Bulk Foam Unit and a Water Ladder (Pump). Used On any fire but also has the capability to use foam to extinguish a fire. Requires Foam Extension.',
    },
    38: {
        caption: 'RP CAFS',
        color: '#aa0000',
        credits: 25_000,
        coins: 10,
        staff: { min: 2, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Bulk Foam Unit, Rescue Support Vehicle and a Pump. Used on any fire, foam capabilty as well as being useful at RTCs. Requires Foam Extension.',
    },
    39: {
        caption: 'OSU',
        color: '#aa0000',
        credits: 30_000,
        coins: 15,
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
        possibleBuildings: [0, 18],
        special:
            'Requires the rank Staff Captain or Chief Superintendent. Acts as a Breathing Appartus Support Unit, HazMat Unit and a Welfare Unit. This unit will supply HazMat Resources, additional air tanks and a welfare location.',
    },
    40: {
        caption: 'PM',
        color: '#aa0000',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Carries Every Pod, which are different types of vehicles on the back of a lorry. Requires Swap Body Parking Space.',
    },
    41: {
        caption: 'Water Pod',
        color: '#aa0000',
        credits: 17_300,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Acts as a Water Carrier. Requires Swap Body Parking Space.',
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    42: {
        caption: 'Bulk Foam Pod',
        color: '#aa0000',
        credits: 17_300,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Bulk Foam Unit. Used on hazardous fires and electrical fires. Requires Swap Body Parking Space.',
    },
    43: {
        caption: 'Rescue Pod',
        color: '#aa0000',
        credits: 12_180,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Rescue Support Unit. Requires Swap Body Parking Space.',
    },
    44: {
        caption: 'Command Pod',
        color: '#aa0000',
        credits: 25_500,
        coins: 8,
        staff: {
            min: 0,
            max: 0,
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
        special:
            'Requires special education for personnel on Prime Mover (Mobile command). Acts as a Incident Command and Control Unit and a Fire Officer. Requires Swap Body Parking Space.',
    },
    45: {
        caption: 'Welfare Pod',
        color: '#aa0000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Acts as a Welfare Unit. Requires Swap Body Parking Space.',
    },
    46: {
        caption: 'BASU Pod',
        color: '#aa0000',
        credits: 11_680,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Breathing Appartus Support Unit. Requires Swap Body Parking Space.',
    },
    47: {
        caption: 'Misting Pod',
        color: '#aa0000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special:
            'Acts as a Light 4x4 Pump Unit. Requires Swap Body Parking Space.',
    },
    48: {
        caption: 'Hazardous Materials Pod',
        color: '#aa0000',
        credits: 19_200,
        coins: 8,
        staff: {
            min: 0,
            max: 0,
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
        special:
            'Requires special education for personnel on Prime Mover (HazMat). Acts as a HazMat Unit. Requires Swap Body Parking Space.',
    },
    49: {
        caption: 'OSU Pod',
        color: '#aa0000',
        credits: 30_000,
        coins: 8,
        staff: {
            min: 0,
            max: 0,
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
        special:
            'Requires special education for personnel in Prime Mover (HazMat). Acts as a Hazmat Unit, Welfare Unit and a Breathing Apparatus Support Unit. Requires Swap Body Parking Space.',
    },
    50: {
        caption: 'HVP',
        color: '#aa0000',
        credits: 20_000,
        coins: 8,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Fire Station': {
                    pump: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        pumpCapacity: 4000,
        pumpType: 'fire',
        special:
            'Requires special education for personnel on Prime Mover (High Volume Pump Training). Acts as a Water Carrier. Requires Swap Body Parking Space.',
    },
    51: {
        caption: 'Police Support Unit Carrier',
        color: '#3a5522',
        credits: 8000,
        coins: 10,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'Acts as a Incident Response Vehicle. This Police Support Unit, carrys a large amount of officers (usually L1/2 Public Order Trained) to scenes.',
    },
    52: {
        caption: 'Firearms Personnel Carrier',
        color: '#3a5522',
        credits: 8000,
        coins: 15,
        staff: {
            min: 1,
            max: 9,
            training: {
                Police: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'Acts as a Incident Response Vehicle and a Armed Response Vehicle. A Large Van carrying 9 Firearms Officers to scenes and reducing the amount of armed vehicles needed.',
    },
    53: {
        caption: 'Multiple Dog Carrier',
        color: '#3a5522',
        credits: 50_000,
        coins: 15,
        staff: {
            min: 1,
            max: 4,
            training: {
                Police: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'A dog carrier which transports mutiple dogs to a scene. Needs Police and Public Order Extension.',
    },
    54: {
        caption: 'Detention Van',
        color: '#3a5522',
        credits: 26_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'This is a Large Cell Van used in order to transport multiple suspects to custody at once, 4 prisoners will be transported. Needs Police and Public Order Extension.',
    },
    55: {
        caption: 'Mounted Unit',
        color: '#3a5522',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 1,
            max: 8,
            training: {
                Police: {
                    police_horse: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19, 26],
        special:
            'This unit will transport horses from stables to riots in order to get a higher view of what is happening in the crowd. Needs Police and Public Order Extension.',
    },
    56: {
        caption: 'Multi-Role Armoured Vehicle',
        color: '#3a5522',
        credits: 10_000,
        coins: 23,
        staff: {
            min: 1,
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
        possibleBuildings: [6, 19, 26],
        special:
            'Acts as a Incident Response Vehicle and a Armed Response Vehicle. This is a armoured vehicle transporting 6 firearms officers.',
    },
    57: {
        caption: 'CRV',
        color: '#88ecc4',
        credits: 20_000,
        coins: 15,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [22, 28],
        special: 'Coastguard Response Vehicle. Responds to all calls on land.',
    },
    58: {
        caption: 'Coastguard Mud Rescue Unit',
        color: '#88ecc4',
        credits: 20_000,
        coins: 15,
        staff: { min: 1, max: 5 },
        icon: 'car-side',
        possibleBuildings: [28],
        special: 'Rescues those stuck in mud.',
    },
    59: {
        caption: 'Coastguard Rope Rescue Unit',
        color: '#88ecc4',
        credits: 35_000,
        coins: 20,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Water Rescue': {
                    gw_hoehenrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [28],
    },
    60: {
        caption: 'Coastguard Commander',
        color: '#88ecc4',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 1,
            max: 5,
            training: {
                'Water Rescue': {
                    coastal_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [22, 28],
        special: 'Takes Command of all coastguard related incidents.',
    },
    61: {
        caption: 'Flood Rescue Unit (Trailer)',
        color: '#88ecc4',
        credits: 35_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue': {
                    flood_equipment: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27, 28],
        pumpCapacity: 2500,
        pumpType: 'fire',
        special:
            'Needed towing vehicle (CRV, Coastguard Commander, Coastguard Mud Rescue Unit, Coastguard Rope Rescue Unit, Support Unit, 4x4 Vehicle). Helps to deal with flooding.',
    },
    62: {
        caption: 'Mud Decontamination Unit',
        color: '#88ecc4',
        credits: 35_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue': {
                    coastal_mud_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [28],
        special:
            'Needed towing vehicle (Coastguard Mud Rescue Unit). Decontaiminates Hazardous Mud',
    },
    63: {
        caption: 'Support Unit',
        color: '#88ecc4',
        credits: 25_000,
        coins: 15,
        staff: { min: 1, max: 8 },
        icon: 'car-side',
        possibleBuildings: [28],
        special: 'Provides extra coastguard staff to a incident.',
    },
    64: {
        caption: 'Coastguard Rescue Helicopter',
        color: '#88ecc4',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 4,
            max: 4,
            training: {
                'Water Rescue': {
                    coastal_rescue_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [30],
        special: 'Can Transport More Paitents to hospital then a Air Ambulance',
    },
    65: {
        caption: 'Coastguard Rescue Helicopter (Large)',
        color: '#88ecc4',
        credits: 500_000,
        coins: 35,
        staff: {
            min: 6,
            max: 6,
            training: {
                'Water Rescue': {
                    coastal_rescue_pilot: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [30],
        special:
            'Can Transport even more paitents to hospital then the Small One',
    },
    66: {
        caption: '4x4 Vehicle',
        color: '#88ecc4',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [27],
        special: 'Transports Lifeguards by road.',
    },
    67: {
        caption: 'Inland Rescue Boat (Trailer)',
        color: '#88ecc4',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27],
        special:
            'Needed towing vehicle (4x4 Vehicle). Small Boat run by lifeguards for inland water rescue needs',
    },
    68: {
        caption: 'ILB',
        color: '#88ecc4',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 3,
            max: 4,
            training: {
                'Water Rescue': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27],
        special:
            'Inshore Lifeboat, Helps those not to far away form the coast line',
    },
    69: {
        caption: 'ALB',
        color: '#88ecc4',
        credits: 40_000,
        coins: 25,
        staff: {
            min: 5,
            max: 7,
            training: {
                'Water Rescue': {
                    ocean_navigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27],
        special:
            'All Weather Lifeboat, Helps everyone stuck in the sea in all weather.',
    },
    70: {
        caption: 'Rescue Watercraft (Trailer)',
        color: '#88ecc4',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue': {
                    jetski: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27],
        special:
            'Needed towing vehicle (4x4 Vehicle). Jetski helps those who are drowning at the beach',
    },
    71: {
        caption: 'Hovercraft (Trailer)',
        color: '#88ecc4',
        credits: 35_000,
        coins: 20,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [27],
        special:
            'Needed towing vehicle (Hovercraft Transporter), Requires 3 people with special education in towing vehicle (Hovercraft Commander Training). Another type of boat for incidents closer to the shore line.',
    },
    72: {
        caption: 'Hovercraft Transporter',
        color: '#88ecc4',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Water Rescue': {
                    hover_boat_elw: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [27],
        special: 'Transports Hovercraft trailer to incidents.',
    },
    73: {
        caption: 'Light 4x4',
        color: '#88ecc4',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Tows the Boat Trailer for the fire service',
    },
    74: {
        caption: 'Boat Trailer',
        color: '#88ecc4',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            training: {
                'Water Rescue': {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Needed towing vehicle (Light 4x4) Fire Service Boat.',
    },
    75: {
        caption: 'Major Foam Tender',
        color: '#aa0000',
        credits: 45_000,
        coins: 25,
        staff: {
            min: 1,
            max: 4,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    76: {
        caption: 'RIV',
        color: '#aa0000',
        credits: 20_000,
        coins: 20,
        staff: {
            min: 1,
            max: 4,
            training: {
                'Fire Station': {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    77: {
        caption: 'Airfield Firefighting Command Vehicle',
        color: '#aa0000',
        credits: 30_000,
        coins: 20,
        staff: {
            min: 2,
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
        possibleBuildings: [0, 18],
    },
    78: {
        caption: 'Rescue Stairs',
        color: '#aa0000',
        credits: 15_000,
        coins: 15,
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
        possibleBuildings: [0, 18],
    },
    79: {
        caption: 'Airfield Operations Vehicle',
        color: '#8cec24',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [0, 6, 18, 19],
    },
    80: {
        caption: 'Airfield Operations Supervisor',
        color: '#8cec24',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [0, 6, 18, 19],
    },
    81: {
        caption: 'Medical equipment trailer',
        color: '#8cec24',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        possibleBuildings: [0, 6, 18, 19],
        special:
            'Needed towing vehicle (Airfield Operations Vehicle, Airfield Operations Supervisor)',
    },
    82: {
        caption: 'Armed Cell Van',
        color: '#3a5522',
        credits: 30_000,
        coins: 20,
        staff: {
            min: 1,
            max: 2,
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
    83: {
        caption: 'Medical cycle responder',
        color: '#b89d14',
        credits: 5000,
        coins: 10,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    84: {
        caption: 'Pump Trailer',
        color: '#aa0000',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        special:
            'Needed towing vehicle (Water Ladder, Light 4X4 Pump (L4P), Rescue Support Unit (RSU))',
        pumpCapacity: 4000,
        pumpType: 'fire',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [0, 1, 4],
    },
} satisfies Record<number, InternalVehicle>;
