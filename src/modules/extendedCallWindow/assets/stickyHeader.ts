export default (): void => {
    const head = document.querySelector(
        '.mission_header_info'
    ) as HTMLDivElement | null;
    if (!head) return;
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
};
