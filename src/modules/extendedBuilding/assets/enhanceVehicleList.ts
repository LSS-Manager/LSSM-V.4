export default async (
    LSSM: Vue,
    BUILDING_MODE: 'building' | 'dispatch',
    getSetting: (key: string) => Promise<boolean>
): Promise<void> => {
    const callback = async () => {
        const vehicles = Array.from(
            document.querySelectorAll('#vehicle_table tbody tr') as NodeListOf<
                HTMLTableRowElement
            >
        );

        const fmsSwitch = await getSetting('fmsSwitch');

        if (fmsSwitch)
            await LSSM.$store.dispatch('addStyle', {
                selectorText: '.building_list_fms_2, .building_list_fms_6',
                style: {
                    cursor: 'pointer',
                },
            });

        vehicles.forEach(vehicle => {
            const vehicleId = parseInt(
                vehicle
                    .querySelector('a[href^="/vehicles/"]')
                    ?.getAttribute('href')
                    ?.match(/\d+$/)?.[0] || '0'
            );
            if (!vehicleId) return;
            if (fmsSwitch) {
                const fmsBtn = vehicle.querySelector('.building_list_fms');
                fmsBtn?.addEventListener('click', e => {
                    const nextFms = fmsBtn.classList.contains(
                        'building_list_fms_2'
                    )
                        ? 6
                        : 2;
                    LSSM.$store
                        .dispatch('api/request', {
                            url: `/vehicles/${vehicleId}/set_fms/${nextFms}`,
                        })
                        .then(({ status }) => {
                            if (status === 200) {
                                fmsBtn.classList.replace(
                                    `building_list_fms_${
                                        nextFms === 2 ? 6 : 2
                                    }`,
                                    `building_list_fms_${nextFms}`
                                );
                                fmsBtn.textContent = ((LSSM.$t(
                                    'fmsReal2Show'
                                ) as unknown) as { [status: number]: number })[
                                    nextFms
                                ].toString();
                            }
                        });
                });
            }
        });
    };

    if (BUILDING_MODE === 'dispatch')
        await LSSM.$store.dispatch('observeAsyncTab', {
            tabSelector: '#tab_vehicle',
            callback,
        });
    else await callback();
};
