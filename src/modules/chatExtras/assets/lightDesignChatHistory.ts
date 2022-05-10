export default (redesignActive: boolean, modalName: string) => {
    let startPhrase = redesignActive ? `#modals-container [data-modal="${modalName}"] + .vm--modal .redesign-wrapper ` : '';
    document.querySelectorAll<HTMLSpanElement>(`${startPhrase}div.well span.pull-right`).forEach((el: HTMLSpanElement) => {
        el.classList.remove('pull-right');
        el.textContent = '[' + el.textContent + ']';
    });
    document.querySelectorAll<HTMLDivElement>(`${startPhrase}div.well`).forEach((el: HTMLDivElement) => {
        el.classList.remove('well');
        el.classList.add('chat-element-container');
    });
    document.querySelectorAll<HTMLParagraphElement>(`${startPhrase}p.chat-element-container`).forEach((el: HTMLParagraphElement) => {
        if(!el.classList.contains('label')) {
            el.parentElement.querySelector('span').append(': ' + el.textContent);
            el.classList.remove('chat-element-container');
            el.remove();
        };
    });
}
