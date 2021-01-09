export default async (LSSM: Vue, MODULE_ID: string): Promise<void> => {
    const buildingId = parseInt(
        window.location.pathname.match(/(?<=buildings\/)\d+/)?.[0] ?? '-1'
    );
    if (buildingId < 0) return;
    const building = await LSSM.$store.dispatch('api/fetchBuilding', {
        id: buildingId,
        feature: `${MODULE_ID}-autoBuyLevels`,
    });
    // eslint-disable-next-line no-console
    console.log(building);
};
