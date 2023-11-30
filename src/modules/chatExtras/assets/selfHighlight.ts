export default (
    LSSM: Vue,
    color: string,
    customColor: boolean,
    customColorColor: string
) => {
    const { r, g, b } = (() => {
        let normalizedHex = color.slice(1);
        if (normalizedHex.length < 5)
            normalizedHex = normalizedHex.replace(/./gu, '$&$&');
        const colorDec = Number(`0x${normalizedHex}`);

        return {
            r: colorDec >> 16,
            g: (colorDec >> 8) & 255,
            b: colorDec & 255,
        };
    })();

    const isBrightColor = (() => {
        const hsp = Math.sqrt(
            0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
        );

        return hsp > (256 * 2) / 3;
    })();

    const hoverColor = isBrightColor
        ? { r: r - 25.6, g: g - 25.6, b: b - 25.6 }
        : { r: r + 25.6, g: g + 25.6, b: b + 25.6 };

    const labelSelector = `#chat_panel_body a.label[href="/profile/${window.user_id}"]`;

    LSSM.$stores.root.addStyles([
        {
            selectorText: labelSelector,
            style: {
                'background-color': `${color} !important`,
                'color': `${
                    customColor
                        ? customColorColor
                        : isBrightColor
                          ? '#333'
                          : '#fff'
                } !important`,
            },
        },
        {
            selectorText: `${labelSelector}:hover`,
            style: {
                'background-color': `rgb(${hoverColor.r}, ${hoverColor.g}, ${hoverColor.b}) !important`,
            },
        },
    ]);

    const colorizeOwn = () =>
        document
            .querySelectorAll<HTMLAnchorElement>(
                `#chat_panel_body a:not(.label)[href="/profile/${window.user_id}"]`
            )
            .forEach(link => link.classList.add('label'));

    LSSM.$stores.root.hook({
        event: 'allianceChat',
        callback() {
            colorizeOwn();
        },
    });
    colorizeOwn();
};
