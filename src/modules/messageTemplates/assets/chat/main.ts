import type { ChatMessageTemplate } from '../../main';

export default (messages: ChatMessageTemplate[]) => {
    const inputElement = document.querySelector<HTMLInputElement>(
        '#alliance_chat_message'
    );

    if (!inputElement) return;

    const btnSpan = document.createElement('div');
    btnSpan.classList.add('input-group-btn');

    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('btn', 'dropdown-toggle', 'btn-default');
    dropdownBtn.dataset.toggle = 'dropdown';
    const icon = document.createElement('i');
    icon.classList.add('fa-comment-dots', 'fas');
    icon.style.setProperty('margin-right', '4px');
    const caret = document.createElement('span');
    caret.classList.add('caret');
    dropdownBtn.append(icon, caret);
    const dropdown = document.createElement('ul');
    dropdown.classList.add('dropdown-menu', 'pull-right');

    messages.forEach(({ name, text }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.textContent = name;

        li.title = text;
        li.dataset.message = text;

        li.append(a);
        dropdown.append(li);
    });

    dropdown.addEventListener('click', e => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        inputElement.value =
            target.closest<HTMLLIElement>('li')?.dataset.message ?? '';
        inputElement.focus();
    });

    btnSpan.append(dropdownBtn, dropdown);

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.setProperty('display', 'none');

    inputElement.after(btnSpan, submit);

    inputElement.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        submit.click();
    });
};
