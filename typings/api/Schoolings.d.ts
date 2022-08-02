export interface Schooling {
    id: number;
    education_title: string;
    running: boolean;
    open_spaces: number;
    finish_time: string;
    building_id: number;
}

export interface SchoolingAPI {
    result: Schooling[];
}
