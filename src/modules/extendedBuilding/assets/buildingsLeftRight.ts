export default (LSSM: Vue): void => {
    const buildingId = parseInt(
        window.location.pathname.match(/\d+\/?$/u)?.[0] ?? '0'
    );
    if (!buildingId) return;
    const building = LSSM.$stores.api.buildings.find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildingsByType = LSSM.$stores.api.buildingsByType;
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
    if (btnGroup.firstElementChild)
        btnGroup.firstElementChild.textContent = `[←${position}] ${btnGroup.children[0].textContent}`;
    if (btnGroup.lastElementChild) {
        btnGroup.lastElementChild.textContent += ` [${
            buildings.length - position - 1
        }→]`;
    }
};
