import CreditsListParser from '../credits/list';

import type { RedesignParser } from 'typings/modules/Redesign';

interface Entry {
    amount: number;
    desc: string;
    date: string;
    timestamp: string;
}

export interface CoinsListWindow {
    entries: Entry[];
    lastPage: number;
}

export default <RedesignParser<CoinsListWindow>>CreditsListParser;
