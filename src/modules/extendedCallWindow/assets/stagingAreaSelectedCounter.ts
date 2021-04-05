export default (LSSM: Vue): void => {
    const counters: HTMLSpanElement[] = [];
    document
        .querySelectorAll('form input.btn.btn-success[type="submit"]')
        .forEach(btn => {
            const counter = document.createElement('span');
            counter.classList.add('badge');
            counter.innerText = '0';
            btn.after(counter);
            counters.push(counter);
        });
    const form = document.querySelector<HTMLFormElement>('form');
    if (!form) return;
    const clickHandler = () => {
        const amount = form
            .querySelectorAll<HTMLInputElement>(
                'input.vehicle_checkbox:checked'
            )
            .length.toLocaleString();
        counters.forEach(counter => (counter.innerText = amount));
    };
    LSSM.$store
        .dispatch('hook', {
            event: 'aaoClickHandler',
            callback: clickHandler,
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'vehicleGroupClickHandler',
            callback: clickHandler,
        })
        .then();
    form?.addEventListener('change', clickHandler);
};
