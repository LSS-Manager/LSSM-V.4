import releasenotes from './releasenotes.vue';
import { Releasenote } from '../../../typings/modules/Releasenotes';

const LAST_VERSION_STORAGE_KEY = 'releasenotes_lastVersion';

export default (LSSM: Vue): void => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.releasenotes.${key}`, args);
    const notes = (Object.values($m('notes')) as Releasenote[]).sort((a, b) =>
        a.version > b.version ? -1 : a.version < b.version ? 1 : 0
    );

    const openNotes = (): void =>
        LSSM.$modal.show(
            releasenotes,
            { notes },
            { name: 'releasenotes', height: 'auto' },
            {
                async 'before-close'() {
                    await LSSM.$store.dispatch('storage/set', {
                        key: LAST_VERSION_STORAGE_KEY,
                        value: notes[0]?.version,
                    });
                },
            }
        );

    LSSM.$store
        .dispatch('addMenuItem', $m('name').toString())
        .then(element => (element.onclick = openNotes));

    LSSM.$store
        .dispatch('storage/get', { key: LAST_VERSION_STORAGE_KEY })
        .then(key => (key || 0).toString() < notes[0]?.version && openNotes());
};
