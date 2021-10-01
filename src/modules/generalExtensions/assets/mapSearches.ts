import { Map as LMap } from 'leaflet';

export default (
    placeholder: string,
    addToPanelHeading: boolean,
    mapSearchOnMap: boolean,
    LSSM: Vue
): void => {
    let form = document.createElement('form');
    form.id = 'map_adress_search_form';
    form.classList.add('pull-right');

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

    const addToMap = (map = window.map, id = 'map') => {
        if (map && document.getElementById(id)) {
            LSSM.$store
                .dispatch('addOSMControl', { position: 'top-right', mapId: id })
                .then((control: HTMLAnchorElement) => {
                    control.style.setProperty('cursor', 'pointer');
                    control.addEventListener('click', () =>
                        form.classList.toggle('hidden')
                    );
                    const searchIcon = document.createElement('i');
                    searchIcon.classList.add('fas', 'fa-search');
                    form.classList.add('hidden');
                    window.map = map;
                    control.classList.add('pull-right');
                    control.append(searchIcon);
                    control.after(form);
                });
        }
    };

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
    }
    if (window.location.pathname.match(/^\/?$/)) {
        if (mapSearchOnMap) {
            form =
                document.querySelector<HTMLFormElement>(
                    '#map_adress_search_form'
                ) ?? form;
            addToMap();
        }
    } else {
        addToMap();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(
        'lssmv4-map-loaded',
        ({ detail: { id, map } }: CustomEvent<{ id: string; map: LMap }>) =>
            addToMap(map, id)
    );
};
