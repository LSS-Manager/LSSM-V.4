import moment from 'moment';

import fillDropdown from './assets/fillDropdown';

import type { ModuleMainFunction } from 'typings/Module';

export interface MessageTemplate {
    name: string;
    subject: string;
    template: string;
}

export default <ModuleMainFunction>(async ({ LSSM, $m, getSetting }) => {
    moment.locale(LSSM.$store.state.lang);

    const messages = (
        await getSetting<{
            value: MessageTemplate[];
            enabled: boolean;
        }>('templates')
    ).value;

    const group = document.createElement('div');
    group.classList.add('btn-group', 'pull-right');
    const insert = document.createElement('button');
    insert.classList.add('btn', 'btn-default', 'dropdown-toggle');
    insert.setAttribute('data-toggle', 'dropdown');
    insert.innerHTML = `${$m('name')}&nbsp;<span class="caret"></span>`;
    const optionList = document.createElement('ul');
    optionList.classList.add('dropdown-menu');
    fillDropdown(messages, optionList, {}, (subject, body) => {
        const titleEl =
            document.querySelector<HTMLInputElement>('#message_subject');
        if (titleEl) titleEl.value = subject;
        const bodyEl =
            document.querySelector<HTMLTextAreaElement>('#message_body');
        if (bodyEl) bodyEl.value = body;
    });

    group.append(insert, optionList);
    document.querySelector('.page-header')?.append(group);
});
