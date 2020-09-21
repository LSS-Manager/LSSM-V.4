import emojiMap from '../../../utils/emojis.json';

export default (LSSM: Vue): void => {
    const emojiNames = Object.keys(emojiMap);
    const popupMap = {} as { [name: string]: HTMLDivElement };
    const optionClass = LSSM.$store.getters.nodeAttribute(
        'emoji-picker-option'
    );

    LSSM.$store.dispatch('addStyles', [
        {
            selectorText: `.${optionClass}`,
            style: {
                cursor: 'pointer',
            },
        },
        {
            selectorText: `.${optionClass}:not(:last-child)::after`,
            style: {
                content: ' | ',
            },
        },
    ]);

    document.addEventListener('keyup', e => {
        const input = e.target as HTMLInputElement;
        if (!input.matches('input')) return;
        if (!popupMap.hasOwnProperty(input.name)) {
            const popup = document.createElement('div');
            popup.style.width = '100%';
            popup.style.backgroundColor = 'dimgrey';
            popup.style.position = 'absolute';
            popup.style.zIndex = '3';
            popup.style.padding = '1ch';
            popup.style.transform = 'translateY(34px)';
            popupMap[input.name] = popup;
            input.parentElement?.prepend(popup);
        }
        input.value = input.value.replace(
            /:.*?:/g,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name => emojiMap[name] ?? name
        );
        const end = input.value.match(/(?<=:)[^:]*?$/);
        if (
            !end?.length ||
            (input.selectionStart ?? 0) < input.value.length - end[0].length ||
            !end[0].length
        )
            return (popupMap[input.name].style.display = 'none');
        const search = end[0];
        const matching = emojiNames.filter(name =>
            name.toLowerCase().match(search.toLowerCase())
        );
        if (!matching.length)
            return (popupMap[input.name].style.display = 'none');
        console.log(matching);
        popupMap[input.name].style.display = 'block';
        popupMap[input.name].innerHTML = '';
        popupMap[input.name].append(
            ...matching.map(name => {
                const span = document.createElement('span');
                span.title = name;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                span.textContent = emojiMap[name];
                span.classList.add(optionClass);
                // TODO: onclick handler
                return span;
            })
        );
    });
};
