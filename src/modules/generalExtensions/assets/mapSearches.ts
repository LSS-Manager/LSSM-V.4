import { Map as LMap } from 'leaflet';

export default (
    placeholder: string,
    addToPanelHeading: boolean,
    mapSearchOnMap: boolean,
    LSSM: Vue
): void => {
    const addToMap = (map = window.map, id = 'map') => {
        if (!(map && document.getElementById(id))) return;

        let form = document.createElement('form');
        form.id = LSSM.$store.getters.nodeAttribute(
            'map_adress_search_form',
            true
        );
        form.classList.add('pull-right');
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-controls');
        input.id = LSSM.$store.getters.nodeAttribute('map_adress_search', true);
        input.placeholder = placeholder;
        formGroup.appendChild(input);
        form.appendChild(formGroup);

        if (
            window.location.pathname.match(/^\/?$/) &&
            mapSearchOnMap &&
            !document.querySelector('.redesign-wrapper')
        ) {
            form =
                document.querySelector<HTMLFormElement>(
                    '#map_adress_search_form'
                ) ?? form;
        }

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

                form.addEventListener('submit', e => {
                    e.preventDefault();
                    const url = new URL(
                        'https://nominatim.openstreetmap.org/search?format=json&limit=1&q='
                    );
                    url.searchParams.set('format', 'json');
                    url.searchParams.set('limit', '1');
                    url.searchParams.set('q', input.value);

                    LSSM.$store
                        .dispatch('api/request', {
                            url: url.toString(),
                            feature: 'mapsearch',
                        })
                        .then(res => res.json())
                        .then((result: { lat: number; lon: number }[]) => {
                            if (result.length)
                                map.panTo([result[0].lat, result[0].lon]);
                        });
                });

                control.classList.add('pull-right');
                control.append(searchIcon);
                control.after(form);
            });
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

    addToMap();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(
        'lssmv4-map-loaded',
        ({ detail: { id, map } }: CustomEvent<{ id: string; map: LMap }>) =>
            addToMap(map, id)
    );
};
