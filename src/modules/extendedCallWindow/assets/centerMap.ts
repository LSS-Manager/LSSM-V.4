export default (LSSM: Vue): void => {
    const [
        _,
        __,
        lat,
        lng,
    ] = (window.vehicleDistanceCalculate as () => void)
        .toString()
        .match(
            /(?<=vehicleDistance\([01](, \d+\.\d+){2}, )(\d+\.\d+), (\d+\.\d+)(?=, [01], sonderrechte\))/
        ) as string[];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
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
