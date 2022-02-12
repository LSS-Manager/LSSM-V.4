import type { RedesignParser } from 'typings/modules/Redesign';

export interface NoteWindow {
    note: string;
}

export default <RedesignParser<NoteWindow>>(({ doc }) => ({
    note: doc.querySelector('#note_message')?.textContent,
}));
