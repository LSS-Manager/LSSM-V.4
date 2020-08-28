export default (sticky: boolean, load: boolean): void => {
    const head = document.querySelector(
        '.mission_header_info'
    ) as HTMLDivElement | null;
    if (!head) return;
    if (sticky) {
        const clearfix = document.createElement('div');
        clearfix.classList.add('hidden');
        clearfix.style.width = '100%';
        head.after(clearfix);
        head.style.zIndex = '2';
        document.addEventListener('scroll', () => {
            const height = head.getBoundingClientRect().height;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollTop <= 0) {
                head.style.position = 'static';
                head.style.width = 'unset';
                clearfix.classList.add('hidden');
            } else if (scrollTop < height) {
                head.style.position = 'fixed';
                head.style.width = '100%';
                clearfix.classList.remove('hidden');
                clearfix.style.height = `${height}px`;
            } else {
                clearfix.classList.add('hidden');
            }
        });
    }
    const loadBtn = document.querySelector(
        '.missing_vehicles_load'
    ) as HTMLAnchorElement | null;
    if (load && loadBtn) {
        const people_amount = document.getElementById('amount_of_people');
        if (!people_amount || !people_amount.parentElement) return;
        people_amount.parentElement.classList.add('col-md-7');
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
