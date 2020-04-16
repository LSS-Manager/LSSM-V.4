const vehicleTypes = Object.values(window.lssmv4.$t('vehicles')).map(
    type => type.caption
);

document.head.insertAdjacentHTML(
    'beforeend',
    `<style type="text/css">.${window.lssmv4.$store.getters.nodeId(
        'buildingHover-vehiclelist'
    )} td {padding: 0.1rem;} body.dark .leaflet-tooltip-pane div {background-color: #505050; color: #fff;}</style>`
);

let setTooltip = marker => {
    if (!marker) return;
    let hasTt = !!marker.getTooltip();
    let reopen = hasTt && marker.isTooltipOpen();
    if (hasTt && reopen) marker.closeTooltip();

    if (hasTt) marker.unbindTooltip();

    let vehicles = window.lssmv4.$store.getters['api/vehiclesAtBuilding'](
        marker.building_id
    );
    vehicles.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    let building = window.lssmv4.$store.getters['api/buildingById'](
        marker.building_id
    ) || { building_type: -1, isAlliance: true };
    let icon =
        building.building_type === -1
            ? 'sitemap'
            : window.lssmv4.$t('modules.buildingHover.icons')[
                  building.building_type
              ] || 'building';
    let data = `<i class="fas fa-${icon}"></i>&nbsp;${
        building.isAlliance
            ? `[${window.lssmv4.$t('modules.buildingHover.alliance')}]`
            : ''
    } ${marker.options.title}`;

    if (!building.isAlliance) {
        if (
            Object.values(
                window.lssmv4.$t('modules.buildingHover.vehicleBuildings')
            ).indexOf(building.building_type) >= 0
        ) {
            data += `<br><i class="fa fa-parking"></i>&nbsp;${building.level +
                1}&nbsp;<i class="fa fa-car"></i>&nbsp;${
                vehicles.length
            }&nbsp;<i class="fa fa-users"></i>&nbsp;${building.personal_count}`;
            if (building.building_type === 6)
                data += `&nbsp;<i class="fa fa-border-all"></i>&nbsp;${
                    building.extensions.filter(x => x.available).length
                }&nbsp;(${building.extensions.length})`;
            data += `<table class="${window.lssmv4.$store.getters.nodeId(
                'buildingHover-vehiclelist'
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
            Object.values(
                window.lssmv4.$t('modules.buildingHover.bedBuildings')
            ).indexOf(building.building_type) >= 0
        ) {
            data += `<br><i class="fa fa-procedures"></i>&nbsp;${building.level +
                10}`;
        } else if (
            Object.values(
                window.lssmv4.$t('modules.buildingHover.schoolBuildings')
            ).indexOf(building.building_type) >= 0
        ) {
            data += `<br><i class="fa fa-chalkboard-teacher"></i>&nbsp;${building
                .extensions.length + 1}`;
        }
    }

    marker.bindTooltip(data, {
        direction: 'top',
        offset: window.L.point(0, -marker.options.icon.options.iconSize[1]),
        zIndex: 999,
    });
    if (reopen) marker.openTooltip();
};

window.lssmv4.$store.dispatch('api/buildings').then(() => {
    window.building_markers.forEach(marker => {
        setTooltip(marker);
    });
});

window.lssmv4.$store.dispatch('hook', {
    event: 'building_maps_draw',
    callback({ id }) {
        setTooltip(window.building_markers.find(x => x.building_id === id));
    },
});

window.lssmv4.$store.dispatch('hook', {
    event: 'radioMessage',
    callback({ id }) {
        let vehicle = window.lssmv4.$store.getters['api/vehicleById'](id);
        vehicle &&
            setTooltip(
                window.building_markers.find(
                    x => x.building_id === vehicle.building_id
                )
            );
    },
});
