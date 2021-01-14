export default (): void => {
    /* const observer = new MutationObserver(handleObserved);
    const observertarget = document.getElementById('radio_messages_important');
    const observerOptions = {
        childList: true,
    }; */
    const ListenerTarget = document.getElementById('radio_messages_important');
    if (ListenerTarget == null || window.location.pathname != '/') {
        return;
    }
    ListenerTarget.addEventListener('click', handleListen);
    /* function handleObserved() {
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
    } */
    function handleListen(event: { target: any; }) {
        const clickedBtn = event.target;

        if (clickedBtn.nextElementSibling.hasAttribute('vehicle_id')) {
            clickedBtn.classList.add('radio_message_close');
            clickedBtn.setAttribute(
                'vehicle_id',
                clickedBtn.nextElementSibling.getAttribute('vehicle_id')
            );
        }
    }
};
