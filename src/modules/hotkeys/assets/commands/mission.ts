import type Vue from 'vue';

import { SortedMissionsRawButtonClasses } from '../../../extendedCallList/assets/sort/mission';

import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['sorted', 'alliance'], [], true>>{
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
    alliance: <Scope<Empty, ['focus', 'toggle']>>{
        validatorFunction() {
            return !!document.querySelector<HTMLDivElement>('#map');
        },
        focus: <
            Scope<{ responseInputbox: HTMLInputElement | null }, [], ['focus']>
        >{
            validatorFunction() {
                this.responseInputbox =
                    document.querySelector<HTMLInputElement>(
                        '#mission_reply_content'
                    );
                return !!this.responseInputbox;
            },
            focus() {
                this.responseInputbox?.focus();
            },
        },
        toggle: <
            Scope<{ responseCheckbox: HTMLInputElement | null }, [], ['focus']>
        >{
            validatorFunction() {
                this.responseCheckbox =
                    document.querySelector<HTMLInputElement>(
                        '#mission_reply_alliance_chat'
                    );
                return !!this.responseCheckbox;
            },
            focus() {
                if (this.responseCheckbox) {
                    this.responseCheckbox.checked =
                        !this.responseCheckbox.checked;
                }
            },
        },
    },
};
