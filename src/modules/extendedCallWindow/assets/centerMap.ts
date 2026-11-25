interface CenterMapData {
    lat: number;
    lng: number;
}

/**
 * The main page centers its map on a mission when a mission window asks for it.
 * @param LSSM - The LSSM instance of the main page.
 */
export const registerCenterMapHandler = (LSSM: Vue) =>
    LSSM.$stores.broadcast.on<CenterMapData>('center_map', ({ lat, lng }) => {
        if (window.location.pathname !== '/') return;
        if (window.hasOwnProperty('mapkit')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.map.setCenterAnimated(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                new window.mapkit.Coordinate(lat, lng)
            );
        } else {
            window.map.setView([lat, lng], window.map.getZoom());
        }
    });

export default (LSSM: Vue): void => {
    const mission_info = document.querySelector<HTMLDivElement>(
        '#mission_general_info'
    );
    if (!mission_info) return;
    const latitude = parseFloat(
        mission_info.getAttribute('data-latitude') ?? '0'
    );
    const longitude = parseFloat(
        mission_info.getAttribute('data-longitude') ?? '0'
    );
    const icon = document.querySelector<HTMLSpanElement>(
        '#missionH1 span.glyphicon'
    );
    const centerImg = document.createElement('img');
    centerImg.src = '/images/icons8-location_off.svg';
    centerImg.style.cursor = 'pointer';
    centerImg.style.width = '1em';
    icon?.before(centerImg);
    centerImg.addEventListener('click', () =>
        LSSM.$stores.broadcast.send<CenterMapData>('center_map', {
            lat: latitude,
            lng: longitude,
        })
    );
};
