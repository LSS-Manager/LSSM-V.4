/**
 * @file This file contains some shared utility functions used on several points in SAP.
 */

/**
 * A method to extract the city name (including ZIP Code) from an address as used for missions in game.
 * May lead to false results because it is kept simple.
 * @param address - The address to extract the address from.
 * @returns - The extracted city name including ZIP Code.
 */
export function getCityFromAddress(address: string): string {
    const addressSplit = address.split(',');
    return addressSplit.at(-1)?.trim() ?? '–';
}

// matches all Zip-styles of the countries supported by LSSM
const ZIP_REGEX =
    /^((\d{4} ?[A-Z]{2})|((\d{4}|\d{2})[ -]\d{3})|(\d{3} \d{2})|\d+|([\dA-Z]{2,4} [\dA-Z]{3}))/u;

/**
 * A method to remove the ZIP Code from a city name.
 * All ZIP-Styles of countries supported by LSSM are detected.
 * @param city - The City (including ZIP Code) to remove the ZIP Code from.
 * @returns - The City name without ZIP Code.
 */
export function removeZipFromCity(city: string): string {
    return city.replace(ZIP_REGEX, '').trim();
}

/**
 * A method to extract the ZIP Code from a city name.
 * All ZIP-Styles of countries supported by LSSM are detected.
 * @param city - The City (including ZIP Code) to extract the ZIP Code from.
 * @returns - The ZIP Code as a string.
 */
export function getZipFromCity(city: string): string {
    return city.match(ZIP_REGEX)?.[0].trim() ?? '';
}

/**
 * A method to add a certain amount of minutes to a specific timestamp.
 * @param minutes - The amount of minutes to add to the {@link date} param.
 * @param date - The timestamp to add minutes to, as a Date object.
 * @returns - The passed Date object, increased by {@link minutes} minutes.
 */
export function addMinutesToDate(minutes: number, date: Date): Date {
    date.setTime(date.getTime() + minutes * 60 * 1000);
    return date;
}

/**
 * A method to add a certain amount of minutes to now.
 * @param minutes - The amount of minutes to add to now.
 * @returns - A new Date object with the resulting timestamp, {@link minutes} minutes from now.
 */
export function addMinutesToNow(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * A method to add a certain amount of hours to now.
 * @param hours - The amount of hours to add to now.
 * @returns - A new Date object with the resulting timestamp, {@link hours} hours from now.
 */
export function addHoursToNow(hours: number): Date {
    return addMinutesToNow(60 * hours);
}

/**
 * A method to add a certain amount of days to now.
 * @param addDays - The amount of days to add to now.
 * @returns - A new Date object with the resulting timestamp, {@link addDays} days from now.
 */
export function addDaysToToday(addDays = 0): Date {
    return addHoursToNow(24 * addDays);
}

/**
 * A method to return the time of a certain timestamp in the format `hh:mm`.
 * @param date - A timestamp as Date object to return the time from.
 * @returns - The time representation in format `hh:mm`.
 */
export function dateToTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}

/**
 * A method to return the day of a certain timestamp, localized with month and day as each a 2-digit number.
 * @param date - A timestamp as Date object to return the day from.
 * @returns - The localized day representation of the timestamp.
 */
