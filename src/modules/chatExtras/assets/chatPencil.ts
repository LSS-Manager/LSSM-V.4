export default (LSSM: Vue, format: string): void => {

    document
        .querySelectorAll<HTMLSpanElement>('.mission_chat_message_username')
        .forEach(chatMessageLabel => {
            chatMessageLabel.setAttribute(
                'innerHTML', '<span class="fa fa-pencil"></span>'
            );
};
