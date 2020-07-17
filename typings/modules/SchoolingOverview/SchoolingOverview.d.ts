import {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

export interface SchoolingOverview {
    hidden: boolean;
    sortOwn: string;
    sortOwnDir: string;
    sortOpen: string;
    sortOpenDir: string;
    ownSchoolingsSearch: string;
    openSchoolingsSearch: string;
}

export interface SchoolingOverviewComputed {
    sortedOwn: {
        amount: number;
        key: string;
    }[];
    sortedOpen: {
        amount: number;
        seats: number;
        key: string;
    }[];
}

export interface SchoolingOverviewMethods {
    setSortOwn(s: string): void;
    setSortOpen(s: string): void;
}

export interface SchoolingOverviewProps {
    ownSchoolings: OwnSchoolings;
    openSchoolings: OpenSchoolings;
}
