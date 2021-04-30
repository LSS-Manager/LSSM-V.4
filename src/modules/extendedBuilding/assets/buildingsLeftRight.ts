import { Building } from 'typings/Building';

export default (LSSM: Vue): void => {
    const buildingId = parseInt(
        window.location.pathname.match(/\d+\/?$/)?.[0] ?? '0'
    );
    if (!buildingId) return;
    const building = (LSSM.$store.state.api.buildings as Building[]).find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildingsByType = LSSM.$store.getters['api/buildingsByType'] as {
        [type: number]: Building[];
    };
    const smallBuildings = (LSSM.$t('small_buildings') as unknown) as {
        [type: number]: number;
    };
    const smallBuildingsArray:
        | (string | number)[]
        | undefined = smallBuildings.hasOwnProperty(building.building_type)
        ? Object.entries(smallBuildings).find(ids =>
              ids.includes(building.building_type)
          )
        : [building.building_type];
    if (!smallBuildingsArray) return;
    const buildings = smallBuildingsArray
        .flatMap(
            type =>
                buildingsByType[parseInt(type.toString())].map(
                    ({ id }) => id
                ) || []
        )
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const position = buildings.indexOf(buildingId);
    if (position < 0) return;
    const btnGroup = document.getElementById('building-navigation-container');
    if (!btnGroup) return;
    btnGroup.children[0].textContent = `[←${position}] ${btnGroup.children[0].textContent}`;
    btnGroup.children[
        btnGroup.children.length - 1
    ].textContent += ` [${buildings.length - position - 1}→]`;
};
