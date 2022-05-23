import type { Vehicle } from 'typings/Vehicle';
import type { Building, InternalBuilding } from 'typings/Building';

interface BuildingInfos {
    el: HTMLDivElement;
    id: number;
    name: string;
    buildingType: number;
    vehicleTypes: Set<number>;
}

export default async (LSSM: Vue) => {
    const accordion = document.querySelector<HTMLDivElement>(
        '#schooling #accordion'
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
            vehicleTypes: new Set(
                vehiclesByBuilding[buildingId].map(
                    ({ vehicle_type }) => vehicle_type
                )
            ),
        });
    });

    const filterWrapper = document.createElement('div');
    filterWrapper.classList.add('pull-right');

    const buildingTypeFilter = document.createElement('select');
    const allOption = document.createElement('option');
    allOption.value = '*';
    buildingTypeFilter.append(allOption);
    new Set(buildings.map(({ buildingType }) => buildingType)).forEach(
        buildingType => {
            const option = document.createElement('option');
            option.value = buildingType.toString();
            option.textContent = buildingTypes[buildingType].caption;
            buildingTypeFilter.append(option);
        }
    );

    const searchLabel = document.createElement('label');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'search');
    const clearfix = document.createElement('div');
    clearfix.classList.add('clearfix');

    searchLabel.append(searchInput);

    filterWrapper.append(buildingTypeFilter, searchLabel);
    accordion.prepend(filterWrapper, clearfix);

    const filter = () => {
        const search = searchInput.value.trim().toLowerCase();
        const buildingTypeFilterValue = parseInt(buildingTypeFilter.value);
        buildings.forEach(({ name, el, buildingType }) => {
            let show = true;
            if (search.length && !name.toLowerCase().includes(search))
                show = false;
            if (
                !Number.isNaN(buildingTypeFilterValue) &&
                buildingType !== buildingTypeFilterValue
            )
                show = false;

            if (show) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    };

    let nameFilterTimeout: number | null = null;

    const updateFilter = () => {
        if (nameFilterTimeout) clearTimeout(nameFilterTimeout);
        nameFilterTimeout = window.setTimeout(filter, 100);
    };

    searchInput.addEventListener('keyup', updateFilter);
    buildingTypeFilter.addEventListener('change', updateFilter);
};
