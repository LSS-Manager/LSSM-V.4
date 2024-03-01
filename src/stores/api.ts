import type Vue from 'vue';

import { defineStore } from 'pinia';
import { useBroadcastStore } from '@stores/broadcast';
import { useNewAPIStore } from '@stores/newApi';

import type {
    APIGetter,
    APIState,
    EnsuredAPIGetter,
    StorageAPIKey,
} from 'typings/store/api/State';
import type { Building, BuildingCategory } from 'typings/Building';

const API_MIN_UPDATE = 5 * 60 * 1000; // 5 Minutes

export const defineAPIStore = defineStore('api', {
    state: () =>
        <APIState>{
            buildings: [],
            autoUpdates: [],
            currentlyUpdating: [],
            lastUpdates: {},
            initialBroadcastUpdateFinished: false,
        },
    getters: {
        _stateValue:
            state =>
            <API extends StorageAPIKey>(api: API): APIGetter<API> => ({
                value: state[api],
                lastUpdate: state.lastUpdates[api] ?? 0,
            }),
        buildingsById: (state): Record<number, Building> =>
            Object.fromEntries(
                state.buildings.map(building => [building.id, building])
            ),
        buildingsByType: (state): Record<number, Building[]> => {
            const types: Record<number, Building[]> = {};
            state.buildings.forEach(building => {
                if (!types.hasOwnProperty(building.building_type))
                    types[building.building_type] = [];
                types[building.building_type].push(building);
            });
            return types;
        },
        buildingsByDispatchCenter: (state): Record<number, Building[]> => {
            const dispatchCenters: Record<number, Building[]> = {};
            state.buildings.forEach(building => {
                const dispatchId = building.leitstelle_building_id ?? -1;

                if (!dispatchCenters.hasOwnProperty(dispatchId))
                    dispatchCenters[dispatchId] = [];
                dispatchCenters[dispatchId].push(building);
            });
            return dispatchCenters;
        },
        buildingsByCategory() {
            const LSSM = window[PREFIX] as Vue;
            const categories = LSSM.$t(
                'buildingCategories'
            ) as unknown as Record<string, BuildingCategory>;
            const buildingsByCategory = {} as Record<string, Building[]>;
            Object.entries(categories).forEach(
                ([category, { buildings }]) =>
                    (buildingsByCategory[category] = [
                        ...Object.values(buildings).flatMap(
                            type => this.buildingsByType[type]
                        ),
                    ].filter(v => !!v))
            );
            return buildingsByCategory;
        },
    },
    actions: {
        _awaitInitialBroadcast(): Promise<void> {
            return new Promise<void>(resolve => {
                const interval = window.setInterval(() => {
                    if (!this.initialBroadcastUpdateFinished) return;
                    window.clearInterval(interval);
                    resolve();
                }, 50);
            });
        },
        _awaitUpdateQueue<API extends StorageAPIKey>(api: API): Promise<API> {
            return new Promise<API>(resolve => {
                const interval = window.setInterval(() => {
                    if (this.currentlyUpdating.includes(api)) return;
                    this.currentlyUpdating.push(api);
                    window.clearInterval(interval);
                    this._awaitInitialBroadcast().then(() => resolve(api));
                }, 50);
            });
        },
        _removeAPIFromQueue<API extends StorageAPIKey>(api: API) {
            const updateIndex = this.currentlyUpdating.indexOf(api);
            if (updateIndex >= 0) this.currentlyUpdating.splice(updateIndex, 1);
        },
        _setAPI<API extends StorageAPIKey>(
            api: API,
            { value, lastUpdate }: EnsuredAPIGetter<API>
        ): EnsuredAPIGetter<API> & { api: API } {
            this._removeAPIFromQueue(api);
            this.$patch({ [api]: value });
            this.lastUpdates[api] = lastUpdate;
            return { api, value, lastUpdate };
        },
        _initAPIsFromBroadcast() {
            this.initialBroadcastUpdateFinished = false;
            const broadcastStore = useBroadcastStore();
            const collectAPI = <API extends StorageAPIKey>(api: API) =>
                broadcastStore
                    .requestAPI<API>(api)
                    .then(
                        collectedValues =>
                            collectedValues.sort(
                                (a, b) => a.lastUpdate - b.lastUpdate
                            )[0]
                    );
            return Promise.all(
                (['alliance_buildings', 'buildings'] as StorageAPIKey[]).map(
                    <API extends StorageAPIKey>(api: API) =>
                        collectAPI<API>(api).then(latest => {
                            if (
                                latest &&
                                latest.lastUpdate > (this.lastUpdates[api] ?? 0)
                            )
                                this._setAPI(api, latest);
                        })
                )
            ).then(() => (this.initialBroadcastUpdateFinished = true));
        },
        _prepareAPIDataForState<API extends StorageAPIKey>(
            api: API,
            data: EnsuredAPIGetter<API>['value']
        ): EnsuredAPIGetter<API> {
            if (api === 'buildings') {
                const smallBuildings = (window[PREFIX] as Vue).$t(
                    'small_buildings'
                ) as unknown as Record<number, number>;
                // TODO: Find a way that typescript likes...
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return <EnsuredAPIGetter<'buildings'>>{
                    value: (data as EnsuredAPIGetter<'buildings'>['value']).map(
                        building =>
                            building.small_building
                                ? {
                                      ...building,
                                      building_type:
                                          smallBuildings[
                                              building.building_type
                                          ],
                                  }
                                : building
                    ),
                    lastUpdate: Date.now(),
                };
            }

            return {
                value: data,
                lastUpdate: Date.now(),
            };
        },
        _getAPI<API extends StorageAPIKey>(
            api: API,
            feature: string
        ): Promise<EnsuredAPIGetter<API>> {
            return this._awaitUpdateQueue(api).then(() => {
                const stateValue = this._stateValue(api);
                if (
                    stateValue.value &&
                    stateValue.lastUpdate > Date.now() - API_MIN_UPDATE
                ) {
                    this._removeAPIFromQueue(api);
                    return new Promise(resolve =>
                        resolve(stateValue as EnsuredAPIGetter<API>)
                    );
                }
                return useNewAPIStore()
                    .request(`/api/${api}`, `apiStore/getAPI(${feature})`)
                    .then(
                        res =>
                            res.json() as Promise<
                                EnsuredAPIGetter<API>['value']
                            >
                    )
                    .then(apiResult =>
                        this._prepareAPIDataForState(api, apiResult)
                    )
                    .then(apiGetterResult => {
                        this._setAPI(api, apiGetterResult);
                        return useBroadcastStore().apiBroadcast(
                            api,
                            apiGetterResult
                        );
                    });
            });
        },
        _autoUpdate<API extends StorageAPIKey>(
            updateFunction: (feature: string) => Promise<EnsuredAPIGetter<API>>,
            feature: string,
            callback: (api: EnsuredAPIGetter<API>) => void,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return updateFunction(feature).then(apiResult => {
                callback(apiResult);
                const interval = window.setInterval(
                    () => updateFunction(feature).then(callback),
                    updateInterval
                );
                return () => window.clearInterval(interval);
            });
        },
        getBuilding(buildingId: number, feature: string): Promise<Building> {
            return this._awaitInitialBroadcast()
                .then(() =>
                    useNewAPIStore().request(
                        `/api/buildings/${buildingId}`,
                        `apiStore/getBuilding(${feature})`
                    )
                )
                .then(res => res.json() as Promise<Building>)
                .then(fetchedBuilding => {
                    if (!Object.keys(fetchedBuilding).length) {
                        throw new Error(
                            `API of building with ID ${buildingId} is not accessible by user`
                        );
                    }
                    const buildingIndex = this.buildings.findIndex(
                        ({ id }) => id === buildingId
                    );
                    if (buildingIndex < 0) {
                        this.buildings.push(fetchedBuilding);
                    } else {
                        // workaround for reactivity
                        const buildings = this.buildings;
                        buildings[buildingIndex] = fetchedBuilding;
                        this.buildings = [];
                        this.buildings = buildings;
                    }
                    return useBroadcastStore()
                        .apiBroadcast('buildings', {
                            value: this.buildings,
                            lastUpdate: this.lastUpdates.buildings ?? 0,
                        })
                        .then(() => fetchedBuilding);
                });
        },
        getBuildings(feature: string): Promise<EnsuredAPIGetter<'buildings'>> {
            return this._getAPI('buildings', feature);
        },
        autoUpdateBuildings(
            feature: string,
            callback: (api: EnsuredAPIGetter<'buildings'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getBuildings,
                feature,
                callback,
                updateInterval
            );
        },
    },
});

export const useAPIStore: () => ReturnType<typeof defineAPIStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.api ?? defineAPIStore();