export function dateToDayString(date: Date): string {
    return date.toLocaleDateString(undefined, {
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * A method to return the {@link dateToDayString} of either today or a date {@link addDays} days from today.
 * @param addDays - An optional integer of how many days to add to today.
 * @returns - The {@link dateToDayString} representation of the desired day.
 */
export function getDateFromToday(addDays = 0): string {
    return dateToDayString(addDaysToToday(addDays));
}

/**
 * A method that returns an Object that is used by SAP to replace the time & date variables.
 * @returns - An Object containing the replacer functions.
 */
export function getTimeReplacers(): Record<
    string,
    (match: string, ...groups: string[]) => string
> {
    const format = (date: Date, printDate: boolean): string => {
        if (printDate) return `${dateToTime(date)} (${dateToDayString(date)})`;
        else return dateToTime(date);
    };
    const roundDate = (date: Date, round: string): void => {
        const roundTo = Math.abs(parseInt(round)) % 60;
        const roundUp = !round.startsWith('-');
        const resultHours = date.getHours();
        const resultMinutes = date.getMinutes();
        if (!roundTo) {
            date.setMinutes(0);
            if (roundUp) date.setHours(resultHours + 1);
        } else {
            if (roundUp)
                addMinutesToDate(roundTo - (resultMinutes % roundTo), date);
            else addMinutesToDate(-(resultMinutes % roundTo), date);
        }
    };
    return {
        [/now\+(\d+(?:[,.]\d+)?)(d?)/u.toString()]: (
            match,
            additive,
            printDate
        ) => {
            const resultDate = addHoursToNow(
                parseFloat(additive.replace(',', '.'))
            );
            return format(resultDate, !!printDate);
        },
        [/share\+(\d+(?:[,.]\d+)?)(d?)/u.toString()]: (
            match,
            additive,
            printDate
        ) => {
            const shareTime = document.querySelector<HTMLLIElement>(
                '#mission_replies > li:last-child'
            )?.dataset.messageTime;

            const resultDate = addMinutesToDate(
                parseFloat(additive.replace(',', '.')) * 60,
                new Date(shareTime ?? Date.now())
            );
            return format(resultDate, !!printDate);
        },
        [/now\+(\d+(?:[,.]\d+)?)r(-?\d+)(d?)/u.toString()]: (
            match,
            additive,
            round,
            printDate
        ) => {
            const resultDate = addHoursToNow(
                parseFloat(additive.replace(',', '.'))
            );
            roundDate(resultDate, round);
            return format(resultDate, !!printDate);
        },
        [/share\+(\d+(?:[,.]\d+)?)r(-?\d+)(d?)/u.toString()]: (
            match,
            additive,
            round,
            printDate
        ) => {
            const shareTime = document.querySelector<HTMLLIElement>(
                '#mission_replies > li:last-child'
            )?.dataset.messageTime;
            const resultDate = addMinutesToDate(
                parseFloat(additive.replace(',', '.')) * 60,
                new Date(shareTime ?? Date.now())
            );
            roundDate(resultDate, round);
            return format(resultDate, !!printDate);
        },
    };
}

/**
 * A method to share a mission with the alliance.
 * @param LSSM - The current LSSM instance.
 * @param missionId - The ID of the mission that is to be shared.
 * @param isCallList - Whether sharing from call list or not. Is used for the Feature HTTP-Header.
 * @returns - The Promise returned by the executed fetch.
 */
export function shareMission(
    LSSM: Vue,
    missionId: number | string,
    isCallList = false
) {
    return LSSM.$stores.api.request({
        url: `/missions/${missionId}/alliance`,
        feature: `'sap-${isCallList ? 'ecl-' : ''}share-missions'`,
    });
}

/**
 * A method to send a reply to a mission and optionally share it in alliance chat.
 * @param LSSM - The current LSSM instance.
 * @param missionId - The ID of the mission the reply is to be added to.
 * @param message - The message that is to be sent.
 * @param post - Whether to post the message in alliance chat.
 * @param authToken - The current valid auth token.
 * @param isCallList - Whether posting from call list or not. Is used for the Feature HTTP-Header.
 * @returns - The Promise returned by the executed fetch.
 */
export function sendReply(
    LSSM: Vue,
    missionId: number | string,
    message: string,
    post: boolean,
    authToken: string,
    isCallList = false
) {
    const url = new URL('/mission_replies', window.location.origin);
    url.searchParams.append('utf8', '✓');
    url.searchParams.append('authenticity_token', authToken);
    url.searchParams.append('mission_reply[alliance_chat]', '0');
    if (post) url.searchParams.append('mission_reply[alliance_chat]', '1');

    url.searchParams.append('mission_reply[content]', message);
    url.searchParams.append('mission_reply[mission_id]', missionId.toString());
    return LSSM.$stores.api.request({
        url: '/mission_replies',
        feature: `sap${isCallList ? '-ecl' : ''}_reply`,
        init: {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: url.searchParams.toString(),
            method: 'POST',
            mode: 'cors',
        },
    });
}

/**
 * A method to create an HTML Element containing an Icon.
 * @param icon - The FA icon name.
 * @param style - The FA icon style.
 * @param classes - Additional classes that are to be added to the element.
 * @returns - The HTML Element that will be converted into an Icon SVG by FA.
 */
export function createIcon(
    icon: string,
    style: 'fab' | 'far' | 'fas' = 'fas',
    ...classes: string[]
) {
    const iconElement = document.createElement('i');
    iconElement.classList.add(style, `fa-${icon}`, ...classes);
    return iconElement;
}

/**
 * A method to create a button to edit a message in the SAP Dropdown.
 * @param editBtnClass - A single class or a list of classes to add to the button.
 * @param transform - Whether to transform the button position. Is true by default.
 * @returns - The button Element.
 */
export function createEditBtn(
    editBtnClass: string[] | string = [],
    transform = true
) {
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-xs', 'btn-default');
    if (Array.isArray(editBtnClass)) editBtn.classList.add(...editBtnClass);
    else editBtn.classList.add(editBtnClass);
    if (transform) {
        editBtn.style.setProperty('position', 'absolute');
        editBtn.style.setProperty('right', '0');
        editBtn.style.setProperty('transform', 'translateY(-3px)');
    }

    const btnIcon = createIcon('pen-to-square', 'fas', 'fa-fw');
    btnIcon.style.setProperty('pointer-events', 'none');

    editBtn.append(btnIcon);

    return editBtn;
}

/**
 * A method to create a field to edit a SAP message before posting it.
 * @param defaultMessage - The message the field has by default.
 * @param postInChat - Whether to post the message in chat by default.
 * @param editBtn - A Button created from {@link createEditBtn}.
 * @param abortCallback - A function to execute if the user aborts the edit.
 * @param sendCallback - A function to execute when the user confirms the edit.
 * @param inputGroupClass - A single class or a list of classes to be added to the input group.
 * @param isMissionList - Whether the dropdown is in mission list because extra styling is required in there. Is false by default.
 * @param transform - Whether to apply additional transforms. Is true by default.
 * @param checkIcon - Whether a "check" icon should be used instead of a paper plane icon. Is false by default.
 * @returns - The wrapper containing all relevant elements for editing.
 */
export function createEditField(
    defaultMessage: string,
    postInChat: boolean,
    editBtn: HTMLButtonElement,
    abortCallback: () => void,
    sendCallback: (
        inputField: HTMLInputElement,
        postInput: HTMLInputElement
    ) => void,
    inputGroupClass: string[] | string = [],
    isMissionList = false,
    transform = true,
    checkIcon = false
) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('input-group');
    if (Array.isArray(inputGroupClass))
        wrapper.classList.add(...inputGroupClass);
    else wrapper.classList.add(inputGroupClass);
    if (transform) {
        wrapper.style.setProperty('position', 'absolute');
        wrapper.style.setProperty('left', isMissionList ? '0' : '100%');
        wrapper.style.setProperty('transform', 'translateY(-26px)');
    }
    if (isMissionList) wrapper.style.setProperty('width', '300%');

    const abortBtnWrapper = document.createElement('div');
    abortBtnWrapper.classList.add('input-group-addon');
    abortBtnWrapper.style.setProperty('padding', '0');
    const abortBtn = document.createElement('button');
    abortBtn.classList.add('btn', 'btn-danger');
    abortBtn.style.setProperty('padding', '6px 3px');
    const abortIcon = createIcon('times', 'fas', 'fa-fw');
    abortBtn.append(abortIcon);
    abortBtnWrapper.append(abortBtn);
    abortBtn.addEventListener('click', e => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        wrapper.remove();
        editBtn.disabled = false;
        abortCallback();
    });

    const inputField = document.createElement('input');
    inputField.classList.add('form-control');
    if (!isMissionList && transform)
        inputField.style.setProperty('width', 'max(20em, calc(100vw / 3))');
    inputField.type = 'text';
    inputField.value = defaultMessage;

    const postWrapper = document.createElement('label');
    postWrapper.classList.add('input-group-addon');
    const postSpan = document.createElement('span');
    postSpan.style.setProperty('display', 'flex');
    const postInput = document.createElement('input');
    postInput.type = 'checkbox';
    postInput.checked = postInChat;
    const postIcon = createIcon('comment', 'fas', 'fa-fw', 'pull-right');
    postSpan.append(postInput, postIcon);
    postWrapper.append(postSpan);
    postWrapper.addEventListener('click', e => {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    const sendBtnWrapper = document.createElement('div');
    sendBtnWrapper.classList.add('input-group-addon');
    sendBtnWrapper.style.setProperty('padding', '0');
    const sendBtn = document.createElement('button');
    sendBtn.classList.add('btn', 'btn-success');
    const sendIcon = createIcon(
        checkIcon ? 'check' : 'paper-plane',
        'fas',
        'fa-fw'
    );
    sendBtn.append(sendIcon);
    sendBtnWrapper.append(sendBtn);
    sendBtn.addEventListener('click', e => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        abortBtn.disabled = true;
        inputField.disabled = true;
        postInput.disabled = true;
        sendBtn.disabled = true;
        sendCallback(inputField, postInput);
    });

    wrapper.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendBtn.click();
    });

    wrapper.append(abortBtnWrapper, inputField, postWrapper, sendBtnWrapper);

    return wrapper;
}

