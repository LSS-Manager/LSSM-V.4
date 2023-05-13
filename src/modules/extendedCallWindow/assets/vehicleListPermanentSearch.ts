export default (): void => {
    const vehicleTabs = document.querySelector('#tabs');
    if (vehicleTabs) vehicleTabs.addEventListener('click', vehicleListChange);
    //Initial expanding
    vehicleListChange()

    /**
     * Gets called on every vehicle tab change to update the vehicle search bar
     * (for some reasons they have different search bars instead of filters).
     */
    function vehicleListChange() {
        const vehicleSearch = document
            .querySelector('#vehicle_list_step>.tab-content>.active')
            ?.querySelector(
                "[id^='mission_vehicle_search_outer_']"
            ) as HTMLInputElement;
        const enableSearchBtn = document
            .querySelector('#vehicle_list_step>.tab-content>.active')
            ?.querySelector("[id^='show_search_']") as HTMLAnchorElement;
        if (vehicleSearch.offsetParent === null) enableSearchBtn.click();
    }
};
