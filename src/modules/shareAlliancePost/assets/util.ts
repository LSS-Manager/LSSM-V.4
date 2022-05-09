export function getCityFromAddress(address: string) {
    const addressSplit = address.split(',');
    return addressSplit[addressSplit.length - 1]?.trim() ?? '–';
}

export function removeZipFromCity(city: string) {
    return city
        .replace(
            // matches all Zip-styles of the countries supported by LSSM
            /^((\d{4} ?[A-Z]{2})|((\d{4}|\d{2})[ -]\d{3})|(\d{3} \d{2})|\d+|([\dA-Z]{2,4} [\dA-Z]{3}))/u,
            ''
        )
        .trim();
}

export function addMinutesToDate(minutes: number, date: Date) {
    date.setTime(date.getTime() + minutes * 60 * 1000);
    return date;
}

export function addMinutesToNow(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}

export function addHoursToNow(hours: number): Date {
    return addMinutesToNow(60 * hours);
}

export function addDaysToToday(addDays = 0): Date {
    return addHoursToNow(24 * addDays);
}

export function dateToTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}

export function dateToDayString(date: Date): string {
    return date.toLocaleDateString(undefined, {
        month: '2-digit',
        day: '2-digit',
    });
}

export function getDateFromToday(addDays = 0): string {
    return dateToDayString(addDaysToToday(addDays));
}

export function getTimeReplacers(): Record<
    string,
    (match: string, ...groups: string[]) => string
> {
    return {
        [/now\+(\d+(?:[,.]\d+)?)(d?)/u.toString()]: (
            match,
            additive,
            printDate
        ) => {
            const resultDate = addHoursToNow(parseFloat(additive));
            if (printDate) {
                return `${dateToTime(resultDate)} (${dateToDayString(
                    resultDate
                )})`;
            } else {
                return dateToTime(resultDate);
            }
        },
        [/now\+(\d+(?:[,.]\d+)?)r(-?\d+)(d?)/u.toString()]: (
            match,
            additive,
            round,
            printDate
        ) => {
            const resultDate = addHoursToNow(parseFloat(additive));
            const roundTo = Math.abs(parseInt(round)) % 60;
            const roundUp = !round.startsWith('-');
            const resultHours = resultDate.getHours();
            const resultMinutes = resultDate.getMinutes();
            if (!roundTo) {
                resultDate.setMinutes(0);
                if (roundUp) resultDate.setHours(resultHours + 1);
            } else {
                if (roundUp) {
                    addMinutesToDate(
                        roundTo - (resultMinutes % roundTo),
                        resultDate
                    );
                } else {
                    addMinutesToDate(-(resultMinutes % roundTo), resultDate);
                }
            }
            if (printDate) {
                return `${dateToTime(resultDate)} (${dateToDayString(
                    resultDate
                )})`;
            } else {
                return dateToTime(resultDate);
            }
        },
    };
}

export function shareMission(
    LSSM: Vue,
    missionId: number | string,
    isCallList = false
) {
    return LSSM.$store.dispatch('api/request', {
        url: `/missions/${missionId}/alliance`,
        feature: `'sap-${isCallList ? 'ecl-' : ''}share-missions'`,
    });
}

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
    return LSSM.$store.dispatch('api/request', {
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

export function createIcon(
    icon: string,
    style: 'fab' | 'far' | 'fas' = 'fas',
    ...classes: string[]
) {
    const iconElement = document.createElement('i');
    iconElement.classList.add(style, `fa-${icon}`, ...classes);
    return iconElement;
}

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
