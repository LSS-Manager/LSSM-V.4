export default (
    placeholder: string,
    {
        isProfile,
        addToPanelHeading,
        isDispatchCenter,
    }: {
        [k in 'isProfile' | 'addToPanelHeading' | 'isDispatchCenter']: boolean;
    }
): void => {
    const form = document.createElement('form');
    form.id = 'map_adress_search_form';

    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-controls');
    input.id = 'map_adress_search';
    input.placeholder = placeholder;

    formGroup.appendChild(input);
    form.appendChild(formGroup);

    form.addEventListener('submit', e => {
        e.preventDefault();
        window.mapMoveToSearch();
    });

    if (isProfile) document.getElementById('tabs')?.appendChild(form);
    if (addToPanelHeading) {
        const resetNewBuildingMarker = () => {
            if (
                window.building_move_marker &&
                !window.map
                    .getBounds()
                    .contains(window.building_move_marker.getLatLng()) &&
                window.building_move_marker.setLatLng(window.map.getCenter())
            )
                window.building_move_marker_dragend();
        };
        window.map.addEventListener('moveend', resetNewBuildingMarker);
        form.classList.add('pull-right');
        document.querySelector<HTMLDivElement>('.panel-heading')?.prepend(form);
    }
    if (isDispatchCenter) {
        form.classList.add('pull-right');
        document
            .querySelector<HTMLDivElement>('#tab_projected_missions .col-lg-3')
            ?.prepend(form);
    }
};
