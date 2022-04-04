import getEntries from '../../../dailyCreditsSummary/assets/getEntries';

import type { CreditsTypes } from 'typings/modules/dailyCreditsSummary/main';
import type { RedesignParser } from 'typings/modules/Redesign';

export interface Entry {
    total: number;
    average: number;
    amount: number;
    desc: string;
    types: string[];
}

export interface CreditsDailyWindow {
    entries: Entry[];
    creditsTypes: CreditsTypes;
}

export default <RedesignParser<CreditsDailyWindow>>(async ({ LSSM, doc }) => {
    return {
        ...(await getEntries(LSSM, doc)),
    };
});
