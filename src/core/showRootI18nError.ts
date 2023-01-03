import config from '../config';

import type { useRootStore } from '@stores/index';

export default (LSSM: Vue, rootStore: ReturnType<typeof useRootStore>) =>
    LSSM.$modal.show('dialog', {
        title: 'LSSM V.4: Language not supported',
        text: `Thank you for using LSSM V.4!<br>
unfortunately your language <code>${rootStore.locale}</code> is not yet supported. Why? The translations simply don't exist.<br>
V.4 is too big for LSSM-Team to maintain all translations, so we need to rely on volunteer translators. You can find information on this at:
<ul>
    <li style='list-style: unset !important;'>
        <a href='${config.urls.docs}en_US/faq.html' target='_blank'>
            FAQ
        </a>
    </li>
    <li style='list-style: unset !important;'>
        <a href='${config.urls.docs}en_US/contributing.html' target='_blank'>
            Contribution guide
        </a>
    </li>
    <li style='list-style: unset !important;'>
        <a href='${rootStore.discordUrl}' target='_blank'>
            LSSM Discord Server
        </a>
    </li>
</ul>
We would be happy if you help to make LSSM available in this language version!<br>
<br>
Yours<br>
LSSM-Team`,
        options: {},
        buttons: [
            {
                title: 'OK',
                handler() {
                    LSSM.$modal.hide('dialog');
                },
            },
        ],
    });
