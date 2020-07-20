import { Building } from '../../Building';
import { Vehicle } from '../../Vehicle';
import { Mission } from 'typings/Mission';

export interface APIState {
    buildings: Building[];
    vehicles: Vehicle[];
    vehicleStates: {
        [state: number]: number;
    };
    autoUpdates: string[];
    missions: Mission[];
    key: string | null;
}
