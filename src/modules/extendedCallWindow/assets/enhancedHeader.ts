export default (sticky: boolean, load: boolean): void => {
    const head = document.querySelector(
        '.mission_header_info'
    ) as HTMLDivElement | null;
    if (!head) return;
    if (sticky) {
        const clearfix = document.createElement('div');
        clearfix.style.width = '100%';
        head.after(clearfix);
        head.style.zIndex = '2';
        head.style.position = 'fixed';
        head.style.width = '100%';
        head.style.top = scrollY !== 0 ? '0px' : '';
        clearfix.style.height = `${head.getBoundingClientRect().height}px`;
        head.addEventListener(
            'resize',
            () =>
                (clearfix.style.height = `${
                    head.getBoundingClientRect().height
                }px`)
        );
        window.addEventListener('scroll', function () {
            head.style.top = scrollY !== 0 ? '0px' : '';
        });
    }
    const loadBtn = document.querySelector(
        '.missing_vehicles_load'
    ) as HTMLAnchorElement | null;
    if (load && loadBtn) {
        const people_amount = document.getElementById('amount_of_people');
        if (!people_amount || !people_amount.parentElement) return;
        people_amount.parentElement.classList.add(
            `col-md-${
                head.querySelector('.pull-right [id^="mission_countdown_"]')
                    ? 5
                    : 7
            }`
        );
        const wrapper = document.createElement('div');
        wrapper.classList.add('row');
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('col-md-5');
        const clonedBtn = loadBtn.cloneNode(true) as HTMLAnchorElement;
        clonedBtn.onclick = e => {
            e.preventDefault();
            loadBtn.click();
        };
        btnWrapper.append(clonedBtn);
        people_amount.parentElement.before(wrapper);
        wrapper.append(people_amount.parentElement);
        wrapper.append(btnWrapper);
    }
};
