import { UAParser } from 'ua-parser-js';
import { StorageSet } from '../../../typings/store/storage/Actions';
import config from '../../config';

const NOTE_STORAGE_KEY = 'telemetry_note_confirmed';

export default (
    LSSM: Vue,
    getSetting: <t = boolean>(settingId: string) => Promise<t>
): void => {
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
        const browser = ua.getBrowser();
        const browserMajor = parseInt(browser.version?.split('.')[0] || '-1');

        const browserSupport =
            config.browser[browser.name?.toLowerCase() || ''];

        if (!browserSupport)
            LSSM.$modal.show('dialog', {
                title: $m('browsersupport.not.title'),
                text: $m('browsersupport.not.text', {
                    name: browser.name,
                    wiki: LSSM.$store.getters.wiki,
                    wikiAnchor: $m('browsersupport.faqAnchor'),
                }),
                options: {},
                buttons: [
                    {
                        title: $m('browsersupport.close'),
                    },
                ],
            });
        else if (browserMajor < browserSupport.supported)
            LSSM.$modal.show('dialog', {
                title: $m('browsersupport.old.title'),
                text: $m('browsersupport.old.text', {
                    name: browser.name,
                    latest: browserSupport.latest,
                    supported: browserSupport.supported,
                    current: browserMajor,
                    download: browserSupport.download,
                    wiki: LSSM.$store.getters.wiki,
                    wikiAnchor: $m('browsersupport.faqAnchor'),
                }),
                options: {},
                buttons: [
                    {
                        title: $m('browsersupport.close'),
                    },
                ],
            });

        LSSM.$store
            .dispatch('api/request', {
                url: `${LSSM.$store.state.server}telemetry.php?uid=${BUILD_LANG}-${window.user_id}`,
                init: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: LSSM.$store.state.api.key,
                        uid: window.user_id,
                        game: BUILD_LANG,
                        police: LSSM.$store.state.policechief,
                        name: window.username,
                        version: LSSM.$store.state.version,
                        data: {
                            browser: `${browser.name} ${browserMajor}`,
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
                            title: $m('info.decline'),
                            handler() {
                                // First we store that we confirmed the telemetry dialog
                                LSSM.$store
                                    .dispatch('storage/set', {
                                        key: NOTE_STORAGE_KEY,
                                        value: true,
                                    } as StorageSet)
                                    .then(() => LSSM.$modal.hide('dialog'));
                                // Now we store if we allowed telemetry
                                LSSM.$store.dispatch('settings/setSetting', {
                                    moduleId: 'global',
                                    settingId: 'allowTelemetry',
                                    value: false,
                                });
                            },
                        },
                        {
                            title: $m('info.close'),
                            handler() {
                                // First we store that we confirmed the telemetry dialog
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
                                // Now we store if we allowed telemetry
                                LSSM.$store.dispatch('settings/setSetting', {
                                    moduleId: 'global',
                                    settingId: 'allowTelemetry',
                                    value: true,
                                });
                            },
                        },
                    ],
                });
            }
            // Only if the telemetry dialog has been seen once, we check for the setting
            const allowTelemetry = await getSetting('allowTelemetry');
            if (allowTelemetry) {
                await sendStats();
            }
        });
};
