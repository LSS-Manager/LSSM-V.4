import type Vue from 'vue';

import { SortedMissionsRawButtonClasses } from '../../../extendedCallList/assets/sort/mission';

import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['sorted', 'alliance', 'arr'], [], true>>{
    sorted: <
        Scope<
            {
                LSSM: Vue;
                moduleId: 'extendedCallList';
                toggleId: string;
                nodeAttr(attr: string): string;
            },
            [],
            ['alert_next', 'prev', 'next', 'alert_share_next']
        >
    >{
        validatorFunction() {
            this.LSSM = window[PREFIX] as Vue;
            this.moduleId = 'extendedCallList';
            this.toggleId = this.LSSM.$stores.root.nodeAttribute(
                `${this.moduleId}_sort_toggle-mission-buttons-mode`,
                true
            );
            this.nodeAttr = attr =>
                this.LSSM.$stores.root.nodeAttribute(
                    `${this.moduleId}_sort-missions_${attr}`
                );
            return true;
        },
        alert_next() {
            if (
                document.querySelector<HTMLInputElement>(`#${this.toggleId}`)
                    ?.checked
            ) {
                document
                    .querySelector<HTMLAnchorElement>(
                        `.${this.nodeAttr(
                            SortedMissionsRawButtonClasses['alert_next']
                        )}`
                    )
                    ?.click();
            }
        },
        prev() {
            if (
                document.querySelector<HTMLInputElement>(`#${this.toggleId}`)
                    ?.checked
            ) {
                document
                    .querySelector<HTMLAnchorElement>(
                        `.${this.nodeAttr(
                            SortedMissionsRawButtonClasses['prev']
                        )}`
                    )
                    ?.click();
            }
        },
        next() {
            if (
                document.querySelector<HTMLInputElement>(`#${this.toggleId}`)
                    ?.checked
            ) {
                document
                    .querySelector<HTMLAnchorElement>(
                        `.${this.nodeAttr(
                            SortedMissionsRawButtonClasses['next']
                        )}`
                    )
                    ?.click();
            }
        },
        alert_share_next() {
            if (
                document.querySelector<HTMLInputElement>(`#${this.toggleId}`)
                    ?.checked
            ) {
                document
                    .querySelector<HTMLAnchorElement>(
                        `.${this.nodeAttr(
                            SortedMissionsRawButtonClasses['alert_share_next']
                        )}`
                    )
                    ?.click();
            }
        },
    },
    alliance: <
        Scope<
            {
                responseInputbox: HTMLInputElement | null;
                responseCheckbox: HTMLInputElement | null;
            },
            [],
            ['focus', 'toggle']
        >
    >{
        validatorFunction() {
            this.responseInputbox = document.querySelector<HTMLInputElement>(
                '#mission_reply_content'
            );
            this.responseCheckbox = document.querySelector<HTMLInputElement>(
                '#mission_reply_alliance_chat'
            );
            return !!this.responseInputbox && !!this.responseCheckbox;
        },
        focus() {
            if (this.responseCheckbox)
                this.responseCheckbox.checked = !this.responseCheckbox.checked;
        },
        toggle() {
            this.responseInputbox?.focus();
        },
    },
    arr: <
        Scope<{ arrList: HTMLUListElement | null }, [], ['next', 'previous']>
    >{
        validatorFunction() {
            this.arrList =
                document.querySelector<HTMLUListElement>('#aao-tabs');
            return !!this.arrList;
        },
        next() {
            const current = this.arrList?.querySelector('.active');
            //Check whether this is the last element
            if (current?.nextElementSibling != null) {
                const next = current?.nextElementSibling?.firstChild;
                (next as HTMLElement).click();
            }
        },
        previous() {
            const current = this.arrList?.querySelector('.active');
            //Check whether this is the last element
            if (current?.previousElementSibling != null) {
                const previous = current?.previousElementSibling?.firstChild;
                (previous as HTMLElement).click();
            }
        },
    },
};
