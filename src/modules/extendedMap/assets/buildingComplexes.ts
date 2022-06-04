import type { Building } from 'typings/Building';
import type { LayerGroup } from 'leaflet';
import type { $m, $mc } from 'typings/Module';
import type { BuildingMarker, BuildingMarkerAdd } from 'typings/Ingame';

export interface Complex {
    name: string;
    buildings: string[];
    position: [number, number];
    icon: string;
    showMarkers: boolean;
    buildingTabs: boolean;
}

const replaceHostedImagesUrl = (url: string) =>
    url.replace(
        /^https:\/\/www\.leitstellenspiel\.de\/hostedimages/u,
        'https://leitstellenspiel.s3.amazonaws.com'
    );

export default async (
    MODULE_ID: string,
    LSSM: Vue,
    complexes: Complex[],
    $m: $m,
    $mc: $mc
) => {
    if (!window.map) return;

    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: `buildingComplexes`,
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: `buildingComplexes`,
    });

    const userBuildings: Record<number, Building> =
        LSSM.$store.getters['api/buildingsById'];

    const complexesLayer = window.L.layerGroup().addTo(window.map);
    const complexesBuildingsLayers: LayerGroup[] = [];
    const attachedMarkersList: BuildingMarker[][] = [];

    const allAttachedBuildings: string[] = [];

    const iterateComplex = (complex: Complex, index: number) => {
        complex.icon = replaceHostedImagesUrl(complex.icon);
        complex.buildingTabs ??= true;

        const { position, name, icon, buildings, showMarkers } = complex;
        const marker = window.L.marker(position, {
            zIndexOffset: 5000,
            title: name,
            icon: window.icon_empty,
        })
            .bindTooltip(name)
            .addTo(complexesLayer);

        window.iconMapGenerate(icon, marker);

        allAttachedBuildings.push(...buildings);

        const attachedBuildingsLayer = window.L.layerGroup();
        complexesBuildingsLayers.push(attachedBuildingsLayer);

        const attachedMarkers = window.building_markers.filter(
            ({ building_id }) => buildings.includes(building_id.toString())
        );
        attachedMarkersList.push(attachedMarkers);

        attachedMarkers.forEach(marker => {
            marker.remove();
            marker.addTo(attachedBuildingsLayer);
        });

        if (showMarkers) attachedBuildingsLayer.addTo(window.map);

        const modalName = `building-complex-${index}`;

        const showModal = () =>
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/extendedMap/components/buildingComplexes/buildingComplex" */ '../components/buildingComplexes/buildingComplex.vue'
                    ),
                {
                    complexIndex: index,
                    modalName,
                    complex: complexes[index],
                    allAttachedBuildings,
                    $m: <$m>(
                        ((key, args) => $m(`buildingComplexes.${key}`, args))
                    ),
                    $mc: <$mc>(
                        ((key, amount, args) =>
                            $mc(`buildingComplexes.${key}`, amount, args))
                    ),
                    updateComplex(updatedComplex: Complex) {
                        updatedComplex.icon = replaceHostedImagesUrl(
                            updatedComplex.icon
                        );

                        const removedBuildings = complexes[
                            index
                        ].buildings.filter(
                            id => !updatedComplex.buildings.includes(id)
                        );
                        const addedBuildings = updatedComplex.buildings.filter(
                            id => !complexes[index].buildings.includes(id)
                        );

                        complexes[index] = updatedComplex;

                        if (updatedComplex.icon !== icon)
                            window.iconMapGenerate(updatedComplex.icon, marker);

                        marker.unbindTooltip();
                        marker.bindTooltip(updatedComplex.name);
                        marker.setLatLng(updatedComplex.position);

                        if (updatedComplex.showMarkers)
                            attachedBuildingsLayer.addTo(window.map);
                        else attachedBuildingsLayer.remove();

                        removedBuildings.forEach(id => {
                            const attachedMarkerIndex =
                                attachedMarkers.findIndex(
                                    ({ building_id }) =>
                                        building_id.toString() === id
                                );
                            if (attachedMarkerIndex >= 0) {
                                const marker =
                                    attachedMarkers[attachedMarkerIndex];
                                attachedMarkers.splice(attachedMarkerIndex, 1);
                                marker.remove();
                                marker.addTo(
                                    window.map_filters_service.getFilterLayerByBuildingParams(
                                        {
                                            user_id: window.user_id,
                                            building_type:
                                                userBuildings[parseInt(id)]
                                                    .building_type,
                                        }
                                    )
                                );
                            }

                            const allAttachedBuildingsIndex =
                                allAttachedBuildings.findIndex(
                                    building => building === id
                                );
                            if (allAttachedBuildingsIndex >= 0) {
                                allAttachedBuildings.splice(
                                    allAttachedBuildingsIndex,
                                    1
                                );
                            }
                        });

                        allAttachedBuildings.push(...addedBuildings);

                        const addedBuildingMarkers =
                            window.building_markers.filter(({ building_id }) =>
                                addedBuildings.includes(building_id.toString())
                            );

                        addedBuildingMarkers.forEach(marker => {
                            marker.remove();
                            marker.addTo(attachedBuildingsLayer);
                        });

                        LSSM.$store
                            .dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'buildingComplexes',
                                value: {
                                    enabled: true,
                                    value: complexes,
                                },
                            })
                            .then(() => {
                                LSSM.$modal.hide(modalName);
                                showModal();
                            });
                    },
                    dissolve() {
                        complexes.splice(index, 1);
                        complexesBuildingsLayers.splice(index, 1);
                        attachedMarkersList[index].forEach(marker => {
                            marker.remove();
                            marker.addTo(
                                window.map_filters_service.getFilterLayerByBuildingParams(
                                    {
                                        user_id: window.user_id,
                                        building_type:
                                            userBuildings[marker.building_id]
                                                .building_type,
                                    }
                                )
                            );
                        });
                        marker.remove();
                        attachedMarkersList.splice(index, 1);
                        return LSSM.$store
                            .dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'buildingComplexes',
                                value: {
                                    enabled: true,
                                    value: complexes,
                                },
                            })
                            .then(() => LSSM.$modal.hide(modalName));
                    },
                },
                {
                    name: modalName,
                    height: '96%',
                    width: '96%',
                }
            );

        marker.on('click', () => showModal());

        return marker;
    };

    complexes.forEach(iterateComplex);

    LSSM.$store
        .dispatch('hook', {
            event: 'building_maps_draw',
            callback(marker: BuildingMarkerAdd) {
                if (!allAttachedBuildings.includes(marker.id.toString()))
                    return;
                const complexIndex = complexes.findIndex(({ buildings }) =>
                    buildings.includes(marker.id.toString())
                );
                const mapMarker = window.building_markers.find(
                    ({ building_id }) => marker.id === building_id
                );
                if (complexIndex < 0 || !mapMarker) return;

                attachedMarkersList[complexIndex].push(mapMarker);
                mapMarker.remove();
                mapMarker.addTo(complexesBuildingsLayers[complexIndex]);
            },
        })
        .then();

    const newComplexBtn = document.createElement('a');
    newComplexBtn.classList.add('btn', 'btn-xs', 'btn-default');
    newComplexBtn.textContent = $m('buildingComplexes.new').toString();

    newComplexBtn.addEventListener('click', e => {
        e.preventDefault();
        const newComplexIndex = complexes.length;
        const center = window.map.getCenter();
        const newComplex: Complex = {
            name: `#${newComplexIndex}`,
            buildings: [],
            position: [center.lat, center.lng],
            icon: '/images/building_complex.png',
            buildingTabs: true,
            showMarkers: false,
        };
        complexes.push(newComplex);

        iterateComplex(newComplex, newComplexIndex).fireEvent('click');
    });

    document
        .querySelector<HTMLDivElement>('#building_panel_heading .btn-group')
        ?.append(newComplexBtn);
};
