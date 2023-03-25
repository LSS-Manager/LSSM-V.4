import type { InternalVehicle } from 'typings/Vehicle';

export default {
    0: {
        caption: 'Ciężki samochód gaśniczy',
        color: '#990000',
        credits: 7500,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 5000,
        foamTank: 500,
    },
    1: {
        caption: 'Średni samochód gaśniczy',
        color: '#990000',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 2500,
        foamTank: 250,
    },
    2: {
        caption: 'SD',
        color: '#990000',
        credits: 10_000,
        coins: 30,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 3 remiz',
    },
    3: {
        caption: 'SLOp',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 6 remiz',
    },
    4: {
        caption: 'SRt',
        color: '#990000',
        credits: 12_180,
        coins: 25,
        staff: { min: 3, max: 5 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 4 remiz',
    },
    5: {
        caption: 'Ambulans P',
        color: '#FFFFCC',
        credits: 5000,
        coins: 25,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    6: {
        caption: 'SCCn',
        color: '#990000',
        credits: 17_300,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 25_000,
        special: 'Wymagane po zbudowaniu 7 remiz',
    },
    7: {
        caption: 'Srchem',
        color: '#990000',
        credits: 19_200,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 11 remiz',
    },
    8: {
        caption: 'Radiowóz OPI',
        color: '#93B7FF',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    9: {
        caption: 'Śmigłowiec LPR',
        color: '#FFFFCC',
        credits: 300_000,
        coins: 30,
        staff: { min: 3, max: 3 },
        icon: 'car-side',
        possibleBuildings: [5],
    },
    10: {
        caption: 'Spgaz',
        color: '#990000',
        credits: 11_680,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 5 remiz',
    },
    11: {
        caption: 'SDł',
        color: '#990000',
        credits: 25_500,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 13 remiz',
    },
    12: {
        caption: 'GBARt',
        color: '#990000',
        credits: 19_000,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 3000,
        foamTank: 250,
        special: 'Potrzebujesz przynajmniej stopnia: Kapitan',
    },
    13: {
        caption: 'SH',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    14: {
        caption: 'Helikopter Policyjny',
        color: '#93B7FF',
        credits: 300_000,
        coins: 30,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [13],
    },
    15: {
        caption: 'Opancerzony Pojazd SPKP',
        color: '#93B7FF',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 6,
            max: 6,
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Wymagane po zbudowaniu 8 posterunków policji',
    },
    16: {
        caption: 'Jednostka K-9',
        color: '#93B7FF',
        credits: 7000,
        coins: 25,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Wymagane po zbudowaniu 8 posterunków policji',
    },
    17: {
        caption: 'Quad Policyjny',
        color: '#93B7FF',
        credits: 2500,
        coins: 18,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [6, 18],
    },
    18: {
        caption: 'SUV SPKP',
        color: '#93B7FF',
        credits: 7000,
        coins: 23,
        staff: {
            min: 2,
            max: 4,
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
        special: 'Wymagane po zbudowaniu 8 posterunków policji',
    },
    19: {
        caption: 'S.WOPR',
        color: '#F9D74A',
        credits: 8500,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    20: {
        caption: 'Quad',
        color: '#F9D74A',
        credits: 5000,
        coins: 25,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    21: {
        caption: 'L.Ratownicza',
        color: '#F9D74A',
        credits: 12_600,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special:
            'Potrzebna laweta (S.WOPR, Samochód SLRw, Samochód ratownictwa technicznego, SLOp, Ciężki samochód gaśniczy, Średni samochód gaśniczy, GBARt)',
    },
    22: {
        caption: 'Ponton',
        color: '#F9D74A',
        credits: 9000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special:
            'Potrzebna laweta (S.WOPR, Quad, Samochód ratownictwa technicznego, SLOp, Ciężki samochód gaśniczy, Średni samochód gaśniczy, GBARt)',
    },
    23: {
        caption: 'Skuter',
        color: '#F9D74A',
        credits: 7500,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special:
            'Potrzebna laweta (S.WOPR, Quad, Samochód ratownictwa technicznego, SLOp, Ciężki samochód gaśniczy, Średni samochód gaśniczy, GBARt)',
    },
    24: {
        caption: 'Samochód SLRw',
        color: '#F9D74A',
        credits: 10_000,
        coins: 25,
        staff: {
            min: 2,
            max: 4,
        },
        icon: 'car-side',
        possibleBuildings: [15],
    },
    25: {
        caption: 'SCDź',
        color: '#990000',
        credits: 14_500,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    26: {
        caption: 'Łódź SP',
        color: '#F9D74A',
        credits: 6000,
        coins: 12,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [15],
        special:
            'Potrzebna laweta (S.WOPR, Quad, Samochód ratownictwa technicznego, SLOp, Ciężki samochód gaśniczy, Średni samochód gaśniczy, GBARt)',
    },
    27: {
        caption: 'SRWys',
        color: '#990000',
        credits: 7200,
        coins: 25,
        staff: {
            min: 3,
            max: 5,
        },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 12 remiz',
    },
    28: {
        caption: 'SLRr',
        color: '#990000',
        credits: 10_000,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        special: 'Wymagane po zbudowaniu 6 remiz',
    },
    29: {
        caption: 'Lekki samochód gaśniczy',
        color: '#990000',
        credits: 2500,
        coins: 25,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1000,
        foamTank: 100,
    },
    30: {
        caption: 'Radiowóz WRD',
        color: '#93B7FF',
        credits: 10_000,
        coins: 10,
        staff: {
            min: 1,
            max: 2,
        },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    31: {
        caption: 'Ambulans S',
        color: '#FFFFCC',
        credits: 20_000,
        coins: 25,
        staff: {
            min: 1,
            max: 3,
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    32: {
        caption: 'Samochód Lekarza',
        color: '#FFFFCC',
        credits: 15_000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    33: {
        caption: 'Motoambulans',
        color: '#FFFFCC',
        credits: 6000,
        coins: 20,
        staff: {
            min: 1,
            max: 1,
        },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    34: {
        caption: 'Ambulans T',
        color: '#FFFFCC',
        credits: 5000,
        coins: 12,
        staff: { min: 2, max: 2 },
        icon: 'car-side',
        possibleBuildings: [2, 20],
    },
    35: {
        caption: 'SLRmed',
        color: '#FFFFCC',
        credits: 4000,
        coins: 20,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    36: {
        caption: 'SCKn',
        color: '#990000',
        credits: 50_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    37: {
        caption: 'SCRd',
        color: '#990000',
        credits: 40_000,
        coins: 25,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    38: {
        caption: 'GCBARt',
        color: '#990000',
        credits: 27_000,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 6500,
        foamTank: 500,
        special: 'Potrzebujesz przynajmniej stopnia : Kapitan.',
    },
    39: {
        caption: 'GLBARt',
        color: '#990000',
        credits: 14_500,
        coins: 25,
        staff: { min: 2, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        waterTank: 1500,
        foamTank: 100,
        special: 'Potrzebujesz przynajmniej stopnia : Kapitan.',
    },
    40: {
        caption: 'Kontener inżynieryjno - techniczny',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    41: {
        caption: 'Kontener dekontaminacyjny',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    42: {
        caption: 'Kontener z AODO',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    43: {
        caption: 'Kontener dowodzeniowy',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    44: {
        caption: 'Kontener do przewozu środków gaśniczych',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 800,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    45: {
        caption: 'Kontener socjalno - sanitarny',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    46: {
        caption: 'Kontener powodziowo - pompowy',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    47: {
        caption: 'Kontener - cysterna',
        color: '#990000',
        credits: 5000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 15_000,
    },
    48: {
        caption: 'Przyczepa pompowa',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    49: {
        caption: 'Przyczepa chemiczno - ekologiczna',
        color: '#990000',
        credits: 10_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    50: {
        caption: 'Przyczepa dekontaminacyjna',
        color: '#990000',
        credits: 10_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    51: {
        caption: 'Przyczepa przeciwpowodziowa',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    52: {
        caption: 'Przyczepa ze sprzętem AODO',
        color: '#990000',
        credits: 8000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    53: {
        caption: 'Przyczepa ze sprzętem medycznym',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    54: {
        caption: 'Przyczepa z łódką strażacką',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    55: {
        caption: 'GCBAPr',
        color: '#990000',
        credits: 45_000,
        coins: 15,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 6000,
        foamTank: 1500,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    56: {
        caption: 'GBAPr',
        color: '#990000',
        credits: 35_000,
        coins: 15,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0],
        waterTank: 2500,
        foamTank: 750,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    57: {
        caption: 'GCPr',
        color: '#990000',
        credits: 35_000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 6000,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    58: {
        caption: 'GPr',
        color: '#990000',
        credits: 25_000,
        coins: 10,
        staff: { min: 1, max: 4 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 3000,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    59: {
        caption: 'GLPr',
        color: '#990000',
        credits: 15_000,
        coins: 10,
        staff: { min: 1, max: 6 },
        icon: 'car-side',
        possibleBuildings: [0],
        foamTank: 750,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    60: {
        caption: 'Przyczepa ze środkiem pianotwórczym',
        color: '#990000',
        credits: 10_000,
        coins: 10,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
        foamTank: 450,
        special: 'Wymagana rozbudowa: Rozbudowa dla pojazdów proszkowych.',
    },
    61: {
        caption: 'SW',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    62: {
        caption: 'Przyczepa wężowa',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    63: {
        caption: 'Przyczepa wielofunkcyjna',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0, 18],
    },
    64: {
        caption: 'Kontener wężowy',
        color: '#990000',
        credits: 15_000,
        coins: 8,
        staff: { min: 0, max: 0 },
        icon: 'car-side',
        possibleBuildings: [0],
    },
    65: {
        caption: 'Furgonetka OPP',
        color: '#93B7FF',
        credits: 10_000,
        coins: 5,
        staff: { min: 6, max: 8 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    66: {
        caption: 'Van OPP',
        color: '#93B7FF',
        credits: 10_000,
        coins: 5,
        staff: { min: 4, max: 7 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    67: {
        caption: 'Pickup OPP',
        color: '#93B7FF',
        credits: 25_000,
        coins: 10,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    68: {
        caption: 'Ambulans OPP',
        color: '#93B7FF',
        credits: 25_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    69: {
        caption: 'Armatka wodna',
        color: '#93B7FF',
        credits: 35_000,
        coins: 15,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    70: {
        caption: 'Autobus policyjny',
        color: '#93B7FF',
        credits: 30_000,
        coins: 10,
        staff: { min: 12, max: 36 },
        icon: 'car-side',
        possibleBuildings: [11],
    },
    71: {
        caption: 'Samochód SM',
        color: '#93B7FF',
        credits: 5000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [23],
    },
    72: {
        caption: 'Furgonetka SM',
        color: '#93B7FF',
        credits: 10_000,
        coins: 10,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [23],
    },
    73: {
        caption: 'Szybki Radiowóz WRD',
        color: '#93B7FF',
        credits: 15_000,
        coins: 10,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    74: {
        caption: 'Motocykl WRD',
        color: '#93B7FF',
        credits: 8000,
        coins: 10,
        staff: { min: 1, max: 1 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    75: {
        caption: 'APRD',
        color: '#93B7FF',
        credits: 25_000,
        coins: 15,
        staff: { min: 1, max: 2 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    76: {
        caption: 'Furgonetka policyjna',
        color: '#93B7FF',
        credits: 8000,
        coins: 25,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    77: {
        caption: 'Samochód terenowy',
        color: '#93B7FF',
        credits: 5000,
        coins: 25,
        staff: { min: 1, max: 3 },
        icon: 'car-side',
        possibleBuildings: [6, 19],
    },
    78: {
        caption: 'Ruchome Stanowisko Dowodzenia',
        color: '#93B7FF',
        credits: 50_000,
        coins: 25,
        staff: { min: 2, max: 3 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    79: {
        caption: 'Mała więźniarka',
        color: '#93B7FF',
        credits: 15_000,
        coins: 15,
        staff: { min: 2, max: 4 },
        icon: 'car-side',
        possibleBuildings: [],
    },
    80: {
        caption: 'Duża więźniarka',
        color: '#93B7FF',
        credits: 50_000,
        coins: 25,
        staff: { min: 4, max: 6 },
        icon: 'car-side',
        possibleBuildings: [],
    },
} satisfies Record<number, InternalVehicle>;
