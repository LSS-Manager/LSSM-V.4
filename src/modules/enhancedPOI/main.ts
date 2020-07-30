import { POI } from 'typings/modules/EnhancedPOI';
import { POIMarker } from 'typings/Ingame';
import { LayersControlEvent } from 'leaflet';

(async (LSSM: Vue) => {
    const modifyMarker = (poi: POIMarker, caption: string) => {
        poi.bindTooltip(caption)
            .getElement()
            ?.setAttribute('caption', caption);
        poi.getElement()?.classList.add('poi');
    };

    let modifiedMarkers = false;

    const modifyMarkers = () =>
        LSSM.$store
            .dispatch('api/request', {
                url: '/mission_positions',
            })
            .then(res => res.json())
            .then(
                ({
                    mission_positions: pois,
                }: {
                    mission_positions: POI[] | null;
                }) => {
                    if (pois) {
                        window.map_pois_service
                            .getMissionPoiMarkersArray()
                            .forEach(marker => {
                                const poi = pois.find(p => p.id === marker.id);
                                if (poi) modifyMarker(marker, poi.caption);
                            });
                        modifiedMarkers = true;
                    }
                }
            );

    await modifyMarkers();

    await LSSM.$store.dispatch('hook', {
        event: 'map_pois_service.leafletMissionPositionMarkerAdd',
        callback({ caption, id }: POI) {
            const poi = window.map_pois_service
                .getMissionPoiMarkersArray()
                .find(m => m.id === id);
            if (!poi) return;
            poi.bindTooltip(caption);
            poi.getElement()?.setAttribute('caption', caption);
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

    const poiHighlightedClass = LSSM.$store.getters.nodeAttribute(
        'poi-highlighted'
    );

    await LSSM.$store.dispatch('addStyle', {
        selectorText: `.poi.${poiHighlightedClass}`,
        style: {
            filter: 'contrast(500%) brightness(60%) invert(100%)',
        },
    });

    const colorMarkers = (caption: string) =>
        (document.querySelectorAll('.poi') as NodeListOf<
            HTMLImageElement
        >).forEach(el =>
            el.classList[
                el.getAttribute('caption') === caption ? 'add' : 'remove'
            ](poiHighlightedClass)
        );

    window.map.addEventListener('moveend', resetNewPoiMarker);
    window.map.addEventListener(
        'overlayadd',
        ({ name }: LayersControlEvent) =>
            !modifiedMarkers && name.match(/app-pois-filter/) && modifyMarkers()
    );

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector(
                '#new_mission_position'
            );
            if (!form) {
                isPOIWindow = false;
                (document.querySelectorAll(
                    `.poi.${poiHighlightedClass}`
                ) as NodeListOf<HTMLImageElement>).forEach(el =>
                    el.classList.remove(poiHighlightedClass)
                );
                return;
            }
            if (isPOIWindow) return;
            isPOIWindow = true;

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
