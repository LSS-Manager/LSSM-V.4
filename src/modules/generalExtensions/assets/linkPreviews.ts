import { Building } from 'typings/Building';
import linkPreview from '../components/linkPreview.vue';
import {
    LinkPreview,
    LinkPreviewComputed,
    LinkPreviewMethods,
} from 'typings/modules/GeneralExtensions/LinkPreview';
import { CombinedVueInstance } from 'vue/types/vue';
import { DefaultProps } from 'vue/types/options';
import { Vehicle } from 'typings/Vehicle';

export default async (LSSM: Vue, previews: string[]): Promise<void> => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', true);
    await LSSM.$store.dispatch('api/registerVehiclesUsage', true);

    const previewLinkClass = LSSM.$store.getters.nodeAttribute(
        'is-previewLink'
    );
    const attrSelectors = previews.map(
        p => `a[href^="/${p}/"]:not(.${previewLinkClass})`
    );

    const links = Array.from(
        document.querySelectorAll(attrSelectors.join(','))
    );

    if (!links.length) return;

    LSSM.$store.commit('useFontAwesome');

    const infoBoxClass = LSSM.$store.getters.nodeAttribute(
        'link-preview-infobox'
    );

    await LSSM.$store.dispatch('addStyle', {
        selectorText: `.${infoBoxClass}`,
        style: {
            'position': 'fixed',
            'z-index': 20000,
        },
    });

    let currentTimeout = null as number | null;
    let infoBoxHovered = false;

    const infoBox = document.createElement('div');
    infoBox.classList.add(infoBoxClass, 'hidden', 'panel', 'panel-default');
    const infoBoxContent = document.createElement('div');
    infoBox.appendChild(infoBoxContent);

    infoBox.addEventListener('mouseover', () => (infoBoxHovered = true));
    infoBox.addEventListener('mouseout', () => (infoBoxHovered = false));

    document.body.appendChild(infoBox);

    const LinkPreviewInstance = new LSSM.$vue<
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed
    >({
        store: LSSM.$store,
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
        DefaultProps
    >;

    if (!LinkPreviewInstance) return;

    const buildingIcons = (LSSM.$t('buildingIcons') as unknown) as string[];

    const generateInfobox = (e: MouseEvent) => {
        const type = (e.target as Element)
            .getAttribute('href')
            ?.match(/^\/([^/]+)/)?.[1];
        const id = parseInt(
            (e.target as Element).getAttribute('href')?.match(/\d+\/?$/)?.[0] ||
                '0'
        );
        if (!type || !id) return;
        LinkPreviewInstance.setMousePosition(e.clientX, e.clientY);
        // Building
        if (type === 'buildings') {
            const building = (LSSM.$store.state.api
                .buildings as Building[]).find(b => b.id === id);
            if (!building) return;
            const icon = buildingIcons[building.building_type] || 'building';
            LinkPreviewInstance.setBuilding(building, icon);
        }
        // Vehicle
        else if (type === 'vehicles') {
            const vehicle = (LSSM.$store.state.api.vehicles as Vehicle[]).find(
                b => b.id === id
            );
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
