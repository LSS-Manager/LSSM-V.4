export default (): void => {
    const listenerTarget = document.getElementById('radio_messages_important');
    if (listenerTarget == null) {
        return;
    }
    listenerTarget.addEventListener('click', handleListen);
    function handleListen(event: { target: any }) {
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
