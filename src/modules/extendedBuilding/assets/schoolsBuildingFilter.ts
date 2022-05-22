import type { Vehicle } from 'typings/Vehicle';
import type { Building } from 'typings/Building';

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

    const searchLabel = document.createElement('label');
    searchLabel.classList.add('pull-right');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'search');
    searchInput.classList.add('search_input_field');
    const clearfix = document.createElement('div');
    clearfix.classList.add('clearfix');

    searchLabel.append(searchInput);
    accordion.prepend(searchLabel, clearfix);

    const filterByName = () => {
        const search = searchInput.value.trim().toLowerCase();
        buildings.forEach(({ name, el }) => {
            if (name.toLowerCase().includes(search))
                el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    };

    let nameFilterTimeout: number | null = null;

    searchInput.addEventListener('keyup', () => {
        if (nameFilterTimeout) clearTimeout(nameFilterTimeout);
        nameFilterTimeout = window.setTimeout(filterByName, 100);
    });
};
