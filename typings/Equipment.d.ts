interface InternalEquipment<ID extends string> {
    id: ID;
    caption: string;
    size: number;
    credits: number;
    coins: number;
}

type InternalEquipments<IDs extends string> = {
    readonly [ID in IDs]: InternalEquipment<ID>;
};
