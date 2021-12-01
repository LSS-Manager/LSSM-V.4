export default (): void => {
    const listenerTarget = document.getElementById('radio_messages_important');
    if (!listenerTarget) return;
    listenerTarget.addEventListener('click', event => {
        const clickedBtn = event.target as HTMLElement | null;

        if (
            clickedBtn &&
            clickedBtn.nextElementSibling?.hasAttribute('vehicle_id')
        ) {
            clickedBtn.classList.add('radio_message_close');
            clickedBtn.setAttribute(
                'vehicle_id',
                clickedBtn.nextElementSibling?.getAttribute('vehicle_id') ?? '0'
            );
        }
    });
};
