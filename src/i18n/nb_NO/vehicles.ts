import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'Mannskapsbil',
        color: '#cc0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 6 },
        waterTank: 2500,
        foamTank: 200,
        icon: 'car-side',
        possibleBuildings: [],
    },
    1: {
        caption: 'Lett mannskapsbil',
        color: '#bb0000',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        waterTank: 500,
        foamTank: 50,
        icon: 'car-side',
        possibleBuildings: [],
    },
    2: {
        caption: 'Stigebil',
        color: '#d92626',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        special: 'Nødvendig etter at du har bygd 3 brannstasjoner.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    3: {
        caption: 'Innsatslederbil brann',
        color: '#d02525',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        special: 'Nødvendig etter at du har bygd 6 brannstasjoner.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    4: {
        caption: 'Tungredningsbil',
        color: '#ad1f1f',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        special: 'Nødvendig etter at du har bygd 4 brannstasjoner.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    5: {
        caption: 'Ambulanse',
        color: '#9c691c',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    6: {
        caption: 'Tankbil',
        color: '#990000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 3 },
        waterTank: 10_000,
        foamTank: 400,
        special: 'Nødvendig etter at du har bygd 7 brannstasjoner.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    7: {
        caption: 'CBRNe enhet',
        color: '#770000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brannstasjon: {
                    gw_gefahrgut: {
                        all: true,
                    },
                },
            },
        },
        special: 'Nødvendig etter at du har bygd 11 brannstasjoner.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    8: {
        caption: 'Patruljebil',
        color: '#378b18',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    9: {
        caption: 'Luftambulanse',
        color: '#e67219',
        credits: 300_000,
        coins: 30,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    10: {
        caption: 'Snorkelbil',
        color: '#dc1818',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        special:
            'For å kjøpe med kreditter krever det rang: Kaptein, <br> Lavere rangerte medlemmer kan kjøpe kjøretøyet for 25 mynter. <br> Quint fungerer som en stigebil og en brannbil.',
        icon: 'car-side',
        possibleBuildings: [],
    },
    11: {
        caption: 'Politihelikopter',
        color: '#1b8f0f',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politi: {
                    polizeihubschrauber: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    12: {
        caption: 'Pansret kjøretøy',
        color: '#1ca512',
        credits: 17_300,
        coins: 25,
        staff: {
            min: 6,
            max: 6,
            training: {
                Politi: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Nødvendig etter at du har bygt 8 politistasjoner.',
    },
    13: {
        caption: 'Hundepatrulje',
        color: '#1a6d22',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politi: {
                    k9: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Nødvendig etter at du har bygt 6 politistasjoner.',
    },
    14: {
        caption: 'Politimotorsykkel',
        color: '#3a6622',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
            training: {
                Politi: {
                    police_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    15: {
        caption: 'Delta kjøretøy',
        color: '#253322',
        credits: 7000,
        coins: 23,
        staff: {
            min: 2,
            max: 4,
            training: {
                Politi: {
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    16: {
        caption: 'Røykdykkerbil',
        color: '#aa0000',
        credits: 11_860,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Nødvendig etter at du har bygd 5 brannstasjoner.',
    },
    17: {
        caption: 'Innsatsstøttebil',
        color: '#791515',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 6,
            training: {
                Brannstasjon: {
                    elw2: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Nødvendig etter at du har bygd 13 brannstasjoner.',
    },
    18: {
        caption: 'Redningsbil',
        color: '#880000',
        credits: 12_180,
        coins: 25,
        staff: { min: 1, max: 4 },
        waterTank: 2000,
        foamTank: 150,
        icon: 'car-side',
        possibleBuildings: [],
    },
    19: {
        caption: 'Dykkerbil',
        color: '#225577',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 4,
            max: 5,
            training: {
                Brannstasjon: {
                    gw_taucher: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Krever spesialistutdanning (Redningsdykker kurs)',
    },
    20: {
        caption: 'Lett redningsbåt',
        color: '#22776d',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [],
        special:
            'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Dykkerbil, Mannskapsbil, Lett mannskapsbil)',
    },
    21: {
        caption: 'Branntankbil',
        color: '#570f0f',
        credits: 19_000,
        coins: 19,
        staff: { min: 1, max: 6 },
        waterTank: 8000,
        foamTank: 300,
        icon: 'car-side',
        possibleBuildings: [],
    },
    22: {
        caption: 'Utrykningspolitibil',
        color: '#0ead23',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politi: {
                    traffic_police: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    23: {
        caption: 'Utrykningsenhetbil',
        color: '#1f8d20',
        credits: 19_000,
        coins: 15,
        staff: {
            min: 1,
            max: 2,
            training: {
                Politi: {
                    traffic_police: {
                        all: true,
                    },
                    swat: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    24: {
        caption: 'Legebil',
        color: '#9c1c1c',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
            training: {
                Redning: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Krever spesialistutdanning (Legevaktslege)',
    },
    25: {
        caption: 'Innsatslederbil helse',
        color: '#997122',
        credits: 25_000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Nødvendig etter at du har bygd 10 redningsstasjoner',
    },
    26: {
        caption: 'Akuttbil',
        color: '#9c1c1c',
        credits: 4000,
        coins: 20,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    27: {
        caption: 'Ambulansemotorsykkel',
        color: '#9c1c1c',
        credits: 4000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
            training: {
                Redning: {
                    rapid_response_motorcycle: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
    },
    28: {
        caption: 'Syketransport',
        color: '#9c1c1c',
        credits: 5000,
        coins: 12,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    29: {
        caption: 'First responder bil',
        color: '#9c1c1c',
        credits: 4000,
        coins: 25,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    30: {
        caption: 'Akutthjelper',
        color: '#9c1c1c',
        credits: 2500,
        coins: 12,
        staff: {
            min: 1,
            max: 1,
            training: {
                Redning: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Krever spesialistutdanning (Legevaktslege)',
    },
    31: {
        caption: 'Intensivambulanse',
        color: '#9c1c1c',
        credits: 10_000,
        coins: 30,
        staff: {
            min: 3,
            max: 3,
            training: {
                Redning: {
                    critical_care: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        special: 'Krever spesialistutdanning (Legevaktslege)',
    },
    32: {
        caption: 'Akuttbil',
        color: '#9c1c1c',
        credits: 4000,
        coins: 20,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    33: {
        caption: 'Skogbrannhelikopter',
        color: '#570f0f',
        credits: 300_000,
        coins: 25,
        staff: {
            min: 2,
            max: 5,
            training: {
                Brannstasjon: {
                    airborne_firefighting: {
                        all: true,
                    },
                },
            },
        },
        icon: 'car-side',
        possibleBuildings: [],
        waterTank: 2000,
    },
    34: {
        caption: 'ATV',
        color: '#570f0f',
        credits: 5000,
        coins: 5,
        staff: {
            min: 1,
            max: 2,
            training: {
                Brannstasjon: {
                    atv: {
                        all: true,
                    },
                },
            },
        },
        waterTank: 2000,
        icon: 'car-side',
        possibleBuildings: [],
    },
    35: {
        caption: 'Skum Tankbil',
        color: '#570f0f',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        foamTank: 3000,
        icon: 'car-side',
        possibleBuildings: [],
    },
    36: {
        caption: 'Tilhengerpumpe',
        color: '#570f0f',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [],
        special:
            'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Mannskapsbil, Lett mannskapsbil, Tankbil, Skum Tankbil)',
    },
    37: {
        caption: 'Slangebil',
        color: '#570f0f',
        credits: 20_000,
        coins: 10,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    38: {
        caption: 'Slangebil med pumpe',
        color: '#570f0f',
        credits: 40_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    39: {
        caption: 'Slangetilhenger',
        color: '#570f0f',
        credits: 20_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [],
        special:
            'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Mannskapsbil, Lett mannskapsbil, Tankbil, Skum Tankbil)',
    },
} satisfies Record<number, InternalVehicle>;
