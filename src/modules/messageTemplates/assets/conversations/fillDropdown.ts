import modifyMessage from './modifyMessage';

import type { ConversationMessageTemplate } from '../../main';

export default (
    templates: ConversationMessageTemplate[],
    dropdown: HTMLUListElement,
    replacements: {
        username?: string;
    },
    callback: (subject: string, content: string) => void,
    preselected = -1
) => {
    templates.forEach(({ name, subject, template }, index) => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');
        aEl.textContent = name;
        aEl.title = `${subject}\n---\n${template}`;
        aEl.addEventListener('click', () =>
            callback(subject, modifyMessage(template, replacements))
        );
        if (preselected === index) aEl.click();
        liEl.append(aEl);
        dropdown.append(liEl);
    });
};
