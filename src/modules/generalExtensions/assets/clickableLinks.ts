import type { AllianceChatMessage } from 'typings/Ingame';

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
    } else if (window.location.pathname.match(/^\/note\/?/u)) {
        const input =
            document.querySelector<HTMLTextAreaElement>('#note_message');
        if (input) {
            const preview = document.createElement('pre');
            preview.classList.add('input-group', 'form-control');
            preview.innerHTML = input.value;
            preview.style.setProperty('white-space', 'pre-wrap');
            preview.style.setProperty('overflow-wrap', 'break-word');
            document.body.prepend(preview);
            await scopedClickableLinks(preview);
        }
    } else {
        await scopedClickableLinks(document);
    }

    document.querySelector('#mission_chat_messages')?.addEventListener(
        'error',
        e => {
            const img = e.target as HTMLElement | null;
            if (!img || img.nodeName !== 'IMG' || !img.parentElement) return;
            img.parentElement.textContent = img.getAttribute('src');
            img.remove();
        },
        true
    );

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
                        e.message += `<a href="${link}" ${
                            new URL(link, window.location.origin).origin ===
                            window.location.origin
                                ? 'class="lightbox-open"'
                                : 'target="_blank"'
                        }>${
                            showImg
                                ? `<img src="${link}" alt="${link}" style="max-width: 10%;"/>`
                                : link
                        }</a>`;
                    }
                });
            },
        })
        .then();

    LSSM.$store
        .dispatch('event/addListener', {
            name: 'redesign-note-saved',
            listener({ detail: { content, previewId } }: CustomEvent) {
                const preview = document.querySelector<HTMLPreElement>(
                    `#${previewId}`
                );
                if (!preview) return;
                preview.innerHTML = content;
                scopedClickableLinks(preview);
            },
        })
        .then();
};
