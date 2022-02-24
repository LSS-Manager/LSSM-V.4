import 'leaflet.heat';

import type { Building } from 'typings/Building';
import type { ModuleMainFunction } from 'typings/Module';
import type { Vehicle } from 'typings/Vehicle';
import type { LatLng, Map } from 'leaflet';
import type { Settings, UpdateSettings } from './heatmapSettings.vue';

interface HeatLayer {
    setLatLngs(points: LatLng[]): void;
}

export default <ModuleMainFunction>(async ({ LSSM, MODULE_ID, $m }) => {
    if (window.location.pathname === '/' && window.hasOwnProperty('mapkit'))
        return;

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

    const pxPerMeter = (map: Map) => {
        const CenterOfMap = map.getSize().y / 2;
        return (
            map
                .containerPointToLatLng([0, CenterOfMap])
                .distanceTo(map.containerPointToLatLng([100, CenterOfMap])) /
            100
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

    const getLayerOptions = (map: Map) => {
        const subsettings = getSubsettings();
        return {
            radius: subsettings.staticRadius
                ? subsettings.radiusPx
                : subsettings.radiusM / pxPerMeter(map),
            maxZoom: window.map.getMaxZoom() - subsettings.intensityMaxZoom,
        };
    };

    const setData = (heatLayer: HeatLayer) => {
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

    const update: (map: Map, heatLayer: HeatLayer) => UpdateSettings =
        (map: Map, heatLayer: HeatLayer) => updated => {
            heatmapMode = updated.heatmapMode;
            buildingsSettings.staticRadius = updated.buildingsStaticRadius;
            buildingsSettings.radiusM = updated.buildingsRadiusM;
            buildingsSettings.radiusPx = updated.buildingsRadiusPx;
            buildingsSettings.intensityMaxZoom =
                updated.buildingsIntensityMaxZoom;
            buildingsSettings.includes = updated.buildingsIncludes;
            vehicleSettings.staticRadius = updated.vehiclesStaticRadius;
            vehicleSettings.radiusM = updated.vehiclesRadiusM;
            vehicleSettings.radiusPx = updated.vehiclesRadiusPx;
            vehicleSettings.intensityMaxZoom = updated.vehiclesIntensityMaxZoom;
            vehicleSettings.includes = updated.vehiclesIncludes;

            setData(heatLayer);

            map.fireEvent('zoomend');
        };

    const initHeatmap = (map: Map) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const heatLayer = window.L.heatLayer([], getLayerOptions(map));

        map.on('zoomend', () => {
            heatLayer.setOptions(getLayerOptions(map));
        });

        LSSM.$store
            .dispatch('addOSMControl', {
                mapId: map.getContainer().id,
                position: settings.position ?? 'bottom-left',
            })
            .then((control: HTMLAnchorElement) => {
                control.id =
                    LSSM.$store.getters.nodeAttribute('heatmap-control');

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
                        !(e.target as HTMLElement | null)?.closest(
                            '.dropdown-menu'
                        )
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

                const backgroundStyle = document.createElement('style');
                backgroundStyle.textContent = `#modals-container .vm--container.scrollable:first-of-type {
                    pointer-events: none;
                }
                #modals-container .vm--container .vm--overlay[data-modal="heatmap-settings"] {
                    display: none;
                }
                #modals-container .vm--container .vm--overlay[data-modal="heatmap-settings"] + .vm--modal {
                    pointer-events: all;
                }`;

                settingsBtn.addEventListener('click', () =>
                    LSSM.$modal.show(
                        () =>
                            import(
                                /* webpackChunkName: "modules/heatmap/settings" */ './heatmapSettings.vue'
                            ),
                        {
                            setSetting,
                            getModuleSettings,
                            updateSettings: update(map, heatLayer),
                            $m,
                        },
                        {
                            name: 'heatmap-settings',
                            height: 'auto',
                            draggable: true,
                            clickToClose: false,
                            shiftX: 0.98,
                            shiftY: 0.1,
                        },
                        {
                            'before-open': () =>
                                document.head.append(backgroundStyle),
                            'closed': () => backgroundStyle.remove(),
                        }
                    )
                );

                toggleCheckbox.addEventListener('change', () => {
                    heatLayer[toggleCheckbox.checked ? 'addTo' : 'removeFrom'](
                        map
                    );
                    if (toggleCheckbox.checked) setData(heatLayer);
                    setSetting('active', toggleCheckbox.checked).then();
                });

                if (settings.active) {
                    toggleCheckbox.checked = true;
                    toggleCheckbox.dispatchEvent(new Event('change'));
                }
            });
    };

    if (window.location.pathname === '/' && window.map) initHeatmap(window.map);

    if (window.location.pathname.startsWith(`/profile/${window.user_id}`)) {
        if (window.map) initHeatmap(window.map);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener(
            'lssmv4-map-loaded',
            ({ detail: { map } }: CustomEvent<{ id: string; map: Map }>) =>
                initHeatmap(map)
        );
    }
});
