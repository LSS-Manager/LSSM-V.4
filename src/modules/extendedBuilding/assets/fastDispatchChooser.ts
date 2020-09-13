import { Building } from 'typings/Building';

export default (LSSM: Vue): void => {
    const path = window.location.pathname.split('/').filter(s => !!s);
    const buildingId = parseInt(path[path.length - 1]);
    const building = (LSSM.$store.state.api.buildings as Building[]).find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildings = [] as Building[];
    const buildingsByType = LSSM.$store.getters['api/buildingsByType'] as {
        [type: number]: Building[];
    };
    (Object.values(
        LSSM.$t('dispatchCenterBuildings')
    ) as number[]).forEach(type =>
        buildings.push(...(buildingsByType[type] ?? []))
    );
    const dispatchBtn = document.querySelector(
        `.btn-group.pull-right a${
            building.leitstelle_building_id
                ? `[href="/buildings/${building.leitstelle_building_id}"]`
                : ':nth-of-type(2)'
        }`
    );
    console.log(dispatchBtn);
};
