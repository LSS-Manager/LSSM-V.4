import type { MessageTemplate } from '../main';
import moment from 'moment';

export default (
    templates: MessageTemplate[],
    dropdown: HTMLUListElement,
    replacements: {
        username?: string;
    },
    callback: (subject: string, content: string) => void
) => {
    const preselected = parseInt(
        new URL(window.location.toString()).searchParams.get('template') ?? '-1'
    );

    templates.forEach(({ name, subject, template }, index) => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');
        aEl.textContent = name;
        aEl.title = `${subject}\n---\n${template}`;
        aEl.addEventListener('click', () =>
            callback(
                subject,
                template
                    .replace(
                        /\{\{username\}\}/gu,
                        replacements.username ??
                            document
                                .querySelector<HTMLInputElement>(
                                    '#message_recipients'
                                )
                                ?.value?.trim() ??
                            '{{username}}'
                    )
                    .replace(
                        /\{\{today(?<offset>[+-]\d+)?\}\}/gu,
                        (_, offsetString) =>
                            moment()
                                .add(parseInt(offsetString ?? '0'), 'days')
                                .format('L')
                    )
            )
        );
        if (preselected === index) aEl.click();
        liEl.append(aEl);
        dropdown.append(liEl);
    });
};
