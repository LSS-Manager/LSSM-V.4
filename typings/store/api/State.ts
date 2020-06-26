import { Building } from '../../Building';
import { Vehicle } from '../../Vehicle';

export interface APIState {
    buildings: Building[];
    vehicles: Vehicle[];
    vehicleStates: {
        [state: number]: number;
    };
    autoUpdates: string[];
    key: string | null;
}
