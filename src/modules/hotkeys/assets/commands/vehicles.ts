import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['goto', 'alarm', 'other'], [], true, 'vehicle'>>{
    goto: <
        Scope<
            { vehicleId: number },
            [],
            [
                'previousVehicle',
                'nextVehicle',
                'building',
                'edit',
                'personalAssigment',
                'statistics',
            ],
            false,
            'vehicle'
        >
    >{
        validatorFunction() {
            this.vehicleId = parseInt(window.location.pathname.split('/')[2]);
            return true;
        },
        previousVehicle(_, redesign) {
            if (redesign) {
                return redesign.lightbox.$set(
                    redesign.lightbox,
                    'src',
                    `/vehicles/${redesign.data.previousVehicle}`
                );
            }
            document
                .querySelector<HTMLAnchorElement>(
                    `.btn-group.pull-right a:nth-child(1)[href^="/vehicles/"]:not([href*="${this.vehicleId}"])`
                )
                ?.click();
        },
        nextVehicle(_, redesign) {
            if (redesign) {
                return redesign.lightbox.$set(
                    redesign.lightbox,
                    'src',
                    `/vehicles/${redesign.data.nextVehicle}`
                );
            }
            document
                .querySelector<HTMLAnchorElement>(
                    `.btn-group.pull-right a:nth-child(2)[href^="/vehicles/"]:not([href*="${this.vehicleId}"])`
                )
                ?.click();
        },
        building(_, redesign) {
            if (redesign) {
                return redesign.lightbox.$set(
                    redesign.lightbox,
                    'src',
                    `/buildings/${redesign.data.building.id}`
                );
            }
            document
                .querySelector<HTMLAnchorElement>('a[href^="/buildings/"]')
                ?.click();
        },
        edit(_, redesign) {
            const vehicleID = redesign?.data.id ?? this.vehicleId;
            const selector = `a[href="/vehicles/${vehicleID}/edit"]`;
            if (redesign) {
                return redesign.element
                    .querySelector<HTMLAnchorElement>(selector)
                    ?.dispatchEvent(
                        new MouseEvent('mouseup', {
                            bubbles: true,
                        })
                    );
            }
            document.querySelector<HTMLAnchorElement>(selector)?.click();
        },
        personalAssigment(_, redesign) {
            const vehicleID = redesign?.data.id ?? this.vehicleId;
            const selector = `a[href="/vehicles/${vehicleID}/zuweisung"]`;
            if (redesign) {
                return redesign.element
                    .querySelector<HTMLAnchorElement>(selector)
                    ?.dispatchEvent(
                        new MouseEvent('mouseup', {
                            bubbles: true,
                        })
                    );
            }
            document.querySelector<HTMLAnchorElement>(selector)?.click();
        },
        statistics(_, redesign) {
            const vehicleID = redesign?.data.id ?? this.vehicleId;
            const selector = `a[href="/vehicles/${vehicleID}/stats"]`;
            if (redesign) {
                return redesign.element
                    .querySelector<HTMLAnchorElement>(selector)
                    ?.dispatchEvent(
                        new MouseEvent('mouseup', {
                            bubbles: true,
                        })
                    );
            }
            document.querySelector<HTMLAnchorElement>(selector)?.click();
        },
    },
    alarm: <
        Scope<
            Empty,
            [],
            ['firstOwnMission', 'firstAllianceMission'],
            false,
            'vehicle'
        >
    >{
        validatorFunction: () => true,
        firstOwnMission(_, redesign) {
            if (redesign) {
                const mission =
                    redesign.component.computed.sortedItems.mission.find(
                        ({ list }) => list === 'own'
                    );
                if (mission) redesign.component.methods.alarm(mission.id);
                return;
            }
            document
                .querySelector<HTMLInputElement>(
                    "#mission_own input[type='submit']"
                )
                ?.click();
        },
        firstAllianceMission(_, redesign) {
            if (redesign) {
                const mission =
                    redesign.component.computed.sortedItems.mission.find(
                        ({ list }) => list === 'alliance'
                    );
                if (mission) redesign.component.methods.alarm(mission.id);
                return;
            }
            document
                .querySelector<HTMLInputElement>(
                    "#mission_alliance input[type='submit']"
                )
                ?.click();
        },
    },
    other: <
        Scope<
            { vehicleId: number },
            [],
            ['moveVehicle', 'toggleFMS'],
            false,
            'vehicle'
        >
    >{
        validatorFunction() {
            this.vehicleId = parseInt(window.location.pathname.split('/')[2]);
            return true;
        },
        moveVehicle(_, redesign) {
            const vehicleID = redesign?.data.id ?? this.vehicleId;
            const selector = `a[href="/vehicles/${vehicleID}/move"]`;
            if (redesign) {
                return redesign.element
                    .querySelector<HTMLAnchorElement>(selector)
                    ?.dispatchEvent(
                        new MouseEvent('mouseup', {
                            bubbles: true,
                        })
                    );
            }
            document.querySelector<HTMLAnchorElement>(selector)?.click();
        },
        async toggleFMS(_, redesign) {
            const vehicleID = redesign?.data.id ?? this.vehicleId;
            const LSSM = window[PREFIX] as Vue;
            LSSM.$stores.api
                .getVehicle(vehicleID, 'hotkeys-vehicles')
                .then(result => {
                    if (result.fms_real === 2) return 6;
                    else if (result.fms_real === 6) return 2;
                    throw new Error('FMS is not 2 or 6');
                })
                .then(fms =>
                    LSSM.$stores.api.request({
                        url: `/vehicles/${vehicleID}/set_fms/${fms}`,
                        feature: `hotkeys-toggleFMS`,
                    })
                )
                .then(() =>
                    redesign
                        ? redesign.lightbox.$set(
                              redesign.lightbox,
                              'src',
                              `/vehicles/${vehicleID}`
                          )
                        : window.location.reload()
                )
                .catch(() => void 0); // if current fms is not 2 or 6, we don't want to do anything
        },
    },
};
