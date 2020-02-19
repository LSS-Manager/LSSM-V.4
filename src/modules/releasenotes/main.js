import releasenotes from './releasenotes.vue';

const notes = window.lssmv4
    .$t('modules.releasenotes.notes')
    .sort((a, b) =>
        a.version > b.version ? -1 : a.version < b.version ? 1 : 0
    );

const storageKey = 'releasenotes_lastVersion';

const openNotes = () =>
    window.lssmv4.$modal.show(
        releasenotes,
        { notes },
        { name: 'releasenotes', height: 'auto' },
        {
            'before-close'() {
                window.lssmv4.$store.dispatch('storage/set', {
                    key: storageKey,
                    val: notes[0].version,
                });
            },
        }
    );

let menuItem = document.createElement('a');
menuItem.href = '#';
menuItem.innerText = window.lssmv4.$t('modules.releasenotes.name');
window.lssmv4.$store.dispatch('addMenuItem', { menuItem });

menuItem.onclick = openNotes;

window.lssmv4.$store
    .dispatch('storage/get', storageKey)
    .then(key => (key || 0).toString() < notes[0].version && openNotes());
