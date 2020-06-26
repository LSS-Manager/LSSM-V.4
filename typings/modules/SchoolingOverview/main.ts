export interface OwnSchoolings {
    [name: string]: number;
}

export interface OpenSchoolings {
    [name: string]: {
        amount: number;
        seats: number;
    };
}
