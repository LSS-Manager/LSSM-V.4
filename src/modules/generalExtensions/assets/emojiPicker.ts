import emojiMap from '../../../utils/emojis.json';

export default (LSSM: Vue): void => {
    const emojiByName = {} as { [unicode: string]: string };
    const emojiyByAlias = {} as { [unicode: string]: string };
    Object.entries(emojiMap as { [unicode: string]: string[] }).forEach(
        ([emoji, namesAndAliases]) => {
            namesAndAliases.forEach(name => {
                if (name.match(/^:.*:$/)) emojiByName[name] = emoji;
                else emojiyByAlias[name] = emoji;
            });
        }
    );
    const emojiAliasRegex = new RegExp(
        Object.keys(emojiyByAlias)
            .map(key => `${LSSM.$utils.escapeRegex(key)} `)
            .join('|'),
        'g'
    );
    const emojiNames = Object.keys(emojiByName);

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
                content: '" | "',
            },
        },
    ]);

    const changeHandler = (e: KeyboardEvent) => {
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
            name => emojiByName[name.toLowerCase()] ?? name
        );
        input.value = input.value.replace(
            emojiAliasRegex,
            name => emojiyByAlias[name.replace(/ $/, '')] ?? name
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
        popupMap[input.name].style.display = 'block';
        popupMap[input.name].innerHTML = '';
        const mapped = [] as string[];
        popupMap[input.name].append(
            ...matching.map(name => {
                if (mapped.includes(emojiByName[name])) return '';
                mapped.push(emojiByName[name]);
                const span = document.createElement('span');
                span.title = name;
                span.textContent = emojiByName[name];
                span.classList.add(optionClass);
                span.addEventListener('click', () => {
                    input.value = input.value.replace(
                        /:[^:]*?$/,
                        emojiByName[name]
                    );
                    changeHandler(e);
                });
                return span;
            })
        );
    };

    document.addEventListener('keyup', changeHandler);
};
