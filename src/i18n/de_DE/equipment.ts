import registerEquipment from '../../registerEquipment';

export default registerEquipment({
    breathing_protection: {
        id: 'breathing_protection',
        caption: 'RC-Modul: Atemschutz',
        size: 20,
        credits: 3500,
        coins: 15,
    },
    oil: {
        id: 'oil',
        caption: 'RC-Modul: Öl',
        size: 10,
        credits: 8000,
        coins: 10,
    },
    // yes. There is a typo in the ID 😐️
    hight_rescue: {
        id: 'hight_rescue',
        caption: 'RC-Modul: Höhenrettung',
        size: 10,
        credits: 15_500,
        coins: 10,
    },
    hose_water: {
        id: 'hose_water',
        caption: 'RC-Modul: Schlauch/Wasser',
        size: 20,
        credits: 5000,
        coins: 15,
    },
    heavy_rescue: {
        id: 'heavy_rescue',
        caption: 'RC-Modul: Rüst',
        size: 20,
        credits: 4000,
        coins: 10,
    },
    hazmat: {
        id: 'hazmat',
        caption: 'RC-Modul: Gefahrgut',
        size: 20,
        credits: 11_000,
        coins: 15,
    },
    decon: {
        id: 'decon',
        caption: 'RC-Modul: Dekon P',
        size: 20,
        credits: 15_000,
        coins: 15,
    },
    storm: {
        id: 'storm',
        caption: 'RC-Modul: Unwetter/Starkregen',
        size: 10,
        credits: 1500,
        coins: 5,
    },
    diver: {
        id: 'diver',
        caption: 'RC-Modul: Taucher',
        size: 10,
        credits: 2000,
        coins: 10,
    },
});
