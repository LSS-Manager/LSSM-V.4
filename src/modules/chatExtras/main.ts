import moment from 'moment';
import { AllianceChatMessage } from 'typings/Ingame';
import { $m, ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const format = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'predefined_style',
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
            messageHeader.innerText = '[' + timeStampModified + ']';
            chatMessageHead = messageHeader as HTMLElement;
        });
    }
    await LSSM.$store.dispatch('premodifyParams', {
        event: 'allianceChat',
        callback({}: AllianceChatMessage) {
            moment.locale(BUILD_LANG);
            e.date_hidden = moment(n).format(format);
        },
    });
}) as ModuleMainFunction;
