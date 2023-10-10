interface InternalEquipment<ID extends string> {
    id: ID;
    caption: string;
    size: number;
    credits: number;
    coins: number;
    staff: {
        min: number;
        training?: Record<string, string>;
    };
}

type InternalEquipments<IDs extends string> = {
    readonly [ID in IDs]: InternalEquipment<ID>;
};
