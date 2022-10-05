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
            const next = this.navigationGroup?.lastElementChild;
            (next as HTMLElement).click();
        },
        async dispatchCenter() {
            const buildingId = parseInt(
                window.location.pathname.match(/(?<=buildings\/)\d+/u)?.[0] ??
                    '-1'
            );
            //Prevent to fire an invalid API request
            if (buildingId == -1) return;

            //Fetch Data vom API
            const LSSM = window[PREFIX] as Vue;
            let leitstellenId: number | null;
            leitstellenId = null;
            await LSSM.$stores.api
                .getBuilding(buildingId, 'hotkeys-building')
                .then(result => {
                    if (result?.leitstelle_building_id == null) {
                        if (
                            LSSM.$stores.api.settings?.leitstelle_building_id ==
                            null
                        ) {
                            return;
                        } else {
                            leitstellenId =
                                LSSM.$stores.api.settings
                                    ?.leitstelle_building_id;
                        }
                    } else {
                        leitstellenId = result?.leitstelle_building_id;
                    }
                    window.location.replace(`/buildings/${leitstellenId}`);
                });
        },
        previousBuilding() {
            const previous = this.navigationGroup?.firstElementChild;
            (previous as HTMLElement).click();
        },
        expand() {
            const expand =
                document.querySelector<HTMLAnchorElement>("a[href$='/expand']");
            //No result → Building without expansions
            if (expand == null) return;

            expand.click();
        },
        firstVehicle() {
            const firstVehicle = document.querySelector<HTMLAnchorElement>(
                "td a[href^='/vehicles']"
            );
            //No result → Building without vehicles
            if (firstVehicle == null) return;

            firstVehicle.click();
        },
        hire() {
            const hire =
                document.querySelector<HTMLAnchorElement>("a[href$='/hire']");
            //No result → Building without personal
            if (hire == null) return;

            hire.click();
        },
        personal() {
            const personal = document.querySelector<HTMLAnchorElement>(
                "a[href$='/personals']"
            );
            //No result → Building without personal
            if (personal == null) return;

            personal.click();
        },
    },
    changeSharing: <
        Scope<Empty, [], ['enableSharing', 'disableSharing', 'toggleSharing']>
    >{
        validatorFunction: () => true,
        enableSharing() {
            const extensionBtn = document.querySelector<HTMLAnchorElement>(
                "a[href$='/alliance']"
            );
            //No result → Building without enable able extension or extensionen already enabled
            if (
                extensionBtn == null ||
                document.querySelectorAll("a[href*='alliance_costs']").length !=
                    0
            ) {
                return;
            }

            extensionBtn.click();
        },
        disableSharing() {
            const extensionBtn = document.querySelector<HTMLAnchorElement>(
                "a[href$='/alliance']"
            );
            //No result → Building without enable able extension or extensionen already disabled
            if (
                extensionBtn == null ||
                document.querySelectorAll("a[href*='alliance_costs']").length ==
                    0
            ) {
                return;
            }

            extensionBtn.click();
        },
        toggleSharing() {
            const extensionBtn = document.querySelector<HTMLAnchorElement>(
                "a[href$='/alliance']"
            );
            //No result → Building without enable able extension
            if (extensionBtn == null) return;

            extensionBtn.click();
        },
    },
};
