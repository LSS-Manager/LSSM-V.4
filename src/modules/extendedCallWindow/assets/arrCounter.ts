export default async (
    LSSM: Vue,
    getSetting: (key: string) => Promise<boolean>
): Promise<void> => {
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
                border: '2px solid green !important',
            },
        },
    ]);

    const highlight = await getSetting('arrClickHighlight');

    let counterNodes = [] as HTMLSpanElement[];

    const resetCounters = () => {
        counterNodes.forEach(counter => {
            counter.setAttribute('data-amount', '0x');
            counter.parentElement?.classList.remove(highlightClass);
        });
    };

    Array.from(
        document.querySelectorAll('.aao .label, .vehicle_group .label')
    ).forEach(label => {
        const counterNode = document.createElement('span');
        counterNode.classList.add(counterClass);
        counterNode.setAttribute('data-amount', '0x');
        label.insertAdjacentElement('afterend', counterNode);
        counterNode.parentElement?.addEventListener('click', e => {
            let arr = e.target as HTMLLinkElement;
            while (!arr.contains(counterNode) || arr === counterNode) {
                const parent = arr.parentElement;
                if (!parent) break;
                arr = parent as HTMLLinkElement;
            }
            if (arr.getAttribute('reset') === 'true') resetCounters();
            counterNode.setAttribute(
                'data-amount',
                parseInt(
                    counterNode
                        .getAttribute('data-amount')
                        ?.replace(/\D/g, '') || '0'
                ) +
                    1 +
                    'x'
            );
            if (highlight) arr.classList.add(highlightClass);
        });
    });

    counterNodes = Array.from(document.querySelectorAll(`.${counterClass}`));

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
