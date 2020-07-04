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

    const attrSelectors = previews.map(p => `a[href^="/${p}/"]`);

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
    // const infoBoxHead = document.createElement('div');
    // infoBoxHead.classList.add('panel-heading');
    // infoBox.appendChild(infoBoxHead);
    // let infoBoxIcon = document.createElement('i');
    // infoBoxIcon.classList.add('fas', `fa-question-circle`);
    // infoBoxIcon.style.marginRight = '1rem';
    // infoBoxHead.appendChild(infoBoxIcon);
    // const infoBoxTitle = document.createElement('a');
    // infoBoxTitle.classList.add('lightbox-open');
    // infoBoxHead.appendChild(infoBoxTitle);
    // const infoBoxBody = document.createElement('div');
    // infoBoxBody.classList.add('panel-body');
    // infoBox.appendChild(infoBoxBody);

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
        render: h => h(linkPreview),
    }).$mount(infoBoxContent).$children[0] as CombinedVueInstance<
        Vue,
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed,
        DefaultProps
    >;

    if (!LinkPreviewInstance) return;

    const buildingIcons = (LSSM.$t('buildingIcons') as unknown) as string[];

    const setInfoboxPosition = ({ clientX, clientY }: MouseEvent) => {
        const infoBoxBCR = infoBox.getBoundingClientRect();
        let top = clientY - infoBoxBCR.height;
        if (top < 0) top = clientY;
        infoBox.style.top = `${top}px`;
        infoBox.style.left = `${clientX - infoBoxBCR.width / 2}px`;
    };

    const generateInfobox = (e: MouseEvent) => {
        const type = (e.target as Element)
            .getAttribute('href')
            ?.match(/^\/([^/]+)/)?.[1];
        const id = parseInt(
            (e.target as Element).getAttribute('href')?.match(/\d+\/?$/)?.[0] ||
                '0'
        );
        if (!type || !id) return;
        let title = '';
        let additional = '';
        let icon;
        // Building
        if (type === 'buildings') {
            const building = (LSSM.$store.state.api
                .buildings as Building[]).find(b => b.id === id);
            if (!building) return;
            title = building.caption;
            icon = buildingIcons[building.building_type] || 'building';
        }
        // Vehicle
        else if (type === 'vehicles') {
            const vehicle = (LSSM.$store.state.api.vehicles as Vehicle[]).find(
                b => b.id === id
            );
            if (!vehicle) return;
            title = vehicle.caption;
            icon = 'ambulance';
        }
        // User
        else if (type === 'profile') {
            title =
                (e.target as Element).textContent?.trim() ||
                'Ähhh, konnte Username net ermitteln??';
            icon = 'user';
        }
        // Mission
        else if (type === 'missions') {
            const mission = document.getElementById(`mission_${id}`);
            const participation = document.getElementById(
                `mission_participant_${id}`
            );

            if (!mission) return;

            icon = participation?.classList.contains('hidden')
                ? 'asterisk'
                : 'user-alt';
            if (mission?.classList.contains('mission_deleted'))
                icon = 'check-circle';
            const captionNode = document.getElementById(
                `mission_caption_${id}`
            );
            title =
                captionNode?.childNodes[0].textContent
                    ?.replace(/\W*$/, '')
                    .trim() || '';
            additional = captionNode?.childNodes[1].textContent?.trim() || '';
        } else {
            return;
        }

        LinkPreviewInstance.setType(type);
        LinkPreviewInstance.setId(id);
        LinkPreviewInstance.setTitle(title);
        LinkPreviewInstance.setAdditional(additional);
        LinkPreviewInstance.setIcon(icon);
        infoBox.classList.remove('hidden');
        setInfoboxPosition(e);
    };

    links.forEach(link => {
        link.addEventListener(
            'mouseover',
            e =>
                (currentTimeout = window.setTimeout(
                    () => generateInfobox(e as MouseEvent),
                    500
                ))
        );
        link.addEventListener('mouseout', () => {
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
    });
};
