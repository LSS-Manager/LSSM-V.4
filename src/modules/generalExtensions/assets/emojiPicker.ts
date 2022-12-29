export default async (LSSM: Vue): Promise<void> => {
    const emojiByName = {} as Record<string, string>;
    const emojiyByAlias = {} as Record<string, string>;
    const emojiMap = (
        await import(
            /* webpackChunkName: "utils/emojis" */ '../../../generated/emojis.json'
        )
    ).default as Record<string, string[]>;
    Object.entries(emojiMap).forEach(([emoji, namesAndAliases]) => {
        namesAndAliases.forEach(name => {
            if (name.match(/^:.*:$/u)) emojiByName[name] = emoji;
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

    const popupMap = {} as Record<string, HTMLDivElement>;
    const optionClass = LSSM.$stores.root.nodeAttribute('emoji-picker-option');

    let currentTimeout = null as number | null;

    LSSM.$stores.root.addStyles([
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
        input.value = input.value.replace(/:[^:]*$/u, emojiByName[emoji]);
        input.focus();
        popupMap[input.name].innerHTML = '';
        popupMap[input.name].style.display = 'none';
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
            /:.*?:/gu,
            name => emojiByName[name.toLowerCase()] ?? name
        );
        input.value = input.value.replace(emojiAliasRegex, name => {
            const trimmedName = name.replace(/ $/u, '');
            return `${emojiyByAlias[trimmedName] ?? trimmedName} `;
        });
        const end = input.value.match(/(?<=:)[^:]*$/u);
        if (
            !end?.length ||
            (input.selectionStart ?? 0) < input.value.length - end[0].length ||
            !end[0].length
        )
            return (popupMap[input.name].style.display = 'none');
        const [search] = end;
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
    document.addEventListener('keyup', e => {
        if (currentTimeout) window.clearTimeout(currentTimeout);
        currentTimeout = window.setTimeout(() => changeHandler(e), 500);
    });
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
                if (
                    currentFocus ===
                    currentFocus.parentElement?.lastElementChild
                ) {
                    currentFocus = currentFocus.parentElement
                        ?.firstElementChild as HTMLSpanElement | null;
                } else {
                    currentFocus =
                        currentFocus.nextElementSibling as HTMLSpanElement | null;
                }
                currentFocus?.classList.add('focused');
                break;
            case 'ArrowLeft':
                currentFocus.classList.remove('focused');
                if (
                    currentFocus ===
                    currentFocus.parentElement?.firstElementChild
                ) {
                    currentFocus = currentFocus.parentElement
                        ?.lastElementChild as HTMLSpanElement | null;
                } else {
                    currentFocus =
                        currentFocus.previousElementSibling as HTMLSpanElement | null;
                }
                currentFocus?.classList.add('focused');
                break;
        }
    });
};
