/**
 * This feature allows to select users from a suggestion list of alliance members
 *  when either typing the name to whisper or to mention in the alliance chat.
 * It also indicates when the user is trying to mention / whisper to an alliance member
 *  that does not exist in the alliance.
 *
 * @file - This is the only method in this file.
 * @param LSSM - The current local LSSM instance.
 * @alpha - This feature is not live for betas yet!
 * @beta - This feature is not live for stable users yet!
 */
export default (LSSM: Vue) => {
    LSSM.$stores.api.autoUpdateAllianceInfo('ce-user_selection').then();

    const chatInput = document.querySelector<HTMLInputElement>(
        '#alliance_chat_message'
    );
    if (!chatInput) return;

    const amountOfShownUsers = 5;

    const popupClass = LSSM.$stores.root.nodeAttribute('ce-us-popup');

    const choicePopup = document.createElement('div');
    choicePopup.classList.add('list-group', popupClass);

    LSSM.$stores.root.addStyles([
        {
            selectorText: `.${popupClass}`,
            style: {
                'width': '100%',
                'position': 'absolute',
                'top': '100%',
                'left': 0,
                'z-index': 3,
            },
        },
        {
            selectorText: `.${popupClass} .list-group-item`,
            style: {
                'background-color': 'dimgrey',
                'color': 'white',
                'cursor': 'pointer',
            },
        },
        {
            selectorText: `.${popupClass} .list-group-item:hover`,
            style: {
                'background-color': 'darkgrey',
                'color': 'black',
            },
        },
        {
            selectorText: `.${popupClass} .list-group-item[data-choice=""]`,
            style: {
                display: 'none',
            },
        },
        {
            selectorText: `.${popupClass} .list-group-item[data-choice]::before`,
            style: {
                content: 'attr(data-choice)',
            },
        },
    ]);
    chatInput.parentElement?.append(choicePopup);

    const choiceElements: HTMLAnchorElement[] = [];
    for (let i = 0; i < amountOfShownUsers; i++) {
        const choiceElement = document.createElement('a');
        choiceElement.classList.add('list-group-item');
        choiceElement.dataset.choice = '';
        choiceElements.push(choiceElement);
    }
    choicePopup.append(...choiceElements);

    choicePopup.addEventListener('click', e => {
        e.preventDefault();

        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const choiceElement = target.closest<HTMLAnchorElement>(
            '.list-group-item[data-choice]'
        );
        if (!choiceElement) return;
        const choice = choiceElement.dataset.choice;

        if (choicePopup.dataset.inputMode === 'whisper') {
            chatInput.value = chatInput.value.replace(
                /^\/w [^ ]+( |$)/u,
                `/w ${choice} `
            );
        }

        chatInput.dispatchEvent(new Event('input'));
        chatInput.focus();
    });

    chatInput.addEventListener('input', () => {
        const users = LSSM.$stores.api.allianceinfo?.users;
        if (!users) return;

        // whisper-mode: currently at entering username
        if (chatInput.value.match(/^\/w [^ ]+$/u)) {
            choicePopup.dataset.inputMode = 'whisper';
            const usernameInput = chatInput.value
                .replace(/^\/w /u, '')
                .toLowerCase();
            const filteredUsers = users
                .filter(({ name }) =>
                    name.toLowerCase().includes(usernameInput)
                )
                .map(({ name, id, online }) => ({
                    name,
                    relevance:
                        Number(name.toLowerCase().startsWith(usernameInput)) +
                        Number(online) +
                        document.querySelectorAll<HTMLAnchorElement>(
                            `#mission_chat_messages .mission_chat_message_username a[href="/profile/${id}"]`
                        ).length,
                }));
            const filteredUsersSorted = filteredUsers.sort(
                (a, b) => b.relevance - a.relevance
            );

            for (let i = 0; i < amountOfShownUsers; i++) {
                if (i >= filteredUsersSorted.length) {
                    choiceElements[i].dataset.choice = '';
                } else {
                    choiceElements[i].dataset.choice =
                        filteredUsersSorted[i].name;
                }
            }
        } else {
            choicePopup.dataset.inputMode = '';
            choiceElements.forEach(el => (el.dataset.choice = ''));
        }
    });
};
