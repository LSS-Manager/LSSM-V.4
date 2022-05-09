import type { Map as LMap } from 'leaflet';

export default (
    placeholder: string,
    addToPanelHeading: boolean,
    mapSearchOnMap: boolean,
    position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right',
    LSSM: Vue
): void => {
    const addToMap = (map = window.map, id = 'map') => {
        if (!(map && document.querySelector<HTMLDivElement>(`#${id}`))) return;

        let form = document.createElement('form');
        form.id = LSSM.$store.getters.nodeAttribute(
            'map_adress_search_form',
            true
        );
        form.classList.add('navbar-form', 'navbar-left');
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-controls');
        input.id = LSSM.$store.getters.nodeAttribute('map_adress_search', true);
        input.placeholder = placeholder;
        formGroup.append(input);
        form.append(formGroup);

        const isMainWindowSearch =
            window.location.pathname.match(/^\/?$/u) &&
            mapSearchOnMap &&
            !document.querySelector('.redesign-wrapper') &&
            !document.querySelector('#modals-container [data-modal$="_map"]');

        if (isMainWindowSearch) {
            form =
                document.querySelector<HTMLFormElement>(
                    '#map_adress_search_form'
                ) ?? form;
        }

        LSSM.$store
            .dispatch('addOSMControl', { position, mapId: id })
            .then((control: HTMLAnchorElement) => {
                const clearfix = document.createElement('div');
                clearfix.classList.add('clearfix');
                control.after(clearfix);

                control.style.setProperty('cursor', 'pointer');
                control.addEventListener('click', e => {
                    if (
                        (e.target as HTMLElement | null)?.closest(
                            `#map_adress_search_form, #${input.id}`
                        )
                    )
                        return;
                    form.classList.toggle('hidden');
                });
                const searchIcon = document.createElement('i');
                searchIcon.classList.add('fas', 'fa-search');
                form.classList.add('hidden');

                form.style.setProperty('position', 'relative');
                form.style.setProperty('top', 'calc(-100% - 9px)');
                form.style.setProperty('padding', '0');
                if (position.match(/right/u))
                    form.style.setProperty('transform', 'translateX(-100%)');
                else form.style.setProperty('left', '30px');

                if (!isMainWindowSearch) {
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
                                if (result.length) {
                                    map.panTo([result[0].lat, result[0].lon]);
                                } else {
                                    LSSM.$modal.show('dialog', {
                                        text: window.I18n.t(
                                            'javascript.location_not_found'
                                        ),
                                        buttons: [
                                            {
                                                title: 'Ok',
                                                default: true,
                                                handler: () =>
                                                    LSSM.$modal.hide('dialog'),
                                            },
                                        ],
                                    });
                                }
                            });
                    });
                }

                control.classList.add('pull-right');
                control.append(searchIcon);
                control.append(form);
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(
        'lssmv4-map-loaded',
        ({ detail: { id, map } }: CustomEvent<{ id: string; map: LMap }>) =>
            addToMap(map, id)
    );

    if (window.location.pathname === '/' && !mapSearchOnMap) return;

    addToMap();
};
