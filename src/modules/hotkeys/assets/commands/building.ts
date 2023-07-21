import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['goto', 'changeSharing', 'dispatch'], [], true>>{
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
                'personal',
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
            )
                return;

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
            )
                return;

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
    dispatch: <
        Scope<
            { ulList: HTMLUListElement | null },
            [],
            [
                'next',
                'previous',
                'plannedMission',
                'protocol',
                'stats',
                'buildings',
                'extensions',
                'vehicle',
                'schooling',
                'patrol_vehicles',
                'patrol',
                'settings',
                'openFirstPlannedMission',
            ]
        >
    >{
        validatorFunction() {
            const buildingId = parseInt(
                window.location.pathname.match(/(?<=buildings\/)\d+/u)?.[0] ??
                    '-1'
            );
            //Prevent to fire an invalid API request
            if (buildingId == -1) return false;

            //Fetch Data vom API
            const LSSM = window[PREFIX] as Vue;
            //Get the dispatch type for the current loca
            const dispatchType =
                LSSM.$stores.translations.dispatchCenterBuildings;

            //check if current building is a dispatch type
            return LSSM.$stores.api
                .getBuilding(buildingId, 'hotkeys-building-dispatch')
                .then(result => {
                    if (dispatchType.includes(result?.building_type)) {
                        this.ulList =
                            document.querySelector<HTMLUListElement>('#tabs');
                    }
                    return !!this.ulList;
                })
                .catch(() => false);
        },
        next() {
            //Cant be undefined. Even on pageload, first tab is always active
            const current = this.ulList?.querySelector('.active');
            //Check whether this is the last element
            if (current?.nextElementSibling != null) {
                const next = current?.nextElementSibling?.firstElementChild;
                (next as HTMLElement).click();
            }
        },
        previous() {
            //Cant be undefined. Even on pageload, first tab is always active
            const current = this.ulList?.querySelector('.active');
            //Check whether this is the first element
            if (current?.previousElementSibling !== null) {
                const previous =
                    current?.previousElementSibling?.firstElementChild;
                (previous as HTMLElement).click();
            }
        },
        plannedMission() {
            //Shouldn't be undefined
            this.ulList
                ?.querySelector<HTMLAnchorElement>(
                    'a[href="#tab_projected_missions"]'
                )
                ?.click();
        },
        protocol() {
            //Shouldn't be undefined
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_protocol"]')
                ?.click();
        },
        stats() {
            //Shouldn't be undefined
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_stats"]')
                ?.click();
        },
        buildings() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_buildings"]')
                ?.click();
        },
        extensions() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_extensions"]')
                ?.click();
        },
        vehicle() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_vehicle"]')
                ?.click();
        },
        schooling() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_schooling"]')
                ?.click();
        },
        patrol_vehicles() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>(
                    'a[href="#tab_patrol_vehicles"]'
                )
                ?.click();
        },
        patrol() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_patrol"]')
                ?.click();
        },
        settings() {
            this.ulList
                ?.querySelector<HTMLAnchorElement>('a[href="#tab_settings"]')
                ?.click();
        },
        openFirstPlannedMission() {
            const firstPlannedMission =
                document.querySelector<HTMLAnchorElement>(
                    'a[href^="/missions"]'
                );
            if (firstPlannedMission != undefined) firstPlannedMission.click();
        },
    },
};
