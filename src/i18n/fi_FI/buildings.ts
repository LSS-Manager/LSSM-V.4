import type { InternalBuilding } from '../../../typings/Building';

type Extension = InternalBuilding['extensions'][0];

const multiplyExtension = (
    extension: Extension | ((index: number) => Extension),
    amount: number
): Extension[] =>
    typeof extension === 'function'
        ? new Array(amount).fill('0').map((_, index) => extension(index))
        : new Array(amount).fill(extension);

export default {
    0: {
        caption: 'Fire station',
        color: '#bb0000',
        coins: 30,
        credits: 100_000,
        extensions: [
            {
                caption: 'Ambulance extension',
                credits: 100_000,
                coins: 20,
                duration: '7 Days',
                unlocksVehicleTypes: [5, 10],
                givesParkingLots: 0,
                isVehicleExtension: true,
            },
            null,
            {
                caption: 'Foam Extension',
                credits: 150_000,
                coins: 15,
                duration: '5 Days',
                unlocksVehicleTypes: [35, 36, 37, 38],
                givesParkingLots: 0,
                isVehicleExtension: true,
            },
            {
                caption: 'Swap Body Parking Space',
                credits: 50_000,
                coins: 20,
                duration: '7 Days',
                unlocksVehicleTypes: [
                    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                ],
                givesParkingLots: 1,
                isVehicleExtension: true,
                parkingLotReservations: [
                    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                ],
                cannotDisable: true,
            },
            ...multiplyExtension(
                {
                    caption: 'Swap Body Parking Space',
                    credits: 50_000,
                    coins: 20,
                    duration: '7 Days',
                    unlocksVehicleTypes: [
                        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                    ],
                    givesParkingLots: 1,
                    isVehicleExtension: true,
                    parkingLotReservations: [
                        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                    ],
                    cannotDisable: true,
                },
                11
            ),
            null,
        ],
        levelcost: ['1. 10.000', '2. 50.000', '3.-24. 100.000'],
        maxBuildings: '6.000 together with small fire stations',
        maxLevel: 24,
        special:
            'From the 24th fire station onwards, the cost of building a new fire station increases according to the following formula: <code>100.000+200.000*LOG<sub>2</sub>(Number of existing fire stations − 22)</code>. The Coins price remains constant!',
        startPersonnel: 10,
        startVehicles: ['Water Ladder', 'Light 4X4 Pump (L4P)'],
        schoolingTypes: ['Fire Station'],
        startParkingLots: 1,
        maxBuildingsFunction: (): number => 6000,
    },
} as Record<number, InternalBuilding>;
