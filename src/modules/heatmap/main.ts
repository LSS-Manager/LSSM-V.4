import 'leaflet.heat';

import { Building } from 'typings/Building';
import { LatLng } from 'leaflet';
import { ModuleMainFunction } from 'typings/Module';
import { Vehicle } from 'typings/Vehicle';
import { Settings, UpdateSettings } from './heatmapSettings.vue';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID, $m) => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: 'heatmap',
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: 'heatmap',
    });

    LSSM.$store.commit('useFontAwesome');

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
        intensityMaxZoom:
            settings.buildingsIntensityMaxZoom ?? window.map.getMaxZoom(),
        includes: settings.buildingsIncludes ?? [],
    };
    const vehicleSettings = {
        staticRadius: settings.vehiclesStaticRadius ?? false,
        radiusM: settings.vehiclesRadiusM ?? 31_415,
        radiusPx: settings.vehiclesRadiusPx ?? 50,
        intensityMaxZoom:
            settings.vehiclesIntensityMaxZoom ?? window.map.getMaxZoom(),
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
            maxZoom: window.map.getMaxZoom() - subsettings.intensityMaxZoom,
        };
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const heatLayer = window.L.heatLayer([], getLayerOptions());

    window.map.on('zoomend', () => {
        heatLayer.setOptions(getLayerOptions());
    });

    const setData = () => {
        const buildings = LSSM.$store.state.api.buildings as Building[];
        const buildingsById = Object.fromEntries(
            buildings.map(({ id, latitude, longitude }) => [
                id,
                { latitude, longitude },
            ])
        );

        const points: LatLng[] = [];

        if (heatmapMode === 'buildings') {
            const includedIds = buildingsSettings.includes.map(
                ({ value }) => value
            );
            buildings.forEach(
                ({ building_type, latitude, longitude, extensions }) => {
                    const point = new window.L.LatLng(latitude, longitude, 0);
                    if (includedIds.includes(building_type.toString()))
                        point.alt = (point.alt ?? 0) + 1;

                    extensions.forEach(({ caption }) => {
                        if (includedIds.includes(`${building_type}-${caption}`))
                            point.alt = (point.alt ?? 0) + 1;
                    });
                    if (point.alt) points.push(point);
                }
            );
        } else {
            const vehicleTypes = vehicleSettings.includes.map(
                ({ value }) => value
            );
            (LSSM.$store.state.api.vehicles as Vehicle[]).forEach(
                ({ building_id, vehicle_type, vehicle_type_caption = '' }) => {
                    if (
                        !(
                            vehicleTypes.includes(vehicle_type.toString()) ||
                            (vehicle_type_caption &&
                                vehicleTypes.includes(
                                    `[${vehicle_type}] ${vehicle_type_caption}`
                                ))
                        )
                    )
                        return;
                    const { latitude, longitude } = buildingsById[building_id];
                    const point = points.find(
                        ({ lat, lng }) => lat === latitude && lng === longitude
                    );
                    if (point) {
                        point.alt = (point.alt ?? 0) + 1;
                    } else {
                        points.push(
                            new window.L.LatLng(latitude, longitude, 1)
                        );
                    }
                }
            );
        }

        heatLayer.setLatLngs(points);
    };

    const update: UpdateSettings = updated => {
        heatmapMode = updated.heatmapMode;
        buildingsSettings.staticRadius = updated.buildingsStaticRadius;
        buildingsSettings.radiusM = updated.buildingsRadiusM;
        buildingsSettings.radiusPx = updated.buildingsRadiusPx;
        buildingsSettings.intensityMaxZoom = updated.buildingsIntensityMaxZoom;
        buildingsSettings.includes = updated.buildingsIncludes;
        vehicleSettings.staticRadius = updated.vehiclesStaticRadius;
        vehicleSettings.radiusM = updated.vehiclesRadiusM;
        vehicleSettings.radiusPx = updated.vehiclesRadiusPx;
        vehicleSettings.intensityMaxZoom = updated.vehiclesIntensityMaxZoom;
        vehicleSettings.includes = updated.vehiclesIncludes;

        setData();

        window.map.fireEvent('zoomend');
    };

    LSSM.$store
        .dispatch('addOSMControl', {
            position: settings.position ?? 'bottom-left',
        })
        .then((control: HTMLAnchorElement) => {
            control.id = LSSM.$store.getters.nodeAttribute('heatmap-control');

            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-layer-group');

            const dropup = document.createElement('ul');
            dropup.classList.add('dropdown-menu');
            if (settings.position.includes('right'))
                dropup.classList.add('dropdown-menu-right');

            const settingsLi = document.createElement('li');
            const settingsBtn = document.createElement('button');
            settingsBtn.classList.add('btn', 'btn-default', 'btn-xs');
            settingsLi.append(settingsBtn);
            const settingsIcon = document.createElement('i');
            settingsIcon.classList.add('fas', 'fa-cogs');
            settingsBtn.append(settingsIcon);

            const toggleLi = document.createElement('li');
            toggleLi.classList.add('checkbox');
            const toggleLabel = document.createElement('label');
            toggleLabel.textContent = $m('enable').toString();
            const toggleCheckbox = document.createElement('input');
            toggleCheckbox.type = 'checkbox';
            toggleLabel.prepend(toggleCheckbox);
            toggleLi.append(toggleLabel);

            dropup.append(settingsLi, toggleLi);

            control.append(icon, dropup);

            control.addEventListener('click', e => {
                if (
                    !(e.target as HTMLElement | null)?.closest('.dropdown-menu')
                )
                    control.classList.toggle('open');
            });

            LSSM.$store.dispatch('addStyles', [
                {
                    selectorText: `#${control.id}`,
                    style: {
                        cursor: 'pointer',
                    },
                },
                {
                    selectorText: `#${control.id} ul`,
                    style: {
                        'top': 'auto',
                        'bottom': settings.position.includes('bottom')
                            ? '100%'
                            : 'unset',
                        'margin-bottom': '2px',
                    },
                },
                {
                    selectorText: `#${control.id}.open ul`,
                    style: {
                        display: 'block !important',
                    },
                },
                {
                    selectorText: `#${control.id}.open ul li`,
                    style: {
                        'padding-left': '1rem',
                    },
                },
                {
                    selectorText: `#${control.id}.open ul li.checkbox`,
                    style: {
                        margin: '0',
                    },
                },
            ]);

            settingsBtn.addEventListener('click', () =>
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/heatmap/settings" */ './heatmapSettings.vue'
                        ),
                    {
                        setSetting,
                        getModuleSettings,
                        updateSettings: update,
                        $m,
                    },
                    { name: 'heatmap-settings', height: '90%' }
                )
            );

            toggleCheckbox.addEventListener('change', () => {
                heatLayer[toggleCheckbox.checked ? 'addTo' : 'removeFrom'](
                    window.map
                );
                if (toggleCheckbox.checked) setData();
                setSetting('active', toggleCheckbox.checked).then();
            });

            if (settings.active) {
                toggleCheckbox.checked = true;
                toggleCheckbox.dispatchEvent(new Event('change'));
            }
        });
});
