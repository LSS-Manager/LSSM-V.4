import { OpenSchooling } from 'typings/modules/SchoolingOverview/OpenSchoolingTabs';
import { OwnSchooling } from 'typings/modules/SchoolingOverview/OwnSchoolingTabs';

export interface OwnSchoolings {
    amounts: Record<string, number>;
    tabs: Record<string, OwnSchooling[]>;
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
