import coerce from 'semver/functions/coerce';
import semverLt from 'semver/functions/lt';
import semverLte from 'semver/functions/lte';
import semverRcompare from 'semver/functions/rcompare';
import Showdown from 'showdown';

import type { Releasenote, Releasenotes } from 'typings/modules/Releasenotes';

const LAST_VERSION_STORAGE_KEY = 'releasenotes_lastVersion';

export default async (LSSM: Vue): Promise<void> => {
    const $m = (key: string, args?: Record<string, unknown>) =>
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

    const currentVersion = coerce(VERSION) ?? '4.0.0';

    const notes: [string, Releasenote][] = Object.entries(
        await LSSM.$stores.api
            .request(
                LSSM.$stores.root.lssmUrl(
                    `/releasenotes/${LSSM.$stores.root.locale}.json`,
                    true,
                    { v: VERSION }
                ),
                'releasenotes'
            )
            .then<Releasenotes>(res => res.json())
    )
        .filter(
            ([version, { content }]) =>
                content &&
                (MODE === 'beta' ||
                    semverLte(coerce(version) ?? '4.0.0', currentVersion))
        )
        .sort((a, b) =>
            semverRcompare(coerce(a[0]) ?? '0', coerce(b[0]) ?? '0')
        )
        .map(([version, note]) => [
            version,
            {
                ...note,
                content: sdConverter.makeHtml(
                    note.content
                        .replace(
                            /#(\d+)/gu,
                            ($0, $1) =>
                                `[${$0}](https://github.com/LSS-Manager/LSSM-V.4/issues/${$1})`
                        )
                        .replace(/\$m\('(?<module>[^.]*?)'\)/gu, (...args) =>
                            LSSM.$t(
                                `modules.${args.at(-1).module ?? ''}.name`
                            ).toString()
                        )
                        .replace(
                            /\$s\((?<noModule>!?)'(?<module>[^.]*?)(?:\.(?<setting>.*?))?'\)/gu,
                            (...args) => {
                                const groups = args.at(-1);
                                const noModule = groups.noModule?.length > 0;
                                const module = groups.module ?? '';
                                const setting = groups.setting ?? '';
                                const path = `modules.${module}`;
                                const moduleName = LSSM.$t(
                                    `${path}.name`
                                ).toString();
                                if (!setting) return moduleName;
                                return `${
                                    !noModule ? `${moduleName} / ` : ''
                                }${LSSM.$t(
                                    `modules.${module}.settings.${setting}.title`
                                )}`;
                            }
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
            {
                name: 'releasenotes',
                height: 'auto',
                class: 'releasenotes-modal',
            },
            {
                'before-close': () =>
                    LSSM.$stores.storage.set({
                        key: LAST_VERSION_STORAGE_KEY,
                        value: notes[0][0],
                    }),
            }
        );

    LSSM.$stores.root
        .addMenuItem($m('name').toString())
        .addEventListener('click', () => openNotes());

    LSSM.$stores.storage
        .get<string>({ key: LAST_VERSION_STORAGE_KEY, defaultValue: '4.0.0' })
        .then(
            key =>
                semverLt(
                    coerce(key) ?? '4.0.0',
                    coerce(notes[0][0]) ?? '4.0.0'
                ) && openNotes(key)
        );
};
