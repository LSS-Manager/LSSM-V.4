import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['goto'], [], true>>{
    goto: <
        Scope<
            { navigationGroup: HTMLDivElement | null },
            [],
            ['nextBuilding', 'dispatchCenter', 'previousBuilding']
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
            if (this.navigationGroup?.childElementCount != 3) {
                return;
            }
            const dispatch =
                this.navigationGroup?.firstElementChild?.nextElementSibling;
            if (dispatch instanceof HTMLAnchorElement) {
                (dispatch as HTMLElement).click();
            }
        },
        previousBuilding() {
            const previous = this.navigationGroup?.firstElementChild;
            (previous as HTMLElement).click();
        },
    },
};
