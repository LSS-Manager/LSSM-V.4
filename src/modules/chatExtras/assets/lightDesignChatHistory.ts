export default (redesignActive: boolean, modalName: string) => {
    let startPhrase = redesignActive ? `#modals-container [data-modal="${modalName}"] + .vm--modal .redesign-wrapper ` : '';
    document.querySelectorAll<HTMLSpanElement>(`${startPhrase}div.well span.pull-right`).forEach((el: HTMLSpanElement) => {
        el.classList.remove('pull-right');
        el.textContent = '[' + el.textContent + ']';
        el.parentElement?.querySelector('strong')?.before(el)
    });
    document.querySelectorAll<HTMLDivElement>(`${startPhrase}div.well`).forEach((el: HTMLDivElement) => {
        el.classList.remove('well');
        el.classList.add('chat-element-container');
    });
    document.querySelectorAll<HTMLParagraphElement>(`${startPhrase}div.chat-element-container p`).forEach((el: HTMLParagraphElement) => {
        el.parentElement?.querySelector('strong')?.after(el);
        el.style.display = 'inline';
        el.classList.remove('chat-element-container');
    });
}
