export default (LSSM: Vue): void => {
    const mission_info = document.getElementById('mission_general_info');
    if (!mission_info) return;
    const latitude = parseFloat(
        mission_info.getAttribute('data-latitude') ?? '0'
    );
    const longitude = parseFloat(
        mission_info.getAttribute('data-longitude') ?? '0'
    );
    const icon = document.querySelector('#missionH1 span.glyphicon');
    const centerImg = document.createElement('img');
    centerImg.src = '/images/icons8-location_off.svg';
    centerImg.style.cursor = 'pointer';
    centerImg.style.width = '1em';
    icon?.before(centerImg);
    centerImg.addEventListener('click', () =>
        LSSM.$store.dispatch('broadcast/send_custom_message', {
            name: 'center_map',
            handler(msg: CustomBroadcastMessage) {
                if (window.location.pathname !== '/') return;
                const lat = msg.data.lat as number;
                const lng = msg.data.lng as number;
                if (window.hasOwnProperty('mapkit')) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.map.setCenterAnimated(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        new window.mapkit.Coordinate(lat, lng)
                    );
                } else window.map.setView([lat, lng], window.map.getZoom());
            },
            data: {
                lat: latitude,
                lng: longitude,
            },
        })
    );
};
