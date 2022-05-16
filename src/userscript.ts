import 'tampermonkey';

declare let host: string;
declare let user_id: string | undefined;
declare let I18n: unknown & { locale: string };
declare let prefix: string;

const loadLSSM = () => {
    const script = document.createElement('script');

    script.src = `${host}core.js?_=${new Date().getTime()}&uid=${
        I18n.locale
    }-${user_id}`;
    script.setAttribute('type', 'module');
    script.setAttribute('async', '');

    window[`${prefix}-GM_Info`] = JSON.parse(JSON.stringify(GM_info));

    document.body.append(script);
};

if (
    (!window.frameElement ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.frameElement?.src.startsWith('https')) &&
    !window.location.pathname.match(/^\/users\//u) &&
    typeof user_id !== 'undefined' &&
    typeof I18n !== 'undefined'
) {
    if (
        window !== window.parent &&
        window.parent.hasOwnProperty(`${prefix}-redesign-lightbox`)
    ) {
        const redesignTriggerEvent = `${prefix}-redesign-iframe-trigger-lssm-load`;
        window.parent.addEventListener(redesignTriggerEvent, loadLSSM);
        window.addEventListener('pagehide', () =>
            window.parent.removeEventListener(redesignTriggerEvent, loadLSSM)
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.parent[`${prefix}-redesign-lightbox`].src = new URL(
            window.location.href
        ).toString();
    } else {
        loadLSSM();
    }
}