/**
 * A method to create the edit field of a message in a SAP Dropdown.
 * Is a shortcut for a special configuration of {@link createEditField}.
 * @param liElement - The list element of the message.
 * @param editBtn - The edit Button created by {@link createEditBtn}.
 * @param inputGroupClass -  A single class or a list of classes to be added to the input group.
 * @param isMissionList - Whether the dropdown is in mission list because extra styling is required in there. Is false by default.
 * @returns - The result of {@link createEditField}.
 */
export function createEditFieldForDropdown(
    liElement: HTMLLIElement,
    editBtn: HTMLButtonElement,
    inputGroupClass: string[] | string = [],
    isMissionList = false
) {
    return createEditField(
        liElement.dataset.message ?? '',
        liElement.dataset.post === 'true',
        editBtn,
        () => void 0,
        (inputField, postInput) => {
            liElement.dataset.message = liElement.dataset.raw =
                inputField.value.trim();
            liElement.dataset.post = postInput.checked.toString();
            liElement.click();
        },
        inputGroupClass,
        isMissionList
    );
}

/**
 * A method to create a click handler to handle clicks in a SAP dropdown.
 * @param inputGroupClass - A single class to be added to the input group of edit fields.
 * @param editBtnClass - A single class to be added to the edit buttons.
 * @param additionalFn - A function to be called if there is no edit button. We still don't understand why Jan implemented that, but we're sure it has some good reason.
 * @param isMissionList - Whether the dropdown is in the mission list.
 * @returns - A function that can be used as the click handler for the dropdown trigger.
 */
export function getDropdownClickHandler(
    inputGroupClass: string,
    editBtnClass: string,
    additionalFn: (liElement: HTMLLIElement, sendMessage: boolean) => void,
    isMissionList = false
) {
    return (event: MouseEvent) => {
        const target = event.target;
        if (!target || !(target instanceof HTMLElement)) return;
        const liElement = target.closest<HTMLLIElement>(
            'li[data-message][data-post], li[data-no-message="1"]'
        );
        if (target.closest(`.${inputGroupClass}`)) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        }
        if (!liElement) return;

        event.preventDefault();

        const editBtn = target.closest<HTMLButtonElement>(
            `button.${editBtnClass}`
        );
        if (editBtn) {
            event.stopPropagation();
            event.stopImmediatePropagation();

            editBtn.disabled = true;

            editBtn.after(
                createEditFieldForDropdown(
                    liElement,
                    editBtn,
                    inputGroupClass,
                    isMissionList
                )
            );
        } else {
            additionalFn(liElement, liElement.dataset.noMessage !== '1');
        }
    };
}
