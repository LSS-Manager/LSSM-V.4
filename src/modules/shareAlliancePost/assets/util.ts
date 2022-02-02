export function getCityFromAddress(address: string) {
    const addressSplit = address.split(',');
    return addressSplit[addressSplit.length - 1]?.trim() ?? '–';
}

export function removeZipFromCity(city: string) {
    return city
        .replace(
            // matches all Zip-styles of the countries supported by LSSM
            /^((\d{4} ?[A-Z]{2})|((\d{4}|\d{2})[ -]\d{3})|(\d{3} \d{2})|\d+|([A-Z0-9]{2,4} [A-Z0-9]{3}))/,
            ''
        )
        .trim();
}

export function addHoursToNow(hours: number): Date {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function dateToTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}

export function getDateFromToday(addDays = 0): string {
    return (
        new Date(Date.now() + addDays * 1000 * 60 * 60 * 24)
            .toLocaleDateString()
            .match(/\d{1,2}\D\d{1,2}/)?.[0]
            .replace(/(?<=^|\D)\d(?=\D|$)/g, $0 => `0${$0}`) ?? ''
    );
}

export function getTimeReplacers(): Record<
    string,
    (match: string, ...groups: string[]) => string
> {
    return {
        [/now\+(\d+(?:[.,]\d+)?)/.toString()]: (match, additive) =>
            dateToTime(addHoursToNow(parseFloat(additive))),
        [/now\+(\d+(?:[.,]\d+)?)r(-?\d+)/.toString()]: (
            match,
            additive,
            round
        ) => {
            const resultDate = addHoursToNow(parseFloat(additive));
            const roundTo = Math.abs(parseInt(round)) % 60;
            const roundUp = !round.startsWith('-');
            let resultHours = resultDate.getHours();
            let resultMinutes = resultDate.getMinutes();
            if (!roundTo) {
                resultMinutes = 0;
                if (roundUp) resultHours++;
            } else {
                if (roundUp)
                    resultMinutes += roundTo - (resultMinutes % roundTo);
                else resultMinutes -= resultMinutes % roundTo;
            }
            resultHours += Math.floor(resultMinutes / 60);
            resultMinutes %= 60;
            resultHours %= 24;
            if (resultHours < 0) resultHours = 24 + resultHours;
            if (resultMinutes < 0) resultMinutes = 60 + resultMinutes;
            return `${resultHours.toString().padStart(2, '0')}:${resultMinutes
                .toString()
                .padStart(2, '0')}`;
        },
    };
}

export function shareMission(
    LSSM: Vue,
    missionId: string | number,
    isCallList = false
) {
    return LSSM.$store.dispatch('api/request', {
        url: `/missions/${missionId}/alliance`,
        feature: `'sap-${isCallList ? 'ecl-' : ''}share-missions'`,
    });
}

export function sendReply(
    LSSM: Vue,
    missionId: string | number,
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
    style: 'fas' | 'far' | 'fab' = 'fas',
    ...classes: string[]
) {
    const iconElement = document.createElement('i');
    iconElement.classList.add(style, `fa-${icon}`, ...classes);
    return iconElement;
}

export function createEditBtn(editBtnClass: string) {
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-xs', 'btn-default', editBtnClass);
    editBtn.style.setProperty('position', 'absolute');
    editBtn.style.setProperty('right', '0');
    editBtn.style.setProperty('transform', 'translateY(-3px)');

    const btnIcon = createIcon('edit', 'fas', 'fa-fw');
    btnIcon.style.setProperty('pointer-events', 'none');

    editBtn.append(btnIcon);

    return editBtn;
}

export function createEditField(
    liElement: HTMLLIElement,
    editBtn: HTMLButtonElement,
    inputGroupClass: string,
    isMissionList = false
) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('input-group', inputGroupClass);
    wrapper.style.setProperty('position', 'absolute');
    wrapper.style.setProperty('left', isMissionList ? '0' : '100%');
    wrapper.style.setProperty('transform', 'translateY(-26px)');
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
    });

    const inputField = document.createElement('input');
    inputField.classList.add('form-control');
    if (!isMissionList)
        inputField.style.setProperty('width', 'max(20em, calc(100vw / 3))');
    inputField.type = 'text';
    inputField.value = liElement.dataset.message ?? '';

    const postWrapper = document.createElement('label');
    postWrapper.classList.add('input-group-addon');
    const postSpan = document.createElement('span');
    postSpan.style.setProperty('display', 'flex');
    const postInput = document.createElement('input');
    postInput.type = 'checkbox';
    postInput.checked = liElement.dataset.post === 'true';
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
    const sendIcon = createIcon('paper-plane', 'fas', 'fa-fw');
    sendBtn.append(sendIcon);
    sendBtnWrapper.append(sendBtn);
    sendBtn.addEventListener('click', e => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        abortBtn.disabled = true;
        inputField.disabled = true;
        postInput.disabled = true;
        sendBtn.disabled = true;
        liElement.dataset.message = liElement.dataset.raw =
            inputField.value.trim();
        liElement.dataset.post = postInput.checked.toString();
        liElement.click();
    });

    wrapper.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendBtn.click();
    });

    wrapper.append(abortBtnWrapper, inputField, postWrapper, sendBtnWrapper);

    return wrapper;
}

export function getDropdownClickHandler(
    inputGroupClass: string,
    editBtnClass: string,
    additionalFn: (liElement: HTMLLIElement) => void,
    isMissionList = false
) {
    return (event: MouseEvent) => {
        const target = event.target;
        if (!target || !(target instanceof HTMLElement)) return;
        const liElement = target.closest<HTMLLIElement>(
            'li[data-message][data-post]'
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
                createEditField(
                    liElement,
                    editBtn,
                    inputGroupClass,
                    isMissionList
                )
            );
        } else {
            additionalFn(liElement);
        }
    };
}
