import type Vue from 'vue';

import type { ActionStoreParams } from 'typings/store/Actions';
import type { APIActionStoreParams } from 'typings/store/api/Actions';
import type { Mission } from 'typings/Mission';
import type { RootState } from 'typings/store/RootState';
import type { Vehicle } from 'typings/Vehicle';
import type { VehicleRadioMessage } from 'typings/Ingame';
import type { ActionTree, GetterTree, Module /*, Store*/ } from 'vuex';
import type {
    APIState,
    StorageAPIKey,
    StorageGetterReturn,
} from 'typings/store/api/State';
import type { Building, BuildingCategory } from 'typings/Building';

const STORAGE_KEYS = {
    buildings: 'aBuildings',
    vehicles: 'aVehicles',
    allianceinfo: 'aAlliance',
    settings: 'aSettings',
    credits: 'aCreditsInfo',
} as {
    [key in StorageAPIKey]: string;
};
const MUTATION_SETTERS = {
    buildings: 'setBuildings',
    vehicles: 'setVehicles',
    allianceinfo: 'setAllianceinfo',
    settings: 'setSettings',
    credits: 'setCreditsInfo',
} as {
    [key in StorageAPIKey]: string;
};

const API_MIN_UPDATE = 5 * 1000 * 60; // 5 Minutes
const STORAGE_DISABLED_KEY = 'lssmv4-storage-disabled';

