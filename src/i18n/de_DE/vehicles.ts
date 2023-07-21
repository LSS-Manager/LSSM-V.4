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
        possibleBuildings: [0, 18, 2, 12, 20],
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
        possibleBuildings: [0, 18, 2, 20],
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
    },
    31: {
        caption: 'RTH',
        color: '#ddaa3c',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 1,
            training: {
                Rettungsdienst: {
                    notarzt: {
                        all: true,
                    },
                },
            },
        },
        icon: 'helicopter',
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
    },
    38: {
        caption: 'KTW',
        color: '#ffb61a',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20],
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
        caption: 'FüKw',
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
        staff: { min: 0, max: 0 },
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
                        min: 0,
                    },
                },
                Rettungsdienst: {
                    gw_wasserrettung: {
                        min: 0,
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
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
        special:
            'Muss von einem "LKW 7 Lkr 19 tm" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    67: {
        caption: 'Anh SchlB',
        color: '#245390',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
        special:
            'Muss von einem "LKW 7 Lkr 19 tm" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    68: {
        caption: 'Anh MzAB',
        color: '#296497',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
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
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [0, 12, 15, 18, 22],
        special:
            'Muss von einem "GW-Wasserrettung" oder einem "GW-Taucher" zum Einsatz gezogen werden. Pro gefordertem Boot müssen mind. 4 Personen mit der Ausbildung "GW-Wasserrettung" oder "Wassergefahren" vor Ort sein!',
    },
    71: {
        caption: 'AB-MZB',
        color: '#bf7f6a',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
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
        possibleBuildings: [0, 2, 18, 20],
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
        possibleBuildings: [0, 2, 18, 20],
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
        staff: { min: 0, max: 0 },
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
        staff: { min: 0, max: 0 },
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
        staff: { min: 0, max: 0 },
        icon: 'paw',
        possibleBuildings: [9],
        special:
            'Muss von einem "MTW-OV" an den Einsatzort gezogen werden. Am Einsatzort sind ein "Anh Hund" und ein "Rettungshundefahrzeug" vom Rettungsdienst gleichwertig!',
    },
    93: {
        caption: 'MTW-OV',
        color: '#14165e',
        credits: 19_000,
        coins: 0,
        staff: {
            min: 4,
            max: 5,
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
    },
    94: {
        caption: 'DHuFüKw',
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
        staff: { min: 0, max: 0 },
        icon: 'fill',
        possibleBuildings: [13],
        special:
            'Der Polizeihelikopter ist das Trägerfahrzeug hier von. Der Helikopter brauch min. 2 Ausgebildete Kräfte mit der Ausbildung "Brandbekämpfung"',
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
                    intensiv_care: {
                        min: 2,
                    },
                    notarzt: {
                        min: 1,
                    },
                },
                Rettungsdienst: {
                    intensiv_care: {
                        min: 2,
                    },
                    notarzt: {
                        min: 1,
                    },
                },
            },
        },
        icon: 'ambulance',
        possibleBuildings: [0, 2, 18, 20],
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
    99: {
        caption: 'LKW 7 Lbw',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
            training: {
                THW: {
                    water_damage_pump: {
                        min: 0,
                    },
                    thw_energy_supply: {
                        min: 0,
                    },
                },
            },
        },
        icon: 'truck',
        possibleBuildings: [9],
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
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
        pumpCapacity: 15_000,
        pumpType: 'sewage',
    },
    102: {
        caption: 'Anh 7',
        color: '#36759e',
        credits: 15_000,
        coins: 25,
        staff: { min: 0, max: 0 },
        icon: 'trailer',
        possibleBuildings: [9],
        pumpCapacity: 12_400,
        pumpType: 'sewage',
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
        equipmentCapacity: 10,
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
        equipmentCapacity: 10,
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
        color: '#36759e',
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
            'Es handelt sich um einen Anhänger, der ein Zugfahrzeug benötigt. (LKW 7 Lbw)',
        isTrailer: true,
        tractiveVehicles: [99],
        possibleBuildings: [9],
    },
    113: {
        caption: 'NEA200',
        color: '#36759e',
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
        color: '#36759e',
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
        color: '#36759e',
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
        color: '#36759e',
        credits: 7000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'square',
        possibleBuildings: [0, 18],
        isTrailer: true,
        tractiveVehicles: [46],
    },
} satisfies Record<number, InternalVehicle>;
