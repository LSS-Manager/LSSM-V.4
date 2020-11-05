import moment from 'moment';
import { AllianceChatMessage } from 'typings/Ingame';
import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const format = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'format',
    });
    moment.locale(BUILD_LANG);
    document
        .querySelectorAll<HTMLSpanElement>('.mission_chat_message_username')
        .forEach(function(msg_user_span) {
            const rawDate = msg_user_span.parentElement?.getAttribute(
                'data-message-time'
            );
            const timeStampModified = moment(rawDate).format(format);
            if (msg_user_span.firstChild) {
                msg_user_span.firstChild.textContent = `[${timeStampModified}]`;
            }
        });
    await LSSM.$store.dispatch('premodifyParams', {
        event: 'allianceChat',
        callback(e: AllianceChatMessage) {
            e.date = moment(e.iso_timestamp).format(format);
        },
    });
}) as ModuleMainFunction;
