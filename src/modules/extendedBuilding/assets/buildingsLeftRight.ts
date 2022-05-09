import type { Building } from 'typings/Building';

export default (LSSM: Vue): void => {
    const buildingId = parseInt(
        window.location.pathname.match(/\d+\/?$/u)?.[0] ?? '0'
    );
    if (!buildingId) return;
    const building = (LSSM.$store.state.api.buildings as Building[]).find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildingsByType = LSSM.$store.getters[
        'api/buildingsByType'
    ] as Record<number, Building[]>;
    const smallBuildings = LSSM.$t('small_buildings') as unknown as Record<
        number,
        number
    >;
    const smallBuildingsArray: (number | string)[] = Object.entries(
        smallBuildings
    ).find(ids =>
        ids.map(id => parseInt(id.toString())).includes(building.building_type)
    ) ?? [building.building_type];
    if (!smallBuildingsArray) return;
    const buildings = smallBuildingsArray
        .flatMap(type =>
            (buildingsByType[parseInt(type.toString())] || []).map(
                ({ id }) => id
            )
        )
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const position = buildings.indexOf(buildingId);
    if (position < 0) return;
    const btnGroup = document.querySelector<HTMLDivElement>(
        '#building-navigation-container'
    );
    if (!btnGroup) return;
    btnGroup.children[0].textContent = `[←${position}] ${btnGroup.children[0].textContent}`;
    btnGroup.children[btnGroup.children.length - 1].textContent += ` [${
        buildings.length - position - 1
    }→]`;
};
