import { RedesignParser } from 'typings/modules/Redesign';

export interface NoteWindow {
    note: string;
}

export default <RedesignParser<NoteWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => {
    return {
        note: doc.querySelector('#note_message')?.textContent,
    };
});
