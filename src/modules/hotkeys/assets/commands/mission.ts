import { SortedMissionsRawButtonClasses } from '../../../extendedCallList/assets/sort/mission';

import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['sorted'], [], true>>{
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
            this.toggleId = this.LSSM.$store.getters.nodeAttribute(
                `${this.moduleId}_sort_toggle-mission-buttons-mode`,
                true
            );
            this.nodeAttr = attr =>
                this.LSSM.$store.getters.nodeAttribute(
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
};
