import type { LeafletMouseEvent } from 'leaflet';
import type { BuildingMarker, MissionMarker } from 'typings/Ingame';

export default (LSSM: Vue) => {
    const callback = <MarkerType extends BuildingMarker | MissionMarker>(
        ...markers: MarkerType[]
    ) =>
        markers.forEach(marker => {
            const url = new URL(
                `/${'building_id' in marker ? 'buildings' : 'missions'}/${
                    'building_id' in marker
                        ? marker.building_id
                        : marker.mission_id
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

    LSSM.$store
        .dispatch('hook', {
            event: 'building_markers.push',
            callback,
        })
        .then(() => callback(...window.building_markers));

    LSSM.$store
        .dispatch('hook', {
            event: 'mission_markers.push',
            callback,
        })
        .then(() => callback(...window.mission_markers));
};
