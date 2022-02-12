import type { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    autoFocus: boolean,
    dropdown: boolean,
    closeDropdownOnSelect: boolean,
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
        searchField.style.setProperty('margin-bottom', '5px');
        searchField.style.setProperty('font-size', '12px');

        const hideStyle = document.createElement('style');
        let styleAdded = false;

        searchField.addEventListener('input', () => {
            const search = searchField.value;
            if (search && !styleAdded) {
                document.head.append(hideStyle);
                styleAdded = true;
            }
            if (!search && styleAdded) {
                hideStyle.remove();
                styleAdded = false;
            }
            hideStyle.textContent = `.aao_searchable:not([search_attribute*="${search}"i]), .aao_searchable:not([search_attribute*="${search}"i]) + br {
            display: none;
        }`;
        });

        aaoGroupElement.before(searchField);
        if (autoFocus) searchField.focus();
    } else {
        const wrapper = document.createElement('div');
        aaoGroupElement.prepend(wrapper);
        import(
            /* webpackChunkName: "modules/extendedCallWindow/components/arrSearchDropdown" */
            '../components/arrSearch/arrSearchDropdown.vue'
        ).then(({ default: arrSearchDropdown }) =>
            new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h =>
                    h(arrSearchDropdown, {
                        props: { closeDropdownOnSelect, $sm },
                    }),
            }).$mount(wrapper)
        );
    }
};
