import { ActionTree, GetterTree, Module } from 'vuex';
import { RootState } from '../../typings/store/RootState';
import {
    APIState,
    StorageAPIKey,
    StorageGetterReturn,
} from '../../typings/store/api/State';
import { Vehicle } from '../../typings/Vehicle';
import { APIActionStoreParams } from '../../typings/store/api/Actions';
import { VehicleRadioMessage } from '../../typings/Ingame';
import { Building, BuildingCategory } from '../../typings/Building';
import { Mission } from 'typings/Mission';

const STORAGE_KEYS = {
    buildings: 'aBuildings',
    vehicles: 'aVehicles',
} as {
    [key in StorageAPIKey]: string;
};
const MUTATION_SETTERS = {
    buildings: 'setBuildings',
    vehicles: 'setVehicles',
} as {
    [key in StorageAPIKey]: string;
};

const API_MIN_UPDATE = 5 * 1000 * 60; // 5 Minutes

const get_from_storage = <API extends StorageAPIKey>(
    key: API,
    storageBase?: Window
): StorageGetterReturn<API> => {
    if (!storageBase) storageBase = window;
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
        };
    }
};
const get_from_parent = <API extends StorageAPIKey>(
    key: API
): StorageGetterReturn<API> => {
    const parent_api_state = (window.parent[PREFIX] as Vue).$store.state
        .api as APIState;
    const parent_state = parent_api_state[key];
    if (parent_state.length)
        return {
            value: parent_state,
            lastUpdate: parent_api_state.lastUpdates[key] ?? 0,
        };
    return get_from_storage(key, window.parent);
};
// const get_from_broadcast = () => {}; // TODO: Broadcast – see issue #49
const get_api_values = async <API extends StorageAPIKey>(
    key: API,
    { dispatch, state, commit }: APIActionStoreParams
): Promise<StorageGetterReturn<API>> => {
    let stored = get_from_storage<API>(key);
    if (
        !stored.value ||
        stored.lastUpdate < new Date().getTime() - API_MIN_UPDATE
    )
        stored = get_from_parent<API>(key);
    // get from Broadcast
    if (
        !state.currentlyUpdating.includes(key) &&
        (!stored.value ||
            !stored.value.length ||
            stored.lastUpdate < new Date().getTime() - API_MIN_UPDATE)
    ) {
        console.log(`fetch<${key}>`);
        commit('startedUpdating', key);
        stored = {
            lastUpdate: new Date().getTime(),
            value: await dispatch('request', {
                url: `/api/${key}`,
            }).then(res => res.json()),
        };
        commit('finishedUpdating', key);
    }
    return stored;
};

const set_api_storage = <API extends StorageAPIKey>(
    key: API,
    { value, lastUpdate }: StorageGetterReturn<API>,
    { commit }: APIActionStoreParams
) => {
    try {
        commit(MUTATION_SETTERS[key], { value, lastUpdate });
        sessionStorage.setItem(
            STORAGE_KEYS[key],
            JSON.stringify({
                lastUpdate,
                value,
            })
        );
    } catch {
        // Do nothing
    }
};

