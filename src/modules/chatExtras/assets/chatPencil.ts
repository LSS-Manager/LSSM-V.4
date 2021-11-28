export default (LSSM: Vue): void => {

    document
        .querySelectorAll<HTMLSpanElement>('.mission_chat_message_username')
        .forEach(chatMessageLabel => {
            chatMessageLabel.setAttribute(
                'innerHTML', '<span class="fa fa-pencil-alt"></span>'
            );
};
