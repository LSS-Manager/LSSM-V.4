import { AllianceChatMessage } from 'typings/Ingame';
import moment from 'moment';

export default (LSSM: Vue, format: string): void => {
    moment.locale(LSSM.$store.state.lang);

    document
        .querySelectorAll<HTMLSpanElement>('.mission_chat_message_username')
        .forEach(msg_user_span => {
            const rawDate = msg_user_span.parentElement?.getAttribute(
                'data-message-time'
            );
            const timeStampModified = moment(rawDate).format(format);
            if (msg_user_span.firstChild)
                msg_user_span.firstChild.textContent = `[${timeStampModified}] `;
        });
    LSSM.$store.dispatch('premodifyParams', {
        event: 'allianceChat',
        callback(e: AllianceChatMessage) {
            e.date = moment(e.iso_timestamp).format(format);
        },
    });
};
