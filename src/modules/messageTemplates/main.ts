import moment from 'moment';

import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID, $m) => {
    moment.locale(LSSM.$store.state.lang);

    window.moment = moment;

    const messages: { name: string; subject: string; template: string }[] = (
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'templates',
        })
    ).value;

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
    messages.forEach(({ name, subject, template }, index) => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');
        aEl.textContent = name;
        aEl.title = `${subject}\n---\n${template}`;
        aEl.onclick = () => {
            const titleEl = document.querySelector<HTMLInputElement>(
                '#message_subject'
            );
            if (titleEl) titleEl.value = subject;
            const bodyEl = document.querySelector<HTMLTextAreaElement>(
                '#message_body'
            );
            if (bodyEl) {
                bodyEl.value = template
                    .replace(
                        /{{username}}/g,
                        document
                            .querySelector<HTMLInputElement>(
                                '#message_recipients'
                            )
                            ?.value?.trim() ?? '{{username}}'
                    )
                    .replace(
                        /{{today(?<offset>[+-]\d+)?}}/g,
                        (_, offsetString) =>
                            moment()
                                .add(parseInt(offsetString ?? '0'), 'days')
                                .format('L')
                    );
            }
        };
        if (preselected === index) aEl.click();
        liEl.append(aEl);
        optionList.append(liEl);
    });
    group.append(insert, optionList);
    document.querySelector('.page-header')?.append(group);
});
