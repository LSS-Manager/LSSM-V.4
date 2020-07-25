export default async (
    LSSM: Vue,
    getSetting: (key: string) => Promise<boolean>
): Promise<void> => {
    const ARRContainer = document.getElementById(
        'mission-aao-group'
    ) as HTMLDivElement;

    if (!ARRContainer) return;

    const counter = await getSetting('arrCounter');
    const highlight = await getSetting('arrClickHighlight');
    const resetSelection = await getSetting('arrCounterResetSelection');

    const counterClass = LSSM.$store.getters.nodeAttribute('arr-counter');
    const highlightClass = LSSM.$store.getters.nodeAttribute('arr-clicked');

    (counter || highlight) &&
        (await LSSM.$store.dispatch('addStyles', [
            {
                selectorText: `.${counterClass}:not([data-amount]), .${counterClass}[data-amount="0"]`,
                style: {
                    display: 'none',
                },
            },
            {
                selectorText: `.${counterClass}::after`,
                style: {
                    content: '" " attr(data-amount) "x"',
                },
            },
            {
                selectorText: `.${highlightClass}`,
                style: {
                    border: `${await getSetting(
                        'arrClickHighlightWidth'
                    )}px solid ${await getSetting(
                        'arrClickHighlightColor'
                    )} !important`,
                },
            },
        ]));

    const counterNodes = {} as { [aao_id: string]: HTMLSpanElement };

    const resetCounters = () => {
        if (counter)
            Object.values(counterNodes).forEach(counter => {
                counter.removeAttribute('data-amount');
                counter.parentElement?.classList.remove(highlightClass);
            });
        else
            Array.from(
                document.querySelectorAll(`.${highlightClass}`)
            ).forEach(arr => arr.classList.remove(highlightClass));
        if (resetSelection) window.vehicleSelectionReset();
    };

    (counter || highlight) &&
        ARRContainer.addEventListener('mouseup', e => {
            const targetARR = (e.target as HTMLElement)?.closest(
                '.aao, .vehicle_group'
            );

            if (
                !targetARR ||
                !ARRContainer.contains(targetARR) ||
                targetARR.querySelector('.label-danger')
            )
                return;

            const arrId =
                targetARR.getAttribute('aao_id') ||
                targetARR.getAttribute('vehicle_group_id');
            if (!arrId) return;
            let counterNode = counterNodes[arrId];
            if (!counterNode) {
                counterNode = document.createElement('span');
                counterNode.classList.add(counterClass);
                counterNode.setAttribute('data-amount', '0');
                targetARR
                    .querySelector('.label')
                    ?.insertAdjacentElement('afterend', counterNode);
                counterNodes[arrId] = counterNode;
            }

            if (targetARR.getAttribute('reset') === 'true') resetCounters();

            if (counter)
                counterNode.setAttribute(
                    'data-amount',
                    (
                        parseInt(
                            counterNode.getAttribute('data-amount') || '0'
                        ) + 1
                    ).toLocaleString()
                );

            if (highlight) targetARR.classList.add(highlightClass);
        });

    let resetBtnHolder = document.querySelector(
        '#container_navbar_alarm .navbar-right'
    ) as HTMLDivElement;

    if (!resetBtnHolder) {
        resetBtnHolder = document.createElement('div');
        resetBtnHolder.classList.add(
            'nav',
            'navbar-nav',
            'navbar-right',
            'hidden-xs'
        );
        resetBtnHolder.id = 'navbar-right-help-button';
        document
            .querySelector('#container_navbar_alarm .container-fluid')
            ?.appendChild(resetBtnHolder);
    }
    document
        .getElementById('navbar-right-help-button')
        ?.classList.add('btn-group');

    const resetBtnTexts = [];

    if (counter) resetBtnTexts.push('counter');
    if (highlight) resetBtnTexts.push('highlight');
    if (resetSelection) resetBtnTexts.push('selection');

    const resetBtn = document.createElement('a');
    resetBtn.classList.add(
        'btn',
        'btn-default',
        'btn-xs',
        'navbar-btn',
        'hidden-xs'
    );
    resetBtn.onclick = resetCounters;
    resetBtn.textContent = LSSM.$t(
        'modules.extendedCallWindow.arrCounter.reset',
        {
            text: LSSM.$t(
                `modules.extendedCallWindow.arrCounter.resetTexts.${resetBtnTexts.join(
                    '_'
                )}`
            ),
        }
    ).toString();
    resetBtnHolder.appendChild(resetBtn);
};