export default {
    namespaced: true,
    state: {
        buildings: [],
        vehicles: [],
        vehicleStates: {},
        autoUpdates: [],
        currentlyUpdating: [],
        missions: [],
        key: null,
        lastUpdates: {},
    },
    mutations: {
        setBuildings(
            state: APIState,
            { value: buildings, lastUpdate }: StorageGetterReturn<'buildings'>
        ) {
            if (!buildings) return;
            const smallBuildings = ((window[PREFIX] as Vue).$t(
                'small_buildings'
            ) as unknown) as {
                [type: number]: number;
            };
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
        setVehicleStates(state: APIState, states: { [state: number]: number }) {
            state.vehicleStates = states;
        },
        setVehicleState(
            state: APIState,
            { fms, fms_real, id, caption }: VehicleRadioMessage
        ) {
            const vehicle = state.vehicles.find(v => v.id === id);
            if (!vehicle) return;
            state.vehicleStates[vehicle.fms_real]--;
            if (!state.vehicleStates.hasOwnProperty(fms_real))
                state.vehicleStates[fms_real] = 0;
            state.vehicleStates[fms_real]++;
            vehicle.caption = caption;
            vehicle.fms_show = fms;
            vehicle.fms_real = fms_real;
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
    },
    getters: {
        vehicle(state, id: number) {
            return state.vehicles.find(v => v.id === id);
        },
        vehiclesByBuilding(state) {
            const buildings = {} as { [buildingId: number]: Vehicle[] };
            state.vehicles.forEach(vehicle => {
                if (!buildings.hasOwnProperty(vehicle.building_id))
                    buildings[vehicle.building_id] = [];
                buildings[vehicle.building_id].push(vehicle);
            });
            return buildings;
        },
        buildingsByType(state) {
            const types = {} as {
                [type: number]: Building[];
            };
            state.buildings.forEach(b => {
                if (!types.hasOwnProperty(b.building_type))
                    types[b.building_type] = [];
                types[b.building_type].push(b);
            });
            return types;
        },
        buildingsByCategory(state, getters) {
            const LSSM = window[PREFIX] as Vue;
            const categories = (LSSM.$t('buildingCategories') as unknown) as {
                [category: string]: BuildingCategory;
            };
            const buildingsByCategory = {} as {
                [category: string]: Building[];
            };
            const buildingsByType = getters.buildingsByType;
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
            const types = {} as {
                [type: string]: Vehicle[];
            };
            state.vehicles.forEach(vehicle => {
                if (!types.hasOwnProperty(vehicle.vehicle_type))
                    types[vehicle.vehicle_type] = [];
                types[vehicle.vehicle_type].push(vehicle);
            });
            return types;
        },
    } as GetterTree<APIState, RootState>,
    actions: {
        setVehicleStates({ dispatch, commit }: APIActionStoreParams) {
            return new Promise(resolve => {
                dispatch('request', { url: 'api/vehicle_states' })
                    .then(res => res.json())
                    .then(states => {
                        commit('setVehicleStates', states);
                        resolve();
                    });
            });
        },
        async registerBuildingsUsage(
            store: APIActionStoreParams,
            autoUpdate = false
        ) {
            const { value: buildings, lastUpdate } = await get_api_values(
                'buildings',
                store
            );
            if (!buildings) return;
            set_api_storage(
                'buildings',
                { value: buildings, lastUpdate },
                store
            );
            if (autoUpdate && !store.state.autoUpdates.includes('buildings')) {
                store.commit('enableAutoUpdate', 'buildings');
                window.setInterval(
                    () => store.dispatch('registerBuildingsUsage'),
                    API_MIN_UPDATE
                );
            }
        },
        async registerVehiclesUsage(
            store: APIActionStoreParams,
            autoUpdate = false
        ) {
            const { value: vehicles, lastUpdate } = await get_api_values(
                'vehicles',
                store
            );
            if (!vehicles) return;
            set_api_storage('vehicles', { value: vehicles, lastUpdate }, store);
            if (autoUpdate && !store.state.autoUpdates.includes('vehicles')) {
                store.commit('enableAutoUpdate', 'vehicles');
                window.setInterval(
                    () => store.dispatch('registerVehiclesUsage'),
                    API_MIN_UPDATE
                );
            }
        },
        async getMissions(
            { rootState, state, dispatch, commit }: APIActionStoreParams,
            force: boolean
        ) {
            if (state.missions.length) return state.missions;
            if (
                force ||
                !sessionStorage.hasOwnProperty('mission_specs_cache')
            ) {
                const missions = Object.values(
                    await dispatch('request', {
                        // eslint-disable-next-line no-undef
                        url: `${rootState.server}missions/${BUILD_LANG}.json`,
                        init: {
                            method: 'GET',
                        },
                    }).then(res => res.json())
                );
                sessionStorage.setItem(
                    'mission_specs_cache',
                    JSON.stringify(missions)
                );
                commit('setMissions', missions);
            } else {
                return JSON.parse(
                    sessionStorage.getItem('mission_specs_cache') || '{}'
                ) as Mission[];
            }
        },
        async request(
            { rootState, dispatch, state, commit }: APIActionStoreParams,
            { input, url = '', init }
        ) {
            input &&
                url &&
                (await dispatch(
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
                ));
            init = init || {};
            init.headers = init.headers || {};
            init.headers.hasOwnProperty('X-LSS-Manager') &&
                (await dispatch(
                    'console/warn',
                    [
                        `Request Header "X-LSS-Manager" with value ${JSON.stringify(
                            init.headers['X-LSS-Manager']
                        )} will be overwritten by ${JSON.stringify(
                            rootState.version
                        )}!`,
                    ],
                    {
                        root: true,
                    }
                ));
            init.headers['X-LSS-Manager'] = rootState.version;
            init.cache = init.cache || 'no-cache';
            const target = input || url;
            if (target.toString().startsWith(rootState.server)) {
                if (!state.key)
                    commit(
                        'setKey',
                        await dispatch('request', {
                            url: `/profile/external_secret_key/${window.user_id}`,
                        })
                            .then(res => res.json())
                            .then(({ code }) => code)
                    );
                init.headers['X-LSSM-User'] = btoa(
                    `${state.key}:${rootState.version}-${MODE}`
                );
            }
            return fetch(target, init).then(
                res =>
                    new Promise((resolve, reject) => {
                        if (!res.ok) {
                            return res.json().then(data => {
                                if (data.error === 'outdated version') {
                                    const LSSM = window[PREFIX] as Vue;
                                    LSSM.$modal.show('dialog', {
                                        title: LSSM.$t(
                                            'warnings.version.title'
                                        ),
                                        text: LSSM.$t('warnings.version.text', {
                                            version: data.version,
                                            curver: rootState.version,
                                        }),
                                        buttons: [
                                            {
                                                title: LSSM.$t(
                                                    'warnings.version.close'
                                                ),
                                                default: true,
                                                handler() {
                                                    window.location.reload(
                                                        true
                                                    );
                                                },
                                            },
                                            {
                                                title: LSSM.$t(
                                                    'warnings.version.abort'
                                                ),
                                            },
                                        ],
                                    });
                                    window.focus();
                                }
                                return reject(res);
                            });
                        }
                        return resolve(res);
                    })
            );
        },
    } as ActionTree<APIState, RootState>,
} as Module<APIState, RootState>;
