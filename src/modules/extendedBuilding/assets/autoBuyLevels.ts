export default async (LSSM: Vue, MODULE_ID: string): Promise<void> => {
    const buildingId = parseInt(
        window.location.pathname.match(/(?<=buildings\/)\d+/u)?.[0] ?? '-1'
    );
    if (buildingId < 0) return;
    const building = await LSSM.$stores.api.getBuilding(
        buildingId,
        `${MODULE_ID}-autoBuyLevels`
    );

    console.log(building);
};
