export default (LSSM: Vue, whisper: boolean, mention: boolean) => {
    const chatInput = document.querySelector<HTMLInputElement>(
        '#alliance_chat_message'
    );

    const inputGroup = chatInput?.closest<HTMLDivElement>('.input-group');
    const form = inputGroup?.closest<HTMLFormElement>('form');

    if (!chatInput || !inputGroup || !form) return;

    const lockIcon = document.createElement('i');
    lockIcon.classList.add('fa-solid', 'form-control-feedback', 'fa-fw');
    lockIcon.style.setProperty('display', 'none');
    lockIcon.style.setProperty('color', 'gray');
    lockIcon.style.setProperty('font-size', '10px');
    lockIcon.style.setProperty('padding-left', '10px');
    lockIcon.style.setProperty('padding-right', '10px');
    lockIcon.style.setProperty('z-index', '3');

    const atIcon = lockIcon.cloneNode(true) as HTMLElement;

    lockIcon.classList.add('fa-lock');
    atIcon.classList.add('fa-at');

    inputGroup.after(lockIcon, atIcon);

    const updateIcons = () => {
        form.classList.remove('is-whispering', 'is-mentioning');

        if (whisper && chatInput.value.startsWith('/w '))
            form.classList.add('is-whispering');
        else if (mention && chatInput.value.match(/@[^ ]+/u))
            form.classList.add('is-mentioning');
        else return form.classList.remove('has-feedback');

        form.classList.add('has-feedback');
    };

    chatInput.addEventListener('input', updateIcons);
    chatInput.addEventListener('focus', updateIcons);
    form.addEventListener('submit', updateIcons);

    LSSM.$stores.root.addStyles([
        {
            selectorText: '#new_alliance_chat.has-feedback input',
            style: {
                'padding-right': '32.5px',
            },
        },
        {
            selectorText:
                '#new_alliance_chat.is-whispering svg[data-icon="lock"]',
            style: {
                display: 'block !important',
            },
        },
        {
            selectorText:
                '#new_alliance_chat.is-mentioning svg[data-icon="at"]',
            style: {
                display: 'block  !important',
            },
        },
    ]);
};
