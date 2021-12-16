import 'leaflet.heat';

import { Building } from 'typings/Building';
import { ModuleMainFunction } from 'typings/Module';
import { Settings, UpdateSettings } from './heatmapSettings.vue';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'heatmap',
    });

    const setSetting = <T>(settingId: string, value: T): Promise<void> =>
        LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId,
            value,
        });

    const getModuleSettings = (): Promise<Settings> =>
        LSSM.$store.dispatch('settings/getModule', MODULE_ID);

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

    const settings = await getModuleSettings();

    let radiusM = settings.radiusM ?? 31_415; // in meters

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const heatLayer = window.L.heatLayer(
        (LSSM.$store.state.api.buildings as Building[]).map(
            ({ latitude, longitude }) =>
                new window.L.LatLng(latitude, longitude, 100)
        ),
        { radius: radiusM / pxPerMeter() }
    ).addTo(window.map);

    window.map.on('zoomend', () => {
        heatLayer.setOptions({ radius: radiusM / pxPerMeter() });
        heatLayer.redraw();
    });

    const update: UpdateSettings = newRadiusM => {
        radiusM = newRadiusM;

        window.map.fireEvent('zoomend');
    };

    LSSM.$store
        .dispatch('addOSMControl', { position: 'bottom-left' })
        .then((control: HTMLAnchorElement) => {
            control.addEventListener('click', () =>
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/heatmap/settings" */ './heatmapSettings.vue'
                        ),
                    {
                        heatLayer,
                        setSetting,
                        getModuleSettings,
                        updateSettings: update,
                    },
                    { name: 'heatmap-settings', height: 'auto' }
                )
            );
        });
});
