import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = (settingId: string) =>
        LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    if (window.location.pathname === '/') {
        let mission_chat_message_username = document.querySelectorAll(
            '.mission_chat_message_username'
        );
        if (mission_chat_message_username) {
            mission_chat_message_username.forEach(function (chatMessageHead) {
                let chatMessageSentAll = chatMessageHead
                    .getAttribute('title')
                    .split(',');
                let chatMessageSentMonth = chatMessageSentAll[1].substring(
                    5,
                    -5
                );
                let sentMonth;
                switch (chatMessageSentMonth) {
                    case 'Januar':
                        sentMonth = '01';
                        break;
                    case 'Februar':
                        sentMonth = '02';
                        break;
                    case 'März':
                        sentMonth = '03';
                        break;
                    case 'April':
                        sentMonth = '04';
                        break;
                    case 'Mai':
                        sentMonth = '05';
                        break;
                    case 'Juni':
                        sentMonth = '06';
                        break;
                    case 'Juli':
                        sentMonth = '07';
                        break;
                    case 'August':
                        sentMonth = '08';
                        break;
                    case 'September':
                        sentMonth = '09';
                        break;
                    case 'Oktober':
                        sentMonth = '10';
                        break;
                    case 'November':
                        sentMonth = '11';
                        break;
                    case 'Dezember':
                        sentMonth = '12';
                        break;
                    default:
                        break;
                }
                let chatMessageDate = chatMessageSentAll[1].substring(1, 3);
                let chatMessageTime = chatMessageSentAll[2].split(' ')[1];
                chatMessageHead.innerHTML =
                    '[' +
                    chatMessageDate +
                    '.' +
                    chatMessageSentMonth +
                    ' ' +
                    chatMessageTime +
                    ']';
            });
        }
    }
    await LSSM.$store.dispatch('hook', {
        event: 'allianceChat',
        callback({
            message,
            whisper,
            user_id,
            username,
            mission_id,
            mission_caption,
        }: AllianceChatMessage) {
            const date: Date = new Date();
            const date_hidden =
                '[' +
                date.getDate() +
                '.' +
                date.getMonth() +
                1 +
                ' ' +
                date.getHours() +
                ':' +
                date.getMinutes() +
                ']';
        },
    });
}) as ModuleMainFunction;
