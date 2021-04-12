import CreditsListParser from '../credits/list';
import { RedesignParser } from 'typings/modules/Redesign';

interface Entry {
    amount: number;
    desc: string;
    date: string;
}

export interface CoinsListWindow {
    entries: Entry[];
    lastPage: number;
}

export default <RedesignParser<CoinsListWindow>>CreditsListParser;
