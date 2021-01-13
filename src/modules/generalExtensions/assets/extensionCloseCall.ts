export default (LSSM: Vue): void => {
    const observer = new MutationObserver(handleObserved);
    const observertarget = document.getElementById('radio_messages_important');
    const observerOptions = {
        childList: true,
    };

    function handleObserved() {
        /* $('.radio_message_close').each(function () {
            $(this)
                .prev()
                .addClass('radio_message_close')
                .attr('vehicle_id', $(this).attr('vehicle_id'));
        }); */
        const msgClose = document.getElementsByClassName('radio_message_close');
        for (let i = 0; i < msgClose.length; i++) {
            let vid = msgClose[i].getAttribute('vehicle_id');
            let prev = msgClose[i].previousElementSibling;
            if (prev === null || vid === null) {
                return;
            }
            prev.classList.add('radio_message_close');
            prev.setAttribute('vehicle_id', vid);
        }
    }
    if (window.location.pathname == '/' && observertarget != null) {
        observer.observe(observertarget, observerOptions);
    }
};
