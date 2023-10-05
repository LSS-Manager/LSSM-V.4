import registerEquipment from '../../registerEquipment';

export default registerEquipment({
    breathing_protection: {
        id: 'breathing_protection',
        caption: 'Mobile Air Equipment',
        size: 10,
        credits: 3500,
        coins: 15,
    },
    flood_equipment: {
        id: 'flood_equipment',
        caption: 'Flood Equipment',
        size: 10,
        credits: 7500,
        coins: 20,
    },
    // yes. There is a typo in the ID 😐️
    fire_rescue: {
        id: 'fire_rescue',
        caption: 'Heavy Rescue Equipment',
        size: 10,
        credits: 4_000,
        coins: 10,
    },
    hose: {
        id: 'hose',
        caption: 'Water Tank Equipment',
        size: 20,
        credits: 8500,
        coins: 20,
    },
    light_supply: {
        id: 'light_supply',
        caption: 'Light Tower Equipment',
        size: 20,
        credits: 5000,
        coins: 15,
    },
    hazmat: {
        id: 'hazmat',
        caption: 'HazMat Equipment',
        size: 20,
        credits: 11_000,
        coins: 15,
    },
    energy_supply: {
        id: 'energy_supply',
        caption: 'Energy Generator Equipment',
        size: 20,
        credits: 5_000,
        coins: 15,
    },
    foam_carrier: {
        id: 'foam_carrier',
        caption: 'Foam Tank Equipment',
        size: 10,
        credits: 17000,
        coins: 20,
    },
    fire_engine: {
        id: 'fire_engine',
        caption: 'Fire Hose Equipment',
        size: 10,
        credits: 2500,
        coins: 10,
    },
    wildfire_engine: {
        id: 'wildfire_engine',
        caption: 'Wildland Fire Engine Equipment',
        size: 10,
        credits: 2500,
        coins: 10,
    },
    search_and_rescue: {
        id: 'search_and_rescue',
        caption: 'Search and Rescue Equipment',
        size: 10,
        credits: 5000,
        coins: 15,
    },
    technical_rescue: {
        id: 'technical_rescue',
        caption: 'Technical Rescue Equipment',
        size: 10,
        credits: 5000,
        coins: 15,
    },
});
