import fillDropdown from './fillDropdown';

import type { $m } from 'typings/Module';
import type { ConversationMessageTemplate } from '../../main';

export default (messages: ConversationMessageTemplate[], $m: $m) => {
    const preselected = parseInt(
        new URL(window.location.toString()).searchParams.get('template') ?? '-1'
    );

    const group = document.createElement('div');
    group.classList.add('btn-group', 'pull-right');
    const insert = document.createElement('button');
    insert.classList.add('btn', 'btn-default', 'dropdown-toggle');
    insert.setAttribute('data-toggle', 'dropdown');
    insert.innerHTML = `${$m('name')}&nbsp;<span class="caret"></span>`;
    const optionList = document.createElement('ul');
    optionList.classList.add('dropdown-menu');
    fillDropdown(
        messages,
        optionList,
        {},
        (subject, body) => {
            const titleEl =
                document.querySelector<HTMLInputElement>('#message_subject');
            if (titleEl) titleEl.value = subject;
            const bodyEl =
                document.querySelector<HTMLTextAreaElement>('#message_body');
            if (bodyEl) bodyEl.value = body;
        },
        preselected
    );

    group.append(insert, optionList);
    document.querySelector('.page-header')?.append(group);
};
