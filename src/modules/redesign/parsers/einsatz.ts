import type { RedesignParser } from 'typings/modules/Redesign';

export type EinsatzWindow = Record<string, never>;

export default <RedesignParser<EinsatzWindow>>(() => ({}));
