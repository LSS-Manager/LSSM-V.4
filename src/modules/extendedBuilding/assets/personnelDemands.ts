// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';
import { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default (
    LSSM: Vue,
    $m: $m,
    buildingId: number,
    MODULE_ID: string
): void => {
    const dataList = document.querySelector('.dl-horizontal');

    if (!dataList) return;

    const vehicleTypes = LSSM.$t('vehicles') as {
        [id: number]: InternalVehicle;
    };

    let sumMinPersonnel = 0;
    let sumMaxPersonnel = 0;

    let sumMinPersonnelS6 = 0;
    let sumMaxPersonnelS6 = 0;

    LSSM.$store
        .dispatch('api/fetchVehiclesAtBuilding', {
            id: buildingId,
            feature: `${MODULE_ID}-personnelDemands`,
        })
        .then((vehicles: Vehicle[]) => {
            vehicles.forEach(v => {
                const type = vehicleTypes[v.vehicle_type];
                sumMinPersonnel += type.minPersonnel;
                sumMaxPersonnel +=
                    v.max_personnel_override ?? type.maxPersonnel;
                if (v.fms_real !== 6) {
                    sumMinPersonnelS6 += type.minPersonnel;
                    sumMaxPersonnelS6 +=
                        v.max_personnel_override ?? type.maxPersonnel;
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
