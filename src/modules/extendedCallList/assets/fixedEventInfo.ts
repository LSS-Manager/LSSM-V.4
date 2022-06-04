export default (LSSM: Vue) => {
    const eventInfo = document.querySelector<HTMLDivElement>('#eventInfo');
    if (!eventInfo) return;

    const whitespace = document.createElement('div');
    whitespace.id = LSSM.$store.getters.nodeAttribute(
        'ecl-fixed_event_info-whitespace'
    );
    whitespace.style.setProperty('height', getComputedStyle(eventInfo).height);
    eventInfo.after(whitespace);

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `#eventInfo`,
            style: {
                'position': 'absolute',
                'width': 'calc(100% - 2 * (15px + 1px) - 18px)',
                'z-index': 10,
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'eventAnnounce',
            callback() {
                whitespace.style.setProperty(
                    'height',
                    getComputedStyle(eventInfo).height
                );
            },
        })
        .then();
};
