import he from 'he';

import {
    addHoursToNow,
    createIcon,
    dateToTime,
    getCityFromAddress,
    getTimeReplacers,
    removeZipFromCity,
    sendReply,
    shareMission,
} from './assets/util';

import { Mission } from 'typings/Mission';
import { ModuleMainFunction } from 'typings/Module';

export interface Message {
    name: string;
    message: string;
    postInChat: boolean;
}

export default <ModuleMainFunction>(async ({
    LSSM,
    MODULE_ID,
    getSetting,
    $m,
}) => {
    await LSSM.$store.dispatch('api/getMissions', { feature: MODULE_ID });

    LSSM.$store.commit('useFontAwesome');

    const messages = (
        await getSetting<{ value: Message[]; enabled: boolean }>('messages')
    ).value;

    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';
    const missionId = window.location.pathname.split('/')[2];
    const dropdownClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-dropdown`
    );
    const editBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-edit_msg`
    );

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

    const averageCredits = mission?.average_credits?.toLocaleString() ?? '–';
    const patients = document
        .querySelectorAll('.mission_patient')
        .length.toLocaleString();

    const remainingVehicles =
        (
            document
                .querySelector<HTMLDivElement>('#missing_text')
                ?.textContent?.trim() ??
            document.querySelector<HTMLDivElement>(`#${PREFIX}-missing_text`)
                ?.dataset.rawText ??
            '–'
        )
            .replace(/^.*?:/, '')
            .trim() ?? '–';
    const address = he.decode(
        document
            .querySelector<HTMLDivElement>('#mission_general_info')
            ?.dataset.address?.trim() ??
            document
                .querySelector<HTMLElement>('#missionH1 + small')
                ?.textContent?.replace(/\|(.|\n)*$/, '')
                .trim() ??
            '–'
    );
    const city = getCityFromAddress(address);
    const cityWithoutZip = removeZipFromCity(city);

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

    let longestDrive = '–';

    const vehicleAmountElement =
        document.querySelector<HTMLSpanElement>('#vehicle_amount');
    if (vehicleAmountElement) {
        new MutationObserver(() => {
            const selectedVehicles =
                document.querySelectorAll<HTMLInputElement>(
                    '#vehicle_show_table_body_all .vehicle_checkbox:checked'
                );
            if (selectedVehicles.length) {
                const lastSelectedVehicleId =
                    selectedVehicles[selectedVehicles.length - 1].value;
                longestDrive =
                    Array.from(
                        document.querySelector<HTMLTableCellElement>(
                            `#vehicle_sort_${lastSelectedVehicleId}`
                        )?.childNodes ?? []
                    )
                        .find(n => n.nodeType === Node.TEXT_NODE)
                        ?.textContent?.trim() ?? '–';
            } else {
                longestDrive = '–';
            }
            document
                .querySelectorAll<HTMLLIElement>(
                    `.${dropdownClass} li[data-raw-message*="{{longestDrive}}"]`
                )
                .forEach(element => {
                    element.dataset.message = getModifiedMessage(
                        element.dataset.rawMessage ?? ''
                    );
                    element.title = element.dataset.message ?? '';
                });
        }).observe(vehicleAmountElement, {
            childList: true,
            characterData: true,
        });
    }

    const missionName =
        mission?.name ??
        Array.from(
            document.querySelector<HTMLHeadingElement>(`#missionH1`)
                ?.childNodes ?? []
        )
            .find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
            ?.textContent?.trim() ??
        '';

    const variables: Record<
        string,
        (match: string, ...groups: string[]) => string
    > = {
        credits: () => averageCredits,
        patients: () => patients,
        remaining: () => remainingVehicles,
        address: () => address,
        city: () => city,
        cityWithoutZip: () => cityWithoutZip,
        beginAt: () => beginAtDate,
        longestDrive: () => longestDrive,
        name: () => missionName,
        ...getTimeReplacers(),
    };

    const getModifiedMessage = (message: string) => {
        let newMessage = message;
        Object.entries(variables).forEach(([variable, replacer]) => {
            if (variable.startsWith('/') && variable.endsWith('/')) {
                newMessage = newMessage.replace(
                    new RegExp(`{{${variable.replace(/^\/|\/$/g, '')}}}`, 'g'),
                    replacer
                );
            } else {
                newMessage = newMessage.replace(
                    new RegExp(`{{${variable}}}`, 'g'),
                    replacer
                );
            }
        });
        return newMessage;
    };

    const modifiedMessages: (Message & { raw: string })[] = [];
    const modifyMessages = () =>
        messages.forEach(m => {
            const message = getModifiedMessage(m.message);
            modifiedMessages.push({ ...m, message, raw: m.message });
        });

    const replyField = document.querySelector<HTMLInputElement>(
        '#mission_reply_content'
    );

    const btn = document.createElement('button');
    btn.classList.add('btn', 'dropdown-toggle');
    btn.dataset.toggle = 'dropdown';
    const icon = createIcon('comment-dots', 'fas');
    icon.style.setProperty('margin-right', '4px');
    const caret = document.createElement('span');
    caret.classList.add('caret');
    btn.append(icon, caret);

    const dropdown = document.createElement('ul');
    dropdown.classList.add('dropdown-menu', dropdownClass);

    const addMessagesToDropdown = (
        btn: HTMLButtonElement,
        dropdown: HTMLUListElement,
        editable = false
    ) =>
        btn.addEventListener('click', () => {
            if (!messages.length) return;
            if (!modifiedMessages.length) modifyMessages();
            if (!dropdown.dataset.hasModifiedMessages) {
                const noMessageLi = document.createElement('li');
                noMessageLi.dataset.noMessage = '1';
                const noMessageA = document.createElement('a');
                noMessageA.style.setProperty('margin', '0');
                noMessageA.style.setProperty('cursor', 'pointer');
                noMessageA.textContent = $m('noMessage').toString();
                noMessageLi.append(noMessageA);
                const separatorLi = document.createElement('li');
                separatorLi.classList.add('divider');
                dropdown.append(noMessageLi, separatorLi);

                modifiedMessages.forEach(
                    ({ name, message, postInChat, raw }) => {
                        const li = document.createElement('li');
                        li.dataset.message = message;
                        li.dataset.rawMessage = raw;
                        li.dataset.post = postInChat.toString();
                        li.title = message;
                        const a = document.createElement('a');
                        a.style.setProperty('margin', '0');
                        a.style.setProperty('cursor', 'pointer');
                        a.textContent = name;

                        const icon = createIcon(
                            postInChat ? 'comment' : 'comment-slash',
                            'fas',
                            'fa-fw',
                            'pull-right'
                        );
                        icon.style.setProperty('margin-right', '7px');
                        a.append(icon);

                        if (editable) {
                            const editBtn = document.createElement('button');
                            editBtn.classList.add(
                                'btn',
                                'btn-xs',
                                'btn-default',
                                editBtnClass
                            );
                            editBtn.style.setProperty('position', 'absolute');
                            editBtn.style.setProperty('right', '0');
                            editBtn.style.setProperty(
                                'transform',
                                'translateY(-3px)'
                            );

                            const btnIcon = createIcon('edit', 'fas', 'fa-fw');
                            btnIcon.style.setProperty('pointer-events', 'none');

                            editBtn.append(btnIcon);
                            a.append(editBtn);
                        }

                        li.append(a);
                        dropdown.append(li);
                    }
                );
                dropdown.dataset.hasModifiedMessages = '1';
            }
        });

    if (replyField) {
        const allianceChatCheckbox = document.querySelector<HTMLInputElement>(
            '#mission_reply_alliance_chat'
        );

        btn.classList.add('btn-default');

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

        replyField.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            replyField.nextElementSibling
                ?.querySelector<HTMLButtonElement>('button[type="submit"]')
                ?.click();
        });
    } else {
        const navbar = document.querySelector<HTMLDivElement>(
            '#container_navbar_alarm .navbar-header'
        );
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        const phoneIcon = createIcon('phone-alt', 'fas', 'fa-fw');
        const shareIcon = createIcon('share-alt', 'fas', 'fa-fw');
        const commentIcon = createIcon('comment-dots', 'fas', 'fa-fw');
        const arrowIcon = createIcon('arrow-alt-circle-right', 'fas', 'fa-fw');

        const alarmSharePostGroup = document.createElement('div');
        alarmSharePostGroup.classList.add('btn-group', 'dropup');
        alarmSharePostGroup.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_alarm-share-post`,
            true
        );
        const alarmSharePostBtn = btn.cloneNode(true) as HTMLButtonElement;
        alarmSharePostBtn.classList.add('btn', 'btn-success', 'btn-sm');
        alarmSharePostBtn.style.setProperty('font-size', '100%');
        alarmSharePostBtn.innerHTML = '';
        alarmSharePostBtn.append(phoneIcon, shareIcon, commentIcon);
        const alarmSharePostDropdown = dropdown.cloneNode(
            true
        ) as HTMLUListElement;
        alarmSharePostGroup.append(alarmSharePostBtn, alarmSharePostDropdown);

        const alarmSharePostNextGroup = document.createElement('div');
        alarmSharePostNextGroup.classList.add('btn-group', 'dropup');
        alarmSharePostNextGroup.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_alarm-share-post-next`,
            true
        );
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
        const alarmSharePostNextDropdown = dropdown.cloneNode(
            true
        ) as HTMLUListElement;
        alarmSharePostNextGroup.append(
            alarmSharePostNextBtn,
            alarmSharePostNextDropdown
        );

        addMessagesToDropdown(alarmSharePostBtn, alarmSharePostDropdown, true);
        addMessagesToDropdown(
            alarmSharePostNextBtn,
            alarmSharePostNextDropdown,
            true
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

        const inputGroupClass = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_edit-msg_input-group`
        );

        btnGroup.addEventListener('click', e => {
            const target = e.target;
            if (!target || !(target instanceof HTMLElement)) return;
            const liElement = target.closest<HTMLLIElement>(
                'li[data-message][data-post], li[data-no-message]'
            );
            if (target.closest(`.${inputGroupClass}`)) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                return;
            }
            if (!liElement) return;

            e.preventDefault();

            const editBtn = target.closest<HTMLButtonElement>(
                `button.${editBtnClass}`
            );
            if (editBtn) {
                e.stopPropagation();
                e.stopImmediatePropagation();

                editBtn.disabled = true;

                const wrapper = document.createElement('div');
                wrapper.classList.add('input-group', inputGroupClass);
                wrapper.style.setProperty('position', 'absolute');
                wrapper.style.setProperty('left', '100%');
                wrapper.style.setProperty('transform', 'translateY(-26px)');

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
                inputField.style.setProperty(
                    'width',
                    'max(20em, calc(100vw / 3))'
                );
                inputField.type = 'text';
                inputField.value = liElement.dataset.message ?? '';

                const postWrapper = document.createElement('label');
                postWrapper.classList.add('input-group-addon');
                const postSpan = document.createElement('span');
                postSpan.style.setProperty('display', 'flex');
                const postInput = document.createElement('input');
                postInput.type = 'checkbox';
                postInput.checked = liElement.dataset.post === 'true';
                const postIcon = createIcon(
                    'comment',
                    'fas',
                    'fa-fw',
                    'pull-right'
                );
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

                inputField.addEventListener('keydown', e => {
                    if (e.key === 'Enter') sendBtn.click();
                });

                wrapper.append(
                    abortBtnWrapper,
                    inputField,
                    postWrapper,
                    sendBtnWrapper
                );
                editBtn.after(wrapper);
                return;
            }

            alarmSharePostBtn.disabled = true;
            alarmSharePostNextBtn.disabled = true;

            shareMission(LSSM, missionId)
                .then(() =>
                    liElement.dataset.noMessage
                        ? new Promise<void>(resolve => resolve())
                        : sendReply(
                              LSSM,
                              missionId,
                              liElement.dataset.message ?? '',
                              liElement.dataset.post === 'true',
                              authToken
                          )
                )
                .then(() =>
                    document
                        .querySelector<HTMLAnchorElement>(
                            liElement.closest(`#${alarmSharePostGroup.id}`)
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
