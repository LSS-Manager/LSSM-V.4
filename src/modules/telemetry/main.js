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

fetch(`/profile/external_secret_key/${window.user_id}`)
    .then(res => res.json())
    .then(async data => {
        const ua = UAParser(window.navigator.userAgent);
        fetch(`${window.lssmv4.$store.state.server}stat.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.code,
                uid: window.user_id,
                game: window.lssmv4.$i18n.locale,
                name: window.user_name,
                data: {
                    browser: `${ua.browser.name} ${ua.browser.major}`,
                    premium: window.user_premium,
                    buildings: window.lssmv4.$store.state.api.buildings.length,
                    version: window.lssmv4.$store.state.version,
                    modules: await window.lssmv4.$store.dispatch(
                        'storage/get',
                        'active'
                    ),
                },
            }),
        })
            .then(res => res.json())
            .then(data => {
                data = data.data;
                console.log(data, config, config.games[data.game]);
                fetch(
                    'https://discordapp.com/api/webhooks/691666820406575124/SeebzS1S6eGdR_zDolD84asOzezCcM6U3fIWGixsQCUexqHmLjlUnezU3z0iBqpKvh-6',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            embeds: [
                                {
                                    author: {
                                        name: 'LSS-Manager V.4',
                                        url: window.lssmv4.$store.state.server,
                                    },
                                    title: `**New Telemetry Entry** ${
                                        config.games[data.game].flag
                                    }`,
                                    color: 13185068,
                                    timestamp: new Date(),
                                    footer: {
                                        text: data.id,
                                    },
                                    description:
                                        `**[*${data.uid}*]**: ${data.name}\n` +
                                        `**Version**: ${data.data.version}\n` +
                                        `**Broswer**: ${data.data.browser}\n` +
                                        `**Buildings**: ${data.data.buildings}\n` +
                                        '**Modules**: ```* ' +
                                        data.data.modules.join('\n* ') +
                                        '```',
                                },
                            ],
                        }),
                    }
                );
            });
    });
