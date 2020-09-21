export default async (LSSM: Vue): Promise<void> => {
    const buildingId = parseInt(
        window.location.pathname.match(/(?<=buildings\/)\d+/)?.[0] ?? '-1'
    );
    if (buildingId < 0) return;
    const building = await LSSM.$store.dispatch(
        'api/fetchBuilding',
        buildingId
    );
    console.log(building);
};
