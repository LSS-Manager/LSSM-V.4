import { MissionPositionMarkerParam } from '../../../typings/Ingame';

((LSSM: Vue) => {
    LSSM.$store.dispatch('hook', {
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
})(window[PREFIX] as Vue);
