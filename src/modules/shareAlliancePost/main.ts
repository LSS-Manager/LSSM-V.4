import { Mission } from 'typings/Mission';
import { ModuleMainFunction } from 'typings/Module';

interface Message {
    name: string;
    message: string;
    postInChat: boolean;
}

export default <ModuleMainFunction>(async ({ LSSM, MODULE_ID, getSetting }) => {
    await LSSM.$store.dispatch('api/getMissions', { feature: MODULE_ID });

    LSSM.$store.commit('useFontAwesome');

    const messages = (
        await getSetting<{ value: Message[]; enabled: boolean }>('messages')
    ).value;

    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';
    const missionId = window.location.pathname.split('/')[2];

    const missionHelpBtn = document.getElementById('mission_help');
    let missionType =
        missionHelpBtn
            ?.getAttribute('href')
            ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1';
    if (missionType !== '-1') {
        const overlayIndex =
            document
                .getElementById('mission_general_info')
                ?.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            missionType += `-${overlayIndex}`;
        const additionalOverlay =
            document
                .getElementById('mission_general_info')
                ?.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            missionType += `/${additionalOverlay}`;
    }
    const mission = (
        LSSM.$store.getters['api/missionsById'] as Record<string, Mission>
    )[missionType];

    const addHoursToNow = (hours: number): Date =>
        new Date(Date.now() + hours * 60 * 60 * 1000);
    const dateToTime = (date: Date): string =>
        `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;

    const averageCredits = mission?.average_credits?.toLocaleString() ?? '–';
    const patients = document
        .querySelectorAll('.mission_patient')
        .length.toLocaleString();
    const remainingVehicles =
        document
            .querySelector<HTMLDivElement>('#missing_text')
            ?.textContent?.trim()
            .replace(/^.*?:/, '')
            .trim() ?? '';

    let beginAtDate = '–';
    LSSM.$store
        .dispatch('hook', {
            event: 'missionCountdown',
            callback(beginInSeconds: number) {
                beginAtDate =
                    beginInSeconds <= 0
                        ? '–'
                        : dateToTime(addHoursToNow(beginInSeconds / 60 / 60));
            },
        })
        .then();

    const variables: Record<
        string,
        (match: string, ...groups: string[]) => string
    > = {
        credits: () => averageCredits,
        patients: () => patients,
        remaining: () => remainingVehicles,
        beginAt: () => beginAtDate,
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

    const modifiedMessages: Message[] = [];
    const modifyMessages = () =>
        messages.forEach(m => {
            let message = m.message;
            Object.entries(variables).forEach(([variable, replacer]) => {
                if (variable.startsWith('/') && variable.endsWith('/')) {
                    message = message.replace(
                        new RegExp(
                            `{{${variable.replace(/^\/|\/$/g, '')}}}`,
                            'g'
                        ),
                        replacer
                    );
                } else {
                    message = message.replaceAll(`{{${variable}}}`, replacer);
                }
            });
            modifiedMessages.push({ ...m, message });
        });

    const replyField = document.querySelector<HTMLInputElement>(
        '#mission_reply_content'
    );

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-default', 'dropdown-toggle');
    btn.dataset.toggle = 'dropdown';
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-comment-dots');
    icon.style.setProperty('margin-right', '4px');
    const caret = document.createElement('span');
    caret.classList.add('caret');
    btn.append(icon, caret);

    const dropdown = document.createElement('ul');
    dropdown.classList.add('dropdown-menu');

    const addMessagesToDropdown = (
        btn: HTMLButtonElement,
        dropdown: HTMLUListElement
    ) =>
        btn.addEventListener('click', () => {
            if (!messages.length) return;
            if (!modifiedMessages.length) modifyMessages();
            if (!dropdown.dataset.hasModifiedMessages) {
                modifiedMessages.forEach(({ name, message, postInChat }) => {
                    const li = document.createElement('li');
                    li.dataset.message = message;
                    li.dataset.post = postInChat.toString();
                    li.title = message;
                    const a = document.createElement('a');
                    a.style.setProperty('margin', '0');
                    a.style.setProperty('cursor', 'pointer');
                    a.textContent = name;
                    const icon = document.createElement('i');
                    icon.classList.add(
                        'pull-right',
                        'fas',
                        postInChat ? 'fa-comment' : 'fa-comment-slash'
                    );
                    a.append(icon);
                    li.append(a);
                    dropdown.append(li);
                });
                dropdown.dataset.hasModifiedMessages = '1';
            }
        });

    if (replyField) {
        const allianceChatCheckbox = document.querySelector<HTMLInputElement>(
            '#mission_reply_alliance_chat'
        );

        addMessagesToDropdown(btn, dropdown);

        const addon = document.createElement('div');
        addon.classList.add('input-group-btn');
        dropdown.addEventListener('click', e => {
            const target = e.target;
            if (!target || !(target instanceof HTMLElement)) return;
            e.preventDefault();
            const liElement = target.closest<HTMLLIElement>(
                'li[data-message][data-post]'
            );
            if (liElement) {
                replyField.value = liElement.dataset.message ?? '';
                if (allianceChatCheckbox) {
                    allianceChatCheckbox.checked =
                        liElement.dataset.post === 'true';
                }
            }
        });
        addon.append(btn, dropdown);
        replyField.before(addon);
    } else {
        const navbar = document.querySelector<HTMLDivElement>(
            '#container_navbar_alarm .navbar-header'
        );
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        const phoneIcon = document.createElement('i');
        phoneIcon.classList.add('fas', 'fa-fw', 'fa-phone-alt');
        const shareIcon = document.createElement('i');
        shareIcon.classList.add('fas', 'fa-fw', 'fa-share-alt');
        const commentIcon = document.createElement('i');
        commentIcon.classList.add('fas', 'fa-fw', 'fa-comment-dots');
        const arrowIcon = document.createElement('i');
        arrowIcon.classList.add('fas', 'fa-fw', 'fa-arrow-alt-circle-right');

        const alarmSharePostGroup = document.createElement('div');
        alarmSharePostGroup.classList.add('btn-group', 'dropup');
        const alarmSharePostBtn = btn.cloneNode(true) as HTMLButtonElement;
        alarmSharePostBtn.classList.add('btn', 'btn-success', 'btn-sm');
        alarmSharePostBtn.style.setProperty('font-size', '100%');
        alarmSharePostBtn.innerHTML = '';
        alarmSharePostBtn.append(phoneIcon, shareIcon, commentIcon);
        alarmSharePostBtn.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_alarm-share-post`,
            true
        );
        const alarmSharePostDropdown = dropdown.cloneNode(
            true
        ) as HTMLUListElement;
        alarmSharePostGroup.append(alarmSharePostBtn, alarmSharePostDropdown);

        const alarmSharePostNextGroup = document.createElement('div');
        alarmSharePostNextGroup.classList.add('btn-group', 'dropup');
        const alarmSharePostNextBtn = btn.cloneNode(true) as HTMLButtonElement;
        alarmSharePostNextBtn.classList.add('btn', 'btn-success', 'btn-sm');
        alarmSharePostNextBtn.style.setProperty('font-size', '100%');
        alarmSharePostNextBtn.innerHTML = '';
        alarmSharePostNextBtn.append(
            phoneIcon.cloneNode(true),
            shareIcon.cloneNode(true),
            commentIcon.cloneNode(true),
            arrowIcon
        );
        alarmSharePostNextBtn.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_alarm-share-post-next`,
            true
        );
        const alarmSharePostNextDropdown = dropdown.cloneNode(
            true
        ) as HTMLUListElement;
        alarmSharePostNextGroup.append(
            alarmSharePostNextBtn,
            alarmSharePostNextDropdown
        );

        addMessagesToDropdown(alarmSharePostBtn, alarmSharePostDropdown);
        addMessagesToDropdown(
            alarmSharePostNextBtn,
            alarmSharePostNextDropdown
        );

        btnGroup.append(alarmSharePostGroup, alarmSharePostNextGroup);

        let sortedMissionClass = '';
        let missionsSorted =
            document.querySelector<HTMLInputElement>(
                '#lssmv4-extendedCallList_sort_toggle-mission-buttons-mode'
            )?.checked ?? false;
        if (missionsSorted) {
            alarmSharePostNextBtn.classList.replace(
                'btn-success',
                'btn-primary'
            );
        }
        LSSM.$store
            .dispatch('event/addListener', {
                name: `extendedCallList_sorted-missions_toggle-missionwindow`,
                listener({
                    detail: { sorted, alertNextBtnClass },
                }: CustomEvent) {
                    missionsSorted = sorted;
                    sortedMissionClass = alertNextBtnClass;
                    let classes: [string, string] = [
                        'btn-primary',
                        'btn-success',
                    ];
                    if (missionsSorted)
                        classes = classes.reverse() as [string, string];
                    alarmSharePostNextBtn.classList.replace(...classes);
                },
            })
            .then();

        btnGroup.addEventListener('click', e => {
            const target = e.target;
            if (!target || !(target instanceof HTMLElement)) return;
            const liElement = target.closest<HTMLLIElement>(
                'li[data-message][data-post]'
            );
            if (!liElement) return;

            e.preventDefault();

            alarmSharePostBtn.disabled = true;
            alarmSharePostNextBtn.disabled = true;

            LSSM.$store
                .dispatch('api/request', {
                    url: `${window.location.pathname.replace(
                        /\/$/,
                        ''
                    )}/alliance`,
                    feature: `${MODULE_ID}_share`,
                })
                .then(() => {
                    const url = new URL(
                        '/mission_replies',
                        window.location.origin
                    );
                    url.searchParams.append('utf8', '✓');
                    url.searchParams.append('authenticity_token', authToken);
                    url.searchParams.append(
                        'mission_reply[alliance_chat]',
                        '0'
                    );
                    if (liElement.dataset.post === 'true') {
                        url.searchParams.append(
                            'mission_reply[alliance_chat]',
                            '1'
                        );
                    }
                    url.searchParams.append(
                        'mission_reply[content]',
                        liElement.dataset.message ?? ''
                    );
                    url.searchParams.append(
                        'mission_reply[mission_id]',
                        missionId
                    );
                    return LSSM.$store.dispatch('api/request', {
                        url: '/mission_replies',
                        feature: `${MODULE_ID}_reply`,
                        init: {
                            credentials: 'include',
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                            },
                            body: url.searchParams.toString(),
                            method: 'POST',
                            mode: 'cors',
                        },
                    });
                })
                .then(() =>
                    document
                        .querySelector<HTMLAnchorElement>(
                            liElement.closest(`#${alarmSharePostBtn.id}`)
                                ? '#mission_alarm_btn'
                                : missionsSorted
                                ? `.${sortedMissionClass}`
                                : '#alert_next_btn'
                        )
                        ?.click()
                );
        });

        navbar?.append(btnGroup);
    }
});
