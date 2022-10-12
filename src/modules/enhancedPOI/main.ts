import type { LayersControlEvent } from 'leaflet';
import type { ModuleMainFunction } from 'typings/Module';
import type { POI } from 'typings/modules/EnhancedPOI';
import type { POIMarker } from 'typings/Ingame';

export default (async ({ LSSM, MODULE_ID, $m, getSetting, setSetting }) => {
    const poi_types = Object.values(LSSM.$t('pois')) as string[];
    poi_types.sort();

    await LSSM.$stores.api.getSettings(MODULE_ID);

    const style = await (async () => {
        const predef = await getSetting<string>('predefined_style');
        if (predef === 'custom')
            return await getSetting<string>('custom_style');

        switch (predef) {
            case 'brown':
                return 'sepia(100%) contrast(500%)';
            case 'red':
                return 'sepia(100%) contrast(5000%)';
            case 'green':
                return 'sepia(100%) contrast(500%) hue-rotate(100deg)';
            default:
                return 'contrast(500%) brightness(60%) invert(100%)';
        }
    })();

    const modifyMarker = (poi: POIMarker, caption: string) => {
        poi.bindTooltip(caption).getElement()?.setAttribute('caption', caption);
        poi.getElement()?.classList.add('poi');
    };

    let modifiedMarkers = false;
    let lastSavedPOIType: string = await getSetting<string>(
        'lastSavedPOIType',
        ''
    );

    const modifyMarkers = () =>
        LSSM.$stores.api
            .request({
                url: '/mission_positions',
                feature: MODULE_ID,
            })
            .then(res => res.json())
            .then(
                ({
                    mission_positions: pois,
                }: {
                    mission_positions: POI[] | null;
                }) => {
                    if (pois) {
                        window.map_pois_service
                            .getMissionPoiMarkersArray()
                            .forEach(marker => {
                                const poi = pois.find(p => p.id === marker.id);
                                if (poi) modifyMarker(marker, poi.caption);
                            });
                        modifiedMarkers = true;
                    }
                }
            );

    await modifyMarkers();

    LSSM.$stores.root.hook({
        event: 'map_pois_service.leafletMissionPositionMarkerAdd',
        callback({ caption, id }: POI) {
            const poi = window.map_pois_service
                .getMissionPoiMarkersArray()
                .find(m => m.id === id);
            if (!poi) return;
            poi.getElement()?.setAttribute('caption', caption);
            poi.getElement()?.classList.add('poi');
        },
    });

    let isPOIWindow = false;

    const resetNewPoiMarker = () => {
        if (isPOIWindow) {
            if (
                window.mission_position_new_marker &&
                !window.map
                    .getBounds()
                    .contains(window.mission_position_new_marker.getLatLng()) &&
                window.mission_position_new_marker.setLatLng(
                    window.map.getCenter()
                )
            )
                window.mission_position_new_dragend();
        }
    };

    const poiHighlightedClass =
        LSSM.$stores.root.nodeAttribute('poi-highlighted');
    const poiSettingsWrapperId = LSSM.$stores.root.nodeAttribute(
        'poi-settings',
        true
    );

    LSSM.$stores.root.addStyles([
        {
            selectorText: `#map .poi`,
            style: {
                display: 'none',
            },
        },
        {
            selectorText: `#map .poi.${poiHighlightedClass}`,
            style: {
                filter: style,
            },
        },
    ]);

    const colorMarkers = (caption: string) =>
        document
            .querySelectorAll<HTMLImageElement>('.poi')
            .forEach(el =>
                el.classList[
                    el.getAttribute('caption') === caption ? 'add' : 'remove'
                ](poiHighlightedClass)
            );

    window.map.addEventListener('moveend', resetNewPoiMarker);
    window.map.addEventListener(
        'overlayadd',
        ({ name }: LayersControlEvent) =>
            !modifiedMarkers &&
            name.match(/app-pois-filter/u) &&
            modifyMarkers()
    );

    let shown_types = await getSetting<string[]>('shown_types', poi_types);

    const refresh_shown_pois = () => {
        const selector = shown_types
            .map(poi => `#map .poi[caption="${poi}"]`)
            .join(',');
        const extraStyleId = LSSM.$stores.root.nodeAttribute(
            'poi-hider-style',
            true
        );
        document.querySelector<HTMLStyleElement>(`#${extraStyleId}`)?.remove();
        const style = document.createElement('style');
        style.id = extraStyleId;
        style.textContent = `${selector} {display: block !important;}`;
        document.body.append(style);
    };
    refresh_shown_pois();
    const paddingLeftPOI = [3, 4].includes(
        LSSM.$stores.api.settings?.design_mode ?? 0
    )
        ? '25px'
        : '1ch';
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector(
                '#new_mission_position[action="/mission_positions"]'
            );
            if (!form) {
                isPOIWindow = false;
                document
                    .querySelectorAll<HTMLImageElement>(
                        `.poi.${poiHighlightedClass}`
                    )
                    .forEach(el => el.classList.remove(poiHighlightedClass));
                return;
            }
            if (
                isPOIWindow &&
                document.querySelector<HTMLDivElement>(
                    `#${poiSettingsWrapperId}`
                )
            )
                return;
            isPOIWindow = true;

            const poiTypeSelect = form.querySelector<HTMLSelectElement>(
                '#mission_position_poi_type'
            );

            if (poiTypeSelect) {
                colorMarkers(
                    poiTypeSelect.querySelector('option:checked')
                        ?.textContent || ''
                );

                poiTypeSelect.value = lastSavedPOIType;

                poiTypeSelect.addEventListener('change', () => {
                    colorMarkers(
                        poiTypeSelect.querySelector('option:checked')
                            ?.textContent || ''
                    );
                    setSetting('lastSavedPOIType', poiTypeSelect.value);
                    lastSavedPOIType = poiTypeSelect.value;
                });

                poiTypeSelect.dispatchEvent(new Event('change'));
            }
            const settingsWrapper = document.createElement('div');
            settingsWrapper.style.paddingLeft = paddingLeftPOI;
            settingsWrapper.id = poiSettingsWrapperId;
            form.append(settingsWrapper);
            settingsWrapper.append(
                ...['all', 'none', ...poi_types].map(poi => {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('form-group', 'boolean', 'optional');
                    const label = document.createElement('label');
                    label.classList.add('boolean', 'optional', 'checkbox');
                    const input = document.createElement('input');
                    input.classList.add('boolean', 'optional');
                    input.type = 'checkbox';
                    input.name = poi;
                    input.checked =
                        poi === 'all'
                            ? shown_types === poi_types
                            : poi === 'none'
                            ? !shown_types.length
                            : shown_types.includes(poi);
                    if (poi === 'all') {
                        input.addEventListener('change', () => {
                            if (!input.checked) return;
                            shown_types = poi_types;
                            setSetting('shown_types', shown_types);
                            refresh_shown_pois();
                            Array.from(
                                settingsWrapper.querySelectorAll<HTMLInputElement>(
                                    'input:not([name="all"]):not([name="none"])'
                                )
                            ).forEach(input => (input.checked = true));
                            Array.from(
                                settingsWrapper.querySelectorAll<HTMLInputElement>(
                                    'input[name="all"], input[name="none"]'
                                )
                            ).forEach(input => (input.checked = false));
                        });
                    } else if (poi === 'none') {
                        input.addEventListener('change', () => {
                            if (!input.checked) return;
                            shown_types = [];
                            setSetting('shown_types', shown_types);
                            refresh_shown_pois();
                            Array.from(
                                settingsWrapper.querySelectorAll<HTMLInputElement>(
                                    'input:not([name="all"]):not([name="none"])'
                                )
                            ).forEach(input => (input.checked = false));
                            Array.from(
                                settingsWrapper.querySelectorAll<HTMLInputElement>(
                                    'input[name="all"], input[name="none"]'
                                )
                            ).forEach(input => (input.checked = false));
                        });
                    } else {
                        input.addEventListener('change', () => {
                            if (input.checked) shown_types.push(poi);
                            else
                                shown_types.splice(shown_types.indexOf(poi), 1);

                            shown_types.sort();
                            setSetting('shown_types', shown_types);
                            refresh_shown_pois();
                        });
                    }
                    label.textContent =
                        poi === 'all'
                            ? $m('all').toString()
                            : poi === 'none'
                            ? $m('none').toString()
                            : poi;
                    label.prepend(input);
                    wrapper.append(label);
                    return wrapper;
                })
            );
        });
    });

    const buildingsElement =
        document.querySelector<HTMLDivElement>('#buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });
}) as ModuleMainFunction;
