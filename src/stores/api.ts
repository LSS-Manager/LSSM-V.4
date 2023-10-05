import type Vue from 'vue';

import { defineStore } from 'pinia';
import { useBroadcastStore } from '@stores/broadcast';
import { useConsoleStore } from '@stores/console';

import type { Mission } from 'typings/Mission';
import type { RadioMessage } from 'typings/Ingame';
import type { Vehicle } from 'typings/Vehicle';
import type {
    APIGetter,
    APIState,
    EnsuredAPIGetter,
    StorageAPIKey,
} from 'typings/store/api/State';
import type { Building, BuildingCategory } from 'typings/Building';

const API_MIN_UPDATE = 5 * 60 * 1000; // 5 Minutes
const MISSIONS_STORAGE_KEY = `${PREFIX}_missionSpecsStorage`;

export const defineAPIStore = defineStore('api', {
    state: () =>
        <APIState>{
            buildings: [],
            vehicles: [],
            alliance_buildings: [],
            allianceinfo: null,
            settings: null,
            credits: null,
            schoolings: {
                result: [],
            },
            alliance_schoolings: {
                result: [],
            },
            missions: {},
            autoUpdates: [],
            currentlyUpdating: [],
            secretKey: null,
            lastUpdates: {},
            debounce: {
                vehicles: {
                    timeout: null,
                    updates: new Map(),
                },
            },
            initialBroadcastUpdateFinished: false,
        },
    getters: {
        _stateValue:
            state =>
            <API extends StorageAPIKey>(api: API): APIGetter<API> => ({
                value: state[api],
                lastUpdate: state.lastUpdates[api] ?? 0,
            }),
        vehicleStates: (state): Record<number, number> => {
            const states: Record<number, number> = {};
            state.vehicles.forEach(
                ({ fms_show }) => states[fms_show]++ || (states[fms_show] = 1)
            );
            return states;
        },
        vehiclesById: (state): Record<number, Vehicle> =>
            Object.fromEntries(
                state.vehicles.map(vehicle => [vehicle.id, vehicle])
            ),
        vehiclesByTarget:
            state =>
            (): {
                mission: Record<number, Vehicle[]>;
                building: Record<number, Vehicle[]>;
            } => {
                const targets: {
                    mission: Record<number, Vehicle[]>;
                    building: Record<number, Vehicle[]>;
                } = { mission: {}, building: {} };
                state.vehicles.forEach(vehicle => {
                    if (!vehicle.target_type || !vehicle.target_id) return;
                    if (
                        !targets[vehicle.target_type].hasOwnProperty(
                            vehicle.target_id
                        )
                    )
                        targets[vehicle.target_type][vehicle.target_id] = [];
                    targets[vehicle.target_type][vehicle.target_id].push(
                        vehicle
                    );
                });
                return targets;
            },
        vehiclesByType: (state): Record<number, Vehicle[]> => {
            const types: Record<number, Vehicle[]> = {};
            state.vehicles.forEach(vehicle => {
                if (!types.hasOwnProperty(vehicle.vehicle_type))
                    types[vehicle.vehicle_type] = [];
                types[vehicle.vehicle_type].push(vehicle);
            });
            return types;
        },
        vehiclesByBuilding: (state): Record<number, Vehicle[]> => {
            const buildings: Record<number, Vehicle[]> = {};
            state.vehicles.forEach(vehicle => {
                if (!buildings.hasOwnProperty(vehicle.building_id))
                    buildings[vehicle.building_id] = [];
                buildings[vehicle.building_id].push(vehicle);
            });
            return buildings;
        },
        participatedMissions(state): number[] {
            return Array.from(
                new Set([
                    ...state.vehicles
                        .flatMap(
                            ({ queued_mission_id, target_type, target_id }) => [
                                target_type === 'mission' ? target_id : null,
                                queued_mission_id,
                            ]
                        )
                        .filter(<S>(id: S | null): id is S => !!id),
                ])
            );
        },
        allianceBuildingsById: (state): Record<number, Building> =>
            Object.fromEntries(
                state.alliance_buildings.map(building => [
                    building.id,
                    building,
                ])
            ),
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
        missionsArray: (state): Mission[] => Object.values(state.missions),
    },
    actions: {
        _setSecretKey() {
            return this.request({
                url: `/profile/external_secret_key/${window.user_id}`,
                feature: 'get_external_secret_key',
            })
                .then(res => res.json())
                .then(({ code }) => (this.secretKey = code));
        },
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
            // reactivity workaround for schoolings
            if (api === 'schoolings' || api === 'alliance_schoolings')
                this.schoolings.result = this.schoolings.result.slice(0);
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
                (
                    [
                        'alliance_buildings',
                        'allianceinfo',
                        'buildings',
                        'credits',
                        'schoolings',
                        'alliance_schoolings',
                        'settings',
                        'vehicles',
                    ] as StorageAPIKey[]
                ).map(<API extends StorageAPIKey>(api: API) =>
                    collectAPI<API>(api).then(latest => {
                        if (
                            latest &&
                            latest.lastUpdate > (this.lastUpdates[api] ?? 0)
                        )
                            this._setAPI(api, latest);
                    })
                )
            )
                .then(() => broadcastStore.requestMissionsAPI())
                .then(
                    collectedMissions =>
                        collectedMissions.sort(
                            (a, b) => a.lastUpdate - b.lastUpdate
                        )[0]
                )
                .then(latestMission => {
                    if (
                        latestMission &&
                        latestMission.lastUpdate >
                            (this.lastUpdates.missions ?? 0)
                    ) {
                        this.missions = latestMission.missions;
                        this.lastUpdates.missions = latestMission.lastUpdate;
                    }
                })
                .then(() => (this.initialBroadcastUpdateFinished = true));
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
                    stateValue.lastUpdate > Date.now() - API_MIN_UPDATE &&
                    // these are to be updated with each request
                    !(
                        ['schoolings', 'alliance_schoolings'] as StorageAPIKey[]
                    ).includes(api)
                ) {
                    this._removeAPIFromQueue(api);
                    return new Promise(resolve =>
                        resolve(stateValue as EnsuredAPIGetter<API>)
                    );
                }
                return this.request({
                    url: `/api/${api}`,
                    feature: `apiStore/getAPI(${feature})`,
                })
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
        radioMessage(radioMessage: RadioMessage) {
            if (radioMessage.type !== 'vehicle_fms') return;
            this.debounce.vehicles.updates.set(radioMessage.id, {
                caption: radioMessage.caption,
                fms_show: radioMessage.fms,
                fms_real: radioMessage.fms_real,
            });
            if (this.debounce.vehicles.timeout)
                window.clearTimeout(this.debounce.vehicles.timeout);
            this.debounce.vehicles.timeout = window.setTimeout(() => {
                for (const vehicle of this.vehicles) {
                    const update = this.debounce.vehicles.updates.get(
                        vehicle.id
                    );
                    if (!update) continue;
                    vehicle.caption = update.caption;
                    vehicle.fms_show = update.fms_show;
                    vehicle.fms_real = update.fms_real;
                    this.debounce.vehicles.updates.delete(vehicle.id);
                    if (this.debounce.vehicles.updates.size === 0) break;
                }
                useBroadcastStore()
                    .apiBroadcast('vehicles', {
                        value: this.vehicles,
                        lastUpdate: this.lastUpdates.vehicles ?? 0,
                    })
                    .then();
            }, 100);
        },
        getAllianceBuilding(
            buildingId: number,
            feature: string
        ): Promise<Building> {
            return this._awaitInitialBroadcast()
                .then(() =>
                    this.request({
                        url: `/api/alliance_buildings/${buildingId}`,
                        feature: `apiStore/getAllianceBuilding(${feature})`,
                    })
                )
                .then(res => res.json() as Promise<Building>)
                .then(fetchedBuilding => {
                    if (!Object.keys(fetchedBuilding).length) {
                        throw new Error(
                            `API of alliance building with ID ${buildingId} is not accessible by user`
                        );
                    }
                    const buildingIndex = this.alliance_buildings.findIndex(
                        ({ id }) => id === buildingId
                    );
                    if (buildingIndex < 0) {
                        this.alliance_buildings.push(fetchedBuilding);
                    } else {
                        // workaround for reactivity
                        const buildings = this.alliance_buildings;
                        buildings[buildingIndex] = fetchedBuilding;
                        this.alliance_buildings = [];
                        this.alliance_buildings = buildings;
                    }
                    return useBroadcastStore()
                        .apiBroadcast('alliance_buildings', {
                            value: this.alliance_buildings,
                            lastUpdate:
                                this.lastUpdates.alliance_buildings ?? 0,
                        })
                        .then(() => fetchedBuilding);
                });
        },
        getAllianceBuildings(
            feature: string
        ): Promise<EnsuredAPIGetter<'alliance_buildings'>> {
            return this._getAPI('alliance_buildings', feature);
        },
        autoUpdateAllianceBuildings(
            feature: string,
            callback: (
                api: EnsuredAPIGetter<'alliance_buildings'>
            ) => void = () => void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate<'alliance_buildings'>(
                this.getAllianceBuildings,
                feature,
                callback,
                updateInterval
            );
        },
        getAllianceInfo(
            feature: string
        ): Promise<EnsuredAPIGetter<'allianceinfo'>> {
            return this._getAPI('allianceinfo', feature);
        },
        autoUpdateAllianceInfo(
            feature: string,
            callback: (api: EnsuredAPIGetter<'allianceinfo'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getAllianceInfo,
                feature,
                callback,
                updateInterval
            );
        },
        getBuilding(buildingId: number, feature: string): Promise<Building> {
            return this._awaitInitialBroadcast()
                .then(() =>
                    this.request({
                        url: `/api/buildings/${buildingId}`,
                        feature: `apiStore/getBuilding(${feature})`,
                    })
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
        getCredits(feature: string): Promise<EnsuredAPIGetter<'credits'>> {
            return this._getAPI('credits', feature);
        },
        autoUpdateCredits(
            feature: string,
            callback: (api: EnsuredAPIGetter<'credits'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getCredits,
                feature,
                callback,
                updateInterval
            );
        },
        getMissions(
            feature: string,
            force = false
        ): Promise<Record<string, Mission>> {
            if (Object.keys(this.missions).length && !force)
                return new Promise(resolve => resolve(this.missions));
            if (!force) {
                const missions: Record<string, Mission> = JSON.parse(
                    localStorage.getItem(MISSIONS_STORAGE_KEY) ?? '{}'
                );
                if (Object.keys(missions).length) {
                    this.missions = missions;
                    return new Promise(resolve => resolve(this.missions));
                }
            }
            return this._awaitInitialBroadcast()
                .then(() =>
                    this.request({
                        url: `${SERVER}missions/${window.I18n.locale}.json`,
                        feature,
                    })
                )
                .then(res => res.json() as Promise<Record<string, Mission>>)
                .then(missions =>
                    useBroadcastStore().missionsApiBroadcast(missions)
                )
                .then(missions => {
                    this.missions = missions;
                    this.lastUpdates.missions = Date.now();
                    localStorage.setItem(
                        MISSIONS_STORAGE_KEY,
                        JSON.stringify(missions)
                    );
                    return missions;
                });
        },
        getMissionsArray(feature: string): Promise<Mission[]> {
            return this.getMissions(feature).then(missions =>
                Object.values(missions)
            );
        },
        getSchoolings(
            feature: string
        ): Promise<EnsuredAPIGetter<'schoolings'>> {
            return this._getAPI('schoolings', feature);
        },
        autoUpdateSchoolings(
            feature: string,
            callback: (api: EnsuredAPIGetter<'schoolings'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getSchoolings,
                feature,
                callback,
                updateInterval
            );
        },
        getAllianceSchoolings(
            feature: string
        ): Promise<EnsuredAPIGetter<'alliance_schoolings'>> {
            return this._getAPI('alliance_schoolings', feature).catch(() => {
                useConsoleStore().error(
                    'Alliance-Schoolings throwing error 500. Catching the error and not showing the popup'
                );
                return { value: { result: [] }, lastUpdate: Date.now() };
            });
        },
        autoUpdateAllianceSchoolings(
            feature: string,
            callback: (
                api: EnsuredAPIGetter<'alliance_schoolings'>
            ) => void = () => void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getAllianceSchoolings,
                feature,
                callback,
                updateInterval
            );
        },
        getSettings(feature: string): Promise<EnsuredAPIGetter<'settings'>> {
            return this._getAPI('settings', feature);
        },
        autoUpdateSettings(
            feature: string,
            callback: (api: EnsuredAPIGetter<'settings'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getSettings,
                feature,
                callback,
                updateInterval
            );
        },
        getVehiclesAtBuilding(buildingId: number, feature: string) {
            return this._awaitInitialBroadcast()
                .then(() =>
                    this.request({
                        url: `/api/buildings/${buildingId}/vehicles`,
                        feature: `apiStore/getVehiclesAtBuilding(${feature})`,
                    })
                )
                .then(res => res.json() as Promise<Vehicle[]>)
                .then(fetchedVehicles => {
                    fetchedVehicles.forEach(vehicle => {
                        const vehicleIndex = this.vehicles.findIndex(
                            ({ id }) => id === vehicle.id
                        );
                        if (vehicleIndex < 0) {
                            this.vehicles.push(vehicle);
                        } else {
                            // workaround for reactivity
                            const vehicles = this.vehicles;
                            vehicles[vehicleIndex] = vehicle;
                            this.vehicles = [];
                            this.vehicles = vehicles;
                        }
                    });
                    return useBroadcastStore()
                        .apiBroadcast('vehicles', {
                            value: this.vehicles,
                            lastUpdate: this.lastUpdates.vehicles ?? 0,
                        })
                        .then(() => fetchedVehicles);
                });
        },
        getVehicle(vehicleId: number, feature: string): Promise<Vehicle> {
            return this._awaitInitialBroadcast()
                .then(() =>
                    this.request({
                        url: `/api/vehicles/${vehicleId}`,
                        feature: `apiStore/getVehicle(${feature})`,
                    })
                )
                .then(res => res.json() as Promise<Vehicle>)
                .then(fetchedVehicle => {
                    if (!Object.keys(fetchedVehicle).length) {
                        throw new Error(
                            `API of vehicle with ID ${vehicleId} is not accessible by user`
                        );
                    }
                    const vehicleIndex = this.vehicles.findIndex(
                        ({ id }) => id === vehicleId
                    );
                    if (vehicleIndex < 0) {
                        this.vehicles.push(fetchedVehicle);
                    } else {
                        // workaround for reactivity
                        const vehicles = this.vehicles;
                        vehicles[vehicleIndex] = fetchedVehicle;
                        this.vehicles = [];
                        this.vehicles = vehicles;
                    }
                    return useBroadcastStore()
                        .apiBroadcast('vehicles', {
                            value: this.vehicles,
                            lastUpdate: this.lastUpdates.vehicles ?? 0,
                        })
                        .then(() => fetchedVehicle);
                });
        },
        getVehicles(feature: string): Promise<EnsuredAPIGetter<'vehicles'>> {
            return this._getAPI('vehicles', feature);
        },
        autoUpdateVehicles(
            feature: string,
            callback: (api: EnsuredAPIGetter<'vehicles'>) => void = () =>
                void null,
            updateInterval: number = API_MIN_UPDATE
        ) {
            return this._autoUpdate(
                this.getVehicles,
                feature,
                callback,
                updateInterval
            );
        },
        async request({
            input,
            url = '',
            init = {},
            feature,
            dialogOnError = true,
        }: {
            init?: RequestInit;
            feature: string;
            dialogOnError?: boolean;
        } & (
            | {
                  input: Request;
                  url?: URL | string;
              }
            | {
                  input?: Request;
                  url: URL | string;
              }
        )): Promise<Response> {
            const consoleStore = useConsoleStore();

            if (input && url) {
                consoleStore.warn({
                    messages: [
                        `Request was initialized with both, input and URL, input object will be used!`,
                        'input:',
                        input,
                        'URL:',
                        url,
                    ],
                });
            }
            init.headers ||= {};
            if (Array.isArray(init.headers)) {
                init.headers = Object.fromEntries(init.headers) as Record<
                    string,
                    string
                >;
            }

            const getHeader = (
                headers: Exclude<
                    RequestInit['headers'],
                    string[][] | undefined
                >,
                header: string
            ) =>
                headers instanceof Headers
                    ? headers.get(header)
                    : headers[header];
            const setHeader = (
                headers: Exclude<
                    RequestInit['headers'],
                    string[][] | undefined
                >,
                header: string,
                value: string
            ) =>
                headers instanceof Headers
                    ? headers.set(header, value)
                    : (headers[header] = value);

            if (init.headers.hasOwnProperty('X-LSS-Manager')) {
                consoleStore.warn({
                    messages: [
                        'Request Header "X-LSS-Manager" with value',
                        getHeader(init.headers, 'X-LSS-Manager'),
                        'will be overwritten by',
                        VERSION,
                    ],
                });
            }
            setHeader(init.headers, 'X-LSS-Manager', VERSION);
            setHeader(init.headers, 'X-LSS-Manager-Branch', BRANCH);
            setHeader(init.headers, 'X-LSS-Manager-Feature', feature);

            init.cache = init.cache || 'no-cache';
            const target = input || url;
            if (target.toString().startsWith(SERVER)) {
                if (!this.secretKey) await this._setSecretKey();
                setHeader(
                    init.headers,
                    'X-LSSM-User',
                    btoa(`${this.secretKey}:${VERSION}-${MODE}`)
                );
            }

            init.mode ||= 'cors';

            const startTime = Date.now();
            return fetch(target, init).then(
                res =>
                    new Promise((resolve, reject) => {
                        if (!res.ok) {
                            if (
                                res.url.startsWith(SERVER) &&
                                res.headers
                                    .get('content-type')
                                    ?.startsWith('application/json')
                            ) {
                                return res.json().then(data => {
                                    if (data.error === 'outdated version') {
                                        const LSSM = window[PREFIX] as Vue;
                                        LSSM.$modal.show('dialog', {
                                            title: LSSM.$t(
                                                'global.warnings.version.title'
                                            ),
                                            text: LSSM.$t(
                                                'global.warnings.version.text',
                                                {
                                                    version: data.version,
                                                    curver: VERSION,
                                                }
                                            ),
                                            buttons: [
                                                {
                                                    title: LSSM.$t(
                                                        'global.warnings.version.close'
                                                    ),
                                                    default: true,
                                                    handler() {
                                                        window.location.reload(
                                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                            // @ts-ignore
                                                            true
                                                        );
                                                    },
                                                },
                                                {
                                                    title: LSSM.$t(
                                                        'global.warnings.version.abort'
                                                    ),
                                                    handler() {
                                                        LSSM.$modal.hide(
                                                            'dialog'
                                                        );
                                                    },
                                                },
                                            ],
                                        });
                                        window.focus();
                                    }
                                    return reject(res);
                                });
                            }
                            if (
                                dialogOnError &&
                                !(
                                    res.url.endsWith(
                                        '/api/alliance_schoolings'
                                    ) && res.status === 500
                                )
                            ) {
                                const LSSM = window[PREFIX] as Vue;
                                LSSM.$modal.show('dialog', {
                                    title: LSSM.$t(
                                        'global.error.requestIssue.title',
                                        {
                                            status: res.status,
                                            statusText: res.statusText,
                                        }
                                    ),
                                    text: LSSM.$t(
                                        'global.error.requestIssue.text',
                                        {
                                            url: res.url,
                                            status: res.status,
                                            statusText: res.statusText,
                                            method:
                                                init.method?.toUpperCase() ??
                                                'GET',
                                            feature,
                                            duration: Date.now() - startTime,
                                            timestamp: new Date().toISOString(),
                                            uid: `${window.I18n.locale}-${window.user_id}`,
                                        }
                                    ),
                                    buttons: [
                                        {
                                            title: LSSM.$t(
                                                'global.error.requestIssue.close'
                                            ),
                                            default: true,
                                            handler() {
                                                LSSM.$modal.hide('dialog');
                                            },
                                        },
                                    ],
                                });
                            }
                            return reject(res);
                        }
                        return resolve(res);
                    })
            );
        },
    },
});

export const useAPIStore: () => ReturnType<typeof defineAPIStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.api ?? defineAPIStore();
