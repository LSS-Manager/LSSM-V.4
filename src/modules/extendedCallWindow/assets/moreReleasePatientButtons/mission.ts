import type { AllianceInfo } from 'typings/api/AllianceInfo';

export default (LSSM: Vue, releaseText: string) => {
    if (!document.querySelector<HTMLDivElement>('.mission_patient')) return;

    const dangerAlert = document.querySelector<HTMLDivElement>(
        '.alert.alert-danger:not(.alert-missing-vehicles)'
    );

    dangerAlert
        ?.querySelectorAll<HTMLAnchorElement>(
            'a.btn.btn-success[href^="/vehicles/"]'
        )
        .forEach(vehicle => {
            const btnGroup = document.createElement('span');
            btnGroup.classList.add('btn-group');
            vehicle.before(btnGroup);

            const releaseBtn = document.createElement('a');
            releaseBtn.classList.add('btn', 'btn-default', 'btn-xs');
            releaseBtn.href = `${vehicle.href}/patient/-1`;
            releaseBtn.textContent = releaseText;

            btnGroup.append(vehicle, releaseBtn);
        });

    LSSM.$store
        .dispatch('api/registerAllianceinfoUsage', { feature: 'ecw-mrpb' })
        .then(() => {
            const roleFlags = (
                LSSM.$store.state.api.allianceinfo as AllianceInfo
            ).users.find(({ id }) => id === window.user_id)?.role_flags;
            const hasTransportRights =
                roleFlags &&
                (roleFlags.admin ||
                    roleFlags.coadmin ||
                    roleFlags.transport_requests);

            document
                .querySelectorAll('#mission_vehicle_at_mission tbody tr')
                .forEach(vehicle => {
                    if (
                        !vehicle.querySelector<HTMLSpanElement>(
                            '.building_list_fms_5'
                        )
                    )
                        return;
                    const btnGroup = vehicle.querySelector<HTMLDivElement>(
                        'td:last-child .btn-group'
                    );
                    const requestBtn =
                        btnGroup?.querySelector<HTMLAnchorElement>(
                            'a.btn.btn-success[href^="/vehicles/"]'
                        );

                    const releaseBtn = document.createElement('a');
                    releaseBtn.classList.add('btn', 'btn-default', 'btn-xs');
                    releaseBtn.textContent = releaseText;

                    if (requestBtn) {
                        releaseBtn.href = `${requestBtn.href}/patient/-1`;
                        requestBtn.after(releaseBtn);
                    } else if (
                        btnGroup &&
                        !btnGroup.childElementCount &&
                        hasTransportRights
                    ) {
                        const vehicleId = vehicle.id.match(/\d+$/u);

                        const vehicleLink =
                            vehicle.querySelector<HTMLAnchorElement>(
                                `a[href="/vehicles/${vehicleId}"]`
                            );

                        releaseBtn.href = `/vehicles/${vehicleId}/patient/-1`;
                        btnGroup.append(releaseBtn);

                        const topAlertGroup = document.createElement('span');
                        topAlertGroup.classList.add('btn-group');
                        topAlertGroup.style.setProperty('margin-right', '1rem');

                        const vehicleBtn = document.createElement('a');
                        vehicleBtn.classList.add(
                            'btn',
                            'btn-default',
                            'btn-xs'
                        );
                        vehicleBtn.href = `/vehicles/${vehicleId}`;
                        vehicleBtn.textContent =
                            vehicleLink?.textContent?.trim() ?? '';

                        topAlertGroup.append(
                            vehicleBtn,
                            releaseBtn.cloneNode(true)
                        );
                        dangerAlert?.append(topAlertGroup);
                    }
                });
        });
};
