export default async (LSSM: Vue): Promise<void> => {
    LSSM.$store.commit('useFontAwesome');

    const historyBtnId = LSSM.$store.getters.nodeAttribute(
        'map-history-btn',
        true
    );
    const historyListId = LSSM.$store.getters.nodeAttribute(
        'map-history-list',
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
            selectorText: `#${historyBtnId}:hover #${historyListId}`,
            style: {
                display: 'block',
                cursor: 'pointer',
            },
        },
        {
            selectorText: `#${historyBtnId} #${historyListId} li`,
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

    historyBtn.appendChild(historyList);

    let currentPreviewTimeout = null as number | null;
    let currentAddressTimeout = null as number | null;

    let previewEnabled = false;

    let current = window.map.getCenter();
    let currentZoom = window.map.getZoom();

    let dontUndoPreview = false;

    const mapPreview = (target: HTMLLIElement) => {
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

    const updateHistoryList = () => {
        const historyEntry = document.createElement('li');
        const lastHistoryEntry = history[history.length - 1];
        historyEntry.textContent = `[${lastHistoryEntry.lat}, ${lastHistoryEntry.lng}] Zoom: ${lastHistoryEntry.zoom}`;
        historyEntry.setAttribute(
            'data-history',
            JSON.stringify(lastHistoryEntry)
        );
        historyList.appendChild(historyEntry);
    };

    const getAddress = (target: HTMLLIElement) => {
        const { lat, lng, zoom } = JSON.parse(
            target.getAttribute('data-history') || '{}'
        );
        LSSM.$store
            .dispatch('api/request', {
                url: `/reverse_address?latitude=${lat}&longitude=${lng}`,
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
        const target = e.target as HTMLElement;
        if (target.tagName !== 'LI') return;
        if (target.getAttribute('data-address-resolved') !== 'true')
            currentAddressTimeout = window.setTimeout(
                () => getAddress(target as HTMLLIElement),
                200
            );
        currentPreviewTimeout = window.setTimeout(
            () => mapPreview(target as HTMLLIElement),
            500
        );
    });

    historyList.addEventListener('mouseout', e => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'LI') return;
        if (currentAddressTimeout) window.clearTimeout(currentAddressTimeout);
        if (currentPreviewTimeout) window.clearTimeout(currentPreviewTimeout);
    });

    historyList.addEventListener('mouseup', e => {
        dontUndoPreview = true;
        const target = e.target as HTMLElement;
        if (target.tagName !== 'LI') return;
        const { lat, lng, zoom } = JSON.parse(
            target.getAttribute('data-history') || '{}'
        );
        previewEnabled = true;
        window.map.setView({ lat, lng }, zoom);
        previewEnabled = false;
    });

    await LSSM.$store.dispatch('hookPrototype', {
        post: false,
        base: 'map',
        event: 'setView',
        callback(
            coordinates: [number, number] | { lat: number; lng: number },
            zoom: number
        ) {
            if (previewEnabled) return;
            let latExtract;
            let lngExtract;
            if (Array.isArray(coordinates)) {
                latExtract = coordinates[0];
                lngExtract = coordinates[1];
            } else return; // This happens at Zoom – we don't want to log zooming currently
            const lat = latExtract;
            const lng = lngExtract;
            zoom = zoom ?? window.map.getZoom();
            history.push({ lat, lng, zoom });
            updateHistoryList();
        },
    });
};
