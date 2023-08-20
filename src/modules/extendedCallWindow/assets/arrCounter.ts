import type { $m } from 'typings/Module';

export default async (
    LSSM: Vue,
    getSetting: (key: string) => Promise<boolean>,
    $m: $m
): Promise<void> => {
    const ARRContainer =
        document.querySelector<HTMLDivElement>('#mission-aao-group');

    if (!ARRContainer) return;

    const counter = await getSetting('arrCounter');
    const highlight = await getSetting('arrClickHighlight');
    const resetSelection = await getSetting('arrCounterResetSelection');
    const counterBadge = await getSetting('arrCounterAsBadge');

    const counterClass = LSSM.$stores.root.nodeAttribute('arr-counter');
    const highlightClass = LSSM.$stores.root.nodeAttribute('arr-clicked');

    if (counter || highlight) {
        LSSM.$stores.root.addStyles([
            ...(counterBadge
                ? [
                      {
                          selectorText: `.${counterClass}`,
                          style: {
                              'border-radius': '50%',
                              'position': 'absolute',
                              'z-index': 1,
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
        ]);
    }

    const counterNodes = {} as Record<string, HTMLSpanElement>;

    const resetCounters = () => {
        if (counter) {
            Object.values(counterNodes).forEach(counter => {
                counter.removeAttribute('data-amount');
                counter.parentElement?.classList.remove(highlightClass);
            });
        } else {
            Array.from(document.querySelectorAll(`.${highlightClass}`)).forEach(
                arr => arr.classList.remove(highlightClass)
            );
        }
    };

    LSSM.$stores.root.hook({
        event: 'vehicleSelectionReset',
        callback: resetCounters,
    });

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
                arr
                    .querySelector('.label')
                    ?.insertAdjacentElement(
                        counterBadge ? 'beforebegin' : 'afterend',
                        counterNode
                    );
                counterNodes[arrId] = counterNode;
            }

            if (counter) {
                counterNode.setAttribute(
                    'data-amount',
                    (
                        parseInt(
                            counterNode.getAttribute('data-amount') || '0'
                        ) + 1
                    ).toLocaleString()
                );
            }

            if (highlight) arr.classList.add(highlightClass);
        };

        LSSM.$stores.root.hook({
            event: 'aaoClickHandler',
            post: false,
            callback: clickHandler,
        });

        LSSM.$stores.root.hook({
            event: 'vehicleGroupClickHandler',
            post: false,
            callback: clickHandler,
        });
    }

    let resetBtnHolder = document.querySelector<HTMLDivElement>(
        '#container_navbar_alarm .navbar-right'
    );

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
            .querySelector<HTMLElement>(
                '#container_navbar_alarm .container-fluid'
            )
            ?.append(resetBtnHolder);
    }
    document
        .querySelector<HTMLDivElement>('#navbar-right-help-button')
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
    if (resetSelection)
        resetBtn.addEventListener('click', window.vehicleSelectionReset);
    else resetBtn.addEventListener('click', resetCounters);
    resetBtn.textContent = $m('arrCounter.reset', {
        text: $m(`arrCounter.resetTexts.${resetBtnTexts.join('_')}`),
    }).toString();
    resetBtnHolder.append(resetBtn);
};
