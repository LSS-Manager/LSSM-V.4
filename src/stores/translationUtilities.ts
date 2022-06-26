import type Vue from 'vue';

import { defineStore } from 'pinia';

import type { InternalBuilding } from 'typings/Building';
import type { InternalVehicle } from 'typings/Vehicle';

const translationStore = defineStore('translationUtilities', {
    state: () => ({
        LSSM: window[PREFIX] as Vue,
    }),
    getters: {
        buildings: state =>
            state.LSSM.$t('buildings') as unknown as Record<
                number,
                InternalBuilding
            >,
        vehicles: state =>
            state.LSSM.$t('vehicles') as unknown as Record<
                number,
                InternalVehicle
            >,
        vehicleBuildings(): number[] {
            return Object.entries(this.buildings)
                .filter(([, building]) => 'startVehicles' in building)
                .map(([id]) => parseInt(id.toString()));
        },
        dispatchCenterBuildings(): number[] {
            return Object.entries(this.buildings)
                .filter(
                    ([, building]) =>
                        'isDispatchCenter' in building &&
                        building.isDispatchCenter
                )
                .map(([id]) => parseInt(id.toString()));
        },
        cellBuildings(): number[] {
            return Object.entries(this.buildings)
                .filter(([, building]) => 'startCells' in building)
                .map(([id]) => parseInt(id.toString()));
        },
        bedBuildings(): number[] {
            return Object.entries(this.buildings)
                .filter(([, building]) => 'startBeds' in building)
                .map(([id]) => parseInt(id.toString()));
        },
        cellExtensions(): string[] {
            return this.cellBuildings.flatMap(building =>
                this.buildings[building].extensions
                    .map((extension, index) =>
                        extension && 'newCells' in extension
                            ? `${building}_${index}`
                            : ''
                    )
                    .filter(e => !!e)
            );
        },
        classroomBuildings(): number[] {
            return Object.entries(this.buildings)
                .filter(([, building]) => 'startClassrooms' in building)
                .map(([id]) => parseInt(id.toString()));
        },
    },
});

export const useTranslationStore: () => ReturnType<
    typeof translationStore
> = () => (window[PREFIX] as Vue)?.$stores?.translations ?? translationStore();
