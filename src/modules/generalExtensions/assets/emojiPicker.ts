export default async (LSSM: Vue): Promise<void> => {
    const emojiByName = {} as { [unicode: string]: string };
    const emojiyByAlias = {} as { [unicode: string]: string };
    const emojiMap = (
        await import(
            /* webpackChunkName: "utils/emojis" */ '../../../utils/emojis.json'
        )
    ).default as {
        [unicode: string]: string[];
    };
    Object.entries(emojiMap).forEach(([emoji, namesAndAliases]) => {
        namesAndAliases.forEach(name => {
            if (name.match(/^:.*:$/)) emojiByName[name] = emoji;
            else emojiyByAlias[name] = emoji;
        });
    });
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

    await LSSM.$store.dispatch('addStyles', [
        {
            selectorText: `.${optionClass}`,
            style: {
                'cursor': 'pointer',
                'font-size': 'large',
            },
        },
        {
            selectorText: `.${optionClass}:not(:last-child)::after`,
            style: {
                content: '" | "',
            },
        },
        {
            selectorText: `.${optionClass}.focused`,
            style: {
                'background-color': 'blue',
            },
        },
        {
            selectorText: `.${optionClass}.focused::after`,
            style: {
                'background-color': 'dimgrey',
            },
        },
    ]);

    const inputEmoji = (
        input: HTMLInputElement,
        emoji: string,
        e: KeyboardEvent
    ) => {
        input.value = input.value.replace(/:[^:]*?$/, emojiByName[emoji]);
        input.focus();
        popupMap[input.name].innerHTML = '';
        changeHandler(e);
    };

    let currentFocus = null as HTMLSpanElement | null;

    const changeHandler = (e: KeyboardEvent) => {
        const input = e.target as HTMLInputElement;
        if (
            !input.matches('input') ||
            ['ArrowRight', 'ArrowLeft', 'Enter'].includes(e.key)
        )
            return;
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
        input.value = input.value.replace(emojiAliasRegex, name => {
            name = name.replace(/ $/, '');
            return `${emojiyByAlias[name] ?? name} `;
        });
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
                span.tabIndex = -1;
                span.title = name;
                span.textContent = emojiByName[name];
                span.classList.add(optionClass);
                span.addEventListener('click', () =>
                    inputEmoji(input, name, e)
                );
                return span;
            })
        );
        currentFocus = popupMap[input.name]
            .firstElementChild as HTMLSpanElement | null;
        currentFocus?.classList.add('focused');
    };
    document.addEventListener('keyup', changeHandler);
    document.addEventListener('keydown', e => {
        if (!e.target || !(e.target as HTMLElement)?.matches?.('input')) return;
        if (
            popupMap[(e.target as HTMLInputElement).name]?.style.display ===
                'block' &&
            ['ArrowRight', 'ArrowLeft', 'Enter'].includes(e.key)
        )
            return e.preventDefault();
    });
    document.addEventListener('keyup', e => {
        if (!e.target || !(e.target as HTMLElement)?.matches?.('input')) return;
        if (
            !(
                popupMap[(e.target as HTMLInputElement).name]?.style.display ===
                    'block' &&
                ['ArrowRight', 'ArrowLeft', 'Enter'].includes(e.key)
            )
        )
            return;
        if (!currentFocus) return;
        switch (e.key) {
            case 'Enter':
                return inputEmoji(
                    e.target as HTMLInputElement,
                    currentFocus.title,
                    e
                );
            case 'ArrowRight':
                currentFocus.classList.remove('focused');
                currentFocus = currentFocus.nextElementSibling as HTMLSpanElement | null;
                currentFocus?.classList.add('focused');
                break;
            case 'ArrowLeft':
                currentFocus.classList.remove('focused');
                currentFocus = currentFocus.previousElementSibling as HTMLSpanElement | null;
                currentFocus?.classList.add('focused');
                break;
        }
    });
};
