export default async (
    LSSM: Vue,
    saveLastBuildingType: boolean,
    saveLastDispatchCenter: boolean,
    getSetting: <returnType>(settingId: string) => Promise<returnType>,
    MODULE_ID: string
): Promise<void> => {
    let isBuildingMenu = false;
    let lastBuildingType =
        (await getSetting<string>('lastSavedBuildingType')) ?? '';
    let lastDispatchCenter =
        (await getSetting<string>('lastSavedDispatchCenter')) ?? '';

    // Reset Marker for new building
    const resetNewBuildingMarker = () => {
        if (isBuildingMenu) {
            window.building_new_marker &&
                !window.map
                    .getBounds()
                    .contains(window.building_new_marker.getLatLng()) &&
                window.building_new_marker.setLatLng(window.map.getCenter()) &&
                window.building_new_dragend();
        }
    };
    window.map.addEventListener('moveend', resetNewBuildingMarker);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector<
                HTMLFormElement
            >('#new_building[action="/buildings"]');
            if (!form) {
                isBuildingMenu = false;
                return;
            }
            if (isBuildingMenu) return;
            isBuildingMenu = true;

            if (saveLastBuildingType) {
                const buildingTypeSelect = form.querySelector<
                    HTMLSelectElement
                >('#building_building_type');
                if (buildingTypeSelect) {
                    buildingTypeSelect.value = lastBuildingType;
                    buildingTypeSelect.dispatchEvent(new Event('change'));

                    buildingTypeSelect.addEventListener('change', () => {
                        LSSM.$store.dispatch('settings/setSetting', {
                            moduleId: MODULE_ID,
                            settingId: 'lastSavedBuildingType',
                            value: buildingTypeSelect.value,
                        });
                        lastBuildingType = buildingTypeSelect.value;
                    });
                }
            }
            if (saveLastDispatchCenter) {
                const dispatchCenterSelect = form.querySelector<
                    HTMLSelectElement
                >('#building_leitstelle_building_id');
                if (dispatchCenterSelect) {
                    dispatchCenterSelect.value = lastDispatchCenter;
                    dispatchCenterSelect.dispatchEvent(new Event('change'));

                    dispatchCenterSelect.addEventListener('change', () => {
                        LSSM.$store.dispatch('settings/setSetting', {
                            moduleId: MODULE_ID,
                            settingId: 'lastSavedDispatchCenter',
                            value: dispatchCenterSelect.value,
                        });
                        lastDispatchCenter = dispatchCenterSelect.value;
                    });
                }
            }
        });
    });

    const buildingsElement = document.getElementById('buildings');
    buildingsElement && observer.observe(buildingsElement, { childList: true });
};
