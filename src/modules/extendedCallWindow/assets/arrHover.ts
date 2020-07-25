export default (LSSM: Vue, specs: boolean, time: boolean): void => {
    const ARRContainer = document.getElementById(
        'mission-aao-group'
    ) as HTMLDivElement;

    if (!ARRContainer) return;

    const ARRSpecTranslations = (LSSM.$t(
        `modules.${MODULE_ID}.arrHover.arrSpecs`
    ) as unknown) as {
        [spec: string]: string;
    };

    const infoBox = document.createElement('div');
    infoBox.classList.add('btn', 'disabled', 'hidden');
    infoBox.style.position = 'absolute';
    infoBox.style.display = 'block';
    infoBox.style.background = 'green';
    infoBox.style.zIndex = '1';
    infoBox.style.opacity = '1';

    let arrTime: HTMLElement | undefined;
    let arrSpecs: HTMLUListElement | undefined;

    if (time) {
        arrTime = document.createElement('b');
        infoBox.append(arrTime);
    }
    if (specs) {
        arrSpecs = document.createElement('ul');
        const arrSpecsId = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_arrHover_specslist`
        );
        arrSpecs.id = arrSpecsId;
        LSSM.$store
            .dispatch('addStyles', [
                {
                    selectorText: `#${arrSpecsId}`,
                    style: {
                        padding: '0',
                    },
                },
                {
                    selectorText: `#${arrSpecsId} li`,
                    style: {
                        'list-style': 'none',
                        'text-align': 'left',
                    },
                },
                {
                    selectorText: `#${arrSpecsId} li::before`,
                    style: {
                        content: 'attr(data-amount) " "',
                    },
                },
            ])
            .then();
        infoBox.append(arrSpecs);
    }

    const handle = (arr: HTMLAnchorElement) => {
        arr.removeAttribute('title');
        const arrId = parseInt(arr.getAttribute('aao_id') || '-1');
        if (arrId < 0) return;
        if (time && arrTime) {
            arrTime.id = `aao_timer_${arrId}`;
            window.aao_available(arrId, true);
        }
        if (specs && arrSpecs) {
            arrSpecs.innerHTML =
                arr.getAttribute('reset') === 'true'
                    ? `<b>${LSSM.$t(`modules.${MODULE_ID}.arrHover.reset`)}</b>`
                    : '';
            arrSpecs.append(
                ...(Array.from(arr.attributes)
                    .map(attr => {
                        const name = ARRSpecTranslations[attr.name];
                        if (
                            (!name &&
                                !attr.name.startsWith(
                                    'vehicle_type_caption'
                                )) ||
                            !parseInt(attr.value)
                        )
                            return null;
                        const liEl = document.createElement('li');
                        liEl.textContent =
                            name ??
                            attr.name.match(
                                /^vehicle_type_caption\[(.*)]$/
                            )?.[1] ??
                            '';
                        liEl.setAttribute('data-amount', attr.value);
                        return liEl;
                    })
                    .filter(v => !!v) as HTMLLIElement[]).sort((a, b) =>
                    (a.textContent || '') < (b.textContent || '')
                        ? -1
                        : (a.textContent || '') > (b.textContent || '')
                        ? 1
                        : 0
                )
            );
        }
        arr.append(infoBox);
        infoBox.classList.remove('hidden');
    };

    let currentTimeout = null as number | null;

    ARRContainer.addEventListener('mouseover', e => {
        const target = (e.target as HTMLElement)?.closest(
            '.aao, .vehicle_group'
        ) as HTMLAnchorElement | null;
        if (target)
            currentTimeout = window.setTimeout(() => handle(target), 200);
    });

    ARRContainer.addEventListener('mouseout', e => {
        const target = (e.target as HTMLElement)?.closest(
            '.aao, .vehicle_group'
        ) as HTMLAnchorElement | null;
        if (target && currentTimeout) {
            window.clearTimeout(currentTimeout);
            window.setTimeout(() => infoBox.classList.add('hidden'), 100);
        }
    });
};
