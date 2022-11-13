import coerce from 'semver/functions/coerce';
import semverLt from 'semver/functions/lt';

import config from '../config';

export default (LSSM: Vue) => {
    const userscript_latest_update = coerce(config.userscript_latest_update);
    const userscript_version = coerce(window['lssmv4-GM_Info']?.script.version);
    return new Promise<void>((resolve, reject) => {
        if (
            !userscript_latest_update ||
            !userscript_version ||
            (userscript_latest_update &&
                userscript_version &&
                semverLt(userscript_version, userscript_latest_update))
        ) {
            const userscriptLink =
                MODE === 'stable'
                    ? `${SERVER}lssm-v4.user.js`
                    : `${LSSM.$stores.root.githubUrl}/raw/dev/static/lssm-v4.user.js`;
            LSSM.$modal.show('dialog', {
                title: LSSM.$t('global.updateUserscript.title'),
                text: LSSM.$t('global.updateUserscript.text', {
                    minVersion: `<b>${userscript_latest_update}</b>`,
                    updateLink: `<a href="${userscriptLink}" target='_blank'>lssm-v4.user.js</a>`,
                    bypassLink: `<a href="${userscriptLink}#bypass=true" target='_blank'>lssm-v4.user.js</a>`,
                }),
                options: {},
                buttons: [
                    {
                        title: LSSM.$t('global.updateUserscript.close'),
                        handler() {
                            LSSM.$modal.hide('dialog');
                            reject();
                        },
                    },
                ],
            });
        } else {
            resolve();
        }
    });
};
