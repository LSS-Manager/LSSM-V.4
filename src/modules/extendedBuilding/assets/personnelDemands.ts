import type { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    $m: $m,
    buildingId: number,
    MODULE_ID: string
): void => {
    const dataList = document.querySelector('.dl-horizontal');

    if (!dataList) return;

    const vehicleTypes = LSSM.$stores.root.$tVehicles;

    let sumMinPersonnel = 0;
    let sumMaxPersonnel = 0;

    let sumMinPersonnelS6 = 0;
    let sumMaxPersonnelS6 = 0;

    LSSM.$stores.api
        .getVehiclesAtBuilding(buildingId, `${MODULE_ID}-personnelDemands`)
        .then(vehicles => {
            vehicles.forEach(vehicle => {
                const type = vehicleTypes[vehicle.vehicle_type];
                sumMinPersonnel += type.minPersonnel;
                sumMaxPersonnel +=
                    vehicle.max_personnel_override ?? type.maxPersonnel;
                if (vehicle.fms_real !== 6) {
                    sumMinPersonnelS6 += type.minPersonnel;
                    sumMaxPersonnelS6 +=
                        vehicle.max_personnel_override ?? type.maxPersonnel;
                }
            });

            const personnelTitle = document.createElement('dt');
            const titleWrapper = document.createElement('strong');
            titleWrapper.textContent = $m(`personnelDemands.demand`).toString();
            personnelTitle.append(titleWrapper);
            const personnelData = document.createElement('dd');
            personnelData.textContent = `min: ${sumMinPersonnel} (${sumMinPersonnelS6}) / max: ${sumMaxPersonnel} (${sumMaxPersonnelS6})`;
            const personnelAdditional = document.createElement('small');
            personnelAdditional.textContent = $m(
                `personnelDemands.additional`
            ).toString();
            personnelAdditional.style.marginLeft = '1ch';
            personnelData.append(personnelAdditional);
            dataList.append(personnelTitle, personnelData);
        });
};
