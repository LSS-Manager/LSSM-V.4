export default (redesignActive: boolean) => {
    document.querySelectorAll(`${redesignActive ? '#modals-container ' : ''} .well`).forEach((el) => {
        el.classList.remove('well');
    });
    document.querySelectorAll(`${redesignActive ? '#modals-container ' : ''} .pull-right`).forEach((el) => {
        el.classList.remove('pull-right');
        el.textContent = '[' + el.textContent + ']';
    });
    document.querySelectorAll(`${redesignActive ? '#modals-container ' : ''} p`).forEach((el) => {
        el.parentElement.querySelector('span').append(': ' + el.textContent);
        el.remove();
    });
};
