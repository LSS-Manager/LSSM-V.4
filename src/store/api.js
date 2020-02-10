export default {
    namespaced: true,
    state: {
        buildingCooldown: new Date().getTime(),
        buildings: {},
        vehiclesCooldown: new Date().getTime(),
        vehicles: {},
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
        setVehicleState(state, { id, fms, fms_real }) {
            state.vehicles.find(x => x.id === id).fms_show = fms;
            state.vehicles.find(x => x.id === id).fms_real = fms_real;
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
        buildingById: state => buildingId =>
            state.buildings.find(x => x.id === buildingId),
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
    },
    actions: {
        buildings: async ({ state, commit }) => {
            if (new Date().getTime() > state.buildingCooldown) {
                const buildings = await fetch('/api/buildings').then(res =>
                    res.json()
                );
                commit('setBuildings', buildings);
                commit('setBuildingCooldown');
                return buildings;
            }
            return state.buildings;
        },
        vehicles: async ({ state, commit }) => {
            if (new Date().getTime() > state.vehiclesCooldown) {
                const vehicles = await fetch('/api/vehicles').then(res =>
                    res.json()
                );
                commit('setVehicles', vehicles);
                commit('setVehicleCooldown');
                return vehicles;
            }
            return state.vehicles;
        },
    },
};
