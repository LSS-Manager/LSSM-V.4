if (typeof user_id !== void 0 && typeof I18n !== void 0) {
    const script = document.createElement('script');
    // eslint-disable-next-line no-undef
    script.src = `${host}${I18n.locale}/core.js?_=${new Date().getTime()}&uid=${
        I18n.locale
    }-${user_id}`;
    script.setAttribute('type', 'module');
    script.setAttribute('async', '');
    document.querySelector('body').appendChild(script);
}
