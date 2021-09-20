import { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['chat', 'map', 'missionlist'], [], true>>{
    chat: <Scope<{ chatInput: HTMLInputElement | null }, [], ['focus']>>{
        validatorFunction() {
            this.chatInput = document.querySelector<HTMLInputElement>(
                '#alliance_chat_message'
            );
            return !!this.chatInput;
        },
        focus() {
            this.chatInput?.focus();
        },
    },
    map: <Scope<Empty, ['search']>>{
        validatorFunction() {
            return !!document.getElementById('map');
        },
        search: <Scope<{ mapSearch: HTMLInputElement | null }, [], ['focus']>>{
            validatorFunction() {
                this.mapSearch = document.querySelector<HTMLInputElement>(
                    '#map_adress_search'
                );
                return !!this.mapSearch;
            },
            focus() {
                this.mapSearch?.focus();
            },
        },
    },
    missionlist: <Scope<Empty, ['search']>>{
        validatorFunction() {
            return !!document.getElementById('missions');
        },
        search: <
            Scope<{ missionlistSearch: HTMLInputElement | null }, [], ['focus']>
        >{
            validatorFunction() {
                this.missionlistSearch = document.querySelector<
                    HTMLInputElement
                >('#search_input_field_missions');
                return !!this.missionlistSearch;
            },
            focus() {
                this.missionlistSearch?.focus();
            },
        },
    },
};
