export default (): void => {
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
    form?.addEventListener('change', () => {
        const amount = form
            .querySelectorAll<HTMLInputElement>(
                'input.vehicle_checkbox:checked'
            )
            .length.toLocaleString();
        counters.forEach(counter => (counter.innerText = amount));
    });
};
