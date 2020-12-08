declare let host: string;
declare let user_id: string | undefined;

if (
    (!window.frameElement ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.frameElement?.src.startsWith('https')) &&
    typeof user_id !== 'undefined' &&
    typeof I18n !== 'undefined'
) {
    const script = document.createElement('script');
    // eslint-disable-next-line no-undef
    script.src = `${host}core.js?_=${new Date().getTime()}&uid=${
        I18n.locale
    }-${user_id}`;
    script.setAttribute('type', 'module');
    script.setAttribute('async', '');
    document.body.appendChild(script);
}
