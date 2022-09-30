import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['goto', 'changeSharing'], [], true>>{
    goto: <
        Scope<
            { navigationGroup: HTMLDivElement | null },
            [],
            [
                'nextBuilding',
                'dispatchCenter',
                'previousBuilding',
                'expand',
                'firstVehicle',
                'hire',
                'personal'
            ]
        >
    >{
        validatorFunction() {
            //Just in case. Should be in every building
            this.navigationGroup = document.querySelector<HTMLDivElement>(
                '#building-navigation-container'
            );
            return !!this.navigationGroup;
        },
        nextBuilding() {
            const next = this.navigationGroup?.firstElementChild;
            (next as HTMLElement).click();
        },
        dispatchCenter() {
            if (this.navigationGroup?.childElementCount != 3) return;

            const dispatch =
                this.navigationGroup?.firstElementChild?.nextElementSibling;
            if (dispatch instanceof HTMLAnchorElement)
                (dispatch as HTMLElement).click();
        },
        previousBuilding() {
            const previous = this.navigationGroup?.firstElementChild;
            (previous as HTMLElement).click();
        },
        expand() {
            const expand = document.querySelector("a[href$='expand']");
            //No result → Building without expansions
            if (expand == null) return;

            (expand as HTMLElement).click();
        },
        firstVehicle() {
            const firstVehicle = document.querySelector(
                "td a[href^='/vehicles']"
            );
            //No result → Building without vehicles
            if (firstVehicle == null) return;

            (firstVehicle as HTMLElement).click();
        },
        hire() {
            const hire = document.querySelector("a[href$='/hire']");
            //No result → Building without personal
            if (hire == null) return;

            (hire as HTMLElement).click();
        },
        personal() {
            const personal = document.querySelector("a[href$='/personals']");
            //No result → Building without personal
            if (personal == null) return;

            (personal as HTMLElement).click();
        },
    },
    changeSharing: <
        Scope<Empty, [], ['enableSharing', 'disableSharing', 'toggleSharing']>
    >{
        validatorFunction: () => true,
        enableSharing() {
            const extensionBtn = document.querySelector("a[href$='/alliance']");
            //No result → Building without enable able extension or extensionen already enabled
            if (
                extensionBtn == null ||
                document.querySelectorAll("a[href*='alliance_costs']").length !=
                    0
            )
                return;

            (extensionBtn as HTMLElement).click();
        },
        disableSharing() {
            const extensionBtn = document.querySelector("a[href$='/alliance']");
            //No result → Building without enable able extension or extensionen already disabled
            if (
                extensionBtn == null ||
                document.querySelectorAll("a[href*='alliance_costs']").length ==
                    0
            )
                return;

            (extensionBtn as HTMLElement).click();
        },
        toggleSharing() {
            const extensionBtn = document.querySelector("a[href$='/alliance']");
            //No result → Building without enable able extension
            if (extensionBtn == null) return;

            (extensionBtn as HTMLElement).click();
        },
    },
};
