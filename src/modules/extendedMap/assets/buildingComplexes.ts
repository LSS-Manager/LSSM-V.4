import type { $m, $mc, ModuleMainFunction } from 'typings/Module';
import type { BuildingMarker, BuildingMarkerAdd } from 'typings/Ingame';
import type { LayerGroup, Marker } from 'leaflet';

export interface Complex {
    name: string;
    buildings: string[];
    allianceBuildings: string[];
    position: [number, number];
    icon: string;
    showMarkers: boolean;
    buildingsInList: boolean;
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

const buildingListHideStyle = document.createElement('style');

export default async (
    MODULE_ID: string,
    LSSM: Vue,
    complexes: Complex[],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m,
    $mc: $mc
) => {
    if (!window.map) return;

    await LSSM.$stores.api.getAllianceBuildings('buildingComplexes');
    await LSSM.$stores.api.getAllianceInfo('buildingComplexes');
    await LSSM.$stores.api.getBuildings('buildingComplexes');
    await LSSM.$stores.api.getSchoolings('buildingComplexes');
    await LSSM.$stores.api.getVehicles('buildingComplexes');

    const save = () =>
        setSetting('buildingComplexes', {
            enabled: true,
            value: complexes,
        });

    const updateBuildingListHideStyle = () =>
        (buildingListHideStyle.textContent = `${complexes
            .filter(({ buildingsInList }) => !buildingsInList)
            .flatMap(({ buildings }) =>
                buildings
                    .map(building => `#building_list_caption_${building}`)
                    .flatMap(bs => [bs, `${bs} ~ *`])
            )
            .join(', ')} {display: none !important;}`);
    updateBuildingListHideStyle();
    document.head.append(buildingListHideStyle);

    const userBuildings = LSSM.$stores.api.buildingsById;

    const complexesLayer = window.L.layerGroup().addTo(window.map);
    const complexMarkers: Marker[] = [];
    const complexesBuildingsLayers: LayerGroup[] = [];
    const attachedMarkersList: BuildingMarker[][] = [];

    const allAttachedBuildings: string[] = [];
    const allAttachedAllianceBuildings: string[] = [];
    const allComplexLocations: { icon: string; location: [number, number] }[] =
        [];

    const detailButtonClass = LSSM.$stores.root.nodeAttribute(
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

    const constructMissingBuildingElements = () => {
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
        if (
            window.buildingMarkerBulkContentCache.length &&
            document.querySelector<HTMLDivElement>('#building_list')
        )
            window.buildingMarkerBulkContentCacheDraw();
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

    LSSM.$stores.root.hook({
        event: 'toggleVehicleBuilding',
        post: false,
        abortOnFalse: true,
        callback(id: number | string) {
            return parseInt(id.toString()) >= 0;
        },
    });

    const newComplexBtn = document.createElement('a');
    newComplexBtn.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}_building-complexes_new-complex`
    );
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
            buildingsInList: false,
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

    let buildingMarkerBulkContentCacheLSSMCache: string[] = [];

    LSSM.$stores.root.hook({
        event: 'buildingMarkerBulkContentCacheDraw',
        post: false,
        callback() {
            buildingMarkerBulkContentCacheLSSMCache =
                window.buildingMarkerBulkContentCache
                    .map(
                        html =>
                            html.match(/(?<=building_list_caption_)-\d+/u)?.[0]
                    )
                    .filter(<S>(value: S | undefined): value is S => !!value);
            if (
                !document.querySelector<HTMLAnchorElement>(
                    `#${newComplexBtn.id}`
                )
            ) {
                document
                    .querySelector<HTMLDivElement>(
                        '#building_panel_heading .btn-group'
                    )
                    ?.append(newComplexBtn);
            }
        },
    });
    LSSM.$stores.root.hook({
        event: 'buildingMarkerBulkContentCacheDraw',
        callback() {
            constructMissingBuildingElements();
            // sort the buildings list
            const getName = (element: HTMLElement) =>
                element
                    .querySelector<HTMLAnchorElement>('.map_position_mover')
                    ?.textContent?.trim() ?? '';
            buildingMarkerBulkContentCacheLSSMCache.forEach(complexId => {
                const element = document.querySelector<HTMLDivElement>(
                    `#building_list_caption_${complexId}`
                )?.parentElement;
                if (!element) return;
                const name = getName(element);
                Array.from(
                    document.querySelectorAll<HTMLLIElement>(
                        '#building_list > .building_list_li'
                    )
                )
                    .find(el => getName(el).localeCompare(name) > 0)
                    ?.before(element);
            });
        },
    });

    LSSM.$stores.root.addStyle({
        selectorText: `#buildings [building_type_id="${COMPLEX_TYPE_ID}"] :is(.hidden_vehicle_list_caption, .building_list_vehicles)`,
        style: {
            display: 'none !important',
        },
    });

    const showModal = (index: number) => {
        const modalName = `building-complex-${index}`;
        const marker = complexMarkers[index];
        const attachedBuildingsLayer = complexesBuildingsLayers[index];
        const attachedMarkers = attachedMarkersList[index];

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
                complexLocations: allComplexLocations,
                $m: <$m>((key, args) => $m(`buildingComplexes.${key}`, args)),
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
                            id => !updatedComplex.allianceBuildings.includes(id)
                        ),
                    ];
                    const addedBuildings = [
                        ...updatedComplex.buildings.filter(
                            id => !complexes[index].buildings.includes(id)
                        ),
                        ...updatedComplex.allianceBuildings.filter(
                            id =>
                                !complexes[index].allianceBuildings.includes(id)
                        ),
                    ];

                    const oldIcon = complexes[index].icon;

                    complexes[index] = updatedComplex;
                    allComplexLocations[index] = {
                        icon: updatedComplex.icon,
                        location: updatedComplex.position,
                    };

                    if (updatedComplex.icon !== oldIcon)
                        window.iconMapGenerate(updatedComplex.icon, marker);

                    marker.unbindTooltip();
                    marker.bindTooltip(updatedComplex.name);
                    marker.setLatLng(updatedComplex.position);

                    if (updatedComplex.showMarkers)
                        attachedBuildingsLayer.addTo(window.map);
                    else attachedBuildingsLayer.remove();

                    removedBuildings.forEach(id => {
                        const attachedMarkerIndex = attachedMarkers.findIndex(
                            ({ building_id }) => building_id.toString() === id
                        );
                        if (attachedMarkerIndex >= 0) {
                            const marker = attachedMarkers[attachedMarkerIndex];
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
                            allAttachedBuildings.indexOf(id);
                        if (allAttachedBuildingsIndex >= 0) {
                            allAttachedBuildings.splice(
                                allAttachedBuildingsIndex,
                                1
                            );
                        }
                    });

                    allAttachedBuildings.push(...addedBuildings);

                    const addedBuildingMarkers = window.building_markers.filter(
                        ({ building_id }) =>
                            addedBuildings.includes(building_id.toString())
                    );

                    addedBuildingMarkers.forEach(marker => {
                        marker.remove();
                        marker.addTo(attachedBuildingsLayer);
                    });

                    document
                        .querySelector<HTMLDivElement>(
                            `#building_list_caption_${getComplexId(index)}`
                        )
                        ?.parentElement?.remove();
                    constructMissingBuildingElements();

                    updateBuildingListHideStyle();

                    save().then(() => {
                        LSSM.$modal.hide(modalName);
                        showModal(index);
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
                    complexMarkers.splice(index, 1);
                    attachedMarkersList.splice(index, 1);
                    document
                        .querySelector<HTMLDivElement>(
                            `#building_list_caption_${getComplexId(index)}`
                        )
                        ?.parentElement?.remove();
                    for (let i = index; i < complexes.length; i++) {
                        complexMarkers[i]
                            .clearAllEventListeners()
                            .on('click', () => showModal(i));
                        document
                            .querySelector<HTMLDivElement>(
                                `#building_list_caption_${getComplexId(i + 1)}`
                            )
                            ?.parentElement?.remove();
                    }
                    constructMissingBuildingElements();
                    return save().then(() => LSSM.$modal.hide(modalName));
                },
            },
            {
                name: modalName,
                height: '96%',
                width: '96%',
            }
        );
    };

    const iterateComplex = (complex: Complex, index: number) => {
        complex.icon = replaceHostedImagesUrl(complex.icon);
        complex.buildingTabs ??= true;
        complex.buildingsInList ??= false;
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
        allComplexLocations.push({ icon, location: position });

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

        marker.on('click', () => showModal(index));

        constructBuildingListElement(complex, index);

        return marker;
    };

    complexes.forEach(iterateComplex);
    window.buildingMarkerBulkContentCacheDraw();

    LSSM.$stores.root.hook({
        event: 'building_maps_draw',
        callback(marker: BuildingMarkerAdd) {
            if (!allAttachedBuildings.includes(marker.id.toString())) return;
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
    });
};
