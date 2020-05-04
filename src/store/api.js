export default {
    namespaced: true,
    state: {
        buildingCooldown: new Date().getTime(),
        buildings: [],
        vehiclesCooldown: new Date().getTime(),
        vehicles: [],
        vehicleStates: {},
        vehicleStatesCooldown: new Date().getTime(),
    },
    mutations: {
        setBuildings(state, buildings) {
            state.buildings = buildings;
        },
        setBuildingCooldown(state) {
            state.buildingCooldown = new Date().getTime() + 5 * 60 * 1000; // 5 mins
        },
        setVehicles(state, vehicles) {
            state.vehicles = vehicles;
        },
        setVehicleCooldown(state) {
            state.vehiclesCooldown = new Date().getTime() + 5 * 60 * 1000; // 5 mins
        },
        setVehicleStates(state, states) {
            state.vehicleStates = states;
        },
        setVehicleState(state, { id, fms, fms_real }) {
            const vehicle = state.vehicles.find(x => x.id === id);
            if (!vehicle) return;
            const prevState = vehicle.fms_real;
            vehicle.fms_show = fms;
            vehicle.fms_real = fms_real;
            state.vehicleStates[prevState]--;
            if (!state.vehicleStates.hasOwnProperty(fms_real))
                state.vehicleStates[fms_real] = 0;
            state.vehicleStates[fms_real]++;
        },
        setVehicleStatesCooldown(state) {
            state.vehicleStateCooldown = new Date().getTime() + 5 * 60 * 1000; // 5 mins
        },
    },
    getters: {
        buildingsByType(state) {
            let types = {};
            state.buildings.forEach(building => {
                if (!types.hasOwnProperty(building.building_type))
                    types[building.building_type] = [];
                types[building.building_type].push(building);
            });
            return types;
        },
        buildingsOfType: state => type =>
            state.buildings.filter(b => b.building_type === type),
        buildingById: state => buildingId =>
            state.buildings.find(x => x.id === buildingId),
        buildingsByCategory(_, getters, rootState) {
            const categoriesToType = window[rootState.prefix].$t(
                'buildingCategories'
            );
            const categories = {};
            const typeToCategory = {};
            Object.keys(categoriesToType).forEach(category => {
                Object.values(categoriesToType[category].buildings).forEach(
                    type => (typeToCategory[type] = category)
                );
            });
            const buildingsByType = getters.buildingsByType;
            Object.keys(buildingsByType).forEach(type => {
                if (!categories.hasOwnProperty(typeToCategory[type]))
                    categories[typeToCategory[type]] = [];
                buildingsByType[type].forEach(building =>
                    categories[typeToCategory[type]].push(building)
                );
            });
            return categories;
        },
        vehiclesByType(state) {
            let types = {};
            state.vehicles.forEach(vehicle => {
                if (!types.hasOwnProperty(vehicle.vehicle_type))
                    types[vehicle.vehicle_type] = [];
                types[vehicle.vehicle_type].push(vehicle);
            });
            return types;
        },
        vehiclesAtBuilding: state => buildingId =>
            state.vehicles.filter(v => v.building_id === buildingId),
        vehicleById: state => vehicleId =>
            state.vehicles.find(x => x.id === vehicleId),
        vehiclesByBuilding(state) {
            const data = {};
            state.vehicles.forEach(vehicle => {
                if (!data.hasOwnProperty(vehicle.building_id))
                    data[vehicle.building_id] = [];
                data[vehicle.building_id].push(vehicle);
            });
            return data;
        },
    },
    actions: {
        buildings: async ({ state, commit, dispatch, rootState }) => {
            if (new Date().getTime() > state.buildingCooldown) {
                const buildings = await dispatch('request', {
                    url: '/api/buildings',
                }).then(res => res.json());
                const small_buildings = window[rootState.prefix].$t(
                    'small_buildings'
                );
                buildings.forEach(building => {
                    if (
                        building.small_building &&
                        small_buildings.hasOwnProperty(building.building_type)
                    )
                        building.building_type =
                            small_buildings[building.building_type];
                });
                commit('setBuildings', buildings);
                commit('setBuildingCooldown');
                return buildings;
            }
            return state.buildings;
        },
        vehicles: async ({ state, commit, dispatch }) => {
            if (new Date().getTime() > state.vehiclesCooldown) {
                const vehicles = await dispatch('request', {
                    url: '/api/vehicles',
                }).then(res => res.json());
                commit('setVehicles', vehicles);
                commit('setVehicleCooldown');
                return vehicles;
            }
            return state.vehicles;
        },
        vehicleStates: async ({ state, commit, dispatch }) => {
            if (new Date().getTime() > state.vehicleStatesCooldown) {
                const states = await dispatch('request', {
                    url: '/api/vehicle_states',
                }).then(res => res.json());
                commit('setVehicleStates', states);
                commit('setVehicleStatesCooldown');
                return states;
            }
            return state.vehicles;
        },
        request({ rootState, dispatch }, { input, url = '', init }) {
            input &&
                url &&
                dispatch(
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
            init = init || {};
            init.headers = init.headers || {};
            init.headers.hasOwnProperty('X-LSS-Manager') &&
                dispatch(
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
                );
            init.headers['X-LSS-Manager'] = rootState.version;
            const target = input || url;
            target.toString().startsWith(rootState.server) &&
                (init.headers['X-LSSM-User'] = btoa(
                    `${rootState.key}:${rootState.version}-${MODE}`
                ));
            return fetch(target, init).then(
                res =>
                    new Promise((resolve, reject) => {
                        if (!res.ok) {
                            return res.json().then(data => {
                                if (data.error === 'outdated version') {
                                    const vm = window.lssmv4;
                                    vm.$modal.show('dialog', {
                                        title: vm.$t('warnings.version.title'),
                                        text: vm.$t('warnings.version.text', {
                                            version: data.version,
                                            curver: rootState.version,
                                        }),
                                        buttons: [
                                            {
                                                title: vm.$t(
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
                                                title: vm.$t(
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
    },
};
