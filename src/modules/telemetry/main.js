const UAParser = require('ua-parser-js');

const storageKey = 'telemetry_note_fired';
const config = require('../../config');

window.lssmv4.$store.dispatch('storage/get', storageKey).then(
    key =>
        !key &&
        window.lssmv4.$modal.show('dialog', {
            title: window.lssmv4.$t('modules.telemetry.info.title'),
            text: window.lssmv4.$t('modules.telemetry.info.text', {
                wiki: window.lssmv4.$store.getters.wiki,
            }),
            options: {},
            buttons: [
                {
                    title: window.lssmv4.$t('modules.telemetry.info.close'),
                    handler: () => {
                        window.lssmv4.$store.dispatch('storage/set', {
                            key: storageKey,
                            val: true,
                        });
                        window.lssmv4.$modal.hide('dialog');
                    },
                },
            ],
        })
);

window.lssmv4.$store
    .dispatch('api/request', {
        url: `/profile/external_secret_key/${window.user_id}`,
    })
    .then(res => res.json())
    .then(async data => {
        const ua = UAParser(window.navigator.userAgent);
        window.lssmv4.$store
            .dispatch('api/request', {
                url: `${window.lssmv4.$store.state.server}stat.php`,
                init: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: data.code,
                        uid: window.user_id,
                        game: window.lssmv4.$i18n.locale,
                        name: window.username,
                        data: {
                            browser: `${ua.browser.name} ${ua.browser.major}`,
                            premium: window.user_premium,
                            map:
                                typeof window.mapkit !== 'undefined'
                                    ? 'mapkit'
                                    : 'osm',
                            buildings:
                                window.lssmv4.$store.state.api.buildings.length,
                            version: window.lssmv4.$store.state.version,
                            modules: await window.lssmv4.$store.dispatch(
                                'storage/get',
                                'active'
                            ),
                        },
                        flag: config.games[window.lssmv4.$i18n.locale].flag,
                    }),
                },
            })
            .then(res => res.json());
    });
