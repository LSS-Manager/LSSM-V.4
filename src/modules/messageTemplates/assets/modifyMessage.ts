import moment from 'moment';

export default (
    message: string,
    replacements: Partial<{ username: string }>
): string => {
    moment.locale((window[PREFIX] as Vue).$store.state.lang);
    return message
        .replace(
            /\{\{username\}\}/gu,
            replacements.username ??
                document
                    .querySelector<HTMLInputElement>('#message_recipients')
                    ?.value?.trim() ??
                '{{username}}'
        )
        .replace(/\{\{today(?<offset>[+-]\d+)?\}\}/gu, (_, offsetString) =>
            moment()
                .add(parseInt(offsetString ?? '0'), 'days')
                .format('L')
        );
};
