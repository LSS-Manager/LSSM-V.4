import { MissionPositionMarkerParam } from '../../../typings/Ingame';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('hook', {
        // TODO: Wait for Devs to add markers to mission_poi_markers
        event: 'leafletMissionPositionMarkerAdd',
        callback(e: MissionPositionMarkerParam) {
            const poi =
                window.mission_poi_markers[
                    window.mission_poi_markers.length - 1
                ];
            poi.bindTooltip(e.caption);
            poi.getElement()?.setAttribute('caption', e.caption);
            poi.getElement()?.classList.add('poi');
        },
    });

    let isPOIWindow = false;

    const resetNewPoiMarker = () => {
        if (isPOIWindow) {
            window.mission_position_new_marker &&
                !window.map
                    .getBounds()
                    .contains(window.mission_position_new_marker.getLatLng()) &&
                window.mission_position_new_marker.setLatLng(
                    window.map.getCenter()
                ) &&
                window.mission_position_new_dragend();
        }
    };

    const hideIcons = () => {
        if (isPOIWindow) {
            (document.querySelectorAll(
                '.leaflet-marker-icon:not(.poi)'
            ) as NodeListOf<HTMLImageElement>).forEach(
                el => (el.style.display = 'none')
            );
            window.mission_position_new_marker &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.mission_position_new_marker._icon &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (window.mission_position_new_marker._icon.style.display = null);
        }
    };

    const showIcons = () => {
        if (isPOIWindow) {
            (document.querySelectorAll(
                '.leaflet-marker-icon:not(.poi)'
            ) as NodeListOf<HTMLImageElement>).forEach(
                el => delete el.style.display
            );
        }
    };

    const colorMarkers = (caption: string) => {
        (document.querySelectorAll('.poi') as NodeListOf<
            HTMLImageElement
        >).forEach(el => delete el.style.display);
        (document.querySelectorAll(`.poi[caption="${caption}"]`) as NodeListOf<
            HTMLImageElement
        >).forEach(
            el =>
                (el.style.filter =
                    'contrast(500%) brightness(60%) invert(100%)')
        );
    };

    window.map.addEventListener('moveend', resetNewPoiMarker);
    window.map.addEventListener('zoomend', hideIcons);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector(
                '#new_mission_position'
            );
            if (!form) {
                showIcons();
                isPOIWindow = false;
                return;
            }
            if (isPOIWindow) return;
            isPOIWindow = true;

            hideIcons();

            (document.querySelectorAll(
                `.lefalet-marker-icon[caption="${
                    document.querySelector(
                        '#mission_position_poi_type option:checked'
                    )?.textContent
                }"]`
            ) as NodeListOf<HTMLImageElement>).forEach(
                el =>
                    (el.style.filter =
                        'contrast(500%) brightness(60%) invert(100%)')
            );
            colorMarkers(
                form.querySelector('option:checked')?.textContent || ''
            );
            form.querySelector(
                '#mission_position_poi_type'
            )?.addEventListener('change', e =>
                colorMarkers(
                    (e.target as HTMLSelectElement)?.querySelector(
                        'option:checked'
                    )?.textContent || ''
                )
            );
        });
    });

    const buildingsElement = document.getElementById('buildings');
    buildingsElement && observer.observe(buildingsElement, { childList: true });
})(window[PREFIX] as Vue);
