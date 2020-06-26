import { UAParser } from 'ua-parser-js';
import { StorageSet } from '../../../typings/store/storage/Actions';
import config from '../../config';

const NOTE_STORAGE_KEY = 'telemetry_note_confirmed';

export default (LSSM: Vue): void => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.telemetry.${key}`, args);

    const sendStats = async () => {
        await LSSM.$store.dispatch('api/registerBuildingsUsage', false);
        LSSM.$store.commit(
            'api/setKey',
            await LSSM.$store
                .dispatch('api/request', {
                    url: `/profile/external_secret_key/${window.user_id}`,
                })
                .then(res => res.json())
                .then(({ code }) => code)
        );

        const ua = new UAParser(window.navigator.userAgent);

        LSSM.$store
            .dispatch('api/request', {
                url: `${LSSM.$store.state.server}stat.php`,
                init: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: LSSM.$store.state.api.key,
                        uid: window.user_id,
                        game: BUILD_LANG,
                        name: window.username,
                        version: LSSM.$store.state.version,
                        data: {
                            browser: `${ua.getBrowser().name} ${
                                ua.getBrowser().major
                            }`,
                            premium: window.user_premium,
                            map:
                                typeof window.mapkit !== 'undefined'
                                    ? 'mapkit'
                                    : 'osm',
                            buildings: LSSM.$store.state.api.buildings.length,
                            modules: await LSSM.$store.dispatch('storage/get', {
                                key: 'activeModules',
                            }),
                        },
                        flag: config.games[LSSM.$i18n.locale].flag,
                    }),
                },
            })
            .then(res => res.json())
            .catch(() => {
                // Don't do anything
            });
    };

    LSSM.$store
        .dispatch('storage/get', {
            key: NOTE_STORAGE_KEY,
            defaultValue: false,
        })
        .then(async isConfirmed => {
            if (!isConfirmed) {
                LSSM.$modal.show('dialog', {
                    title: $m('info.title'),
                    text: $m('info.text', { wiki: LSSM.$store.getters.wiki }),
                    options: {},
                    buttons: [
                        {
                            title: $m('info.close'),
                            handler() {
                                LSSM.$store
                                    .dispatch('storage/set', {
                                        key: NOTE_STORAGE_KEY,
                                        value: true,
                                    } as StorageSet)
                                    .then(
                                        () =>
                                            sendStats() &&
                                            LSSM.$modal.hide('dialog')
                                    );
                            },
                        },
                    ],
                });
            } else {
                await sendStats();
            }

            // TODO: send stats to server
        });
};
