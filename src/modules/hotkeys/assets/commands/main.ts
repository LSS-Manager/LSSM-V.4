import type { Empty, Scope } from 'typings/modules/Hotkeys';

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
            return !!document.querySelector<HTMLDivElement>('#map');
        },
        search: <Scope<{ mapSearch: HTMLInputElement | null }, [], ['focus']>>{
            validatorFunction() {
                this.mapSearch =
                    document.querySelector<HTMLInputElement>(
                        '#map_adress_search'
                    );
                return !!this.mapSearch;
            },
            focus() {
                this.mapSearch?.focus();
            },
        },
    },
    missionlist: <Scope<Empty, ['search', 'eclSort']>>{
        validatorFunction() {
            return !!document.querySelector<HTMLDivElement>('#missions');
        },
        search: <
            Scope<{ missionlistSearch: HTMLInputElement | null }, [], ['focus']>
        >{
            validatorFunction() {
                this.missionlistSearch =
                    document.querySelector<HTMLInputElement>(
                        '#search_input_field_missions'
                    );
                return !!this.missionlistSearch;
            },
            focus() {
                this.missionlistSearch?.focus();
            },
        },
        eclSort: <
            Scope<{ eclSortBtn: HTMLButtonElement | null }, [], ['click']>
        >{
            validatorFunction() {
                this.eclSortBtn = document.querySelector<HTMLButtonElement>(
                    '#lssmv4-extendedCallList_missionlist-sorting_selection-list-btn'
                );
                return !!this.eclSortBtn;
            },
            click() {
                this.eclSortBtn?.click();
            },
        },
    },
    lssm: <Scope<Empty, ['menu']>>{
        validatorFunction() {
            return !!window[PREFIX];
        },
        menu: <
            Scope<
                {
                    lssmMenuTrigger: HTMLAnchorElement | null;
                    lssmMenuIsOpened(): boolean;
                },
                [],
                ['toggle']
            >
        >{
            validatorFunction() {
                this.lssmMenuTrigger =
                    document.querySelector<HTMLAnchorElement>(
                        '#lssmv4-indicator_menu'
                    );

                this.lssmMenuIsOpened = () =>
                    this.lssmMenuTrigger?.getAttribute('aria-expanded') ===
                    'true';

                return !!this.lssmMenuTrigger;
            },
            toggle() {
                if (this.lssmMenuTrigger) {
                    this.lssmMenuTrigger.click();
                    if (this.lssmMenuIsOpened()) {
                        this.lssmMenuTrigger.nextElementSibling
                            ?.querySelector('a')
                            ?.focus();
                    }
                }
            },
        },
    },
};
