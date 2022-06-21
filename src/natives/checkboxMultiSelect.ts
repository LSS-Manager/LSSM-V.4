export default (LSSM: Vue) => {
    let firstCheckbox: HTMLInputElement | null = null;

    const firstCheckboxParentClass = LSSM.$stores.root.nodeAttribute(
        'native-checkbox-multiselect-first-checkbox-parent'
    );
    const lastCheckboxClass = LSSM.$stores.root.nodeAttribute(
        'native-checkbox-multiselect-last-checkbox'
    );

    document.addEventListener('click', e => {
        const target = e.target;
        if (!target || !(target instanceof HTMLElement)) return;
        const checkbox = target.closest<HTMLInputElement>(
            'input[type="checkbox"]'
        );
        if (!checkbox) return (firstCheckbox = null);
        if (!e.shiftKey || !firstCheckbox) return (firstCheckbox = checkbox);

        let parentFirst = firstCheckbox.parentElement;
        let prevParentFirst: HTMLElement = firstCheckbox;
        let parentLast = checkbox.parentElement;

        const parentTags: (string[] | string)[] = [];

        while (parentFirst && parentLast && parentFirst !== parentLast) {
            const parentFirstTag = parentFirst.tagName;
            const parentLastTag = parentLast.tagName;
            if (parentFirstTag !== parentLastTag)
                parentTags.push([parentFirstTag, parentLastTag]);
            else parentTags.push(parentFirstTag);

            prevParentFirst = parentFirst;

            parentFirst = parentFirst.parentElement;
            parentLast = parentLast.parentElement;
        }

        if (!parentFirst) return;

        prevParentFirst.classList.add(firstCheckboxParentClass);
        checkbox.classList.add(lastCheckboxClass);

        const querySelector = `:scope > .${firstCheckboxParentClass} ~ ${parentTags
            .reverse()
            .map(tag => (Array.isArray(tag) ? `:is(${tag.join(', ')})` : tag))
            .join(
                ' > '
            )} > input[type="checkbox"]:is(:not(:checked), .${lastCheckboxClass})`;
        const checkboxes =
            parentFirst.querySelectorAll<HTMLInputElement>(querySelector);

        for (const listCheckbox of checkboxes) {
            if (listCheckbox.classList.contains(lastCheckboxClass)) break;
            listCheckbox.click();
        }

        prevParentFirst.classList.remove(firstCheckboxParentClass);
        checkbox.classList.remove(lastCheckboxClass);

        firstCheckbox = checkbox;
    });
};
