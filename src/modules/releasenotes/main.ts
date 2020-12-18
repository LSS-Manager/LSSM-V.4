import { Releasenotes } from '../../../typings/modules/Releasenotes';
import Showdown from 'showdown';

const LAST_VERSION_STORAGE_KEY = 'releasenotes_lastVersion';

export default async (LSSM: Vue): Promise<void> => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.releasenotes.${key}`, args);

    const sdConverter = new Showdown.Converter({
        headerLevelStart: 5,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tasklists: true,
        smartIndentationFix: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        openLinksInNewWindow: true,
    });

    const notes = Object.entries(
        (await LSSM.$store
            .dispatch('api/request', {
                url: `${LSSM.$store.state.server}releasenotes/${LSSM.$store.state.lang}.json`,
                init: {
                    method: 'GET',
                },
            })
            .then(res => res.json())) as Releasenotes
    )
        .filter(([version]) => version <= VERSION)
        .sort((a, b) => (a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0))
        .map(([version, note]) => [
            version,
            {
                ...note,
                content: sdConverter.makeHtml(
                    note.content.replace(
                        /#(\d+)/g,
                        ($0, $1) =>
                            `[${$0}](https://github.com/LSS-Manager/LSSM-V.4/issues/${$1})`
                    )
                ),
            },
        ]);

    const openNotes = (last_seen?: string): void =>
        LSSM.$modal.show(
            () =>
                import(
                    /* webpackChunkName: "releasenotes/releasenotes" */ './releasenotes.vue'
                ),
            { notes, last_seen: last_seen ?? notes[0][0] },
            { name: 'releasenotes', height: 'auto' },
            {
                async 'before-close'() {
                    await LSSM.$store.dispatch('storage/set', {
                        key: LAST_VERSION_STORAGE_KEY,
                        value: notes[0][0],
                    });
                },
            }
        );

    LSSM.$store
        .dispatch('addMenuItem', $m('name').toString())
        .then(element => (element.onclick = () => openNotes()));

    LSSM.$store
        .dispatch('storage/get', { key: LAST_VERSION_STORAGE_KEY })
        .then(key => (key || 0).toString() < notes[0][0] && openNotes(key));
};
