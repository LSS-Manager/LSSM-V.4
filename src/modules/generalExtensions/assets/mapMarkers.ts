export default async (
    LSSM: Vue,
    mapUndo: boolean,
    ownMapMarkers: boolean,
    getSetting: <returnType>(settingId: string) => Promise<returnType>,
    MODULE_ID: string
): Promise<void> => {
    LSSM.$store.commit('useFontAwesome');

    const historyBtnId = LSSM.$store.getters.nodeAttribute(
        'map-history-btn',
        true
    );
    const historyListId = LSSM.$store.getters.nodeAttribute(
        'map-history-list',
        true
    );
    const pinBtnId = LSSM.$store.getters.nodeAttribute(
        'map-history-pin-btn',
        true
    );

    await LSSM.$store.dispatch('addStyles', [
        {
            selectorText: `#${historyListId}`,
            style: {
                'display': 'none',
                'background-color': '#fff',
                'width': 'max-content',
                'list-style': 'none',
                'padding': '1ch',
                'transform': 'rotate(180deg)',
            },
        },
        {
            selectorText: `#${historyBtnId}:hover #${historyListId}, #${historyListId}.pinned`,
            style: {
                display: 'block',
                cursor: 'pointer',
            },
        },
        {
            selectorText: `#${pinBtnId}`,
            style: {
                position: 'absolute',
                left: '-1em',
                bottom: '-1em',
            },
        },
        {
            selectorText: `#${historyBtnId} #${historyListId} li, #${historyListId}.pinned #${pinBtnId}`,
            style: {
                transform: 'rotate(180deg)',
            },
        },
        {
            selectorText: `#${historyBtnId} #${historyListId} li:hover`,
            style: {
                'text-decoration': 'underline',
            },
        },
    ]);

    const history = [] as {
        lat: number;
        lng: number;
        zoom: number;
    }[];

    const historyBtn = await LSSM.$store.dispatch('addOSMControl', 'top-left');
    historyBtn.id = historyBtnId;

    const historyIcon = document.createElement('i');
    historyIcon.classList.add('fas', 'fa-history');
    historyBtn.appendChild(historyIcon);

    const historyList = document.createElement('ul');
    historyList.id = historyListId;

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('btn', 'btn-xs');
    pinBtn.id = pinBtnId;
    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fas', 'fa-thumbtack');
    pinBtn.addEventListener('click', () =>
        historyList.classList.toggle('pinned')
    );
    pinBtn.append(pinIcon);

    historyList.prepend(pinBtn);
    historyBtn.append(historyList);

    let currentPreviewTimeout = null as number | null;
    let currentAddressTimeout = null as number | null;

    let previewEnabled = false;

    let current = window.map.getCenter();
    let currentZoom = window.map.getZoom();

    let dontUndoPreview = false;

    const mapPreview = (target: HTMLSpanElement) => {
        previewEnabled = true;
        const { lat, lng, zoom } = JSON.parse(
            target.getAttribute('data-history') || '{}'
        );
        window.map.setView({ lat, lng }, zoom);

        const undoPreview = () => {
            target.removeEventListener('mouseout', undoPreview);
            previewEnabled = false;
            if (dontUndoPreview) return (dontUndoPreview = false);
            window.map.setView(current, currentZoom);
        };

        target.addEventListener('mouseout', undoPreview);
    };

    const updateHistoryList = (bookmark = false) => {
        const historyEntry = document.createElement('li');
        const historyText = document.createElement('span');
        const lastHistoryEntry = history[history.length - 1];
        historyText.textContent = `[${lastHistoryEntry.lat}, ${lastHistoryEntry.lng}] Zoom: ${lastHistoryEntry.zoom}`;
        historyText.setAttribute(
            'data-history',
            JSON.stringify(lastHistoryEntry)
        );
        const historyRemoveBtn = document.createElement('button');
        historyRemoveBtn.classList.add('btn', 'btn-danger', 'btn-xs');
        const historyRemoveIcon = document.createElement('i');
        historyRemoveIcon.classList.add('fas', 'fa-minus');
        historyRemoveBtn.addEventListener('click', () => {
            historyEntry.remove();
            if (bookmark) {
                ownMarkers.splice(
                    ownMarkers.findIndex(
                        ({ lat, lng, zoom }) =>
                            lat === lastHistoryEntry.lat &&
                            lng === lastHistoryEntry.lng &&
                            zoom === lastHistoryEntry.zoom
                    ),
                    1
                );
                LSSM.$store.dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: 'savedOwnMapMarkers',
                    value: ownMarkers,
                });
            }
        });

        historyRemoveBtn.appendChild(historyRemoveIcon);
        historyEntry.appendChild(historyText);
        historyEntry.appendChild(historyRemoveBtn);
        historyList.appendChild(historyEntry);
    };

    const ownMarkers =
        (await getSetting<typeof history>('savedOwnMapMarkers')) ?? [];

    if (ownMapMarkers) {
        const historyAddWrapper = document.createElement('button');
        historyAddWrapper.classList.add('btn', 'btn-success', 'btn-xs');
        const historyAddBtn = document.createElement('i');
        historyAddBtn.classList.add('fas', 'fa-plus');

        historyAddWrapper.addEventListener('click', () => {
            const center = window.map.getCenter();
            const entry = {
                lat: center.lat,
                lng: center.lng,
                zoom: window.map.getZoom(),
            };
            history.push(entry);
            ownMarkers.push(entry);

            LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'savedOwnMapMarkers',
                value: ownMarkers,
            });

            updateHistoryList();
        });

        historyAddWrapper.appendChild(historyAddBtn);
        historyList.appendChild(historyAddWrapper);

        ownMarkers.forEach(marker => {
            history.push(marker);
            updateHistoryList(true);
        });
    }

    const getAddress = (target: HTMLSpanElement) => {
        const { lat, lng, zoom } = JSON.parse(
            target.getAttribute('data-history') || '{}'
        );
        LSSM.$store
            .dispatch('api/request', {
                url: `/reverse_address?latitude=${lat}&longitude=${lng}`,
                feature: `${MODULE_ID}-mapMarkers`,
            })
            .then(res => res.text())
            .then(address => {
                target.textContent = `${address} (Zoom: ${zoom})`;
                target.setAttribute('data-address-resolved', 'true');
            });
    };

    historyBtn.addEventListener('mouseenter', () => {
        current = window.map.getCenter();
        currentZoom = window.map.getZoom();
    });

    historyList.addEventListener('mouseover', e => {
        const target = (e.target as HTMLElement).closest('li');
        if (!target) return;
        const span = target.querySelector<HTMLSpanElement>('span');
        if (!span) return;
        if (span.getAttribute('data-address-resolved') !== 'true') {
            currentAddressTimeout = window.setTimeout(
                () => getAddress(span),
                200
            );
        }
        currentPreviewTimeout = window.setTimeout(() => mapPreview(span), 500);
    });

    historyList.addEventListener('mouseout', e => {
        const target = (e.target as HTMLElement).closest('li');
        if (!target) return;
        if (currentAddressTimeout) window.clearTimeout(currentAddressTimeout);
        if (currentPreviewTimeout) window.clearTimeout(currentPreviewTimeout);
    });

    historyList.addEventListener('mouseup', e => {
        dontUndoPreview = true;
        const target = e.target as HTMLElement;
        if (target.tagName !== 'LI') return;
        const span = target.querySelector<HTMLSpanElement>('span');
        if (!span) return;
        const { lat, lng, zoom } = JSON.parse(
            span.getAttribute('data-history') || '{}'
        );
        previewEnabled = true;
        window.map.setView({ lat, lng }, zoom);
        previewEnabled = false;
    });

    if (mapUndo) {
        await LSSM.$store.dispatch('hookPrototype', {
            post: false,
            base: 'map',
            event: 'setView',
            callback(
                coordinates: [number, number] | { lat: number; lng: number },
                zoom = window.map.getZoom()
            ) {
                if (previewEnabled) return;
                let latExtract;
                let lngExtract;
                if (Array.isArray(coordinates)) {
                    latExtract = coordinates[0];
                    lngExtract = coordinates[1];
                } else {
                    return;
                } // This happens at Zoom – we don't want to log zooming currently
                const lat = latExtract;
                const lng = lngExtract;
                history.push({ lat, lng, zoom });
                updateHistoryList();
            },
        });
    }
};
