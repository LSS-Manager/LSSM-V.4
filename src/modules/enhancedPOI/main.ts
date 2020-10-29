import { POI } from 'typings/modules/EnhancedPOI';
import { POIMarker } from 'typings/Ingame';
import { LayersControlEvent } from 'leaflet';
import { $m, ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m: $m) => {
    const poi_types = Object.values(LSSM.$t('pois')) as string[];
    poi_types.sort();

    const style = await (async () => {
        const predef = await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'predefined_style',
        });
        if (predef === 'custom')
            return await LSSM.$store.dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'custom_style',
            });
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
        poi.bindTooltip(caption)
            .getElement()
            ?.setAttribute('caption', caption);
        poi.getElement()?.classList.add('poi');
    };

    let modifiedMarkers = false;

    const modifyMarkers = () =>
        LSSM.$store
            .dispatch('api/request', {
                url: '/mission_positions',
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

    await LSSM.$store.dispatch('hook', {
        event: 'map_pois_service.leafletMissionPositionMarkerAdd',
        callback({ caption, id }: POI) {
            const poi = window.map_pois_service
                .getMissionPoiMarkersArray()
                .find(m => m.id === id);
            if (!poi) return;
            poi.bindTooltip(caption);
            poi.getElement()?.setAttribute('caption', caption);
            poi.getElement()?.classList.add('poi');
        },
    });

    let isPOIWindow = false;

    const resetNewPoiMarker = () => {
        if (isPOIWindow) {
            window.mission_position_new_marker &&
                !window.map
                    .getBounds()
                    .contains(window.mission_position_new_marker.getLatLng()) &&
                window.mission_position_new_marker.setLatLng(
                    window.map.getCenter()
                ) &&
                window.mission_position_new_dragend();
        }
    };

    const poiHighlightedClass = LSSM.$store.getters.nodeAttribute(
        'poi-highlighted'
    );

    await LSSM.$store.dispatch('addStyles', [
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
        (document.querySelectorAll('.poi') as NodeListOf<
            HTMLImageElement
        >).forEach(el =>
            el.classList[
                el.getAttribute('caption') === caption ? 'add' : 'remove'
            ](poiHighlightedClass)
        );

    window.map.addEventListener('moveend', resetNewPoiMarker);
    window.map.addEventListener(
        'overlayadd',
        ({ name }: LayersControlEvent) =>
            !modifiedMarkers && name.match(/app-pois-filter/) && modifyMarkers()
    );

    let shown_types = (await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'shown_types',
        defaultValue: poi_types,
    })) as string[];

    const refresh_shown_pois = () => {
        const selector = shown_types
            .map(poi => `#map .poi[caption="${poi}"]`)
            .join(',');
        const extraStyleId = LSSM.$store.getters.nodeAttribute(
            'poi-hider-style'
        );
        document.getElementById(extraStyleId)?.remove();
        const style = document.createElement('style');
        style.id = extraStyleId;
        style.innerText = `${selector} {display: block !important;}`;
        document.body.append(style);
    };
    refresh_shown_pois();
    const paddingLeftPOI = [3, 4].includes(LSSM.$store.state.api.settings.design_mode) ? '25px' : '1ch';
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector(
                '#new_mission_position'
            );
            if (!form) {
                isPOIWindow = false;
                (document.querySelectorAll(
                    `.poi.${poiHighlightedClass}`
                ) as NodeListOf<HTMLImageElement>).forEach(el =>
                    el.classList.remove(poiHighlightedClass)
                );
                return;
            }
            if (isPOIWindow) return;
            isPOIWindow = true;

            colorMarkers(
                form.querySelector('option:checked')?.textContent || ''
            );
            form.querySelector(
                '#mission_position_poi_type'
            )?.addEventListener('change', e =>
                colorMarkers(
                    (e.target as HTMLSelectElement)?.querySelector(
                        'option:checked'
                    )?.textContent || ''
                )
            );
            const settingsWrapper = document.createElement('div');
            settingsWrapper.style.paddingLeft = paddingLeftPOI;
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
                            ? shown_types === []
                            : shown_types.includes(poi);
                    if (poi === 'all')
                        input.addEventListener('change', () => {
                            if (!input.checked) return;
                            shown_types = poi_types;
                            LSSM.$store.dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'shown_types',
                                value: shown_types,
                            });
                            refresh_shown_pois();
                            Array.from(
                                settingsWrapper.querySelectorAll(
                                    'input:not([name="all"]):not([name="none"])'
                                ) as NodeListOf<HTMLInputElement>
                            ).forEach(input => (input.checked = true));
                            Array.from(
                                settingsWrapper.querySelectorAll(
                                    'input[name="all"], input[name="none"]'
                                ) as NodeListOf<HTMLInputElement>
                            ).forEach(input => (input.checked = false));
                        });
                    else if (poi === 'none')
                        input.addEventListener('change', () => {
                            if (!input.checked) return;
                            shown_types = [];
                            LSSM.$store.dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'shown_types',
                                value: shown_types,
                            });
                            refresh_shown_pois();
                            Array.from(
                                settingsWrapper.querySelectorAll(
                                    'input:not([name="all"]):not([name="none"])'
                                ) as NodeListOf<HTMLInputElement>
                            ).forEach(input => (input.checked = false));
                            Array.from(
                                settingsWrapper.querySelectorAll(
                                    'input[name="all"], input[name="none"]'
                                ) as NodeListOf<HTMLInputElement>
                            ).forEach(input => (input.checked = false));
                        });
                    else
                        input.addEventListener('change', () => {
                            if (input.checked) shown_types.push(poi);
                            else
                                shown_types.splice(
                                    shown_types.findIndex(p => p === poi),
                                    1
                                );
                            shown_types.sort();
                            LSSM.$store.dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'shown_types',
                                value: shown_types,
                            });
                            refresh_shown_pois();
                        });
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

    const buildingsElement = document.getElementById('buildings');
    buildingsElement && observer.observe(buildingsElement, { childList: true });
}) as ModuleMainFunction;
