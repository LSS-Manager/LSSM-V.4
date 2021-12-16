import 'leaflet.heat';

import { Building } from 'typings/Building';
import { ModuleMainFunction } from 'typings/Module';
import { Settings, UpdateSettings } from './heatmapSettings.vue';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'heatmap',
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
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

    let heatmapMode = settings.heatmapMode ?? 'buildings';
    const buildingsSettings = {
        staticRadius: settings.buildingsStaticRadius ?? false,
        radiusM: settings.buildingsRadiusM ?? 31_415,
        radiusPx: settings.buildingsRadiusPx ?? 50,
        includes: settings.buildingsIncludes ?? [],
    };
    const vehicleSettings = {
        staticRadius: settings.vehiclesStaticRadius ?? false,
        radiusM: settings.vehiclesRadiusM ?? 31_415,
        radiusPx: settings.vehiclesRadiusPx ?? 50,
        includes: settings.vehiclesIncludes ?? [],
    };

    const getSubsettings = () =>
        heatmapMode === 'buildings' ? buildingsSettings : vehicleSettings;

    const getLayerOptions = () => {
        const subsettings = getSubsettings();
        return {
            radius: subsettings.staticRadius
                ? subsettings.radiusPx
                : subsettings.radiusM / pxPerMeter(),
        };
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const heatLayer = window.L.heatLayer([], getLayerOptions()).addTo(
        window.map
    );

    window.map.on('zoomend', () => {
        heatLayer.setOptions(getLayerOptions());
        heatLayer.redraw();
    });

    const setData = () => {
        if (heatmapMode === 'buildings') {
            const buildingIds = buildingsSettings.includes.map(
                ({ value }) => value
            );
            const buildings = (LSSM.$store.state.api
                .buildings as Building[]).filter(({ building_type }) =>
                buildingIds.includes(building_type)
            );
            heatLayer.setLatLngs(
                buildings.map(
                    ({ latitude, longitude }) =>
                        new window.L.LatLng(
                            latitude,
                            longitude,
                            buildings.length
                        )
                )
            );
        } else {
            const vehicleIds = vehicleSettings.includes.map(
                ({ value }) => value
            );
            const buildingsById = Object.fromEntries(
                (LSSM.$store.state.api
                    .buildings as Building[]).map(
                    ({ id, latitude, longitude }) => [
                        id,
                        { latitude, longitude },
                    ]
                )
            );
            // heatLayer.setData(
            //     (LSSM.$store.state.api.vehicles as Vehicle[])
            //         .filter(({ vehicle_type }) =>
            //             vehicleIds.includes(vehicle_type)
            //         )
            //         .map(
            //             ({ building_id }) =>
            //                 new window.L.LatLng(
            //                     buildingsById[building_id].latitude,
            //                     buildingsById[building_id].longitude,
            //                     100
            //                 )
            //         )
            // );
        }
    };

    setData();

    const update: UpdateSettings = updated => {
        heatmapMode = updated.heatmapMode;
        buildingsSettings.staticRadius = updated.buildingsStaticRadius;
        buildingsSettings.radiusM = updated.buildingsRadiusM;
        buildingsSettings.radiusPx = updated.buildingsRadiusPx;
        buildingsSettings.includes = updated.buildingsIncludes;
        vehicleSettings.staticRadius = updated.vehiclesStaticRadius;
        vehicleSettings.radiusM = updated.vehiclesRadiusM;
        vehicleSettings.radiusPx = updated.vehiclesRadiusPx;
        vehicleSettings.includes = updated.vehiclesIncludes;

        setData();

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
                    { name: 'heatmap-settings', height: '90%' }
                )
            );
        });
});
