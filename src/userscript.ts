import 'tampermonkey';

declare const local: boolean;
declare const localCoreName: string;
declare const host: string;
declare const user_id: string | undefined;
declare const I18n: unknown & { locale: string };
declare const prefix: typeof PREFIX;

type UserscriptWindow = Record<`${typeof PREFIX}-GM_Info`, typeof GM_info> &
    typeof unsafeWindow;

const loadLSSM = () => {
    const script = document.createElement('script');

    // this is a nice tweak to generate the correct script for local development.
    // Terser will remove the unused one and leave the used one only.
    script.src = local
        ? GM_getResourceURL(localCoreName)
        : `${host}core.js?_=${Math.floor(
              Date.now() / (1000 * 60 * 10) // Cache the core for 10 minutes
          )}&branch=${localStorage.getItem(`${prefix}_branch`) ?? 'stable'}`;
    script.setAttribute('type', 'module');
    script.setAttribute('async', '');

    (unsafeWindow as UserscriptWindow)[`${prefix}-GM_Info`] = JSON.parse(
        JSON.stringify(GM_info)
    );

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
