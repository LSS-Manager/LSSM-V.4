export interface Vehicle {
    id: number;
    caption: string;
    building_id: number;
    vehicle_type: number;
    fms_real: number;
    fms_show: number;
    vehicle_type_caption: string | null;
}
