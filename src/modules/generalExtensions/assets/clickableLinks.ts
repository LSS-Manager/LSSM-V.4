import { AllianceChatMessage } from 'typings/Ingame';

export default async (LSSM: Vue, showImg: boolean): Promise<void> => {
    const { urlRegex } = LSSM.$utils;

    const { default: clickableLinks } = await import(
        /* webpackChunkName: "utils/clickableLinks" */ './clickableLinks/util'
    );

    const scopedClickableLinks = (node: Node) =>
        clickableLinks(LSSM, node, showImg);

    if (window.location.pathname === '/') {
        await scopedClickableLinks(
            document.querySelector('#chat_panel_body') ?? document
        );
    } else {
        await scopedClickableLinks(document);
    }

    LSSM.$store
        .dispatch('premodifyParams', {
            event: 'allianceChat',
            callback(e: AllianceChatMessage) {
                const links = e.message.match(urlRegex) || [];
                const texts = e.message.split(urlRegex);
                e.message = '';
                texts.forEach(text => {
                    if (text) e.message += text;
                    const link = links.shift();
                    if (link) {
                        e.message += `<a href="${link}" target="_blank">${
                            showImg
                                ? `<img src="${link}" alt="${link}" style="max-width: 10%;"/>`
                                : link
                        }</a>`;
                    }
                });
            },
        })
        .then();
};
