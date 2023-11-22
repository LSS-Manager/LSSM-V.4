import type { InternalEquipments } from 'typings/Equipment';

const registerEquipment = <Equipment extends string>(
    equipment: InternalEquipments<Equipment>
) => equipment;

export default registerEquipment;
