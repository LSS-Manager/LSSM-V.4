import type { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    autoFocus: boolean,
    dropdown: boolean,
    dissolveCategories: boolean,
    compactResults: boolean,
    closeDropdownOnSelect: boolean,
    selectOnEnter: boolean,
    clearOnEnter: boolean,
    $sm: $m
) => {
    const aaoGroupElement =
        document.querySelector<HTMLDivElement>('#mission-aao-group');
    if (!aaoGroupElement) return;

    if (!dropdown) {
        const searchField = document.createElement('input');
        searchField.classList.add('search_input', 'form-control');
        searchField.setAttribute(
            'placeholder',
            $sm('settings.arrSearch.title').toString()
        );
        const searchFieldSize = '20px';
        searchField.style.setProperty('height', searchFieldSize);
        searchField.style.setProperty('padding-left', searchFieldSize);
        searchField.style.setProperty('font-size', '12px');

        const loadMissingVehiclesBtn =
            aaoGroupElement.parentElement?.querySelector<HTMLAnchorElement>(
                '.missing_vehicles_load'
            );

        let insertElement = aaoGroupElement.before.bind(aaoGroupElement);

        if (loadMissingVehiclesBtn) {
            const lineWrapper = document.createElement('div');
            lineWrapper.style.setProperty('display', 'flex');
            loadMissingVehiclesBtn.before(lineWrapper);

            insertElement = lineWrapper.append.bind(lineWrapper);

            insertElement(loadMissingVehiclesBtn);
        } else {
            searchField.style.setProperty('margin-bottom', '5px');
        }

        const hideStyle = document.createElement('style');
        let styleAdded = false;
        let hideSelector = '';

        const panels = document.querySelectorAll<HTMLDivElement>(
            '#mission-aao-group .tab-content [id^="aao_category_"]'
        );

        const panelHasResultsClass = LSSM.$stores.root.nodeAttribute(
            'ecw-arr_search-panel_has_results'
        );

        searchField.addEventListener('input', () => {
            const search = searchField.value.trim();
            if (search && !styleAdded) {
                document.head.append(hideStyle);
                styleAdded = true;
            }
            if (!search && styleAdded) {
                hideStyle.remove();
                styleAdded = false;
            }
            const searchAttributeSelectors = Array.from(
                new Set(
                    [search.toLowerCase(), search.toUpperCase()].map(
                        s => `[search_attribute*="${CSS.escape(s)}" i]`
                    )
                )
            );
            panels.forEach(panel =>
                panel.classList[
                    panel.querySelector(
                        searchAttributeSelectors
                            .map(
                                attributeSelector =>
                                    `.aao_searchable${attributeSelector}`
                            )
                            .join(', ')
                    )
                        ? 'add'
                        : 'remove'
                ](panelHasResultsClass)
            );
            const notAttributesSelector = searchAttributeSelectors
                .map(attributeSelector => `:not(${attributeSelector})`)
                .join('');
            hideSelector = `.aao_searchable${notAttributesSelector}`;
            hideStyle.textContent = `
                ${hideSelector}, ${hideSelector} + br {
                    display: none;
                }`;
            if (dissolveCategories) {
                hideStyle.textContent += `
                    #aao-tabs {
                        display: none;
                    }
                    #mission-aao-group .tab-content .${panelHasResultsClass} {
                        display: block;
                        opacity: 1;
                    }
                    #mission-aao-group .tab-content .${panelHasResultsClass}::before {
                        content: attr(data-category-title);
                        font-weight: bold;
                    }`;
            }
            if (compactResults) {
                hideStyle.textContent += `
                    #mission-aao-group .row {
                        padding-left: 15px;
                    }
                    #mission-aao-group .row .col-sm-2 {
                        width: unset;
                        padding-right: 0;
                        padding-left: 0;
                    }
                    #mission-aao-group .row .pull-right, #aao_without_category {
                        float: none !important;
                    }
                    #mission-aao-group .row br {
                        display: none;
                    }
                `;
            }
        });

        if (selectOnEnter || clearOnEnter) {
            searchField.addEventListener('keyup', e => {
                if (e.key !== 'Enter') return;
                if (selectOnEnter) {
                    document
                        .querySelector<HTMLAnchorElement>(
                            `.aao_searchable:not(${hideSelector})`
                        )
                        ?.click();
                }
                if (clearOnEnter) {
                    searchField.value = '';
                    searchField.dispatchEvent(new Event('input'));
                }
            });
        }

        if (dissolveCategories) {
            document
                .querySelectorAll<HTMLAnchorElement>(
                    '#aao-tabs li a[href^="#aao_category_"]'
                )
                .forEach(tab => {
                    const panel = document.querySelector<HTMLDivElement>(
                        tab.getAttribute('href') ?? ''
                    );
                    if (panel) {
                        panel.dataset.categoryTitle =
                            tab.textContent?.trim() ?? '';
                    }
                });
        }

        insertElement(searchField);
        if (autoFocus) searchField.focus();
    } else {
        const wrapper = document.createElement('div');
        aaoGroupElement.prepend(wrapper);
        import(
            /* webpackChunkName: "modules/extendedCallWindow/components/arrSearchDropdown" */
            '../components/arrSearch/arrSearchDropdown.vue'
        ).then(({ default: arrSearchDropdown }) =>
            new LSSM.$vue({
                pinia: LSSM.$pinia,
                i18n: LSSM.$i18n,
                render: h =>
                    h(arrSearchDropdown, {
                        props: { closeDropdownOnSelect, $sm },
                    }),
            }).$mount(wrapper)
        );
    }
};
