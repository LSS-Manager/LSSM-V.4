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
    zoom.style.setProperty('transform', `rotate(-90deg) translateY(-2rem)`);
    zoom.style.setProperty('bottom', '0');
    zoom.style.setProperty('color', '#333');
    zoom.innerHTML = `<br>${window.map.getZoom()}`;
    if (position.includes('left'))
        container.style.setProperty('transform', 'translateX(1rem)');
    metric.after(zoom);
    window.map.on('zoomstart zoom zoomend', () => {
        zoom.innerHTML = `<br>${window.map.getZoom()}`;
    });
};
