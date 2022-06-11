import type { Building, InternalBuilding } from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

interface BuildingInfos {
    el: HTMLDivElement;
    id: number;
    name: string;
    buildingType: number;
    vehicleTypes: number[];
}

export default async (LSSM: Vue) => {
    const accordion = document.querySelector<HTMLDivElement>(
        'form[action$="/education"] #accordion'
    );

    if (!accordion) return;

    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'eb-sbf',
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: 'eb-sbf',
    });

    const buildings: BuildingInfos[] = [];

    const buildingsById: Record<number, Building> =
        LSSM.$store.getters['api/buildingsById'];

    const vehiclesByBuilding: Record<number, Vehicle[]> =
        LSSM.$store.getters['api/vehiclesByBuilding'];

    const buildingTypes: Record<number, InternalBuilding> =
        LSSM.$store.getters.$tBuildings;
    const vehicleTypes: Record<number, InternalVehicle> =
        LSSM.$store.getters.$tVehicles;

    accordion.querySelectorAll<HTMLDivElement>('.panel').forEach(panel => {
        const heading = panel.querySelector<HTMLDivElement>('.panel-heading');
        if (!heading) return;

        const buildingId = parseInt(
            heading.getAttribute('building_id') ?? '-1'
        );

        buildings.push({
            el: panel,
            name:
                heading.textContent
                    ?.trim()
                    ?.split(/[\t\n]/u)[0]
                    ?.trim() ?? '',
            id: buildingId,
            buildingType: buildingsById[buildingId].building_type,
            vehicleTypes: Array.from(
                new Set(
                    vehiclesByBuilding[buildingId]?.map(
                        ({ vehicle_type }) => vehicle_type
                    ) ?? []
                )
            ),
        });
    });

    const filterWrapper = document.createElement('div');
    filterWrapper.classList.add('pull-right');

    const vehicleTypeFilter = document.createElement('select');
    const vehicleAllOption = document.createElement('option');
    vehicleAllOption.value = '*';
    vehicleTypeFilter.append(vehicleAllOption);
    Array.from(new Set(buildings.flatMap(({ vehicleTypes }) => vehicleTypes)))
        .sort((a, b) =>
            vehicleTypes[a].caption.localeCompare(vehicleTypes[b].caption)
        )
        .forEach(vehicleType => {
            const option = document.createElement('option');
            option.value = vehicleType.toString();
            option.textContent = vehicleTypes[vehicleType].caption;
            vehicleTypeFilter.append(option);
        });

    const buildingTypeFilter = document.createElement('select');
    const buildingAllOption = document.createElement('option');
    buildingAllOption.value = '*';
    buildingTypeFilter.append(buildingAllOption);
    Array.from(new Set(buildings.map(({ buildingType }) => buildingType)))
        .sort((a, b) =>
            buildingTypes[a].caption.localeCompare(buildingTypes[b].caption)
        )
        .forEach(buildingType => {
            const option = document.createElement('option');
            option.value = buildingType.toString();
            option.textContent = buildingTypes[buildingType].caption;
            buildingTypeFilter.append(option);
        });

    const searchLabel = document.createElement('label');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'search');
    const clearfix = document.createElement('div');
    clearfix.classList.add('clearfix');

    searchLabel.append(searchInput);

    filterWrapper.append(vehicleTypeFilter, buildingTypeFilter, searchLabel);
    accordion.prepend(filterWrapper, clearfix);

    const filter = () => {
        const search = searchInput.value.trim().toLowerCase();
        const vehicleTypeFilterValue = parseInt(vehicleTypeFilter.value);
        const buildingTypeFilterValue = parseInt(buildingTypeFilter.value);
        buildings.forEach(({ name, el, buildingType, vehicleTypes }) => {
            let show = true;
            if (search.length && !name.toLowerCase().includes(search))
                show = false;
            if (
                show &&
                !Number.isNaN(vehicleTypeFilterValue) &&
                !vehicleTypes.includes(vehicleTypeFilterValue)
            )
                show = false;
            if (
                show &&
                !Number.isNaN(buildingTypeFilterValue) &&
                buildingType !== buildingTypeFilterValue
            )
                show = false;

            if (show) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
        window.schooling_check_educated_counter_visible_check?.();
    };

    let nameFilterTimeout: number | null = null;

    const updateFilter = () => {
        if (nameFilterTimeout) clearTimeout(nameFilterTimeout);
        nameFilterTimeout = window.setTimeout(filter, 100);
    };

    vehicleTypeFilter.addEventListener('change', updateFilter);
    buildingTypeFilter.addEventListener('change', updateFilter);
    searchInput.addEventListener('keyup', updateFilter);
};
