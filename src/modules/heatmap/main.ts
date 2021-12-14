import 'leaflet.heat';

import { Building } from 'typings/Building';
import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async LSSM => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'heatmap',
    });

    const pxPerMeter = () => {
        const CenterOfMap = window.map.getSize().y / 2;
        return (
            window.map
                .containerPointToLatLng([0, CenterOfMap])
                .distanceTo(
                    window.map.containerPointToLatLng([100, CenterOfMap])
                ) / 100
        );
    };

    const radius = 10_000; // in meters

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const heat = window.L.heatLayer(
        (LSSM.$store.state.api.buildings as Building[]).map(
            ({ latitude, longitude }) =>
                new window.L.LatLng(latitude, longitude, 100)
        ),
        { radius: radius / pxPerMeter() }
    ).addTo(window.map);

    window.map.on('zoomend', () => {
        heat.setOptions({ radius: radius / pxPerMeter() });
        heat.redraw();
    });
});
