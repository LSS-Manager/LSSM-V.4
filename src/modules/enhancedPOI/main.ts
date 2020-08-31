import { POI } from 'typings/modules/EnhancedPOI';
import { POIMarker } from 'typings/Ingame';
import { LayersControlEvent } from 'leaflet';
import multiSelect from '../../components/setting/multi-select.vue';
import { CreateElement } from 'vue';
import { VNodeData } from 'vue/types/vnode';

(async (LSSM: Vue) => {
    const poi_types = Object.values(LSSM.$t('pois')) as string[];

    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            predefined_style: {
                type: 'select',
                values: ['brown', 'red', 'green', 'white', 'custom'],
                default: 'white',
            },
            custom_style: {
                type: 'text',
                default: 'invert(100%)',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                disabled: (settings): boolean =>
                    settings[MODULE_ID]['predefined_style'].value !== 'custom',
            },
            shown_types: {
                type: 'multiSelect',
                default: poi_types,
                values: poi_types,
            },
        },
    });

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

    await LSSM.$store.dispatch('addStyle', {
        selectorText: `.poi.${poiHighlightedClass}`,
        style: {
            filter: style,
        },
    });

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

    const shown_types = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'shown_types',
    });

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
            form.after(settingsWrapper);
            const getProps = (pois: string[]) => ({
                name: 'shown_types',
                placeholder: LSSM.$t(
                    `modules.${MODULE_ID}.settings.shown_types.title`
                ),
                value: pois,
                options: poi_types.map(value => ({
                    label: value,
                    value,
                })),
            });
            const getRender = (h: CreateElement, pois: string[]) =>
                h(multiSelect, {
                    props: getProps(pois),
                    on: {
                        input(pois: string[]) {
                            settingsInstance.$options.render = h =>
                                getRender(h, pois);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            settingsInstance.$options.render(h);
                        },
                    },
                });
            const settingsInstance = new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h => getRender(h, poi_types),
            }).$mount(settingsWrapper);
        });
    });

    const buildingsElement = document.getElementById('buildings');
    buildingsElement && observer.observe(buildingsElement, { childList: true });
})(window[PREFIX] as Vue);
