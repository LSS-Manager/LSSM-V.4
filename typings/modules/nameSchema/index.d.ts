import type { Building, InternalBuilding } from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

interface AliasProps {
    id: number;
    alias: string;
    type: string;
}

export type AliasedBuilding = AliasProps & Building;
export type AliasedInternalBuilding = AliasProps & InternalBuilding;

export type AliasedVehicle = AliasProps & Vehicle;
export type AliasedInternalVehicle = AliasProps & InternalVehicle;
