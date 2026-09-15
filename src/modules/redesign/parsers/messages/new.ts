import type { RedesignParser } from 'typings/modules/Redesign';

export type NewMessageWindow = Record<string, never>;

export default <RedesignParser<NewMessageWindow>>(() => ({}));
