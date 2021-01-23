import { Building } from 'typings/Building';

export default (LSSM: Vue): void => {
    const path = window.location.pathname.split('/').filter(s => !!s);
    const buildingId = parseInt(path[path.length - 1]);
    if (!buildingId) return;
    const building = (LSSM.$store.state.api.buildings as Building[]).find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildingsByType = LSSM.$store.getters['api/buildingsByType'] as {
        [type: number]: Building[];
    };
    const small_building =
        ((LSSM.$t('small_buildings') as unknown) as { [type: number]: number })[
            building.building_type
        ] ?? (NaN as number);
    const buildings = [
        ...(buildingsByType[building.building_type] || []),
        ...(isNaN(small_building) ? [] : buildingsByType[small_building] || []),
    ]
        .map(({ id }) => id)
        .sort();
    const position = buildings.indexOf(buildingId);
    if (position < 0) return;
    const btnGroup = document.getElementById('building-navigation-container');
    if (!btnGroup) return;
    btnGroup.children[0].textContent = `[←${position}] ${btnGroup.children[0].textContent}`;
    btnGroup.children[
        btnGroup.children.length - 1
    ].textContent += ` [${buildings.length - position - 1}→]`;
};
