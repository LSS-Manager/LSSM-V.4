import { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['chat'], [], true>>{
    chat: <Scope<{ chatInput: HTMLInputElement }, [], ['focus']>>{
        validatorFunction() {
            const chatInput = document.querySelector<HTMLInputElement>(
                '#alliance_chat_message'
            );
            if (chatInput) this.chatInput = chatInput;
            return !!chatInput;
        },
        focus() {
            this.chatInput.focus();
        },
    },
};
