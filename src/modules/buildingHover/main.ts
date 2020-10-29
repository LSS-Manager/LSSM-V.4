import { BuildingMarker, RadioMessage } from '../../../typings/Ingame';
import { Vehicle } from '../../../typings/Vehicle';
import { PointTuple } from 'leaflet';
import { Building } from '../../../typings/Building';
import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', true);
    await LSSM.$store.dispatch('api/registerVehiclesUsage', true);

    const vehicleTypes = Object.values(LSSM.$t('vehicles')).map(
        type => type.caption
    );

    await LSSM.$store.dispatch('addStyle', {
        selectorText: `.${LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}-vehiclelist`
        )} td`,
        style: {
            padding: '0.1rem',
        },
    });

    LSSM.$store.commit('useFontAwesome');

    const vehiclesByBuilding = LSSM.$store.getters[
        'api/vehiclesByBuilding'
    ] as {
        [buildingId: number]: Vehicle[];
    };

    const buildings = LSSM.$store.state.api.buildings as Building[];

    const buildingIcons = (LSSM.$t('buildingIcons') as unknown) as string[];

    const setTooltip = (marker: BuildingMarker | undefined) => {
        if (!marker) return;
        const hasTt = !!marker.getTooltip();
        const reopen = hasTt && marker.isTooltipOpen();
        if (hasTt && reopen) marker.closeTooltip();

        if (hasTt) marker.unbindTooltip();

        const vehicles = vehiclesByBuilding[marker.building_id] || [];
        vehicles.sort((a, b) =>
            a.caption > b.caption ? 1 : b.caption > a.caption ? -1 : 0
        );
        const building = buildings.find(b => b.id === marker.building_id);

        let icon = 'sitemap';
        if (building)
            icon = buildingIcons[building.building_type] || 'building';

        let data = `<i class="fas fa-${icon}"></i>&nbsp;${
            !building ? `[${LSSM.$t('alliance')}]` : ''
        } ${marker.options.title}`;

        if (building) {
            if (
                Object.values(LSSM.$t('vehicleBuildings')).indexOf(
                    building.building_type
                ) >= 0
            ) {
                data += `<br><i class="fa fa-parking"></i>&nbsp;${building.level +
                    1}&nbsp;<i class="fa fa-car"></i>&nbsp;${
                    vehicles.length
                }&nbsp;<i class="fa fa-users"></i>&nbsp;${
                    building.personal_count
                }`;
                if(Object.values(LSSM.$t('cellBuildings')).includes(building.building_type))
                    data += `&nbsp;<i class="fa fa-border-all"></i>&nbsp;${
                        building.extensions.filter(x => x.available).length
                    }&nbsp;(${building.extensions.length})`;
                data += `<table class="${LSSM.$store.getters.nodeAttribute(
                    `${MODULE_ID}-vehiclelist`
                )}">`;
                vehicles.forEach(vehicle => {
                    data += `<tr><td><span class="building_list_fms building_list_fms_${
                        vehicle.fms_real
                    }">${vehicle.fms_show}</span></td><td>${
                        vehicle.caption
                    }</td><td>(&nbsp;${vehicleTypes[vehicle.vehicle_type]}${
                        vehicle.vehicle_type_caption
                            ? `&nbsp;<small>[&nbsp;${vehicle.vehicle_type_caption}&nbsp;]</small>`
                            : ``
                    }&nbsp;)</td></tr>`;
                });
                data += `</table>`;
            } else if (
                Object.values(LSSM.$t('bedBuildings')).indexOf(
                    building.building_type
                ) >= 0
            ) {
                data += `<br><i class="fa fa-procedures"></i>&nbsp;${building.level +
                    10}`;
            } else if (
                Object.values(LSSM.$t('schoolBuildings')).indexOf(
                    building.building_type
                ) >= 0
            ) {
                data += `<br><i class="fa fa-chalkboard-teacher"></i>&nbsp;${building
                    .extensions.length + 1}`;
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

    await LSSM.$store.dispatch('hook', {
        event: 'building_maps_draw',
        callback({ id }: { id: number }) {
            setTooltip(window.building_markers.find(x => x.building_id === id));
        },
    });

    await LSSM.$store.dispatch('hook', {
        event: 'radioMessage',
        callback(radioMessage: RadioMessage) {
            if (
                radioMessage.type !== 'vehicle_fms' ||
                radioMessage.user_id !== window.user_id
            )
                return;
            const { id, fms, fms_real } = radioMessage;
            const vehicle = (LSSM.$store.state.api.vehicles as Vehicle[]).find(
                v => v.id === id
            ) as Vehicle;
            if (!vehicle) return;
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
