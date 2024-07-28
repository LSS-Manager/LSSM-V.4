import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'CAS 20',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 4, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        foamTank: 200,
        pumpCapacity: 2000,
        pumpType: 'fire',
    },
    1: {
        caption: 'CAS 30',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 9000,
        foamTank: 540,
        pumpCapacity: 3000,
        pumpType: 'fire',
    },
    2: {
        caption: 'AZ',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 2 },
        special: 'Požadováno po vybudování 3 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    3: {
        caption: 'VEA',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        special: 'Požadováno po vybudování 6 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    4: {
        caption: 'TA',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 2, max: 3 },
        special: 'Požadováno po vybudování 4 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    5: {
        caption: 'RZP',
        color: '#9c1c1c',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 2, 18, 20],
    },
    6: {
        caption: 'KHA',
        color: '#aa0000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 2 },
        special: 'Požadováno po vybudování 7 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 6000,
        foamTank: 3000,
        pumpCapacity: 4000,
        pumpType: 'fire',
    },
    7: {
        caption: 'TACH',
        color: '#990000',
        credits: 19_200,
        coins: 25,
        staff: { 
            min: 1,
            max: 4,
            training: {
                'Hasiči': {
                    gw_gefahrgut: {
                        all: false,
                    },
                },
            }, 
        },
        special: 'Požadováno po vybudování 11 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [],
    },
    8: {
        caption: 'Policejní automobil',
        color: '#8b1818',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'Vrtulník LZS',
        color: '#e61919',
        credits: 300_000,
        coins: 30,
        staff: { 
            min: 3,
            max: 5,
            training: {
                'Záchranáři': {
                    critical_care: {
                        all: false,
                    },
                },
            }, 
        },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'AP',
        color: '#e61919',
        credits: 14_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    11: {
        caption: 'Policejní vrtulník',
        color: '#ca1616',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Policie': {
                    polizeihubschrauber: {
                        all: false,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [13],
    },
    12: {
        caption: 'Obrněné vozidlo URNA',
        color: '#ca1616',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
            max: 6,
            training: {
                'Policie': {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        special: 'Požadováno po vybudování 8 Obvodních oddělení Policie',
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    13: {
        caption: 'Vozidlo Kynologů PČR',
        color: '#ca1616',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Policie': {
                    k9: {
                        all: false,
                    },
                },
            },
        },
        special: 'Požadováno po vybudování 6 Obvodních oddělení Policie',
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    14: {
        caption: 'Policejní motocykl',
        color: '#ca1616',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                'Policie': {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    15: {
        caption: 'URNA SUV',
        color: '#ca1616',
        credits: 7000,
        coins: 23,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Policie': {
                    swat: {
                        all: false,
                    },
                },
            }
        },
        special: 'Požadováno po vybudování 8 Obvodních oddělení Policie',
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    16: {
        caption: 'Protiplynový automobil',
        color: '#770000',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        special: 'Požadováno po vybudování 5 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    17: {
        caption: 'MOS',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                'Hasiči': {
                    elw2: {
                        all: false,
                    },
                },
            }
        },
        special: 'Požadováno po vybudování 13 požárních stanic',
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    18: {
        caption: 'Vyzidlo vyšetřovatelů DN',
        color: '#8b1818',
        credits: 15_000,
        coins: 10,
        staff: {
            min: 2,
            max: 3,
            training: {
                'Policie': {
                    traffic_police: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    19: {
        caption: 'Vozidlo pyrotechnika PČR',
        color: '#8b1818',
        credits: 35_000,
        coins: 35,
        staff: {
            min: 2,
            max: 3,
            training: {
                'Policie': {
                    fbi_bomb_tech: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [21],
    },
    20: {
        caption: 'Přívěs se člunem',
        color: '#990000',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        special: 'Je potřeba tažné vozidlo (CAS 20, Potápěčský automobil, DA) s minimální posádkou 3 členů vyškolenou v oboru (Záchrana z vody).',
        icon: 'trailer',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [0, 22, 30],
    },
    21: {
        caption: 'Přívěs se člunem VZS ČČK',
        color: '#990000',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        special: 'Je potřeba tažné vozidlo (SUV VZS ČČK, Dodávka VZS ČČK). Vyžaduje osoby(4) se speciálním vzděláním v oboru (Vodní záchranná služba)',
        icon: 'trailer',
        possibleBuildings: [15],
        isTrailer: true,
        tractiveVehicles: [23, 24],
    },
    22: {
        caption: 'Potápěčský automobil',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Hasiči': {
                    gw_taucher: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    23: {
        caption: 'SUV VZS ČČK',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1, 
            max: 4 
            training: {
                'VZS ČČK': {
                    water_rescue_service: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    24: {
        caption: 'Dodávka VZS ČČK',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2, 
            max: 4 
            training: {
                'VZS ČČK': {
                    water_rescue_service: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    25: {
        caption: 'RV',
        color: '#9c1c1c',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1, 
            max: 2 
            training: {
                'Záchranáři': {
                    critical_care: {
                        all: false,
                    },
                },
            }
        },
        special: 'Požadováno po vybudování 6 výjezdových stanovišť ZZS',
        icon: 'ambulance',
        possibleBuildings: [2, 20],
    },
    26: {
        caption: 'IP',
        color: '#9c1c1c',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1, 
            max: 2 
            training: {
                'Záchranáři': {
                    orgl: {
                        all: false,
                    },
                },
            }
        },
        special: 'Požadováno po vybudování 10 výjezdových stanovišť ZZS',
        icon: 'ambulance',
        possibleBuildings: [2, 20],
    },
    27: {
        caption: 'RLP',
        color: '#9c1c1c',
        credits: 10_000,
        coins: 30,
        staff: {
            min: 2, 
            max: 3 
            training: {
                'Záchranáři': {
                    critical_care: {
                        all: false,
                    },
                },
            }
        },
        icon: 'ambulance',
        possibleBuildings: [2, 20],
    },
    28: {
        caption: 'VYA',
        color: '#791515',
        credits: 35_000,
        coins: 10,
        staff: {
            min: 1, 
            max: 2 
            training: {
                'Hasiči': {
                    fwk: {
                        all: false,
                    },
                },
            }
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    29: {
        caption: 'AJ',
        color: '#791515',
        credits: 35_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Hasiči': {
                    fwk: {
                        all: false,
                    },
                },
            }
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    30: {
        caption: 'DA',
        color: '#791515',
        credits: 10_000,
        coins: 10,
        staff: { min: 1, max: 9 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    31: {
        caption: 'RZA',
        color: '#791515',
        credits: 20_000,
        coins: 10,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    32: {
        caption: 'Dodávka pořádkové jednotky',
        color: '#8b1818',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 1,
            max: 9,
            training: {
                'Policie': {
                    riot_police: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    33: {
        caption: 'Policejní anton',
        color: '#8b1818',
        credits: 25_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    34: {
        caption: 'Vodní dělo pořádkové policie',
        color: '#8b1818',
        credits: 35_000,
        coins: 15,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    35: {
        caption: 'Vozidlo velitele PČR',
        color: '#8b1818',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                'Policie': {
                    riot_police_command: {
                        all: false,
                    },
                },
            }
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    36: {
        caption: 'Monitorovací vozidlo',
        color: '#8b1818',
        credits: 25_000,
        coins: 10,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    37: {
        caption: 'Technické vozidlo s LRAD',
        color: '#8b1818',
        credits: 25_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    38: {
        caption: 'Malý přepravník koní',
        color: '#8b1818',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Policie': {
                    police_horse: {
                        all: true,
                    },
                },
            }
        },
        icon: 'horse',
        possibleBuildings: [6, 19],
    },
    39: {
        caption: 'Nákladní přepravník koní',
        color: '#8b1818',
        credits: 35_000,
        coins: 15,
        staff: {
            min: 6,
            max: 6,
            training: {
                'Policie': {
                    police_horse: {
                        all: true,
                    },
                },
            }
        },
        icon: 'horse',
        possibleBuildings: [6, 19],
    },
    40: {
        caption: 'Letištní speciál',
        color: '#cc0000',
        credits: 40_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
            training: {
                'Hasiči': {
                    arff: {
                        all: false,
                    },
                },
            }
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 12000,
        foamTank: 1500,
        pumpCapacity: 6000,
        pumpType: 'fire',
    },
    41: {
        caption: 'Záchranné evakuační schody',
        color: '#cc0000',
        credits: 80_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Hasiči': {
                    rettungstreppe: {
                        all: true,
                    },
                },
            }
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    42: {
        caption: 'Přívěs s motorovým čerpadlem',
        color: '#cc0000',
        credits: 10_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        special: 'Je potřeba tažné vozidlo (CAS 20, CAS 30, KHA, DA)',
        pumpCapacity: 4000,
        pumpType: 'sewage',
        isTrailer: true,
        tractiveVehicles: [0, 1, 6, 30],
        possibleBuildings: [0, 18],
    },
    43: {
        caption: 'ANK',
        color: '#cc0000',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 1,
            max: 3,
            training: {
                'Hasiči': {
                    pod_tractive: {
                        all: false,
                    },
                },
            }
        },
        icon: 'truck-field',
        possibleBuildings: [0, 18],
    },
    44: {
        caption: 'Sorbentový kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    45: {
        caption: 'Chemický kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    46: {
        caption: 'Plynový hasící kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    47: {
        caption: 'Pěnidlový kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    48: {
        caption: 'Hadicový kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    49: {
        caption: 'Technický kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    50: {
        caption: 'Týlový kontejner',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    51: {
        caption: 'Kontejnerová elektrocentrála',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    52: {
        caption: 'Kontejner pro nouzové zastřešení',
        color: '#cc0000',
        credits: 5_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
    },
    53: {
        caption: 'Lodní kontejner',
        color: '#cc0000',
        credits: 28_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [43],
        equipmentCapacity: 2,
    },
    54: {
        caption: 'Přeprava ambulancí',
        color: '#9c1c1c',
        credits: 5_000,
        coins: 12,
        staff: { min: 2, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [2, 20],
    },
    55: {
        caption: 'Ambulance pro urgentní přepravu',
        color: '#9c1c1c',
        credits: 10_000,
        coins: 30,
        staff: {
            min: 2,
            max: 2,
            training: {
                'Záchranáři': {
                    critical_care: {
                        all: false,
                    },
                },
            }
        },
        icon: 'ambulance',
        possibleBuildings: [2, 20],
    },
} satisfies Record<number, InternalVehicle>;
