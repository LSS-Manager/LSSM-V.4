import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['goto', 'alarm', 'other'], [], true>>{
    goto: <
        Scope<
            Empty,
            [],
            [
                'nextVehicle',
                'building',
                'previousVehicle',
                'edit',
                'personalAssigment',
                'statistics'
            ]
        >
    >{
        validatorFunction: () => true,
        nextVehicle() {
            //Support for Redesign
            const btnGroups = document.querySelectorAll('.btn-group');
            for (const btnGroup of btnGroups) {
                if (
                    btnGroup.childElementCount == 2 &&
                    btnGroup.firstElementChild?.querySelector(
                        "[href^='/buildings/']"
                    ) != null &&
                    btnGroup.lastElementChild?.querySelector(
                        "[href^='/buildings/']"
                    ) != null
                )
                    (btnGroup.firstElementChild as HTMLElement)?.click();
            }
        },
        building() {
            (
                document.querySelector(
                    'a[href^="/buildings/"]'
                ) as HTMLAnchorElement
            )?.click();
        },
        previousVehicle() {
            //Support for Redesign
            const btnGroups = document.querySelectorAll('.btn-group');
            for (const btnGroup of btnGroups) {
                if (
                    btnGroup.childElementCount == 2 &&
                    btnGroup.firstElementChild?.querySelector(
                        "[href^='/buildings/']"
                    ) != null &&
                    btnGroup.lastElementChild?.querySelector(
                        "[href^='/buildings/']"
                    ) != null
                )
                    (btnGroup.firstElementChild as HTMLElement)?.click();
            }
        },
        edit() {
            (
                document.querySelector("a[href$='/edit']") as HTMLAnchorElement
            )?.click();
        },
        personalAssigment() {
            (
                document.querySelector(
                    "a[href$='/zuweisung']"
                ) as HTMLAnchorElement
            )?.click();
        },
        statistics() {
            (
                document.querySelector("a[href$='/stats']") as HTMLAnchorElement
            )?.click();
        },
    },
    alarm: <Scope<Empty, [], ['firstOwnMission', 'firstAllianceMission']>>{
        validatorFunction: () => true,
        firstOwnMission() {
            //Won't work with redesign
            (
                document.querySelector(
                    "#mission_own input[type='submit']"
                ) as HTMLInputElement
            )?.click();
        },
        firstAllianceMission() {
            (
                document.querySelector(
                    "#mission_alliance input[type='submit']"
                ) as HTMLInputElement
            )?.click();
        },
        other: <Scope<Empty, [], ['moveVehicle', 'toggleFMS']>>{
            validatorFunction: () => true,
            moveVehicle() {
                const vehicleID = parseInt(
                    window.location.pathname.split('/')[2]
                );
                const LSSM = window[PREFIX] as Vue;
                LSSM.$stores.api
                    .getVehicle(vehicleID, 'hotkeys-vehicles')
                    .then(result => {
                        if (result.fms_real == 2) {
                            (
                                document.querySelector(
                                    'a[href$="/move"]'
                                ) as HTMLAnchorElement
                            )?.click();
                        }
                    });
            },
            toggleFMS() {
                let currentFms;
                const vehicleID = parseInt(
                    window.location.pathname.split('/')[2]
                );
                const LSSM = window[PREFIX] as Vue;
                LSSM.$stores.api
                    .getVehicle(vehicleID, 'hotkeys-vehicles')
                    .then(result => {
                        currentFms = result.fms_real;
                    });
                if (currentFms == 2) fetch(`/vehicles/${vehicleID}/set_fms/6`);
                else if (currentFms == 6)
                    fetch(`/vehicles/${vehicleID}/set_fms/2`);
            },
        },
    },
};
