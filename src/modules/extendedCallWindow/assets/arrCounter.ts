export default async (
    LSSM: Vue,
    getSetting: (key: string) => Promise<boolean>
): Promise<void> => {
    const ARRContainer = document.getElementById(
        'mission-aao-group'
    ) as HTMLDivElement;

    if (!ARRContainer) return;

    const counterClass = LSSM.$store.getters.nodeAttribute('arr-counter');
    const highlightClass = LSSM.$store.getters.nodeAttribute('arr-clicked');

    await LSSM.$store.dispatch('addStyles', [
        {
            selectorText: `.${counterClass}::before`,
            style: {
                'content': '" "',
                'white-space': 'pre',
            },
        },
        {
            selectorText: `.${counterClass}::after`,
            style: {
                content: 'attr(data-amount)',
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
    ]);

    const highlight = await getSetting('arrClickHighlight');

    const counterNodes = {} as { [aao_id: string]: HTMLSpanElement };

    const resetCounters = () => {
        Object.values(counterNodes).forEach(counter => {
            counter.setAttribute('data-amount', '0x');
            counter.parentElement?.classList.remove(highlightClass);
        });
    };

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
        const counterNode = counterNodes[arrId];

        if (targetARR.getAttribute('reset') === 'true') resetCounters();

        counterNode.setAttribute(
            'data-amount',
            parseInt(
                counterNode.getAttribute('data-amount')?.replace(/\D/g, '') ||
                    '0'
            ) +
                1 +
                'x'
        );

        if (highlight) targetARR.classList.add(highlightClass);
    });

    Array.from(
        document.querySelectorAll('.aao .label, .vehicle_group .label')
    ).forEach(label => {
        const counterNode = document.createElement('span');
        counterNode.classList.add(counterClass);
        counterNode.setAttribute('data-amount', '0x');
        label.insertAdjacentElement('afterend', counterNode);

        const arrId = label.id.match(/\d+$/)?.[0];

        if (arrId) counterNodes[arrId] = counterNode;
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
        document
            .getElementById('container_navbar_alarm')
            ?.appendChild(resetBtnHolder);
    }

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
        'modules.extendedCallWindow.arrCounter.reset'
    ).toString();
    resetBtnHolder.appendChild(resetBtn);
};
