import { ActionTree, GetterTree, Module } from 'vuex';
import { RootState } from '../../typings/store/RootState';
import { APIState } from '../../typings/store/api/State';
import { Vehicle } from '../../typings/Vehicle';
import { APIActionStoreParams } from '../../typings/store/api/Actions';
import { RadioMessage } from '../../typings/helpers';
import { Building, BuildingCategory } from '../../typings/Building';

const STORAGE_KEYS = {
    buildings: 'aBuildings',
    vehicles: 'aVehicles',
};

const API_MIN_UPDATE = 5 * 1000 * 60; // 5 Minutes

export default {
    namespaced: true,
    state: {
        buildings: [],
        vehicles: [],
        vehicleStates: {},
        autoUpdates: [],
        key: null,
    },
    mutations: {
        setBuildings(state: APIState, buildings: Building[]) {
            state.buildings = buildings;
        },
        setVehicles(state: APIState, vehicles: Vehicle[]) {
            state.vehicles = vehicles;
        },
        setVehicleStates(state: APIState, states: { [state: number]: number }) {
            state.vehicleStates = states;
        },
        setVehicleState(
            state: APIState,
            { fms, fms_real, id, caption }: RadioMessage
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
        enableAutoUpdate(state: APIState, api: string) {
            state.autoUpdates.push(api);
        },
        setKey(state: APIState, key: string) {
            state.key = key;
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
        buildingsByCategory(state) {
            const LSSM = window[PREFIX] as Vue;
            const categories = (LSSM.$t('buildingCategories') as unknown) as {
                [category: string]: BuildingCategory;
            };
            const buildingsByCategory = {} as {
                [category: string]: Building[];
            };
            state.buildings.forEach(building => {
                Object.entries(categories).forEach(
                    ([category, { buildings }]) => {
                        buildings = Object.values(buildings);
                        if (buildings.includes(building.building_type)) {
                            if (!buildingsByCategory.hasOwnProperty(category))
                                buildingsByCategory[category] = [];
                            buildingsByCategory[category].push(building);
                        }
                    }
                );
            });
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
                dispatch('request', { url: 'api/vehicle_tates' })
                    .then(res => res.json())
                    .then(states => {
                        commit('setVehicleStates', states);
                        resolve();
                    });
            });
        },
        registerBuildingsUsage(
            { dispatch, commit, state }: APIActionStoreParams,
            autoUpdate = false
        ) {
            return new Promise(resolve =>
                (async () => {
                    const stored = sessionStorage.getItem(
                        STORAGE_KEYS.buildings
                    );
                    let buildings = [] as Building[];
                    if (stored) {
                        buildings = JSON.parse(stored).value;
                    }
                    if (
                        !stored ||
                        !buildings.length ||
                        JSON.parse(stored).lastUpdate <
                            new Date().getTime() - API_MIN_UPDATE ||
                        (window.location.pathname === '/' &&
                            !state.buildings.length)
                    ) {
                        console.log('fetching buildings');
                        buildings = await dispatch('request', {
                            url: '/api/buildings',
                        }).then(res => res.json());
                        sessionStorage.setItem(
                            STORAGE_KEYS.buildings,
                            JSON.stringify({
                                lastUpdate: new Date().getTime(),
                                value: buildings,
                            })
                        );
                    }
                    commit('setBuildings', buildings);
                    if (
                        autoUpdate &&
                        !state.autoUpdates.includes('buildings')
                    ) {
                        commit('enableAutoUpdate', 'buildings');
                        window.setInterval(
                            () => dispatch('registerBuildingsUsage'),
                            API_MIN_UPDATE
                        );
                    }

                    return resolve();
                })()
            );
        },
        registerVehiclesUsage(
            { dispatch, commit, state }: APIActionStoreParams,
            autoUpdate = false
        ) {
            return new Promise(resolve =>
                (async () => {
                    const stored = sessionStorage.getItem(
                        STORAGE_KEYS.vehicles
                    );
                    let vehicles = [] as Vehicle[];
                    if (stored) {
                        vehicles = JSON.parse(stored).value;
                    }
                    if (
                        !stored ||
                        !vehicles.length ||
                        JSON.parse(stored).lastUpdate <
                            new Date().getTime() - API_MIN_UPDATE ||
                        (window.location.pathname === '/' &&
                            !state.vehicles.length)
                    ) {
                        console.log('fetching vehicles');
                        vehicles = await dispatch('request', {
                            url: '/api/vehicles',
                        }).then(res => res.json());
                        sessionStorage.setItem(
                            STORAGE_KEYS.vehicles,
                            JSON.stringify({
                                lastUpdate: new Date().getTime(),
                                value: vehicles,
                            })
                        );
                    }
                    commit('setVehicles', vehicles);
                    if (autoUpdate && !state.autoUpdates.includes('vehicles')) {
                        commit('enableAutoUpdate', 'vehicles');
                        window.setInterval(
                            () => dispatch('registerVehiclesUsage'),
                            API_MIN_UPDATE
                        );
                    }
                    return resolve();
                })()
            );
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
                        }).then(res => res.json())
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
