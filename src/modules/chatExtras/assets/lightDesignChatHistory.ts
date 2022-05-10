export default (redesignActive: boolean, modalName: string) => {
    let startPhrase = `#modals-container [data-modal="${modalName}"] + .vm--modal .redesign-wrapper `
    document.querySelectorAll(`${redesignActive ? startPhrase : ''}.well`).forEach((el) => {
        el.classList.remove('well');
    });
    document.querySelectorAll(`${redesignActive ? startPhrase : ''}.pull-right`).forEach((el) => {
        el.classList.remove('pull-right');
        el.textContent = '[' + el.textContent + ']';
    });
    document.querySelectorAll(`${redesignActive ? startPhrase : ''}p`).forEach((el) => {
        if(!el.classList.contains('label')) {
            el.parentElement.querySelector('span').append(': ' + el.textContent);
            el.remove();
        };
    });
};
