/**
 * This feature allows to select users from a suggestion list of alliance members
 * when either typing the name to whisper or to mention in the alliance chat.
 * It also indicates when the user is trying to mention / whisper to an alliance member
 * that does not exist in the alliance.
 * @file - This is the only method in this file.
 * @param LSSM - The current local LSSM instance.
 */
import type { User } from 'typings/api/AllianceInfo';

export default (LSSM: Vue) => {
    // enable auto-update of allianceinfo API to keep users list up-to-date
    LSSM.$stores.api.autoUpdateAllianceInfo('ce-user_selection').then();

    // chatInput is the input field in the chat panel
    const chatInput = document.querySelector<HTMLInputElement>(
        '#alliance_chat_message, #mission_reply_content' // chat input, mission reply input
    );
    if (!chatInput) return;

    const amountOfShownUsers = 5;

    const popupClass = LSSM.$stores.root.nodeAttribute('ce-us-popup');

    // A popup showing suggestions for alliance members to select from
    const choicePopup = document.createElement('div');
    choicePopup.classList.add('list-group', popupClass);

    LSSM.$stores.root.addStyles([
        // styling the popup `choicePopup`
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
        // each element in `choicePopup`
        {
            selectorText: `.${popupClass} .list-group-item`,
            style: {
                'background-color': 'dimgrey',
                'color': 'white',
                'cursor': 'pointer',
            },
        },
        // hovering over an element in `choicePopup`
        {
            selectorText: `.${popupClass} .list-group-item:hover`,
            style: {
                'background-color': 'darkgrey',
                'color': 'black',
            },
        },
        // hide popup elements when they don't contain a username
        {
            selectorText: `.${popupClass} .list-group-item[data-choice=""]`,
            style: {
                display: 'none',
            },
        },
        // make the choice element have the username as text content and the offline icon on the left
        {
            selectorText: `.${popupClass} .list-group-item[data-choice]::before`,
            style: {
                'content': 'attr(data-choice)',
                'background-image': 'url("/images/user_gray.png")',
                'background-repeat': 'no-repeat',
                'padding-left': '21px',
            },
        },
        // use online icon if user is online
        {
            selectorText: `.${popupClass} .list-group-item[data-choice][data-online="true"]::before`,
            style: {
                'background-image': 'url("/images/user_green.png")',
            },
        },
    ]);
    // add `choicePopup` to chat panel
    chatInput.parentElement?.append(choicePopup);

    // create and add elements to `choicePopup`
    const choiceElements: HTMLAnchorElement[] = [];
    for (let i = 0; i < amountOfShownUsers; i++) {
        const choiceElement = document.createElement('a');
        choiceElement.classList.add('list-group-item');
        choiceElement.dataset.choice = '';
        choiceElements.push(choiceElement);
    }
    choicePopup.append(...choiceElements);

    // track which of the choices is currently selected for keyboard navigation
    let selectedChoice = 0;
    choiceElements[selectedChoice].classList.add('active');

    // handle a click on a choice
    choicePopup.addEventListener('click', e => {
        e.preventDefault();

        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const choiceElement = target.closest<HTMLAnchorElement>(
            '.list-group-item[data-choice]'
        );
        if (!choiceElement) return;
        const choice = choiceElement.dataset.choice;

        // replace the whisper part
        if (choicePopup.dataset.inputMode === 'whisper') {
            chatInput.value = chatInput.value.replace(
                /^\/w [^ ]+( |$)/u,
                `/w ${choice} `
            );
        } else if (choicePopup.dataset.inputMode === 'mention') {
            // replace the mention
            chatInput.value = chatInput.value.replace(
                new RegExp(
                    `(?<=^.{${choicePopup.dataset.pointer ?? 0}})@[^ ]*`,
                    'u'
                ),
                `@${choice} `
            );
        }

        chatInput.dispatchEvent(new Event('input'));
        chatInput.focus();
        clearChoices();
    });

    // prevent default behaviour of chat input when choicePopup is open (navigation)
    chatInput.addEventListener('keyup', e => {
        if (
            choicePopup.dataset.inputMode &&
            ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)
        )
            e.preventDefault();
        if (['ArrowLeft', 'ArrowRight'].includes(e.key))
            chatInput.dispatchEvent(new Event('input'));
    });

    // disable submitting the form when choicePopup is open
    chatInput.closest('form')?.addEventListener('submit', e => {
        if (!choicePopup.dataset.inputMode) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    });

    // function to clear the choices
    const clearChoices = () => {
        choicePopup.dataset.inputMode = '';
        delete choicePopup.dataset.pointer;
        chatInput.removeAttribute('autocomplete');
        // this small timeout is required to prevent SAP from sending the message in mission window on enter
        setTimeout(() => delete chatInput.dataset.userChoiceOpen, 100);
        choiceElements.forEach(el => (el.dataset.choice = ''));
    };

    // keyboard navigation for choicePopup
    chatInput.addEventListener('keydown', e => {
        if (!choicePopup.dataset.inputMode) return;
        if (!choiceElements[selectedChoice]) selectedChoice = 0;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                choiceElements[selectedChoice].classList.remove('active');
                selectedChoice++;
                if (selectedChoice >= amountOfShownUsers) selectedChoice = 0;
                while (choiceElements[selectedChoice].dataset.choice === '') {
                    selectedChoice++;
                    if (selectedChoice >= amountOfShownUsers)
                        selectedChoice = 0;
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                choiceElements[selectedChoice].classList.remove('active');
                selectedChoice--;
                if (selectedChoice < 0) selectedChoice = amountOfShownUsers;
                while (choiceElements[selectedChoice].dataset.choice === '') {
                    selectedChoice--;
                    if (selectedChoice < 0) selectedChoice = amountOfShownUsers;
                }
                break;
            case 'Enter':
                e.preventDefault();
                choiceElements[selectedChoice].click();
                break;
        }
        choiceElements[selectedChoice].classList.add('active');
    });

    // function to fill the choicePopup based on the username
    const fillChoices = (users: User[], username: string) => {
        const filteredUsers = users
            .filter(({ name }) => name.toLowerCase().includes(username))
            .map(({ name, id, online }) => ({
                name,
                online,
                relevance:
                    Number(name.toLowerCase().startsWith(username)) +
                    Number(online) +
                    document.querySelectorAll<HTMLAnchorElement>(
                        `#mission_chat_messages .mission_chat_message_username a[href="/profile/${id}"]`
                    ).length,
            }));
        const filteredUsersSorted = filteredUsers.sort(
            (a, b) => b.relevance - a.relevance
        );

        for (let i = 0; i < amountOfShownUsers; i++) {
            if (i >= filteredUsersSorted.length)
                choiceElements[i].dataset.choice = '';
            else choiceElements[i].dataset.choice = filteredUsersSorted[i].name;
            choiceElements[i].dataset.online = Boolean(
                filteredUsersSorted[i]?.online ?? false
            ).toString();
        }
    };

    // adjust choicePopup if necessary on every input event
    chatInput.addEventListener('input', () => {
        const users = LSSM.$stores.api.allianceinfo?.users;
        if (!users) return;

        const selectionStart = chatInput.selectionStart ?? 0;

        // whisper-mode: currently at entering username
        if (
            chatInput.id !== 'mission_reply_content' && // whispering in mission replies is not possible
            chatInput.value.match(/^\/w [^ ]+/u) &&
            selectionStart >= 3 &&
            (selectionStart <= chatInput.value.indexOf(' ', 3) ||
                chatInput.value.indexOf(' ', 3) === -1)
        ) {
            const usernameInput = chatInput.value
                .split(' ')[1]
                ?.split('')
                .slice(0, selectionStart - 3)
                .join('')
                .toLowerCase();
            if (!usernameInput) return clearChoices();

            choicePopup.dataset.inputMode = 'whisper';
            chatInput.autocomplete = 'off';
            chatInput.dataset.userChoiceOpen = 'true';

            fillChoices(users, usernameInput);
        } else if (chatInput.value.match(/@[^ ]*/u)) {
            // mention-mode: currently at entering username
            let pointer = selectionStart - 1;
            if (chatInput.value[pointer] === ' ') return;
            while (pointer > 0) {
                pointer--;
                if ([' ', '@'].includes(chatInput.value[pointer])) break;
            }
            if (
                chatInput.value[pointer] !== '@' ||
                pointer + 1 >= selectionStart
            )
                return clearChoices();

            const usernameInput = chatInput.value
                .split('')
                .slice(pointer + 1, selectionStart)
                .join('')
                .toLowerCase();
            if (!usernameInput) return clearChoices();

            choicePopup.dataset.inputMode = 'mention';
            choicePopup.dataset.pointer = pointer.toString();
            chatInput.autocomplete = 'off';
            chatInput.dataset.userChoiceOpen = 'true';

            fillChoices(users, usernameInput);
        } else {
            // Neither whispering nor mentioning
            clearChoices();
        }
    });
};
