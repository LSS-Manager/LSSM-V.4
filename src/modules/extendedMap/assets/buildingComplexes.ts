import type { Building } from 'typings/Building';
import type { $m, $mc } from 'typings/Module';
import type { BuildingMarker, BuildingMarkerAdd } from 'typings/Ingame';
import type { LayerGroup, Marker } from 'leaflet';

export interface Complex {
    name: string;
    buildings: string[];
    allianceBuildings: string[];
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

const COMPLEX_ID_START = Number.MIN_SAFE_INTEGER;
const COMPLEX_TYPE_ID = COMPLEX_ID_START;
const COMPLEX_LEITSTELLE_ID = COMPLEX_ID_START;

const getComplexId = (index: number) => COMPLEX_ID_START + index;

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
    await LSSM.$store.dispatch('api/registerAllianceBuildingsUsage', {
        feature: `buildingComplexes`,
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: `buildingComplexes`,
    });
    await LSSM.$store.dispatch('api/registerAllianceinfoUsage', {
        feature: `buildingComplexes`,
    });

    const save = () =>
        LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'buildingComplexes',
            value: {
                enabled: true,
                value: complexes,
            },
        });

    const userBuildings: Record<number, Building> =
        LSSM.$store.getters['api/buildingsById'];

    const complexesLayer = window.L.layerGroup().addTo(window.map);
    const complexMarkers: Marker[] = [];
    const complexesBuildingsLayers: LayerGroup[] = [];
    const attachedMarkersList: BuildingMarker[][] = [];

    const allAttachedBuildings: string[] = [];
    const allAttachedAllianceBuildings: string[] = [];

    const detailButtonClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-buildingComplex-buildingList-detailBtn`
    );
    const detailButtonTemplate = document.createElement('a');
    detailButtonTemplate.classList.add(
        detailButtonClass,
        'btn',
        'btn-default',
        'btn-xs',
        'pull-right'
    );
    detailButtonTemplate.textContent = $m(
        'buildingComplexes.buildingList.details'
    ).toString();

    const constructBuildingListElement = (complex: Complex, index: number) => {
        const specificDetailBtn = detailButtonTemplate.cloneNode(
            true
        ) as HTMLAnchorElement;
        specificDetailBtn.dataset.complexIndex = index.toString();

        const complexMarkerAdd: BuildingMarkerAdd = {
            user_id: window.user_id,
            building_type: COMPLEX_TYPE_ID,
            icon: complex.icon,
            id: getComplexId(index),
            name: complex.name,
            latitude: complex.position[0],
            longitude: complex.position[1],
            lbid: COMPLEX_LEITSTELLE_ID,
            filter_id: 'lssm_complex',
            detail_button: specificDetailBtn.outerHTML,
            level: 0,
            vgi: null,
            personal_count: 0,
            show_vehicles_at_startpage: false,
        };

        // This is funny, because constructBuildingListElement calls
        // getBuildingMarkerIcon too but for some weird reason,
        // it gives the wrong icon...
        complexMarkerAdd.icon = window.getBuildingMarkerIcon(complexMarkerAdd);

        window.constructBuildingListElement(complexMarkerAdd);
    };

    document
        .querySelector<HTMLDivElement>('#buildings')
        ?.addEventListener('click', e => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;
            const complexDetailBtn = target.closest<HTMLAnchorElement>(
                `.${detailButtonClass}[data-complex-index]`
            );
            if (!complexDetailBtn) return;
            const complexIndex = parseInt(
                complexDetailBtn.dataset.complexIndex ?? 'NaN'
            );
            if (!Number.isNaN(complexIndex))
                complexMarkers[complexIndex].fireEvent('click');
        });

    LSSM.$store
        .dispatch('hook', {
            event: 'toggleVehicleBuilding',
            post: false,
            abortOnFalse: true,
            callback(id: number | string) {
                return parseInt(id.toString()) >= 0;
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'buildingMarkerBulkContentCacheDraw',
            post: true,
            callback() {
                complexes.forEach((complex, index) => {
                    const complexId = getComplexId(index);
                    if (
                        document.querySelector<HTMLDivElement>(
                            `#building_list #building_list_caption_${complexId}`
                        )
                    )
                        return;
                    if (
                        window.buildingMarkerBulkContentCache.some(html =>
                            html.includes(`building_type_id="${complexId}"`)
                        )
                    )
                        return;
                    constructBuildingListElement(complex, index);
                });
            },
        })
        .then();

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `#buildings [building_type_id="${COMPLEX_TYPE_ID}"] :is(.hidden_vehicle_list_caption, .building_list_vehicles)`,
            style: {
                display: 'none !important',
            },
        })
        .then();

    const iterateComplex = (complex: Complex, index: number) => {
        complex.icon = replaceHostedImagesUrl(complex.icon);
        complex.buildingTabs ??= true;
        complex.allianceBuildings ??= [];

        const {
            position,
            name,
            icon,
            buildings,
            showMarkers,
            allianceBuildings,
        } = complex;
        const marker = window.L.marker(position, {
            zIndexOffset: 5000,
            title: name,
            icon: window.icon_empty,
        })
            .bindTooltip(name)
            .addTo(complexesLayer);

        window.iconMapGenerate(icon, marker);

        complexMarkers.push(marker);

        allAttachedBuildings.push(...buildings);
        allAttachedAllianceBuildings.push(...allianceBuildings);

        const attachedBuildingsLayer = window.L.layerGroup();
        complexesBuildingsLayers.push(attachedBuildingsLayer);

        const attachedMarkers = window.building_markers.filter(
            ({ building_id }) =>
                buildings.includes(building_id.toString()) ||
                allianceBuildings.includes(building_id.toString())
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
                    allAttachedAllianceBuildings,
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

                        const removedBuildings = [
                            ...complexes[index].buildings.filter(
                                id => !updatedComplex.buildings.includes(id)
                            ),
                            ...complexes[index].allianceBuildings.filter(
                                id =>
                                    !updatedComplex.allianceBuildings.includes(
                                        id
                                    )
                            ),
                        ];
                        const addedBuildings = [
                            ...updatedComplex.buildings.filter(
                                id => !complexes[index].buildings.includes(id)
                            ),
                            ...updatedComplex.allianceBuildings.filter(
                                id =>
                                    !complexes[
                                        index
                                    ].allianceBuildings.includes(id)
                            ),
                        ];

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

                        save().then(() => {
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
                        document
                            .querySelector<HTMLDivElement>(
                                `#building_list_caption_${getComplexId(index)}`
                            )
                            ?.parentElement?.remove();
                        return save().then(() => LSSM.$modal.hide(modalName));
                    },
                },
                {
                    name: modalName,
                    height: '96%',
                    width: '96%',
                }
            );

        marker.on('click', () => showModal());

        constructBuildingListElement(complex, index);

        return marker;
    };

    complexes.forEach(iterateComplex);
    window.buildingMarkerBulkContentCacheDraw();

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
            allianceBuildings: [],
            position: [center.lat, center.lng],
            icon: '/images/building_complex.png',
            buildingTabs: true,
            showMarkers: false,
        };
        complexes.push(newComplex);

        save().then(() => {
            iterateComplex(newComplex, newComplexIndex).fireEvent('click');
            window.buildingMarkerBulkContentCacheDraw();
        });
    });

    document
        .querySelector<HTMLDivElement>('#building_panel_heading .btn-group')
        ?.append(newComplexBtn);
};
