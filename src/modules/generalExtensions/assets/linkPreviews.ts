import linkPreview from '../components/linkPreview.vue';

import type { CombinedVueInstance } from 'vue/types/vue';
import type { DefaultProps } from 'vue/types/options';
import type {
    LinkPreview,
    LinkPreviewComputed,
    LinkPreviewMethods,
} from 'typings/modules/GeneralExtensions/LinkPreview';

export default async (
    LSSM: Vue,
    previews: string[],
    MODULE_ID: string
): Promise<void> => {
    await LSSM.$stores.api.getBuildings(`${MODULE_ID}-linkPreviews`);
    await LSSM.$stores.api.getVehicles(`${MODULE_ID}-linkPreviews`);

    const previewLinkClass = LSSM.$stores.root.nodeAttribute('is-previewLink');
    const attrSelectors = previews.map(
        p => `a[href^="/${p}/"]:not(.${previewLinkClass})`
    );

    const links = Array.from(
        document.querySelectorAll(attrSelectors.join(','))
    );

    if (!links.length) return;

    const infoBoxClass = LSSM.$stores.root.nodeAttribute(
        'link-preview-infobox'
    );

    LSSM.$stores.root.addStyle({
        selectorText: `.${infoBoxClass}`,
        style: {
            'position': 'fixed',
            'z-index': 20_000,
        },
    });

    let currentTimeout = null as number | null;
    let infoBoxHovered = false;

    const infoBox = document.createElement('div');
    infoBox.classList.add(infoBoxClass, 'hidden', 'panel', 'panel-default');
    const infoBoxContent = document.createElement('div');
    infoBox.append(infoBoxContent);

    infoBox.addEventListener('mouseover', () => (infoBoxHovered = true));
    infoBox.addEventListener('mouseout', () => (infoBoxHovered = false));

    document.body.append(infoBox);

    const LinkPreviewInstance = new LSSM.$vue<
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed
    >({
        pinia: LSSM.$pinia,
        i18n: LSSM.$i18n,
        render: h =>
            h(linkPreview, {
                props: {
                    previewLinkClass,
                },
            }),
    }).$mount(infoBoxContent).$children[0] as CombinedVueInstance<
        Vue,
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed,
        DefaultProps,
        unknown
    >;

    if (!LinkPreviewInstance) return;

    const buildingIcons = LSSM.$stores.translations.buildingIcons;

    const generateInfobox = (e: MouseEvent) => {
        const type = (e.target as Element)
            .getAttribute('href')
            ?.match(/^\/([^/]+)/u)?.[1];
        const id = parseInt(
            (e.target as Element)
                .getAttribute('href')
                ?.match(/\d+\/?$/u)?.[0] || '0'
        );
        if (!type || !id) return;
        LinkPreviewInstance.setMousePosition(e.clientX, e.clientY);
        // Building
        if (type === 'buildings') {
            const building = LSSM.$stores.api.buildings[id];
            if (!building) return;
            const icon = buildingIcons[building.building_type] || 'building';
            LinkPreviewInstance.setBuilding(building, icon);
        }
        // Vehicle
        else if (type === 'vehicles') {
            const vehicle = LSSM.$stores.api.vehicles[id];
            if (!vehicle) return;
            LinkPreviewInstance.setVehicle(vehicle);
        }
        // User
        else if (type === 'profile') {
            LinkPreviewInstance.setUser(id);
        }
        // Mission
        else if (type === 'missions') {
            LinkPreviewInstance.setMission(id);
        } else {
            return;
        }

        infoBox.classList.remove('hidden');
    };

    document.addEventListener('mouseover', e => {
        if (!(e.target as HTMLElement).matches(attrSelectors.join(','))) return;
        currentTimeout = window.setTimeout(
            () => generateInfobox(e as MouseEvent),
            500
        );
    });

    document.addEventListener('mouseout', e => {
        if (!(e.target as HTMLElement).matches(attrSelectors.join(','))) return;
        if (currentTimeout) window.clearTimeout(currentTimeout);
        if (!infoBoxHovered) {
            const hideInterval = window.setInterval(() => {
                if (!infoBoxHovered) {
                    infoBox.classList.add('hidden');
                    clearInterval(hideInterval);
                }
            }, 100);
        }
    });
};
