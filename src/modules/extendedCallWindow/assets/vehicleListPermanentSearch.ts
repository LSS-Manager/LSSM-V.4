export default (): void => {
    /**
     * Gets called on every vehicle tab change to update the vehicle search bar
     * (for some reasons they have different search bars instead of filters).
     */
    function vehicleListChange() {
        const vehicleSearch = document.querySelector<HTMLInputElement>(
            '#vehicle_list_step>.tab-content>.active [id^="mission_vehicle_search_outer_"]'
        );
        const enableSearchBtn = document.querySelector<HTMLAnchorElement>(
            "#vehicle_list_step>.tab-content>.active [id^='show_search_']"
        );
        if (vehicleSearch?.offsetParent === null) enableSearchBtn?.click();
    }

    const vehicleTabs = document.querySelector('#tabs');
    if (vehicleTabs) vehicleTabs.addEventListener('click', vehicleListChange);
    //Initial expanding
    vehicleListChange();
};
