export default (LSSM: Vue) => {
    const eventInfo = document.querySelector<HTMLDivElement>('#eventInfo');
    if (!eventInfo) return;

    const whitespace = document.createElement('div');
    whitespace.id = LSSM.$stores.root.nodeAttribute(
        'ecl-fixed_event_info-whitespace'
    );
    whitespace.style.setProperty('height', getComputedStyle(eventInfo).height);
    eventInfo.after(whitespace);

    LSSM.$stores.root.addStyles([
        {
            selectorText: `#eventInfo`,
            style: {
                'position': 'absolute',
                'width': 'calc(100% - 2 * (15px + 1px) - 18px)',
                'z-index': 10,
            },
        },
        {
            selectorText: `body.bigMap #eventInfo`,
            style: {
                width: 'calc(100% - 2 * 5px)',
            },
        },
    ]);

    LSSM.$stores.root.hook({
        event: 'eventAnnounce',
        callback() {
            whitespace.style.setProperty(
                'height',
                getComputedStyle(eventInfo).height
            );
        },
    });
};
