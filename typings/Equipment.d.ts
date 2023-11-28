export interface InternalEquipment<ID extends string> {
    id: ID;
    caption: string;
    size: number;
    credits: number;
    coins: number;
}

export type InternalEquipments<IDs extends string> = {
    readonly [ID in IDs]: InternalEquipment<ID>;
};
