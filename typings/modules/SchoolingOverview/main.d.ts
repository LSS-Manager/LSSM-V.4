export interface OwnSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
}

export interface OwnSchoolings {
    amounts: Record<string, number>;
    tabs: Record<string, OwnSchooling[]>;
}

export interface OpenSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
    price: string;
    seats: number;
}
export interface OpenSchoolings {
    amounts: Record<
        string,
        {
            amount: number;
            seats: number;
        }
    >;
    tabs: Record<string, OpenSchooling[]>;
}
