export default (LSSM: Vue, MODULE_ID: string) => {
    const insertFilters = async () => {
        await LSSM.$stores.api.getVehicles(`${MODULE_ID}_dcbf`);

        const buildingRows = document.querySelectorAll<HTMLTableRowElement>(
            '#building_table tbody tr'
        );
        const buildings = Array.from(buildingRows).map(row => {
            const link =
                row.querySelector<HTMLAnchorElement>('[building_type]');
            const buildingId = parseInt(
                link?.getAttribute('href')?.split('/').at(-1) ?? '-1'
            );
            return {
                row,
                id: buildingId,
                buildingType: parseInt(
                    link?.getAttribute('building_type') ?? '-1'
                ),
                vehicleTypes: Array.from(
                    new Set(
                        LSSM.$stores.api.vehiclesByBuilding[buildingId]?.map(
                            v => v.vehicle_type_caption || v.vehicle_type
                        ) ?? []
                    )
                ),
            };
        });

        const buildingTypes = Array.from(
            new Set(buildings.map(b => b.buildingType))
        )
            .map(type => ({
                type,
                caption:
                    LSSM.$stores.translations.buildings[type]?.caption ?? type,
            }))
            .sort((a, b) => a.caption.localeCompare(b.caption));

        const buildingFilter = document.createElement('select');
        buildingFilter.classList.add('pull-right');
        [{ type: '*', caption: '' }, ...buildingTypes].forEach(
            ({ type, caption }) => {
                const option = document.createElement('option');
                option.value = type.toString();
                option.textContent = caption;
                buildingFilter.append(option);
            }
        );

        const vehicleTypes = Array.from(
            new Set(buildings.flatMap(b => b.vehicleTypes))
        )
            .map(type => ({
                type,
                caption:
                    typeof type === 'string'
                        ? `[${type}]`
                        : LSSM.$stores.translations.vehicles[type]?.caption ??
                          type,
            }))
            .sort((a, b) => a.caption.localeCompare(b.caption));

        const vehicleFilter = document.createElement('select');
        vehicleFilter.classList.add('pull-right');
        [{ type: '*', caption: '' }, ...vehicleTypes].forEach(
            ({ type, caption }) => {
                const option = document.createElement('option');
                option.value = type.toString();
                option.textContent = caption;
                vehicleFilter.append(option);
            }
        );

        const updateFilter = () => {
            const buildingFilterValue = buildingFilter.value;
            const vehicleFilterValue = vehicleFilter.value;

            buildings.forEach(buildingRow => {
                let show = true;
                if (
                    !(
                        buildingFilterValue === '*' ||
                        buildingRow.buildingType.toString() ===
                            buildingFilterValue
                    )
                )
                    show = false;
                if (
                    !(
                        vehicleFilterValue === '*' ||
                        buildingRow.vehicleTypes
                            .map(v => v.toString())
                            .includes(vehicleFilterValue)
                    )
                )
                    show = false;

                buildingRow.row.classList[show ? 'remove' : 'add']('hidden');
            });
        };

        buildingFilter.addEventListener('change', updateFilter);
        vehicleFilter.addEventListener('change', updateFilter);

        document
            .querySelector(
                '#tab_buildings [search_class="alliance_buildings_table_searchable"]'
            )
            ?.after(buildingFilter, vehicleFilter);
    };

    LSSM.$stores.root.observeAsyncTab({
        tabSelector: '#tab_buildings',
        callback: insertFilters,
    });
};
