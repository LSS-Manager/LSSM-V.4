import type Vue from 'vue';

import { SortedMissionsRawButtonClasses } from '../../../extendedCallList/assets/sort/mission';

import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <
    Scope<
        Empty,
        [
            'sorted',
            'alliance',
            'arr',
            'vehicleList',
            'backalarm',
            'missionHelper',
            'emv',
        ],
        [
            'transport_request',
            'alert_next',
            'prev',
            'next',
            'alert_share_next',
            'share',
            'alert',
        ],
        true
    >
>{
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
        toggle() {
            if (this.responseCheckbox)
                this.responseCheckbox.checked = !this.responseCheckbox.checked;
        },
        focus() {
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
                const next = current?.nextElementSibling?.firstElementChild;
                (next as HTMLElement).click();
            }
        },
        previous() {
            const current = this.arrList?.querySelector('.active');
            //Check whether this is the first element
            if (current?.previousElementSibling != null) {
                const previous =
                    current?.previousElementSibling?.firstElementChild;
                (previous as HTMLElement).click();
            }
        },
    },
    vehicleList: <
        Scope<
            {
                vehicleList: HTMLUListElement | null;
                loadMissingBtn: HTMLAnchorElement | null;
            },
            [],
            ['next', 'previous', 'loadMissing', 'reset']
        >
    >{
        validatorFunction() {
            this.vehicleList =
                document.querySelector<HTMLUListElement>('#tabs');
            return !!this.vehicleList;
        },
        next() {
            const current = this.vehicleList?.querySelector('.active');
            //Check whether this is the last element
            if (current?.nextElementSibling != null) {
                const next = current?.nextElementSibling?.firstElementChild;
                (next as HTMLElement).click();
            }
        },
        previous() {
            const current = this.vehicleList?.querySelector('.active');
            //Check whether this is the first element
            if (current?.previousElementSibling !== null) {
                const previous =
                    current?.previousElementSibling?.firstElementChild;
                (previous as HTMLElement).click();
            }
        },
        loadMissing() {
            this.loadMissingBtn = document.querySelector<HTMLAnchorElement>(
                '.missing_vehicles_load'
            );
            //display:none => no vehicles missing
            if (this.loadMissingBtn?.style.display != 'none')
                this.loadMissingBtn?.click();
        },
        reset() {
            window.vehicleSelectionReset();
        },
    },
    backalarm: <
        Scope<Empty, [], ['allVehicles', 'onlyAmbulance', 'abortApproach']>
    >{
        validatorFunction: () => true,
        allVehicles() {
            document
                .querySelector<HTMLAnchorElement>("a[href$='backalarmAll']")
                ?.click();
        },
        onlyAmbulance() {
            document
                .querySelector<HTMLAnchorElement>(
                    "a[href$='backalarmRettungsdienst']"
                )
                ?.click();
        },
        abortApproach() {
            document
                .querySelector<HTMLAnchorElement>("a[href$='backalarmDriving']")
                ?.click();
        },
    },
    missionHelper: <Scope<Empty, [], ['toggleCollapse']>>{
        validatorFunction: () => true,
        toggleCollapse() {
            document
                .querySelector<SVGElement>(
                    `#${(window[PREFIX] as Vue).$stores.root.nodeAttribute(
                        'missionHelper-collapse-btn'
                    )}`
                )
                ?.dispatchEvent(new MouseEvent('click'));
        },
    },
    emv: <Scope<Empty, [], ['toggleCollapse']>>{
        validatorFunction: () => true,
        toggleCollapse() {
            document
                .querySelector<SVGElement>(
                    `#${(window[PREFIX] as Vue).$stores.root.nodeAttribute(
                        'emv-collapse-btn'
                    )}`
                )
                ?.dispatchEvent(new MouseEvent('click'));
        },
    },
    transport_request() {
        document
            .querySelector<HTMLAnchorElement>(
                '.alert.alert-danger:not(.alert-missing-vehicles) a.btn.btn-success[href^="/vehicles/"]'
            )
            ?.click();
    },
    alert_next() {
        document.querySelector<HTMLAnchorElement>('#alert_next_btn')?.click();
    },
    prev() {
        document
            .querySelector<HTMLAnchorElement>('#mission_previous_mission_btn')
            ?.click();
    },
    next() {
        document
            .querySelector<HTMLAnchorElement>('#mission_next_mission_btn')
            ?.click();
    },
    alert_share_next() {
        document
            .querySelector<HTMLAnchorElement>('.alert_next_alliance')
            ?.click();
    },
    share() {
        document
            .querySelector<HTMLAnchorElement>('#mission_alliance_share_btn')
            ?.click();
    },
    alert() {
        document.querySelector<HTMLInputElement>('#alert_btn')?.click();
    },
};
