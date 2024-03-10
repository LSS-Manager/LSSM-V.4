import type { ModuleMainFunction } from 'typings/Module';

export default async (
    LSSM: Vue,
    mapUndo: boolean,
    ownMapMarkers: boolean,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    MODULE_ID: string
): Promise<void> => {
    const historyBtnId = LSSM.$stores.root.nodeAttribute(
        'map-history-btn',
        true
    );
    const historyContainerId = LSSM.$stores.root.nodeAttribute(
        'map-history-container',
        true
    );
    const historyListId = LSSM.$stores.root.nodeAttribute(
        'map-history-list',
        true
    );
    const pinBtnId = LSSM.$stores.root.nodeAttribute(
        'map-history-pin-btn',
        true
    );
    const addBtnId = LSSM.$stores.root.nodeAttribute(
        'map-history-add-btn',
        true
    );

    LSSM.$stores.root.addStyles([
        {
            selectorText: `#${historyContainerId}`,
            style: {
                'display': 'none',
                'z-index': 1,
                'width': 'max-content',
                'position': 'absolute',
            },
        },
        {
            selectorText: `#${historyListId}`,
            style: {
                'background-color': '#fff',
                'width': 'max-content',
                'list-style': 'none',
                'padding': '1em',
                'max-height': '100%',
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                'cursor': 'pointer',
            },
        },
        {
            selectorText: `#${historyBtnId}:hover #${historyContainerId}, #${historyContainerId}.pinned`,
            style: {
                display: 'block',
            },
        },
        {
            selectorText: `#${pinBtnId}`,
            style: {
                position: 'absolute',
                left: '-1em',
                top: '-1em',
            },
        },
        {
            selectorText: `#${addBtnId}`,
            style: {
                position: 'absolute',
                right: '-1em',
                top: '-1em',
            },
        },
        {
            selectorText: `#${historyContainerId}.pinned #${pinBtnId}`,
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
        title?: string;
    }[];

    const historyBtn = await LSSM.$stores.root.addOSMControl({
        position: 'top-left',
    });
    historyBtn.id = historyBtnId;

    const historyIcon = document.createElement('i');
    historyIcon.classList.add('fas', 'fa-history');
    historyBtn.append(historyIcon);

    const historyContainer = document.createElement('div');
    historyContainer.id = historyContainerId;

    const historyList = document.createElement('ul');
    historyList.id = historyListId;

    historyList.addEventListener('wheel', e => e.stopPropagation());
    historyList.addEventListener('drag', e => e.stopPropagation());

    const pinBtn = document.createElement('button');
    pinBtn.classList.add('btn', 'btn-xs');
    if (await getSetting<boolean>('mapMarkerPinned'))
        historyContainer.classList.add('pinned');
    pinBtn.id = pinBtnId;
    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fas', 'fa-thumbtack');
    pinBtn.addEventListener('click', () => {
        historyContainer.classList.toggle('pinned');
        setSetting(
            'mapMarkerPinned',
            historyContainer.classList.contains('pinned')
        );
    });
    pinBtn.append(pinIcon);

    historyContainer.append(pinBtn, historyList);
    historyBtn.append(historyContainer);

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
        const lastHistoryEntry = history.at(-1);

        if (!lastHistoryEntry) return;

        const ownMarkerIndex = ownMarkers.findIndex(
            ({ lat, lng, zoom }) =>
                lat === lastHistoryEntry.lat &&
                lng === lastHistoryEntry.lng &&
                zoom === lastHistoryEntry.zoom
        );

        historyText.textContent =
            lastHistoryEntry.title ??
            `[${lastHistoryEntry.lat}, ${lastHistoryEntry.lng}] Zoom: ${lastHistoryEntry.zoom}`;
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
                ownMarkers.splice(ownMarkerIndex, 1);
                setSetting('savedOwnMapMarkers', ownMarkers);
            }
        });

        historyRemoveBtn.append(historyRemoveIcon);
        historyEntry.append(historyText, historyRemoveBtn);

        if (bookmark) {
            historyText.setAttribute('data-address-resolved', 'true');

            const historyEditBtn = document.createElement('button');
            historyEditBtn.classList.add('btn', 'btn-xs', 'btn-default');
            const historyEditIcon = document.createElement('i');
            historyEditIcon.classList.add('fas', 'fa-pen-to-square');

            const saveBtn = document.createElement('button');
            saveBtn.classList.add('btn', 'btn-xs', 'btn-success', 'hidden');
            const saveIcon = document.createElement('i');
            saveIcon.classList.add('fas', 'fa-floppy-disk');

            historyEditBtn.addEventListener('click', () => {
                saveBtn.classList.remove('hidden');
                historyEditBtn.classList.add('hidden');

                historyText.setAttribute('contenteditable', 'true');
                historyText.focus();
            });
            saveBtn.addEventListener('click', () => {
                historyEditBtn.classList.remove('hidden');
                saveBtn.classList.add('hidden');
                ownMarkers[ownMarkerIndex].title =
                    historyText.textContent ?? '';
                setSetting('savedOwnMapMarkers', ownMarkers);
                historyText.removeAttribute('contenteditable');
            });
            historyText.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveBtn.dispatchEvent(new Event('click'));
                }
            });

            historyEditBtn.append(historyEditIcon);
            saveBtn.append(saveIcon);
            historyEntry.append(historyEditBtn, saveBtn);
        }

        historyList.prepend(historyEntry);
    };

    const ownMarkers =
        (await getSetting<typeof history>('savedOwnMapMarkers')) ?? [];

    if (ownMapMarkers) {
        const historyAddBtn = document.createElement('button');
        historyAddBtn.classList.add('btn', 'btn-success', 'btn-xs');
        const historyAddIcon = document.createElement('i');
        historyAddIcon.classList.add('fas', 'fa-plus');
        historyAddBtn.id = addBtnId;

        historyAddBtn.addEventListener('click', () => {
            const center = window.map.getCenter();
            const entry = {
                lat: center.lat,
                lng: center.lng,
                zoom: window.map.getZoom(),
            };
            history.push(entry);
            ownMarkers.push(entry);

            setSetting('savedOwnMapMarkers', ownMarkers);

            updateHistoryList();
        });

        historyAddBtn.append(historyAddIcon);
        historyContainer.append(historyAddBtn);

        ownMarkers.forEach(marker => {
            history.push(marker);
            updateHistoryList(true);
        });
    }

    const getAddress = (target: HTMLSpanElement) => {
        const { lat, lng, zoom } = JSON.parse(
            target.getAttribute('data-history') || '{}'
        );
        LSSM.$stores.api
            .request(
                `/reverse_address?latitude=${lat}&longitude=${lng}`,
                `${MODULE_ID}-mapMarkers`
            )
            .then(res => res.text())
            .then(address => {
                target.textContent = `${address} (Zoom: ${zoom})`;
                target.setAttribute('data-address-resolved', 'true');
            });
    };

    const updateHistoryListHeight = () => {
        const mapBottom =
            document.querySelector('map')?.getBoundingClientRect().bottom ??
            620;
        const listTop = historyList.getBoundingClientRect().top;

        historyList.style.setProperty(
            'max-height',
            `${mapBottom - listTop - 10}px`
        );
    };

    historyBtn.addEventListener('mouseenter', () => {
        current = window.map.getCenter();
        currentZoom = window.map.getZoom();

        updateHistoryListHeight();
    });

    updateHistoryListHeight();

    historyList.addEventListener('mouseover', e => {
        const target = (e.target as HTMLElement).closest('li');
        if (!target || (e.target as HTMLElement).closest('button.btn-default'))
            return;
        const span = target.querySelector<HTMLSpanElement>('span');
        if (!span || span.getAttribute('contenteditable') === 'true') return;
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
        if (!span || span.getAttribute('contenteditable') === 'true') return;
        const { lat, lng, zoom } = JSON.parse(
            span.getAttribute('data-history') || '{}'
        );
        previewEnabled = true;
        window.map.setView({ lat, lng }, zoom);
        previewEnabled = false;
    });

    if (mapUndo) {
        LSSM.$stores.root.proxyMethod({
            post: false,
            name: 'map.setView',
            trap: 'apply',
            callback(
                _: unknown,
                __: unknown,
                [coordinates, zoom = window.map.getZoom()]: [
                    { lat: number; lng: number } | [number, number],
                    number,
                ]
            ) {
                if (previewEnabled) return;
                let latExtract;
                let lngExtract;
                if (Array.isArray(coordinates))
                    [latExtract, lngExtract] = coordinates;
                else return;
                // This happens at Zoom – we don't want to log zooming currently
                const lat = latExtract;
                const lng = lngExtract;
                history.push({ lat, lng, zoom });
                updateHistoryList();
            },
        });
    }
};
