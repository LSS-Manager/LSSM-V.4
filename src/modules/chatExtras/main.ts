import moment from 'moment';
import { AllianceChatMessage } from 'typings/Ingame';
import { $m, ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const format = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'format',
    });
    let mission_chat_message_username = document.querySelectorAll(
        '.mission_chat_message_username'
    );
    if (mission_chat_message_username) {
        mission_chat_message_username.forEach(function (chatMessageHead) {
            const messageHeader = chatMessageHead as HTMLElement;
            let rawDate = messageHeader.parentElement?.getAttribute(
                'data-message-time'
            );
            moment.locale(BUILD_LANG);
            const timeStampModified = moment(rawDate).format(format);
            if (messageHeader.firstChild != null) {
                messageHeader.firstChild.textContent =
                    '[' + timeStampModified + ']';
                chatMessageHead = messageHeader as HTMLElement;
            }
        });
    }
    await LSSM.$store.dispatch('premodifyParams', {
        event: 'allianceChat',
        callback(e: AllianceChatMessage) {
            moment.locale(BUILD_LANG);
            e.date = moment(e.iso_timestamp).format(format);
        },
    });
}) as ModuleMainFunction;
