export default (LSSM: Vue): void => {
    const form = document.querySelector<HTMLFormElement>(
        'form[action^="/buildings/alarm/"]'
    );
    if (!form) return;

    const floatWrapper = document.createElement('div');
    floatWrapper.classList.add('alert', 'alert-info');
    floatWrapper.id = LSSM.$store.getters.nodeAttribute(
        'ecw-sasc-floatalarm-wrapper',
        true
    );
    const floatBtn = document.createElement('input');
    floatBtn.classList.add('btn', 'btn-success');
    floatBtn.name = 'commit';
    floatBtn.type = 'submit';
    floatWrapper.append(floatBtn);
    form.append(floatWrapper);
    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `#${floatWrapper.id}`,
            style: {
                'position': 'fixed',
                'bottom': 0,
                'right': 0,
                'font-size': '15px',
            },
        })
        .then();

    const counters: HTMLSpanElement[] = [];
    form.querySelectorAll<HTMLInputElement>(
        'form input.btn.btn-success[type="submit"]'
    ).forEach(btn => {
        const counter = document.createElement('span');
        counter.classList.add('badge');
        counter.innerText = '0';
        if (!floatBtn.value) floatBtn.value = btn.value;
        btn.after(counter);
        counters.push(counter);
    });
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
    form.addEventListener('change', clickHandler);
    clickHandler();
};
