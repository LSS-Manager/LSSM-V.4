import UAParser from 'ua-parser-js';

import config from '../../config';

const NOTE_STORAGE_KEY = 'telemetry_note_confirmed';
const HIDE_BROWSER_NOTE_KEY = 'last_browsersupport_note';

export default (
    LSSM: Vue,
    getSetting: <t = boolean>(settingId: string) => Promise<t>
): void => {
    const $m = (key: string, args?: Record<string, unknown>) =>
        LSSM.$t(`modules.telemetry.${key}`, args);

    const wikiLocale = `${LSSM.$stores.root.wiki}/`;

    const checkBrowser = (browser: UAParser.IBrowser, browserMajor: number) =>
        LSSM.$stores.storage
            .get<string>({
                key: HIDE_BROWSER_NOTE_KEY,
                defaultValue: '',
            })
            .then(storageValue => {
                const browserName = browser.name?.toLowerCase() ?? '';

                const browserSupport = config.browser[browserName];

                if (
                    new RegExp(
                        `^${browserName}${
                            browserSupport ? ` ${browserMajor}` : ''
                        }$`,
                        'iu'
                    ).test(storageValue)
                )
                    return;

                const downloadText = $m('browsersupport.table.download');
                const table = `<table class="table table-striped table-condensed table-hover">
<thead>
  <tr>
    <th>${$m('browsersupport.table.browser')}</th>
    <th>${$m('browsersupport.table.min')}</th>
    <th>${$m('browsersupport.table.latest')}</th>
    <th>${downloadText}</th>
  </tr>
</thead>
<tbody>
  ${Object.entries(config.browser)
      .map(
          ([browser, { latest, supported, download }]) => `<tr>
  <th>${browser.replace(/^./u, $1 => $1.toUpperCase())}</th>
  <td>${supported}</td>
  <td>${latest}</td>
  <td><a href="${download}" target="_blank" style="color: #6dd5f4;">${downloadText}</a></td>
</tr>`
      )
      .join('')}
</tbody>
</table>`;

                if (!browserSupport) {
                    LSSM.$modal.show('dialog', {
                        title: $m('browsersupport.not.title'),
                        text:
                            $m('browsersupport.not.text', {
                                name: browser.name,
                                wiki: wikiLocale,
                                wikiAnchor: $m('browsersupport.faqAnchor'),
                            }) + table,
                        options: {},
                        buttons: [
                            {
                                title: $m('browsersupport.close'),
                                handler() {
                                    LSSM.$stores.storage
                                        .set({
                                            key: HIDE_BROWSER_NOTE_KEY,
                                            value: browserName,
                                        })
                                        .then(() => LSSM.$modal.hide('dialog'));
                                },
                            },
                        ],
                    });
                } else if (browserMajor < browserSupport.supported) {
                    LSSM.$modal.show('dialog', {
                        title: $m('browsersupport.old.title'),
                        text:
                            $m('browsersupport.old.text', {
                                name: browser.name,
                                latest: browserSupport.latest,
                                supported: browserSupport.supported,
                                current: browserMajor,
                                download: browserSupport.download,
                                wiki: wikiLocale,
                                wikiAnchor: $m('browsersupport.faqAnchor'),
                            }) + table,
                        options: {},
                        buttons: [
                            {
                                title: $m('browsersupport.close'),
                                handler() {
                                    LSSM.$stores.storage
                                        .set({
                                            key: HIDE_BROWSER_NOTE_KEY,
                                            value: browserName,
                                        })
                                        .then(() => LSSM.$modal.hide('dialog'));
                                },
                            },
                        ],
                    });
                }
            });

    const sendStats = async (
        browser: UAParser.IBrowser,
        browserMajor: number
    ) => {
        await LSSM.$stores.api._setSecretKey();
        const buildingsAmount = await LSSM.$stores.api
            .getBuildings('telemetry')
            .then(({ value: buildings }) => buildings.length);

        LSSM.$stores.api
            .request({
                url: LSSM.$stores.root.lssmUrl(`/telemetry.php`, true),
                init: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: LSSM.$stores.api.secretKey,
                        uid: window.user_id,
                        game: LSSM.$stores.root.locale,
                        police: LSSM.$stores.root.isPoliceChief,
                        name: window.username,
                        version: VERSION,
                        data: {
                            browser: `${browser.name} ${browserMajor}`,
                            premium: window.user_premium,
                            map:
                                typeof window.mapkit !== 'undefined'
                                    ? 'mapkit'
                                    : 'osm',
                            buildings: buildingsAmount,
                            modules: await LSSM.$stores.storage.get<string[]>({
                                key: 'activeModules',
                                defaultValue: [],
                            }),
                        },
                        flag: config.games[LSSM.$i18n.locale].flag,
                        userscript_version:
                            window['lssmv4-GM_Info']?.script.version.replace(
                                /-.*$/u,
                                ''
                            ) ?? '4.0.0',
                        branch: BRANCH,
                    }),
                },
                feature: 'telemetry',
            })
            .then(res => res.json())
            .catch(() => {
                // Don't do anything
            });
    };

    LSSM.$stores.api
        .getCredits('telemetry')
        .then(async ({ value: { user_directplay_registered } }) => {
            if (user_directplay_registered) return;

            const ua = new UAParser(window.navigator.userAgent);
            const browser = ua.getBrowser();
            const browserMajor = parseInt(
                browser.version?.split('.')[0] || '-1'
            );

            LSSM.$stores.storage
                .get<boolean>({
                    key: NOTE_STORAGE_KEY,
                    defaultValue: false,
                })
                .then(isConfirmed => {
                    if (!isConfirmed) {
                        LSSM.$modal.show('dialog', {
                            title: $m('info.title'),
                            text: $m('info.text', {
                                wiki: wikiLocale,
                            }),
                            options: {},
                            buttons: [
                                {
                                    title: $m('info.decline'),
                                    handler() {
                                        // First we store that we confirmed the telemetry dialog
                                        LSSM.$stores.storage
                                            .set({
                                                key: NOTE_STORAGE_KEY,
                                                value: true,
                                            })
                                            .then(() => {
                                                LSSM.$modal.hide('dialog');
                                                checkBrowser(
                                                    browser,
                                                    browserMajor
                                                );
                                            });
                                        // Now we store if we allowed telemetry
                                        LSSM.$stores.settings.setSetting({
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
                                        LSSM.$stores.storage
                                            .set({
                                                key: NOTE_STORAGE_KEY,
                                                value: true,
                                            })
                                            .then(() =>
                                                sendStats(
                                                    browser,
                                                    browserMajor
                                                ).then(() => {
                                                    LSSM.$modal.hide('dialog');
                                                    checkBrowser(
                                                        browser,
                                                        browserMajor
                                                    );
                                                })
                                            );
                                        // Now we store if we allowed telemetry
                                        LSSM.$stores.settings.setSetting({
                                            moduleId: 'global',
                                            settingId: 'allowTelemetry',
                                            value: true,
                                        });
                                    },
                                },
                            ],
                        });
                    } else {
                        // Only if the telemetry dialog has been seen once, we check for the setting
                        getSetting('allowTelemetry').then(allowTelemetry => {
                            if (allowTelemetry) {
                                sendStats(browser, browserMajor).then(() =>
                                    checkBrowser(browser, browserMajor)
                                );
                            } else {
                                checkBrowser(browser, browserMajor);
                            }
                        });
                    }
                });
        });
};
