import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'LF 20',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 2000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 150,
    },
    1: {
        caption: 'LF 10',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1200,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    2: {
        caption: 'DLK 23',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Kann ab 3 Feuerwachen angefordert werden.',
    },
    3: {
        caption: 'ELW 1',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Kann ab 6 Feuerwachen angefordert werden.',
    },
    4: {
        caption: 'RW',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Kann ab 4 Feuerwachen angefordert werden.',
    },
    5: {
        caption: 'GW-A',
        color: '#9c1c1c',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Kann ab 5 Feuerwachen angefordert werden.',
    },
    6: {
        caption: 'LF 8/6',
        color: '#aa0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 600,
        pumpCapacity: 800,
        pumpType: 'fire',
        foamTank: 150,
    },
    7: {
        caption: 'LF 20/16',
        color: '#990000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1600,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 150,
    },
    8: {
        caption: 'LF 10/6',
        color: '#880000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 600,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    9: {
        caption: 'LF 16-TS',
        color: '#770000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 0,
        pumpCapacity: 1600,
        pumpType: 'fire',
        foamTank: 150,
    },
    10: {
        caption: 'GW-Öl',
        color: '#8b1818',
        credits: 12_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Kann ab 6 Feuerwachen angefordert werden.',
    },
    11: {
        caption: 'GW-L2-Wasser',
        color: '#e61919',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        special:
            'Ein Schlauchwagen wird ab 7 Feuerwachen benötigt. Er gibt 25% Bonus auf die Wassermenge, die durch (H/T)LF vor Ort ist.',
    },
    12: {
        caption: 'GW-Messtechnik',
        color: '#791515',
        credits: 18_300,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    gw_messtechnik: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Kann ab 10 Feuerwachen angefordert werden.',
    },
    13: {
        caption: 'SW 1000',
        color: '#dc1818',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        special:
            'Ein Schlauchwagen wird ab 7 Feuerwachen benötigt. Er gibt 25% Bonus auf die Wassermenge, die durch (H/T)LF vor Ort ist.',
    },
    14: {
        caption: 'SW 2000',
        color: '#ca1616',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        special:
            'Ein Schlauchwagen wird ab 7 Feuerwachen benötigt. Er gibt 25% Bonus auf die Wassermenge, die durch (H/T)LF vor Ort ist.',
    },
    15: {
        caption: 'SW 2000-Tr',
        color: '#b81414',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        special:
            'Ein Schlauchwagen wird ab 7 Feuerwachen benötigt. Er gibt 25% Bonus auf die Wassermenge, die durch (H/T)LF vor Ort ist.',
    },
    16: {
        caption: 'SW Kats',
        color: '#a51212',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        special:
            'Ein Schlauchwagen wird ab 7 Feuerwachen benötigt. Er gibt 25% Bonus auf die Wassermenge, die durch (H/T)LF vor Ort ist.',
    },
    17: {
        caption: 'TLF 2000',
        color: '#cc2222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 2000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    18: {
        caption: 'TLF 3000',
        color: '#bb2222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 150,
    },
    19: {
        caption: 'TLF 8/8',
        color: '#aa2222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 800,
        pumpCapacity: 800,
        pumpType: 'fire',
        foamTank: 150,
    },
    20: {
        caption: 'TLF 8/18',
        color: '#992222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1800,
        pumpCapacity: 800,
        pumpType: 'fire',
        foamTank: 150,
    },
    21: {
        caption: 'TLF 16/24-Tr',
        color: '#882222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 2400,
        pumpCapacity: 1600,
        pumpType: 'fire',
        foamTank: 150,
    },
    22: {
        caption: 'TLF 16/25',
        color: '#772222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 2400,
        pumpCapacity: 1600,
        pumpType: 'fire',
        foamTank: 750,
    },
    23: {
        caption: 'TLF 16/45',
        color: '#662222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 4500,
        pumpCapacity: 1600,
        pumpType: 'fire',
        foamTank: 750,
    },
    24: {
        caption: 'TLF 20/40',
        color: '#552222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 150,
    },
    25: {
        caption: 'TLF 20/40-SL',
        color: '#442222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 750,
    },
    26: {
        caption: 'TLF 16',
        color: '#332222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1800,
        pumpCapacity: 1600,
        pumpType: 'fire',
        foamTank: 150,
    },
    27: {
        caption: 'GW-Gefahrgut',
        color: '#681212',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Wird ab 11 Feuerwachen benötigt.',
    },
    28: {
        caption: 'RTW',
        color: '#f59f00',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [0, 18, 2, 12, 20, 25],
    },
    29: {
        caption: 'NEF',
        color: '#e09200',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Feuerwehr: {
                    notarzt: {
                        all: true,
                    },
                },
                Rettungsdienst: {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18, 2, 20, 25],
        special: 'Wird ab 3 Rettungswachen benötigt.',
    },
    30: {
        caption: 'HLF 20',
        color: '#440000',
        credits: 20_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1600,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 150,
    },
    31: {
        caption: 'RTH',
        color: '#ddaa3c',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rettungsdienst: {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'helicopter',
        equipmentCapacity: 10,
        possibleBuildings: [5],
    },
    32: {
        caption: 'FuStW',
        color: '#005500',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'taxi',
        possibleBuildings: [6, 19],
    },
    33: {
        caption: 'GW-Höhenrettung',
        color: '#570f0f',
        credits: 19_500,
        coins: 25,
        staff: {
            min: 1,
            max: 9,
            training: {
                Feuerwehr: {
                    gw_hoehenrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Wird ab 12 Feuerwachen benötigt.',
    },
    34: {
        caption: 'ELW 2',
        color: '#bf2222',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Feuerwehr: {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Wird ab 13 Feuerwachen benötigt.',
    },
    35: {
        caption: 'leBefKw',
        color: '#288f28',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Polizei: {
                    police_einsatzleiter: {
                        all: true,
                    },
                },
            },
        },
        icon: 'bus',
        possibleBuildings: [11],
    },
    36: {
        caption: 'MTW',
        color: '#450c0c',
        credits: 2500,
        coins: 12,
        staff: { min: 1, max: 9 },
        icon: 'shuttle-van',
        possibleBuildings: [0, 18],
    },
    37: {
        caption: 'TSF-W',
        color: '#4a0303',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 500,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    38: {
        caption: 'KTW',
        color: '#ffb61a',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20, 25],
    },
    39: {
        caption: 'GKW',
        color: '#00138f',
        credits: 13_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [9],
    },
    40: {
        caption: 'MTW-TZ',
        color: '#0016a3',
        credits: 2500,
        coins: 12,
        staff: {
            min: 1,
            max: 4,
            training: {
                THW: {
                    thw_zugtrupp: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [9],
    },
    41: {
        caption: 'MzGW (FGr N)',
        color: '#0018b8',
        credits: 15_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [9],
    },
    42: {
        caption: 'LKW K 9',
        color: '#001bcc',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                THW: {
                    thw_raumen: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-pickup',
        possibleBuildings: [9],
    },
    43: {
        caption: 'BRmG R',
        color: '#001ee0',
        credits: 15_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'snowplow',
        possibleBuildings: [9],
        special: 'Muss vom "LKW K 9" zum Einsatz gezogen werden',
        isTrailer: true,
        tractiveVehicles: [42],
    },
    44: {
        caption: 'Anh DLE',
        color: '#0021f5',
        credits: 15_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
        special:
            'Muss von einem "GKW", "MzGW (FGr N)", "MTW-TZ" oder "MLW 5" zum Einsatz gezogen werden.',
        isTrailer: true,
        tractiveVehicles: [39, 40, 41, 45],
    },
    45: {
        caption: 'MLW 5',
        color: '#0a2bff',
        credits: 2500,
        coins: 12,
        staff: {
            min: 1,
            max: 6,
            training: {
                THW: {
                    thw_raumen: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [9],
    },
    46: {
        caption: 'WLF',
        color: '#f04242',
        credits: 5000,
        coins: 12,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    wechsellader: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-field',
        possibleBuildings: [0, 18],
    },
    47: {
        caption: 'AB-Rüst',
        color: '#ad0e0e',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    48: {
        caption: 'AB-Atemschutz',
        color: '#9c0b0b',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    49: {
        caption: 'AB-Öl',
        color: '#8b0707',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    50: {
        caption: 'GruKw',
        color: '#2d9f29',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'bus',
        possibleBuildings: [11],
    },
    51: {
        caption: 'FüKW (Polizei)',
        color: '#31af31',
        credits: 17_500,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Polizei: {
                    police_fukw: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [11, 17],
    },
    52: {
        caption: 'GefKw',
        color: '#36bf36',
        credits: 13_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'bus-alt',
        possibleBuildings: [6, 11],
    },
    53: {
        caption: 'Dekon-P',
        color: '#450909',
        credits: 23_100,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            trainingAtScene: 6,
            training: {
                Feuerwehr: {
                    dekon_p: {
                        min: 0,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special:
            'Pro Dekon-P müssen 6 Personen mit Dekon-P-Ausbildung vor Ort sein. Wird ab 14 Feuerwachen benötigt.',
    },
    54: {
        caption: 'AB-Dekon-P',
        color: '#450707',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 6,
            training: {
                Feuerwehr: {
                    dekon_p: {
                        all: true,
                    },
                },
            },
        },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    55: {
        caption: 'KdoW-LNA',
        color: '#805c0f',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rettungsdienst: {
                    lna: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special: 'Wird ab 5 Rettungswachen benötigt.',
    },
    56: {
        caption: 'KdoW-OrgL',
        color: '#926911',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rettungsdienst: {
                    orgl: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
        special: 'Wird ab 10 Rettungswachen benötigt.',
    },
    57: {
        caption: 'FwK',
        color: '#230606',
        credits: 30_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Feuerwehr: {
                    fwk: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special: 'Wird ab 14 Feuerwachen benötigt.',
    },
    58: {
        caption: 'KTW Typ B',
        color: '#cc5200',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [12],
        special:
            'Kann, wenn ein GW-San vor Ort ist, behandelte Patienten vom Einsatzort abtransportieren. Ein Transport mit Notarztbegleitung durch ein NEF ist auch möglich.',
    },
    59: {
        caption: 'ELW 1 (SEG)',
        color: '#a34100',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rettungsdienst: {
                    seg_elw: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [12],
        special:
            'Kann automatisch eingehende Sprechwünsche der eigenen Rettungsmittel bearbeiten und ihnen im Transportfall ein geeignetes Krankenhaus zuweisen. Die automatische Zuweisungsfunktion kann in dessen Einstellungen verändert werden.',
    },
    60: {
        caption: 'GW-San',
        color: '#8f3900',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
            max: 6,
            training: {
                Rettungsdienst: {
                    seg_gw_san: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [12],
        special:
            'Pro GW-San können 5 KTW Typ B wie ein RTW arbeiten. Er behandelt die Patienten zwar größtenteils, aber für die letzten paar Prozente braucht man dann einen RTW, KTW Typ B oder ähnliches.',
    },
    61: {
        caption: 'Polizeihubschrauber',
        color: '#14743f',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Polizei: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'helicopter',
        equipmentCapacity: 10,
        possibleBuildings: [13],
    },
    62: {
        caption: 'AB-Schlauch',
        color: '#e60808',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        waterBonus: 25,
        isTrailer: true,
        tractiveVehicles: [46],
    },
    63: {
        caption: 'GW-Taucher',
        color: '#88ecc4',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                Feuerwehr: {
                    gw_taucher: {
                        all: true,
                    },
                },
                Rettungsdienst: {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 12, 15, 18, 22],
    },
    64: {
        caption: 'GW-Wasserrettung',
        color: '#91dab5',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Feuerwehr: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
                Rettungsdienst: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 12, 15, 18, 22],
    },
    65: {
        caption: 'LKW 7 Lkr 19 tm',
        color: '#123183',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'truck-pickup',
        possibleBuildings: [9],
    },
    66: {
        caption: 'Anh MzB',
        color: '#1b428a',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 4,
            training: {
                THW: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [9],
        isTrailer: true,
        tractiveVehicles: [65],
        special:
            'Muss von einem "LKW 7 Lkr 19 tm" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    67: {
        caption: 'Anh SchlB',
        color: '#245390',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 4,
            training: {
                THW: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [9],
        isTrailer: true,
        tractiveVehicles: [65],
        special:
            'Muss von einem "LKW 7 Lkr 19 tm" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    68: {
        caption: 'Anh MzAB',
        color: '#296497',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 4,
            training: {
                THW: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [9],
        isTrailer: true,
        tractiveVehicles: [65],
        special:
            'Muss von einem "LKW 7 Lkr 19 tm" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    69: {
        caption: 'Tauchkraftwagen',
        color: '#36759e',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                THW: {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    70: {
        caption: 'MZB',
        color: '#9ac8a6',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 4,
            training: {
                Feuerwehr: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
                Rettungsdienst: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [0, 12, 15, 18, 22],
        isTrailer: true,
        tractiveVehicles: [63, 64],
        special:
            'Muss von einem "GW-Wasserrettung" oder einem "GW-Taucher" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    71: {
        caption: 'AB-MZB',
        color: '#bf7f6a',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 4,
            training: {
                Feuerwehr: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
                Rettungsdienst: {
                    gw_wasserrettung: {
                        all: true,
                    },
                },
            },
        },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
        special:
            'Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    72: {
        caption: 'WaWe 10',
        color: '#36b15d',
        credits: 13_000,
        coins: 25,
        staff: {
            min: 5,
            max: 5,
            training: {
                Polizei: {
                    police_wasserwerfer: {
                        all: true,
                    },
                },
            },
        },
        icon: 'bus-alt',
        possibleBuildings: [11],
    },
    73: {
        caption: 'GRTW',
        color: '#cc8500',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 6,
            max: 6,
            training: {
                Feuerwehr: {
                    notarzt: {
                        min: 1,
                    },
                },
                Rettungsdienst: {
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20, 25],
        special:
            'Der GRTW kann in zwei verschiedenen Modi alarmiert werden:<br>1. Für leichtverletzte Personen, die keinen Notarzt benötigen. Dann können in dem GRTW 7 Patienten gleichzeitig behandelt und abtransportiert werden. Es wird kein Notarzt zum Ausrücken benötigt.<br>2. Für schwerverletzte Personen, die einen Notarzt benötigen. Dann können in dem GRTW 3 Patienten gleichzeitig behandelt werden. Es wird mind. 1 Notarzt zum Ausrücken benötigt.<br>Pro 20 Rettungswachen (bzw. 15 Rettungswachen mit Premium-Account) kann ein GRTW gekauft werden.',
    },
    74: {
        caption: 'NAW',
        color: '#b87700',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                Feuerwehr: {
                    notarzt: {
                        min: 1,
                    },
                },
                Rettungsdienst: {
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20, 25],
        special:
            'Insgesamt so viele NAW kaufbar wie Rettungswachen (und auf einsatzbereit gestellte Rettungsdienst-Erweiterungen) vorhanden. Alle auch auf einer Wache platzierbar.',
    },
    75: {
        caption: 'FLF',
        color: '#7a534a',
        credits: 80_000,
        coins: 25,
        staff: {
            min: 2,
            max: 3,
            training: {
                Feuerwehr: {
                    arff: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 12_000,
        foamTank: 1500,
    },
    76: {
        caption: 'Rettungstreppe',
        color: '#6f6157',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            training: {
                Feuerwehr: {
                    rettungstreppe: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    77: {
        caption: 'AB-Gefahrgut',
        color: '#680101',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 1,
            training: {
                Feuerwehr: {
                    gw_gefahrgut: { all: true },
                },
            },
        },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    78: {
        caption: 'AB-Einsatzleitung',
        color: '#bf1111',
        credits: 6000,
        coins: 12,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 1,
            training: {
                Feuerwehr: {
                    elw2: { all: true },
                },
            },
        },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    79: {
        caption: 'SEK - ZF',
        color: '#217d1a',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 3,
            max: 4,
            training: {
                Polizei: {
                    police_sek: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11, 17],
    },
    80: {
        caption: 'SEK - MTF',
        color: '#1a7d1b',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 9,
            max: 9,
            training: {
                Polizei: {
                    police_sek: {
                        all: true,
                    },
                },
            },
        },
        icon: 'bus',
        possibleBuildings: [11, 17],
    },
    81: {
        caption: 'MEK - ZF',
        color: '#1a7d22',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 3,
            max: 4,
            training: {
                Polizei: {
                    police_mek: {
                        all: true,
                    },
                },
            },
        },
        icon: 'shuttle-van',
        possibleBuildings: [11, 17],
    },
    82: {
        caption: 'MEK - MTF',
        color: '#1a7d2a',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 9,
            max: 9,
            training: {
                Polizei: {
                    police_mek: {
                        all: true,
                    },
                },
            },
        },
        icon: 'bus',
        possibleBuildings: [11, 17],
    },
    83: {
        caption: 'GW-Werkfeuerwehr',
        color: '#99222b',
        credits: 15_000,
        coins: 30,
        staff: {
            min: 1,
            max: 9,
            training: {
                Feuerwehr: {
                    werkfeuerwehr: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    84: {
        caption: 'ULF mit Löscharm',
        color: '#992234',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    werkfeuerwehr: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 5000,
        foamTank: 3000,
    },
    85: {
        caption: 'TM 50',
        color: '#992b22',
        credits: 20_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    werkfeuerwehr: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    86: {
        caption: 'Turbolöscher',
        color: '#993422',
        credits: 12_500,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    werkfeuerwehr: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    87: {
        caption: 'TLF 4000',
        color: '#dd2222',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 4000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        foamTank: 500,
    },
    88: {
        caption: 'KLF',
        color: '#660000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 500,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    89: {
        caption: 'MLF',
        color: '#550000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    90: {
        caption: 'HLF 10',
        color: '#330000',
        credits: 20_000,
        coins: 25,
        staff: { min: 1, max: 9 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 1000,
        pumpCapacity: 1000,
        pumpType: 'fire',
        foamTank: 150,
    },
    91: {
        caption: 'Rettungshundefahrzeug',
        color: '#864708',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 4,
            max: 5,
            training: {
                Rettungsdienst: {
                    seg_rescue_dogs: {
                        all: true,
                    },
                },
            },
        },
        icon: 'paw',
        possibleBuildings: [12, 21],
        special:
            'Am Einsatzort sind ein "Rettungshundefahrzeug" und ein "Anh Hund" vom THW gleichwertig!',
    },
    92: {
        caption: 'Anh Hund',
        color: '#131f6e',
        credits: 6000,
        coins: 0,
        staff: {
            min: 0,
            max: 0,
            training: {
                THW: {
                    thw_rescue_dogs: {
                        all: true,
                    },
                },
            },
        },
        icon: 'paw',
        possibleBuildings: [9],
        isTrailer: true,
        tractiveVehicles: [93],
        special:
            'Muss von einem "MTW-O" an den Einsatzort gezogen werden. Am Einsatzort sind ein "Anh Hund" und ein "Rettungshundefahrzeug" vom Rettungsdienst gleichwertig!',
    },
    93: {
        caption: 'MTW-O',
        color: '#14165e',
        credits: 19_000,
        coins: 0,
        staff: {
            min: 4,
            max: 5,
        },
        icon: 'paw',
        possibleBuildings: [9],
    },
    94: {
        caption: 'DHuFüKW',
        color: '#339900',
        credits: 15_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polizei: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'paw',
        possibleBuildings: [6, 11, 17, 19, 22],
    },
    95: {
        caption: 'Polizeimotorrad',
        color: '#004400',
        credits: 3000,
        coins: 10,
        staff: {
            min: 1,
            max: 1,
            training: {
                Polizei: {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'motorcycle',
        possibleBuildings: [6, 19],
        special:
            'Das Polizeimotorrad kann im Spiel anstelle eines FuStW verwendet werden. Der Nachteil: Es kann keine Gefangenen transportieren und arbeitet nur halb so schnell wie ein FuStW.',
    },
    96: {
        caption: 'Außenlastbehälter (allgemein)',
        color: '#0a580c',
        credits: 50_000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
            training: {
                Polizei: {
                    police_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'fill',
        possibleBuildings: [13],
        special:
            'Kann an Polizeihubschrauber und Polizeihubschrauber mit verbauter Winde angehängt werden. Das Personal auf dem Hubschrauber benötigt zusätzlich die Ausbildung "brandbekämpfung".',
        waterTank: 1000,
        isTrailer: true,
        tractiveVehicles: [61, 156],
    },
    97: {
        caption: 'ITW',
        color: '#b87700',
        credits: 30_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                Feuerwehr: {
                    intensive_care: {
                        min: 2,
                    },
                    notarzt: {
                        min: 1,
                    },
                },
                Rettungsdienst: {
                    intensive_care: {
                        min: 2,
                    },
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20, 25],
        special:
            'Kann auch als NAW eingesetzt werden. Verdienst bei der Mission: 30 Credits pro km, max. 1.500 Credits. Hat das angefahrene Krankenhaus nicht die erforderliche Abteilung, wird der Verdienst 30% weniger betragen. Kann alle 15 (10 mit Premium) Rettungswachen gekauft werden. 2 Leute brauchen die "Intensivpflege" Ausbildung, Eine weitere Person davon die Notarzt Ausbildung',
    },
    98: {
        caption: 'Zivilstreifenwagen',
        color: '#005500',
        credits: 5000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polizei: {
                    criminal_investigation: {
                        all: true,
                    },
                },
            },
        },
        icon: 'taxi',
        possibleBuildings: [6, 19],
        special:
            'Kann FuStW in bestimmten Einsätzen ersetzen. Wird auf vorhandene Polizeistellplätze gestellt.',
    },
    100: {
        caption: 'MLW 4',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 7,
            training: {
                THW: {
                    water_damage_pump: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    101: {
        caption: 'Anh SwPu',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 0,
            max: 0,
            training: {
                THW: {
                    water_damage_pump: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [9],
        pumpCapacity: 15_000,
        pumpType: 'sewage',
        waterBonus: 25,
        isTrailer: true,
        tractiveVehicles: [100, 123],
    },
    102: {
        caption: 'Anh 7',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 0,
            max: 0,
            training: {
                THW: {
                    water_damage_pump: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'trailer',
        possibleBuildings: [9],
        pumpCapacity: 12_400,
        pumpType: 'sewage',
        waterBonus: 25,
        isTrailer: true,
        tractiveVehicles: [100, 123],
    },
    103: {
        caption: 'FuStW (DGL)',
        color: '#339900',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Polizei: {
                    police_service_group_leader: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'taxi',
        possibleBuildings: [6, 19],
        special:
            'Pro aktivierten Dienstgruppenleitung-Ausbau kann ein Funkstreifenwagen (Dienstgruppenleitung) gekauft werden.',
    },
    104: {
        caption: 'GW-L1',
        color: '#330000',
        credits: 8000,
        coins: 45,
        staff: { min: 1, max: 6 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        equipmentCapacity: 20,
    },
    105: {
        caption: 'GW-L2',
        color: '#330000',
        credits: 12_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        equipmentCapacity: 30,
    },
    106: {
        caption: 'MTF-L',
        color: '#330000',
        credits: 4000,
        coins: 10,
        staff: { min: 1, max: 6 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        equipmentCapacity: 15,
    },
    107: {
        caption: 'LF-L',
        color: '#330000',
        credits: 9000,
        coins: 15,
        staff: { min: 1, max: 9 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        waterTank: 2000,
        pumpCapacity: 2000,
        pumpType: 'fire',
        equipmentCapacity: 15,
        foamTank: 150,
    },
    108: {
        caption: 'AB-L',
        color: '#330000',
        credits: 7000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'truck-ramp-box',
        possibleBuildings: [0, 18],
        equipmentCapacity: 30,
        isTrailer: true,
        tractiveVehicles: [46],
    },
    109: {
        caption: 'MzGW SB',
        color: '#001bcc',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 9,
            training: {
                THW: {
                    heavy_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck-pickup',
        possibleBuildings: [9],
    },
    110: {
        caption: 'NEA50',
        color: '#36759e',
        credits: 10_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'trailer',
        possibleBuildings: [9],
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (MzGW (FGr N))',
        isTrailer: true,
        tractiveVehicles: [41],
    },
    111: {
        caption: 'NEA50',
        color: '#f60303',
        credits: 10_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (HLF 10, RW, GW-Gefahrgut, Dekon-P, WLF, GW-L1, GW-L2, LF 8/6, LF 10/6, LF 16-TS, SW 2000-Tr, SW Kats, TLF 3000, TLF 16/24-Tr, TLF 16/25)',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [
            90, 4, 27, 53, 104, 105, 6, 8, 9, 15, 16, 18, 21, 22,
        ],
    },
    112: {
        caption: 'NEA200',
        color: '#36759e',
        credits: 50_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
            training: {
                THW: {
                    thw_energy_supply: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (LKW 7 Lbw (FGr E), LKW 7 Lbw)',
        isTrailer: true,
        tractiveVehicles: [122],
        possibleBuildings: [9],
    },
    113: {
        caption: 'NEA200',
        color: '#fd090f',
        credits: 50_000,
        coins: 20,
        staff: {
            min: 0,
            max: 0,
            training: {
                Feuerwehr: {
                    energy_supply: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (HLF 10, RW, GW-Gefahrgut, Dekon-P, WLF, GW-L1, GW-L2, LF 8/6, LF 10/6, LF 16-TS, SW 2000-Tr, SW Kats, TLF 3000, TLF 16/24-Tr, TLF 16/25)',
        isTrailer: true,
        tractiveVehicles: [
            90, 4, 27, 53, 104, 105, 6, 8, 9, 15, 16, 18, 21, 22,
        ],
        possibleBuildings: [0],
    },
    114: {
        caption: 'GW-Lüfter',
        color: '#b40f0f',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'fan',
        special:
            'Mobile Großventilatoren führen Rauch und Hitze aus großen Gebäuden ab.',
        possibleBuildings: [0, 18],
    },
    115: {
        caption: 'Anh Lüfter',
        color: '#b62e2e',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (HLF 10, RW, GW-Gefahrgut, Dekon-P, WLF, GW-L1, GW-L2, LF 8/6, LF 10/6, LF 16-TS, SW 2000-Tr, SW Kats, TLF 3000, TLF 16/24-Tr, TLF 16/25, GW-Werkfeuerwehr)',
        isTrailer: true,
        tractiveVehicles: [
            90, 4, 27, 53, 104, 105, 6, 8, 9, 15, 16, 18, 21, 22, 83,
        ],
        possibleBuildings: [0, 18],
    },
    116: {
        caption: 'AB-Lüfter',
        color: '#9d2424',
        credits: 7000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    117: {
        caption: 'AB-Tank',
        color: '#9d2424',
        credits: 4000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        waterTank: 10_000,
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    118: {
        caption: 'Kleintankwagen',
        color: '#dd2222',
        credits: 10_000,
        coins: 15,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 10_000,
    },
    119: {
        caption: 'AB-Lösch',
        color: '#9d2424',
        credits: 8000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        waterTank: 8000,
        isTrailer: true,
        tractiveVehicles: [46],
    },
    120: {
        caption: 'Tankwagen',
        color: '#dd2222',
        credits: 15_000,
        coins: 15,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 20_000,
    },
    121: {
        caption: 'GTLF',
        color: '#dd2222',
        credits: 10_000,
        coins: 15,
        staff: { min: 1, max: 3 },
        icon: 'truck-moving',
        possibleBuildings: [0, 18],
        waterTank: 10_000,
        foamTank: 1500,
    },
    122: {
        caption: 'LKW 7 Lbw (FGr E)',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    123: {
        caption: 'LKW 7 Lbw (FGr WP)',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    124: {
        caption: 'MTW-OV',
        color: '#36759e',
        credits: 15_000,
        coins: 13,
        staff: {
            min: 1,
            max: 7,
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    125: {
        caption: 'MTW-Tr UL',
        color: '#36759e',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 4,
            max: 4,
            training: {
                THW: {
                    thw_drone: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    126: {
        caption: 'MTF Drohne',
        color: '#fd090f',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 4,
            max: 5,
            training: {
                Feuerwehr: {
                    fire_drone: {
                        min: 4,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    127: {
        caption: 'GW UAS',
        color: '#bb5811',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 4,
            max: 4,
            training: {
                Rettungsdienst: {
                    seg_drone: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [12],
    },
    128: {
        caption: 'ELW Drohne',
        color: '#fd090f',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 4,
            max: 5,
            training: {
                Feuerwehr: {
                    fire_drone: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special:
            'Der ELW Drohne ist ein Einsatzleitwagen 1 und eine Drohneneinheit für die Ortung und Erkundung aus der Luft.',
    },
    129: {
        caption: 'ELW2 Drohne',
        color: '#fd090f',
        credits: 35_000,
        coins: 25,
        staff: {
            min: 4,
            max: 6,
            training: {
                Feuerwehr: {
                    fire_drone: {
                        all: true,
                    },
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        special:
            'Der ELW2 Drohne kombiniert einen Einsatzleitwagen 2 mit einer Drohneneinheit für die Ortung und Erkundung aus der Luft.',
    },
    130: {
        caption: 'GW-Bt',
        color: '#a34100',
        credits: 35_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                Rettungsdienst: {
                    care_service: {
                        min: 1,
                    },
                    care_service_equipment: {
                        min: 2,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [12],
        special:
            'Der GW-Bt transportiert Betreuungs- und Verpflegungsausstattung und kann als Feldküche zur Versorgung von Einsatzkräften und Betroffenen',
    },
    131: {
        caption: 'Bt-Kombi',
        color: '#a34100',
        credits: 25_000,
        coins: 15,
        staff: {
            min: 1,
            max: 9,
            training: {
                Rettungsdienst: {
                    care_service: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [12],
        special:
            'Der Bt-Kombi transportiert Betreuungsdienstler zur Versorgung von Einsatzkräften und Betroffenen zu Einsätzen.',
    },
    132: {
        caption: 'FKH',
        color: '#a34100',
        credits: 20_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        possibleBuildings: [12],
        isTrailer: true,
        tractiveVehicles: [133],
        special:
            'Der FKH kann als Feldküche zur Versorgung von Einsatzkräften und Betroffenen eingesetzt werden und ist Teil der Betreuungs- und Verpflegungsausstattung.',
    },
    133: {
        caption: 'Bt LKW',
        color: '#a34100',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 3,
            max: 3,
            training: {
                Rettungsdienst: {
                    care_service: {
                        min: 1,
                    },
                    care_service_equipment: {
                        min: 2,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [12],
        special:
            'Der Bt LKW transportiert Betreuungs- und Verpflegungsausstattung ohne Feldküche und muss mit einem FKH kombiniert werden',
    },
    134: {
        caption: 'Pferdetransporter klein',
        color: '#438350',
        credits: 20_000,
        coins: 20,
        staff: {
            min: 2,
            max: 4,
            training: {
                Polizei: {
                    police_horse: {
                        min: 2,
                    },
                },
            },
        },
        icon: 'horse',
        possibleBuildings: [11, 24],
        special: 'Transportiert 2 Pferde',
    },
    135: {
        caption: 'Pferdetransporter groß',
        color: '#438350',
        credits: 120_000,
        coins: 25,
        staff: {
            min: 2,
            max: 2,
            trainingAtScene: 4,
            training: {
                Polizei: {
                    police_horse: {
                        min: 0,
                    },
                },
            },
        },
        icon: 'horse',
        possibleBuildings: [11, 24],
        special: 'Transportiert 4 Pferde',
    },
    136: {
        caption: 'Anh Pferdetransport',
        color: '#438350',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
            trainingAtScene: 2,
            training: {
                Polizei: {
                    police_horse: {
                        min: 0,
                    },
                },
            },
        },
        icon: 'horse',
        possibleBuildings: [11, 24],
        isTrailer: true,
        tractiveVehicles: [134, 135, 137],
        special: 'Transportiert 2 Pferde',
    },
    137: {
        caption: 'Zugfahrzeug Pferdetransport',
        color: '#438350',
        credits: 5000,
        coins: 10,
        staff: {
            min: 1,
            max: 6,
        },
        icon: 'horse',
        possibleBuildings: [11, 24],
        special: 'Kann den Anh Pferdetransport ziehen.',
    },
    138: {
        caption: 'GW-Verpflegung',
        color: '#a34100',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 3,
            max: 6,
            training: {
                Feuerwehr: {
                    fire_care_service: {
                        min: 1,
                    },
                    care_service_equipment: {
                        min: 2,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: '',
    },
    139: {
        caption: 'GW-Küche',
        color: '#a34100',
        credits: 35_000,
        coins: 25,
        staff: {
            min: 3,
            max: 3,
            training: {
                Feuerwehr: {
                    fire_care_service: {
                        min: 1,
                    },
                    care_service_equipment: {
                        min: 2,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: '',
    },
    140: {
        caption: 'MTW-Verpflegung',
        color: '#a34100',
        credits: 15_000,
        coins: 13,
        staff: {
            min: 6,
            max: 6,
            training: {
                Feuerwehr: {
                    fire_care_service: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    141: {
        caption: 'FKH',
        color: '#a34100',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [138],
        special:
            'Der FKH kann zur Versorgung von Einsatzkräften eingesetzt werden und ist Teil des Verpflegungsdienstes.',
    },
    142: {
        caption: 'AB-Küche',
        color: '#9d2424',
        credits: 7000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    143: {
        caption: 'Anh Schlauch',
        color: '#b62e2e',
        credits: 5000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (HLF 10, RW, GW-Gefahrgut, Dekon-P, GW-L1, GW-L2, LF 10, LF 8/6, LF 10/6, LF 16-TS, SW 2000-Tr, SW Kats, TLF 3000, TLF 16/24-Tr, TLF 16/25, MTW)',
        isTrailer: true,
        waterBonus: 10,
        tractiveVehicles: [
            90, 4, 27, 53, 104, 105, 6, 8, 9, 15, 16, 18, 21, 22, 36,
        ],
        possibleBuildings: [0, 18],
    },
    144: {
        caption: 'FüKW (THW)',
        color: '#36759e',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 1,
            max: 4,
            training: {
                THW: {
                    thw_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    145: {
        caption: 'FüKomKW',
        color: '#36759e',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 7,
            training: {
                THW: {
                    thw_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    146: {
        caption: 'Anh FüLa',
        color: '#36759e',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'truck',
        isTrailer: true,
        tractiveVehicles: [145],
        possibleBuildings: [9],
    },
    147: {
        caption: 'FmKW',
        color: '#36759e',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 7,
            training: {
                THW: {
                    thw_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    148: {
        caption: 'MTW-FGr K',
        color: '#36759e',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 4,
            max: 4,
            training: {
                THW: {
                    thw_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
    },
    149: {
        caption: 'GW-Bergrettung (NEF)',
        color: '#bc7f52',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 3,
            max: 6,
            training: {
                Rettungsdienst: {
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        equipmentCapacity: 10,
        icon: 'truck',
        possibleBuildings: [25],
    },
    150: {
        caption: 'GW-Bergrettung',
        color: '#bc7f52',
        credits: 15_000,
        coins: 15,
        staff: {
            min: 3,
            max: 6,
        },
        equipmentCapacity: 10,
        icon: 'truck',
        possibleBuildings: [25],
    },
    151: {
        caption: 'ELW Bergrettung',
        color: '#bc7f52',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Rettungsdienst: {
                    mountain_command: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [25],
    },
    152: {
        caption: 'ATV',
        color: '#bc7f52',
        credits: 5000,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'truck',
        possibleBuildings: [25],
    },
    153: {
        caption: 'Hundestaffel (Bergrettung)',
        color: '#bc7f52',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 4,
            max: 5,
            training: {
                Rettungsdienst: {
                    seg_rescue_dogs: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [25],
    },
    154: {
        caption: 'Schneefahrzeug',
        color: '#bc7f52',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'truck',
        possibleBuildings: [25],
    },
    155: {
        caption: 'Anh Höhenrettung (Bergrettung)',
        color: '#bc7f52',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 4,
            max: 4,
            training: {
                Rettungsdienst: {
                    mountain_height_rescue: {
                        min: 4,
                    },
                },
            },
        },
        icon: 'truck',
        isTrailer: true,
        tractiveVehicles: [149, 150],
        possibleBuildings: [25],
    },
    156: {
        caption: 'Polizeihubschrauber mit verbauter Winde',
        color: '#bc7f52',
        credits: 400_000,
        coins: 30,
        staff: {
            min: 1,
            max: 3,
            training: {
                Polizei: {
                    polizeihubschrauber: {
                        min: 1,
                    },
                    police_helicopter_lift: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [13],
    },
    157: {
        caption: 'RTH Winde',
        color: '#bc7f52',
        credits: 400_000,
        coins: 30,
        staff: {
            min: 1,
            max: 2,
            training: {
                Rettungsdienst: {
                    rescue_helicopter_lift: {
                        min: 1,
                    },
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [5],
    },
    158: {
        caption: 'GW-Höhenrettung (Bergrettung)',
        color: '#bc7f52',
        credits: 25_000,
        coins: 25,
        staff: {
            min: 4,
            max: 4,
            training: {
                Rettungsdienst: {
                    mountain_height_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [25],
    },
    159: {
        caption: 'Seenotrettungskreuzer',
        color: '#cf871a',
        credits: 75_000,
        coins: 25,
        staff: {
            min: 4,
            max: 9,
            training: {
                Wasserrettung: {
                    coastal_rescue: {
                        all: true,
                    },
                },
            },
        },
        icon: 'ship',
        possibleBuildings: [26],
    },
    160: {
        caption: 'Seenotrettungsboot',
        color: '#cf871a',
        credits: 50_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'ship',
        possibleBuildings: [26],
    },
    161: {
        caption: 'Hubschrauber (Seenotrettung)',
        color: '#cf871a',
        credits: 400_000,
        coins: 30,
        staff: {
            min: 3,
            max: 4,
            training: {
                Wasserrettung: {
                    coastal_helicopter: {
                        min: 1,
                    },
                    coastal_helicopter_lift: {
                        min: 1,
                    },
                    emergency_paramedic_water_rescue: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'helicopter',
        possibleBuildings: [28],
    },
    162: {
        caption: 'RW-Schiene',
        color: '#992b22',
        credits: 18_500,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                Feuerwehr: {
                    railway_fire: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
    },
    163: {
        caption: 'HLF Schiene',
        color: '#992b22',
        credits: 30_000,
        coins: 25,
        staff: {
            min: 1,
            max: 9,
            training: {
                Feuerwehr: {
                    railway_fire: {
                        all: true,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterTank: 1460,
        pumpCapacity: 2400,
        pumpType: 'fire',
        foamTank: 150,
    },
    164: {
        caption: 'AB-Schiene',
        color: '#992b22',
        credits: 25_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
    165: {
        caption: 'LauKw',
        color: '#1a7d2a',
        credits: 32_000,
        coins: 25,
        staff: {
            min: 5,
            max: 5,
            training: {
                Polizei: {
                    police_speaker_operator: {
                        all: true,
                    },
                },
            },
        },
        icon: 'bus',
        possibleBuildings: [11],
    },
    166: {
        caption: 'PTLF 4000',
        color: '#992b22',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterTank: 5000,
        foamTank: 1000,
    },
    167: {
        caption: 'SLF',
        color: '#992b22',
        credits: 10_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'truck',
        possibleBuildings: [0, 18],
        waterTank: 3500,
        foamTank: 5000,
    },
    168: {
        caption: 'Anh Sonderlöschmittel',
        color: '#b62e2e',
        credits: 5000,
        coins: 10,
        staff: {
            min: 0,
            max: 0,
        },
        icon: 'trailer',
        special:
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (HLF 10, RW, GW-Gefahrgut, Dekon-P, GW-L1, GW-L2, LF 10, LF 8/6, LF 10/6, LF 16-TS, SW 2000-Tr, SW Kats, TLF 3000, TLF 16/24-Tr, TLF 16/25, MTW)',
        isTrailer: true,
        foamTank: 250,
        tractiveVehicles: [
            90, 4, 27, 53, 104, 105, 6, 8, 9, 15, 16, 18, 21, 22, 36,
        ],
        possibleBuildings: [0, 18],
    },
    169: {
        caption: 'AB-Sonderlöschmittel',
        color: '#992b22',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        foamTank: 10_000,
        isTrailer: true,
        tractiveVehicles: [46],
    },
    170: {
        caption: 'AB-Wasser/Schaum',
        color: '#992b22',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        foamTank: 5000,
        waterTank: 3000,
        isTrailer: true,
        tractiveVehicles: [46],
    },
} satisfies Record<number, InternalVehicle>;
