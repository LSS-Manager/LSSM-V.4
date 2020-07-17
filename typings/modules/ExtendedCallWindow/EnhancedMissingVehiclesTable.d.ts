import { Requirement } from './EnhancedMissingVehicles';

export interface EnhancedMissingVehiclesTableProps {
    missingRequirements: Requirement[];
    sort: string;
    sortDir: string;
    search: string;
}
