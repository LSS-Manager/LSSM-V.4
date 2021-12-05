export default async (
    LSSM: Vue,
    node: Node,
    showImg?: boolean
): Promise<void> => {
    const { urlRegex } = LSSM.$utils;
    const showImage =
        showImg ??
        (await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: 'generalExtensions',
            settingId: 'showImg',
        }));
    LSSM.$utils
        .getTextNodes(node, n => !!n?.textContent?.match(urlRegex))
        .forEach(n => {
            if (!n) return;
            const links = (n.textContent || '').match(urlRegex) || [];
            const texts = (n.textContent || '').split(urlRegex);
            texts.forEach(text => {
                if (text) {
                    n.parentNode?.insertBefore(
                        document.createTextNode(text),
                        n
                    );
                }
                const link = links.shift();
                if (!link) return;
                const linkNode = document.createElement('a');
                linkNode.href = link.toString();
                linkNode.setAttribute('target', '_blank');
                if (showImage) {
                    const imgNode = document.createElement('img');
                    imgNode.src = link.toString();
                    imgNode.alt = link.toString();
                    imgNode.style.maxWidth = '10%';
                    imgNode.addEventListener('error', () => {
                        imgNode.remove();
                        linkNode.textContent = link.toString();
                    });
                    linkNode.appendChild(imgNode);
                } else {
                    linkNode.textContent = link.toString();
                }
                n.parentNode?.insertBefore(linkNode, n);
            });
            n.parentNode?.removeChild(n);
        });
};
