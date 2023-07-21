import type { Building } from 'typings/Building';
import type { ModuleMainFunction } from 'typings/Module';
import type { PointTuple } from 'leaflet';
import type { Vehicle } from 'typings/Vehicle';
import type { BuildingMarker, RadioMessage } from 'typings/Ingame';

export default (async ({ LSSM, MODULE_ID }) => {
    await LSSM.$stores.api.autoUpdateBuildings(MODULE_ID);
    await LSSM.$stores.api.autoUpdateVehicles(MODULE_ID);

    const vehicleTypes = LSSM.$stores.translations.vehicles;

    await LSSM.$stores.root.addStyle({
        selectorText: `.${LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}-vehiclelist`
        )} td`,
        style: {
            padding: '0.1rem',
        },
    });

    let vehiclesByBuilding: Record<number, Vehicle[]>;

    let buildings: Building[];

    const updateBuildings = () => {
        vehiclesByBuilding = LSSM.$stores.api.vehiclesByBuilding;
        buildings = LSSM.$stores.api.buildings;
    };

    updateBuildings();

    const buildingIcons = LSSM.$stores.translations.buildingIcons;

    const setTooltip = (marker?: BuildingMarker, presetBuilding?: Building) => {
        if (!marker) return;
        const hasTt = !!marker.getTooltip();
        const reopen = hasTt && marker.isTooltipOpen();
        if (hasTt && reopen) marker.closeTooltip();

        if (hasTt) marker.unbindTooltip();

        const vehicles = vehiclesByBuilding[marker.building_id] || [];
        vehicles.sort((a, b) =>
            a.caption > b.caption ? 1 : b.caption > a.caption ? -1 : 0
        );
        const building =
            presetBuilding ?? buildings.find(b => b.id === marker.building_id);

        let icon = 'sitemap';
        if (building)
            icon = buildingIcons[building.building_type] || 'building';

        let data = `<i class="fas fa-${icon}"></i>&nbsp;${
            !building ? `[${LSSM.$t('alliance')}]` : ''
        } ${marker.options.title}`;

        if (building) {
            if (
                LSSM.$stores.translations.vehicleBuildings.includes(
                    building.building_type
                )
            ) {
                data += `<br><i class="fa fa-parking"></i>&nbsp;${
                    building.level + 1
                }&nbsp;<i class="fa fa-car"></i>&nbsp;${
                    vehicles.length
                }&nbsp;<i class="fa fa-users"></i>&nbsp;${
                    building.personal_count
                }/${vehicles
                    .map(
                        ({ max_personnel_override, vehicle_type }) =>
                            max_personnel_override ??
                            vehicleTypes[vehicle_type]?.staff.max ??
                            0
                    )
                    .reduce((a, b) => a + b, 0)}`;
                if (
                    LSSM.$stores.translations.cellBuildings.includes(
                        building.building_type
                    )
                ) {
                    data += `&nbsp;<i class="fa fa-border-all"></i>&nbsp;${
                        building.extensions.filter(x => x.available).length
                    }&nbsp;(${building.extensions.length})`;
                }
                data += `<table class="${LSSM.$stores.root.nodeAttribute(
                    `${MODULE_ID}-vehiclelist`
                )}">`;
                vehicles.forEach(vehicle => {
                    data += `<tr><td><span class="building_list_fms building_list_fms_${
                        vehicle.fms_real
                    }">${vehicle.fms_show}</span></td><td>${
                        vehicle.caption
                    }</td><td>(&nbsp;${
                        vehicleTypes[vehicle.vehicle_type]?.caption ?? '🦄'
                    }${
                        vehicle.vehicle_type_caption
                            ? `&nbsp;<small>[&nbsp;${vehicle.vehicle_type_caption}&nbsp;]</small>`
                            : ``
                    }&nbsp;)</td></tr>`;
                });
                data += `</table>`;
            } else if (
                LSSM.$stores.translations.bedBuildings.includes(
                    building.building_type
                )
            ) {
                data += `<br><i class="fa fa-procedures"></i>&nbsp;${
                    building.level + 10
                }`;
            } else if (
                LSSM.$stores.translations.classroomBuildings.includes(
                    building.building_type
                )
            ) {
                data += `<br><i class="fa fa-chalkboard-teacher"></i>&nbsp;${
                    building.extensions.length + 1
                }`;
            }
        }

        marker.bindTooltip(data, {
            direction: 'top',
            offset: window.L.point(
                0,
                -(marker.options.icon?.options.iconSize as PointTuple)[1]
            ),
        });
        if (reopen) marker.openTooltip();
    };
    window.building_markers.forEach(marker => {
        setTooltip(marker);
    });

    LSSM.$stores.event.addListener({
        name: 'buildingMarkerAdd',
        listener({
            detail: { building },
        }: CustomEvent<{ building: Building }>) {
            updateBuildings();
            setTooltip(
                window.building_markers.find(
                    x => x.building_id === building.id
                ),
                building
            );
        },
    });

    LSSM.$stores.root.hook({
        event: 'building_maps_draw',
        callback({ id }: { id: number }) {
            updateBuildings();
            setTooltip(window.building_markers.find(x => x.building_id === id));
        },
    });

    LSSM.$stores.root.hook({
        event: 'radioMessage',
        callback(radioMessage: RadioMessage) {
            if (
                radioMessage.type !== 'vehicle_fms' ||
                radioMessage.user_id !== window.user_id
            )
                return;
            const { id, fms, fms_real } = radioMessage;
            const vehicle = LSSM.$stores.api.vehicles.find(v => v.id === id);
            if (!vehicle) return;
            updateBuildings();
            const v = vehiclesByBuilding[vehicle.building_id].find(
                v => v.id === vehicle.id
            );
            if (v) {
                v.fms_show = fms;
                v.fms_real = fms_real;
            }
            setTooltip(
                window.building_markers.find(
                    x => x.building_id === vehicle.building_id
                )
            );
        },
    });
}) as ModuleMainFunction;
