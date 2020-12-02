// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default async (
    LSSM: Vue,
    getSetting: (key: string) => Promise<boolean>,
    $m: $m
): Promise<void> => {
    const ARRContainer = document.getElementById(
        'mission-aao-group'
    ) as HTMLDivElement;

    if (!ARRContainer) return;

    const counter = await getSetting('arrCounter');
    const highlight = await getSetting('arrClickHighlight');
    const resetSelection = await getSetting('arrCounterResetSelection');
    const counterBadge = await getSetting('arrCounterAsBadge');

    const counterClass = LSSM.$store.getters.nodeAttribute('arr-counter');
    const highlightClass = LSSM.$store.getters.nodeAttribute('arr-clicked');

    (counter || highlight) &&
        (await LSSM.$store.dispatch('addStyles', [
            ...(counterBadge
                ? [
                      {
                          selectorText: `.${counterClass}`,
                          style: {
                              'border-radius': '50%',
                              'position': 'absolute',
                              'z-index': 1000,
                              'background': 'red',
                              'color': 'black',
                              'min-width': '20px',
                              'display': 'flex',
                              'transform': 'translate(calc(-50% - 5px), -50%)',
                              'font-family': 'monospace',
                              'justify-content': 'center',
                              'align-items': 'center',
                              'padding-left': '0.5ch',
                              'padding-right': '0.5ch',
                              'border': '1px solid black',
                              'scale': 0.9,
                          },
                      },
                  ]
                : []),
            {
                selectorText: `.${counterClass}:not([data-amount]), .${counterClass}[data-amount="0"]`,
                style: {
                    display: 'none',
                },
            },
            {
                selectorText: `.${counterClass}::after`,
                style: {
                    content: counterBadge
                        ? 'attr(data-amount)'
                        : '" " attr(data-amount) "x"',
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

    if (counter || highlight) {
        const clickHandler = (arr: HTMLAnchorElement) => {
            if (arr.querySelector('.label-danger')) return;

            const arrId =
                arr.getAttribute('aao_id') ||
                arr.getAttribute('vehicle_group_id');
            if (!arrId) return;
            let counterNode = counterNodes[arrId];
            if (!counterNode) {
                counterNode = document.createElement('span');
                counterNode.classList.add(counterClass);
                counterNode.setAttribute('data-amount', '0');
                arr.querySelector('.label')?.insertAdjacentElement(
                    counterBadge ? 'beforebegin' : 'afterend',
                    counterNode
                );
                counterNodes[arrId] = counterNode;
            }

            if (arr.getAttribute('reset') === 'true') resetCounters();

            if (counter)
                counterNode.setAttribute(
                    'data-amount',
                    (
                        parseInt(
                            counterNode.getAttribute('data-amount') || '0'
                        ) + 1
                    ).toLocaleString()
                );

            if (highlight) arr.classList.add(highlightClass);
        };

        await LSSM.$store.dispatch('hook', {
            event: 'aaoClickHandler',
            callback: clickHandler,
        });

        await LSSM.$store.dispatch('hook', {
            event: 'vehicleGroupClickHandler',
            callback: clickHandler,
        });
    }

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
    resetBtn.textContent = $m('arrCounter.reset', {
        text: $m(`arrCounter.resetTexts.${resetBtnTexts.join('_')}`),
    }).toString();
    resetBtnHolder.appendChild(resetBtn);
};
