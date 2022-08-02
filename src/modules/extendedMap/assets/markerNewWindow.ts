import type { LeafletMouseEvent } from 'leaflet';
import type { BuildingMarker, MissionMarker } from 'typings/Ingame';

export default (LSSM: Vue) => {
    const callback = (...markers: (BuildingMarker | MissionMarker)[]) =>
        markers.forEach(marker => {
            const isBuildingMarker = 'building_id' in marker;
            const url = new URL(
                `/${isBuildingMarker ? 'buildings' : 'missions'}/${
                    isBuildingMarker ? marker.building_id : marker.mission_id
                }`,
                window.location.origin
            );
            const tooltip = marker.getTooltip();
            marker.unbindTooltip();
            marker.clearAllEventListeners();
            marker.addEventListener(
                'mouseup',
                ({ originalEvent: e }: LeafletMouseEvent) => {
                    if (e.ctrlKey || e.button === 1)
                        return window.open(url, '_blank', 'noopener');
                    window.lightboxOpen(url.toString());
                }
            );
            if (tooltip) {
                marker.bindTooltip(
                    tooltip.getContent()?.toString() ?? '',
                    tooltip.options
                );
            }
        });

    LSSM.$stores.root.hook({
        event: 'building_markers.push',
        callback,
    });

    LSSM.$stores.root.hook({
        event: 'mission_markers.push',
        callback,
    });

    callback(...window.building_markers, ...window.mission_markers);
};