const get_from_storage = <API extends StorageAPIKey>(
    key: API,
    storageBase = window
): StorageGetterReturn<API> => {
    try {
        return JSON.parse(
            storageBase[
                key === 'missions' ? 'localStorage' : 'sessionStorage'
            ].getItem(STORAGE_KEYS[key]) || ''
        ) as StorageGetterReturn<API>;
    } catch {
        return {
            lastUpdate: 0,
            value: null,
            user_id: window.user_id,
        };
    }
};
const get_from_parent = <API extends StorageAPIKey>(
    key: API
): StorageGetterReturn<API> => {
    const parent_api_state = (window.parent[PREFIX] as Vue).$store.state
        .api as APIState;
    const parent_state = parent_api_state[key];
    if (Object.values(parent_state).length) {
        return {
            value: parent_state,
            lastUpdate: parent_api_state.lastUpdates[key] ?? 0,
            user_id: window.user_id,
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return get_from_storage(key, window.parent);
};
const get_from_broadcast = async <API extends StorageAPIKey>(
    key: API,
    dispatch: ActionStoreParams['dispatch']
): Promise<StorageGetterReturn<API>> => {
    return new Promise(resolve =>
        dispatch(
            'broadcast/request_state',
            {
                statePath: `api.${key}`,
            },
            { root: true }
        ).then((results: StorageGetterReturn<API>[]) => {
            results.sort((a, b) =>
                a.lastUpdate < b.lastUpdate
                    ? -1
                    : a.lastUpdate > b.lastUpdate
                    ? 1
                    : 0
            );
            resolve(results[0]);
        })
    );
};
const get_api_values = async <API extends StorageAPIKey>(
    key: API,
    { dispatch, state, commit }: APIActionStoreParams,
    feature: string,
    preventUpdateFetch = false
): Promise<StorageGetterReturn<API>> => {
    let stored = {
        lastUpdate: 0,
        value: state[key],
        user_id: window.user_id,
    } as StorageGetterReturn<API>;
    if (
        !stored.value ||
        !Object.values(stored.value).length ||
        stored.lastUpdate < new Date().getTime()
    )
        stored = get_from_storage<API>(key);
    if (
        !stored.value ||
        stored.lastUpdate < new Date().getTime() - API_MIN_UPDATE
    )
        stored = get_from_parent<API>(key);
    if (
        !stored.value ||
        stored.lastUpdate < new Date().getTime() - API_MIN_UPDATE
    )
        stored = (await get_from_broadcast<API>(key, dispatch)) ?? stored;
    if (
        !state.currentlyUpdating.includes(key) &&
        (!stored.value ||
            !Object.values(stored.value).length ||
            (stored.lastUpdate < new Date().getTime() - API_MIN_UPDATE &&
                !preventUpdateFetch))
    ) {
        commit('startedUpdating', key);
        stored = {
            lastUpdate: new Date().getTime(),
            value: await dispatch('request', {
                url: `/api/${key}`,
                feature,
                dialogOnError: key !== 'vehicles',
            }).then(res => res.json()),
            user_id: window.user_id,
        };
        commit('finishedUpdating', key);
    }
    return stored;
};

const set_api_storage = <API extends StorageAPIKey>(
    key: API,
    { value, lastUpdate }: StorageGetterReturn<API>,
    { commit, dispatch }: Pick<APIActionStoreParams, 'commit' | 'dispatch'>,
    commitFromRoot = false
) => {
    const disabled: string[] = JSON.parse(
        localStorage.getItem(STORAGE_DISABLED_KEY) || '[]'
    );
    try {
        commit(`${commitFromRoot ? 'api/' : ''}${MUTATION_SETTERS[key]}`, {
            value,
            lastUpdate,
        });
        if (!disabled.includes(key)) {
            sessionStorage.setItem(
                STORAGE_KEYS[key],
                JSON.stringify({
                    lastUpdate,
                    value,
                })
            );
        }
        dispatch(
            'broadcast/broadcast',
            {
                mutationPath: `api/${MUTATION_SETTERS[key]}`,
                payload: { value, lastUpdate },
            },
            { root: true }
        ).then();
        if (key === 'vehicles') {
            updateVehicleStates(
                value as StorageGetterReturn<'vehicles'>['value'],
                commit,
                commitFromRoot
            );
        }
    } catch {
        localStorage.setItem(
            STORAGE_DISABLED_KEY,
            JSON.stringify([...disabled, key])
        );
    }
};

const updateVehicleStates = (
    vehicles: StorageGetterReturn<'vehicles'>['value'],
    commit: APIActionStoreParams['commit'],
    commitFromRoot = false
) => {
    const states: Record<number, number> = {};
    vehicles?.forEach(({ fms_real }) => {
        if (!states.hasOwnProperty(fms_real)) states[fms_real] = 0;
        states[fms_real]++;
    });
    commit(`${commitFromRoot ? 'api/' : ''}setVehicleStates`, states);
};

const vehicleStorageUpdateTimeout = 0;

export default {
    namespaced: true,
    state: {
        buildings: [],
        vehicles: [],
        allianceinfo: {},
        vehicleStates: {},
        autoUpdates: [],
        currentlyUpdating: [],
        missions: [],
        key: null,
        lastUpdates: {},
        settings: {},
        credits: {},
    },
    mutations: {
        setBuildings(
            state: APIState,
            { value: buildings, lastUpdate }: StorageGetterReturn<'buildings'>
        ) {
            if (!buildings) return;
            const smallBuildings = (window[PREFIX] as Vue).$t(
                'small_buildings'
            ) as unknown as Record<number, number>;
            buildings.forEach(
                building =>
                    building.small_building &&
                    smallBuildings.hasOwnProperty(building.building_type) &&
                    (building.building_type =
                        smallBuildings[building.building_type])
            );
            state.lastUpdates.buildings = lastUpdate;
            state.buildings = buildings;
        },
        setVehicles(
            state: APIState,
            { value: vehicles, lastUpdate }: StorageGetterReturn<'vehicles'>
        ) {
            if (!vehicles) return;
            state.lastUpdates.vehicles = lastUpdate;
            state.vehicles = vehicles;
        },
        setAllianceinfo(
            state: APIState,
            {
                value: allianceinfo,
                lastUpdate,
            }: StorageGetterReturn<'allianceinfo'>
        ) {
            if (!allianceinfo) return;
            state.lastUpdates.allianceinfo = lastUpdate;
            state.allianceinfo = allianceinfo;
        },
        setVehicleStates(state: APIState, states: Record<number, number>) {
            const LSSM = window[PREFIX] as Vue;
            const fmsReal2Show = LSSM.$t('fmsReal2Show') as unknown as Record<
                number,
                number
            >;
            const states_show = {} as Record<number, number>;
            Object.entries(fmsReal2Show).forEach(
                ([real, show]) =>
                    (states_show[show] = states[parseInt(real)] ?? 0)
            );
            state.vehicleStates = states_show;
        },
        setVehicleState(
            state: APIState,
            {
                fms,
                fms_real,
                id,
                caption,
                target_building_id,
                mission_id,
            }: VehicleRadioMessage
        ) {
            const vehicle = state.vehicles.find(v => v.id === id);
            if (!vehicle) return;
            state.vehicleStates[vehicle.fms_show]--;
            if (!state.vehicleStates.hasOwnProperty(fms))
                state.vehicleStates[fms] = 0;
            state.vehicleStates[fms]++;
            vehicle.caption = caption;
            vehicle.fms_show = fms;
            vehicle.fms_real = fms_real;
            if (mission_id) {
                vehicle.target_type = 'mission';
                vehicle.target_id = mission_id;
            } else if (target_building_id) {
                vehicle.target_type = 'building';
                vehicle.target_id = target_building_id;
            } else {
                vehicle.target_type = null;
                vehicle.target_id = null;
            }
            if (vehicleStorageUpdateTimeout)
                window.clearTimeout(vehicleStorageUpdateTimeout);
            // vehicleStorageUpdateTimeout = window.setTimeout(
            //     () =>
            //         set_api_storage(
            //             'vehicles',
            //             {
            //                 value: state.vehicles,
            //                 lastUpdate:
            //                     state.lastUpdates.vehicles ??
            //                     new Date().getTime(),
            //                 user_id: window.user_id,
            //             },
            //             (this as unknown) as Store<RootState>,
            //             true
            //         ),
            //     1000
            // );
        },
        enableAutoUpdate(state: APIState, api: StorageAPIKey) {
            state.autoUpdates.push(api);
        },
        setMissions(state: APIState, missions: Mission[]) {
            state.missions = missions;
        },
        setKey(state: APIState, key: string) {
            state.key = key;
        },
        startedUpdating(state: APIState, key: StorageAPIKey) {
            state.currentlyUpdating = [
                ...new Set([...state.currentlyUpdating, key]),
            ];
        },
        finishedUpdating(state: APIState, key: StorageAPIKey) {
            state.currentlyUpdating.splice(
                state.currentlyUpdating.findIndex(k => k === key),
                1
            );
        },
        setSettings(
            state: APIState,
            { value: settings, lastUpdate }: StorageGetterReturn<'settings'>
        ) {
            if (!settings) return;
            state.lastUpdates.settings = lastUpdate;
            state.settings = settings;
        },
        setCreditsInfo(
            state: APIState,
            { value: credits, lastUpdate }: StorageGetterReturn<'credits'>
        ) {
            if (!credits) return;
            state.lastUpdates.credits = lastUpdate;
            state.credits = credits;
        },
    },
    getters: {
        vehicle: state => (id: number) => {
            return state.vehicles.find(v => v.id === id);
        },
        vehiclesByBuilding(state) {
            const buildings = {} as Record<number, Vehicle[]>;
            state.vehicles.forEach(vehicle => {
                if (!buildings.hasOwnProperty(vehicle.building_id))
                    buildings[vehicle.building_id] = [];
                buildings[vehicle.building_id].push(vehicle);
            });
            return buildings;
        },
        buildingsByType(state) {
            const types = {} as Record<number, Building[]>;
            state.buildings.forEach(b => {
                if (!types.hasOwnProperty(b.building_type))
                    types[b.building_type] = [];
                types[b.building_type].push(b);
            });
            return types;
        },
        buildingsByCategory(state, getters) {
            const LSSM = window[PREFIX] as Vue;
            const categories = LSSM.$t(
                'buildingCategories'
            ) as unknown as Record<string, BuildingCategory>;
            const buildingsByCategory = {} as Record<string, Building[]>;
            const { buildingsByType } = getters;
            Object.entries(categories).forEach(
                ([category, { buildings }]) =>
                    (buildingsByCategory[category] = [
                        ...Object.values(buildings).flatMap(
                            type => buildingsByType[type]
                        ),
                    ].filter(v => !!v))
            );
            return buildingsByCategory;
        },
        vehiclesByType(state) {
            const types = {} as Record<string, Vehicle[]>;
            state.vehicles.forEach(vehicle => {
                if (!types.hasOwnProperty(vehicle.vehicle_type))
                    types[vehicle.vehicle_type] = [];
                types[vehicle.vehicle_type].push(vehicle);
            });
            return types;
        },
        vehiclesByTarget(state) {
            const result = {} as {
                mission: Record<number, Vehicle[]>;
                building: Record<number, Vehicle[]>;
            };
            state.vehicles.forEach(vehicle => {
                if (!vehicle.target_type || !vehicle.target_id) return;
                if (!result.hasOwnProperty(vehicle.target_type))
                    result[vehicle.target_type] = {};
                if (
                    !result[vehicle.target_type].hasOwnProperty(
                        vehicle.target_id
                    )
                )
                    result[vehicle.target_type][vehicle.target_id] = [];
                result[vehicle.target_type][vehicle.target_id].push(vehicle);
            });
            return result;
        },
        participatedMissions(state) {
            const missions: number[] = [];
            state.vehicles.forEach(
                ({ target_type, target_id, queued_mission_id }) => {
                    if (
                        target_type === 'mission' &&
                        target_id &&
                        !missions.includes(target_id)
                    )
                        missions.push(target_id);
                    if (
                        queued_mission_id &&
                        !missions.includes(queued_mission_id)
                    )
                        missions.push(queued_mission_id);
                }
            );
            return missions;
        },
        missionsById(state) {
            return Object.fromEntries(state.missions.map(m => [m.id, m]));
        },
    } as GetterTree<APIState, RootState>,
    actions: {
        initialUpdate(
            store: APIActionStoreParams,
            { type, feature }: { type: StorageAPIKey; feature: string }
        ) {
            return new Promise<void>(resolve =>
                get_api_values(
                    type,
                    store,
                    `store/api/initialUpdate/${type}(${feature})`,
                    true
                ).then(result => {
                    store.commit(MUTATION_SETTERS[type], result);
                    resolve();
                })
            );
        },
        setVehicleStates(
            { dispatch, commit }: APIActionStoreParams,
            feature: string
        ) {
            return new Promise<void>(resolve => {
                dispatch('request', {
                    url: '/api/vehicle_states',
                    feature: `store/api/setVehicleStates(${feature})`,
                })
                    .then(res => res.json())
                    .then(states => {
                        commit('setVehicleStates', states);
                        resolve();
                    });
            });
        },
        async registerBuildingsUsage(
            store: APIActionStoreParams,
            {
                autoUpdate = false,
                feature,
            }: { autoUpdate: boolean; feature: string }
        ) {
            const { value: buildings, lastUpdate } = await get_api_values(
                'buildings',
                store,
                `store/api/registerBuildingsUsage(${feature})`
            );
            if (!buildings) return;
            set_api_storage(
                'buildings',
                { value: buildings, lastUpdate, user_id: window.user_id },
                store
            );
            if (autoUpdate && !store.state.autoUpdates.includes('buildings')) {
                store.commit('enableAutoUpdate', 'buildings');
                window.setInterval(
                    () => store.dispatch('registerBuildingsUsage', { feature }),
                    API_MIN_UPDATE
                );
            }
        },
        async fetchBuilding(
            store: APIActionStoreParams,
            { id, feature }: { id: number; feature: string }
        ) {
            return new Promise((resolve, reject) => {
                store
                    .dispatch('request', {
                        url: `/api/buildings/${id}`,
                        feature: `store/api/fetchBuilding(${feature})`,
                    })
                    .then(res => res.json())
                    .then(async (building: Building) => {
                        const { value: buildings, lastUpdate } =
                            await get_api_values(
                                'buildings',
                                store,
                                `store/api/fetchBuilding(${feature})`
                            );
                        if (!buildings) return reject();
                        buildings[buildings.findIndex(b => b.id === id)] =
                            building;
                        set_api_storage(
                            'buildings',
                            {
                                value: buildings,
                                lastUpdate,
                                user_id: window.user_id,
                            },
                            store
                        );
                        return resolve(building);
                    });
            });
        },
        async registerVehiclesUsage(
            store: APIActionStoreParams,
            {
                autoUpdate = false,
                feature,
            }: { autoUpdate: boolean; feature: string }
        ) {
            const { value: vehicles, lastUpdate } = await get_api_values(
                'vehicles',
                store,
                `store/api/registerVehiclesUsage(${feature})`
            );
            if (!vehicles) return;
            set_api_storage(
                'vehicles',
                { value: vehicles, lastUpdate, user_id: window.user_id },
                store
            );
            if (autoUpdate && !store.state.autoUpdates.includes('vehicles')) {
                store.commit('enableAutoUpdate', 'vehicles');
                window.setInterval(
                    () => store.dispatch('registerVehiclesUsage', { feature }),
                    API_MIN_UPDATE
                );
            }
        },
        async fetchVehicle(
            store: APIActionStoreParams,
            { id, feature }: { id: number; feature: string }
        ) {
            return new Promise((resolve, reject) => {
                store
                    .dispatch('request', {
                        url: `/api/vehicles/${id}`,
                        feature: `store/api/fetchVehicle(${feature})`,
                        dialogOnError: false,
                    })
                    .then(res => res.json())
                    .then(async (vehicle: Vehicle) => {
                        const { value: vehicles, lastUpdate } =
                            await get_api_values(
                                'vehicles',
                                store,
                                `store/api/fetchVehicle(${feature})`
                            );
                        if (!vehicles) return reject();
                        const index = vehicles.findIndex(v => v.id === id);
                        if (index < 0) vehicles.push(vehicle);
                        else vehicles[index] = vehicle;
                        set_api_storage(
                            'vehicles',
                            {
                                value: vehicles,
                                lastUpdate,
                                user_id: window.user_id,
                            },
                            store
                        );
                        return resolve(vehicle);
                    });
            });
        },
        async fetchVehiclesAtBuilding(
            store: APIActionStoreParams,
            { id, feature }: { id: number; feature: string }
        ) {
            return new Promise((resolve, reject) => {
                store
                    .dispatch('request', {
                        url: `/api/buildings/${id}/vehicles`,
                        feature: `store/api/fetchVehiclesAtBuilding(${feature})`,
                    })
                    .then(res => res.json())
                    .then(async (vehiclesAt: Vehicle[]) => {
                        const { value: vehicles, lastUpdate } =
                            await get_api_values(
                                'vehicles',
                                store,
                                `store/api/fetchVehiclesAtBuilding(${feature})`
                            );
                        if (!vehicles) return reject();
                        vehiclesAt.forEach(vehicle => {
                            const index = vehicles.findIndex(
                                v => v.id === vehicle.id
                            );
                            if (index < 0) vehicles.push(vehicle);
                            else vehicles[index] = vehicle;
                        });
                        set_api_storage(
                            'vehicles',
                            {
                                value: vehicles,
                                lastUpdate,
                                user_id: window.user_id,
                            },
                            store
                        );
                        return resolve(vehiclesAt);
                    });
            });
        },
        async registerAllianceinfoUsage(
            store: APIActionStoreParams,
            {
                autoUpdate = false,
                feature,
            }: { autoUpdate: boolean; feature: string }
        ) {
            const { value: allianceinfo, lastUpdate } = await get_api_values(
                'allianceinfo',
                store,
                `store/api/registerAllianceinfoUsage(${feature})`
            );
            if (!allianceinfo) return;
            set_api_storage(
                'allianceinfo',
                { value: allianceinfo, lastUpdate, user_id: window.user_id },
                store
            );
            if (
                autoUpdate &&
                !store.state.autoUpdates.includes('allianceinfo')
            ) {
                store.commit('enableAutoUpdate', 'allianceinfo');
                window.setInterval(
                    () =>
                        store.dispatch('registerAllianceinfoUsage', {
                            feature,
                        }),
                    API_MIN_UPDATE
                );
            }
            return allianceinfo;
        },
        async registerSettings(
            store: APIActionStoreParams,
            {
                autoUpdate = false,
                feature,
            }: { autoUpdate: boolean; feature: string }
        ) {
            const { value: settings, lastUpdate } = await get_api_values(
                'settings',
                store,
                `store/api/registerSettings(${feature})`
            );
            if (!settings) return;
            set_api_storage(
                'settings',
                { value: settings, lastUpdate, user_id: window.user_id },
                store
            );
            if (autoUpdate && !store.state.autoUpdates.includes('settings')) {
                store.commit('enableAutoUpdate', 'settings');
                window.setInterval(
                    () => store.dispatch('registerSettings', { feature }),
                    API_MIN_UPDATE
                );
            }
        },
        async fetchCreditsInfo(store: APIActionStoreParams, feature: string) {
            return new Promise((resolve, reject) => {
                get_api_values(
                    'credits',
                    store,
                    `store/api/fetchCreditsInfo(${feature})`
                ).then(({ value: credits, lastUpdate }) => {
                    if (!credits) reject();
                    set_api_storage(
                        'credits',
                        {
                            value: credits,
                            lastUpdate,
                            user_id: window.user_id,
                        },
                        store
                    );
                    resolve(credits);
                });
            });
        },
        async getMissions(
            { rootState, state, dispatch, commit }: APIActionStoreParams,
            { force, feature }: { force: boolean; feature: string }
        ) {
            if (state.missions.length) return state.missions;
            const STORAGE_KEY = `${rootState.prefix}_timed_mission_specs`;
            const { missions, lastUpdate } = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || '{}'
            ) as { missions?: Mission[]; lastUpdate?: string };
            if (
                force ||
                !missions ||
                // update every 12h
                Date.now() - new Date(lastUpdate || 0).getTime() >
                    12 * 60 * 60 * 1000 ||
                !localStorage.hasOwnProperty(STORAGE_KEY)
            ) {
                const missions = Object.values(
                    await dispatch('request', {
                        url: `${rootState.server}missions/${rootState.lang}.json`,
                        init: {
                            method: 'GET',
                        },
                        feature: `store/api/getMissions(${feature})`,
                    }).then(res => res.json())
                );
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        missions,
                        lastUpdate: new Date().toISOString(),
                    })
                );
                commit('setMissions', missions);
                return missions;
            } else {
                commit('setMissions', missions);
                return missions;
            }
        },
        async request(
            { rootState, dispatch, state, commit }: APIActionStoreParams,
            {
                input,
                url = '',
                init = {},
                feature,
                dialogOnError = true,
            }: {
                input: Request;
                url: string;
                init: RequestInit;
                feature: string;
                dialogOnError: boolean;
            }
        ) {
            if (input && url) {
                await dispatch(
                    'console/warn',
                    [
                        `Request was initialized with both, input and URL, input object will be used!`,
                        'input:',
                        input,
                        'URL:',
                        url,
                    ],
                    {
                        root: true,
                    }
                );
            }
            init.headers = init.headers || {};
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
                await dispatch(
                    'console/warn',
                    [
                        `Request Header "X-LSS-Manager" with value ${JSON.stringify(
                            getHeader(init.headers, 'X-LSS-Manager')
                        )} will be overwritten by ${JSON.stringify(
                            rootState.version
                        )}!`,
                    ],
                    {
                        root: true,
                    }
                );
            }
            setHeader(init.headers, 'X-LSS-Manager', rootState.version);
            setHeader(init.headers, 'X-LSS-Manager-Feature', feature);

            init.cache = init.cache || 'no-cache';
            const target = input || url;
            if (target.toString().startsWith(rootState.server)) {
                if (!state.key) {
                    commit(
                        'setKey',
                        await dispatch('request', {
                            url: `/profile/external_secret_key/${window.user_id}`,
                        })
                            .then(res => res.json())
                            .then(({ code }) => code)
                    );
                }
                setHeader(
                    init.headers,
                    'X-LSSM-User',
                    btoa(`${state.key}:${rootState.version}-${MODE}`)
                );
            }

            init.mode = init.mode || 'cors';

            const startTime = Date.now();
            return fetch(target, init).then(
                res =>
                    new Promise((resolve, reject) => {
                        if (!res.ok) {
                            if (
                                res.url.startsWith(rootState.server) &&
                                res.headers
                                    .get('content-type')
                                    ?.startsWith('application/json')
                            ) {
                                return res.json().then(data => {
                                    if (data.error === 'outdated version') {
                                        const LSSM = window[PREFIX] as Vue;
                                        LSSM.$modal.show('dialog', {
                                            title: LSSM.$t(
                                                'warnings.version.title'
                                            ),
                                            text: LSSM.$t(
                                                'warnings.version.text',
                                                {
                                                    version: data.version,
                                                    curver: rootState.version,
                                                }
                                            ),
                                            buttons: [
                                                {
                                                    title: LSSM.$t(
                                                        'warnings.version.close'
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
                                                        'warnings.version.abort'
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
                            if (dialogOnError) {
                                const LSSM = window[PREFIX] as Vue;
                                LSSM.$modal.show('dialog', {
                                    title: LSSM.$t('error.requestIssue.title', {
                                        status: res.status,
                                        statusText: res.statusText,
                                    }),
                                    text: LSSM.$t('error.requestIssue.text', {
                                        url: res.url,
                                        status: res.status,
                                        statusText: res.statusText,
                                        method:
                                            init.method?.toUpperCase() ?? 'GET',
                                        feature,
                                        duration: Date.now() - startTime,
                                        timestamp: new Date().toISOString(),
                                        uid: `${rootState.lang}-${window.user_id}`,
                                    }),
                                    buttons: [
                                        {
                                            title: LSSM.$t(
                                                'error.requestIssue.close'
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
    } as ActionTree<APIState, RootState>,
} as Module<APIState, RootState>;
