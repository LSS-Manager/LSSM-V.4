export default (
    position: 'bottomleft' | 'bottomright' | 'topleft' | 'topright'
) => {
    const container = window.L.control
        .scale({ position })
        .addTo(window.map)
        .getContainer();
    const metric = container?.querySelector<HTMLDivElement>(
        '.leaflet-control-scale-line'
    );
    if (!container || !metric) return;
    const zoom = document.createElement('div');
    zoom.style.setProperty('position', 'absolute');
    zoom.style.setProperty('rotate', '-90deg');
    zoom.style.setProperty('translate', '-2rem');
    zoom.style.setProperty('bottom', '0');
    zoom.innerHTML = `<br>${window.map.getZoom()}`;
    if (position.includes('left'))
        container.style.setProperty('translate', '2rem');
    metric.after(zoom);
    window.map.on('zoomstart zoom zoomend', () => {
        zoom.innerHTML = `<br>${window.map.getZoom()}`;
    });
};
