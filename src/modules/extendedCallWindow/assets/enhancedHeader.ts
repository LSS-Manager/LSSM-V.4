export default (LSSM: Vue, sticky: boolean, load: boolean): void => {
    const head = document.querySelector<HTMLDivElement>('.mission_header_info');
    if (!head) return;
    if (sticky) {
        const clearfix = document.createElement('div');
        clearfix.style.width = '100%';
        clearfix.id = LSSM.$stores.root.nodeAttribute(
            'ecw-sticky_header-heightdiv',
            true
        );
        clearfix.style.setProperty('margin-bottom', '15px');
        head.after(clearfix);
        head.style.zIndex = '3';
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
        window.addEventListener('scroll', () => {
            head.style.top = scrollY !== 0 ? '0px' : '';
        });
    }
    const loadBtn = document.querySelector(
        '.missing_vehicles_load'
    ) as HTMLAnchorElement | null;
    if (load && loadBtn) {
        const people_amount = document.getElementById('amount_of_people');
        if (people_amount && people_amount.parentElement) {
            people_amount.parentElement.classList.add(
                `col-md-${
                    head.querySelector('.pull-right [id^="mission_countdown_"]')
                        ? 5
                        : 7
                }`
            );
        }
        const wrapper = document.createElement('div');
        wrapper.classList.add('row');
        const btnWrapper = document.createElement('div');
        if (people_amount && people_amount.parentElement)
            btnWrapper.classList.add('col-md-5');
        const clonedBtn = loadBtn.cloneNode(true) as HTMLAnchorElement;
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        clonedBtn.onclick = e => {
            e.preventDefault();
            loadBtn.click();
        };
        btnWrapper.append(clonedBtn);
        if (people_amount && people_amount.parentElement) {
            people_amount.parentElement.before(wrapper);
            wrapper.append(people_amount.parentElement);
        } else {
            document
                .querySelector('#mission_progress_info small')
                ?.before(wrapper);
        }
        wrapper.append(btnWrapper);
    }
};
