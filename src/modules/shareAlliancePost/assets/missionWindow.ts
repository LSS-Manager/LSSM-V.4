import he from 'he';

import {
    addHoursToNow,
    createEditBtn,
    createIcon,
    dateToTime,
    getCityFromAddress,
    getDateFromToday,
    getDropdownClickHandler,
    getTimeReplacers,
    removeZipFromCity,
    sendReply,
    shareMission,
} from './util';

import type { ModuleMainFunction } from 'typings/Module';
import type VueI18n from 'vue-i18n';

export interface Message {
    name: string;
    message: string;
    postInChat: boolean;
}

export default async ({
    LSSM,
    MODULE_ID,
    getSetting,
    $m,
}: Parameters<ModuleMainFunction>[0]) => {
    const messages = (
        await getSetting<{ value: Message[]; enabled: boolean }>('messages')
    ).value;

    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';
    const missionId = window.location.pathname.split('/')[2];
    const dropdownClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-dropdown`
    );
    const editBtnClass = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-edit_msg`
    );

    const emv$m =
        (addEmvKey = true) =>
        (
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult =>
            LSSM.$t(
                `modules.extendedCallWindow.${
                    addEmvKey ? 'enhancedMissingVehicles.' : ''
                }${key}`,
                args
            );
    LSSM.$i18n.mergeLocaleMessage(LSSM.$stores.root.locale, {
        modules: {
            extendedCallWindow: await import(
                /* webpackChunkName: "modules/i18n/extendedCallWindow/[request]" */ `../../extendedCallWindow/i18n/${LSSM.$stores.root.locale}.json`
            ),
        },
    });

    const missionTypeId = LSSM.$utils.getMissionTypeInMissionWindow();

    const missionType = await LSSM.$stores.api.getMissionType(
        missionTypeId,
        MODULE_ID
    );

    const averageCredits =
        missionType?.average_credits?.toLocaleString() ?? '–';
    const patients = document
        .querySelectorAll('.mission_patient')
        .length.toLocaleString();

    const missingTextEl =
        document.querySelector<HTMLDivElement>('#missing_text') ??
        document.createElement('div');
    // that comes from emv
    if (!missingTextEl.id) {
        missingTextEl.innerHTML =
            document.querySelector<HTMLDivElement>(`#${PREFIX}-missing_text`)
                ?.dataset.rawHtml ?? '–';
    }

    const remainingVehicles =
        missingTextEl
            .querySelector('div[data-requirement-type="vehicles"]')
            ?.textContent?.trim()
            .replace(/^.*?:/u, '')
            .trim() ?? '–';
    const address = he.decode(
        document
            .querySelector<HTMLDivElement>('#mission_general_info')
            ?.dataset.address?.trim() ??
            document
                .querySelector<HTMLElement>('#missionH1 + small')
                ?.textContent?.replace(/\|(?:.|\n)*$/u, '')
                .trim() ??
            '–'
    );
    const city = getCityFromAddress(address);
    const cityWithoutZip = removeZipFromCity(city);

    let beginAtDate = '–';
    LSSM.$stores.root.hook({
        event: 'missionCountdown',
        callback(beginInSeconds: number) {
            beginAtDate =
                beginInSeconds <= 0
                    ? '–'
                    : dateToTime(addHoursToNow(beginInSeconds / 60 / 60));
        },
    });

    let longestDrive = '–';

    const missingRequirementsFn = (
        await import(
            /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles/getMissingRequirements"*/ '../../extendedCallWindow/assets/emv/getMissingRequirements'
        )
    ).default;
    let missingRequirements: ReturnType<typeof missingRequirementsFn>;
    const getMissingRequirementsListHandler = (
        await import(
            /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles/getVehicleListObserveHandler"*/ '../../extendedCallWindow/assets/emv/getVehicleListObserveHandler'
        )
    ).default;
    let missingRequirementsListHandler: ReturnType<
        typeof getMissingRequirementsListHandler
    >;

    const vehicleAmountElement =
        document.querySelector<HTMLSpanElement>('#vehicle_amount');
    if (vehicleAmountElement) {
        new MutationObserver(() => {
            const selectedVehicles = Array.from(
                document.querySelectorAll<HTMLInputElement>(
                    '#vehicle_show_table_body_all .vehicle_checkbox:checked'
                )
            );
            if (selectedVehicles.length) {
                const lastSelectedVehicleId = selectedVehicles.at(-1)?.value;
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

            if (!missingRequirements) {
                missingRequirements = missingRequirementsFn(
                    LSSM,
                    missingTextEl,
                    missionType,
                    emv$m(false)
                );
            }
            if (!missingRequirements) return;
            if (!missingRequirementsListHandler) {
                missingRequirementsListHandler =
                    getMissingRequirementsListHandler(
                        LSSM,
                        missingRequirements,
                        missingRequirements.requirements,
                        (requirement, value, group) => {
                            const req = missingRequirements?.requirements[
                                group
                            ].find(
                                ({ requirement: req }) =>
                                    requirement.requirement === req
                            );
                            if (req) req.selected = value;
                        }
                    );
            }
            missingRequirementsListHandler?.();
            document
                .querySelectorAll<HTMLLIElement>(
                    ['longestDrive', 'remainingSpecial']
                        .map(
                            variable =>
                                `.${dropdownClass} li[data-raw-message*="{{${variable}}"]`
                        )
                        .join(', ')
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
            attributes: true,
        });

        const allTable = document.querySelector('#vehicle_show_table_all');
        if (allTable && missingRequirementsListHandler) {
            new MutationObserver(missingRequirementsListHandler).observe(
                allTable,
                {
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['data-equipment-types'],
                }
            );
        }
    }

    const missionName =
        missionType?.name ??
        Array.from(
            document.querySelector<HTMLHeadingElement>(`#missionH1`)
                ?.childNodes ?? []
        )
            .find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
            ?.textContent?.trim() ??
        '';

    const today = getDateFromToday();
    const tomorrow = getDateFromToday(1);

    const variables: Record<
        string,
        (match: string, ...groups: string[]) => string
    > = {
        credits: () => averageCredits,
        patients: () => patients,
        remaining: () => remainingVehicles,
        remainingSpecial: () => {
            if (!missingRequirements) {
                missingRequirements = missingRequirementsFn(
                    LSSM,
                    missingTextEl,
                    missionType,
                    emv$m(false)
                );
            }
            return (
                missingRequirements?.requirements.vehicles
                    .map(({ requirement, missing, driving, selected }) => ({
                        requirement,
                        remaining:
                            (typeof selected === 'number'
                                ? missing - driving - selected
                                : missing - driving - selected.max) ?? 0,
                    }))
                    .filter(({ remaining }) => remaining > 0)
                    .map(
                        ({ requirement, remaining }) =>
                            `${remaining.toLocaleString()} ${requirement}`
                    )
                    .join(', ') ??
                remainingVehicles ??
                '¶'
            );
        },
        address: () => address,
        city: () => city,
        cityWithoutZip: () => cityWithoutZip,
        beginAt: () => beginAtDate,
        longestDrive: () => longestDrive,
        name: () => missionName,
        today: () => today,
        tomorrow: () => tomorrow,
        ...getTimeReplacers(),
        totalDuration: () => missionType?.additional?.duration_text ?? '–',
    };

    const getModifiedMessage = (message: string) => {
        let newMessage = message;
        Object.entries(variables).forEach(([variable, replacer]) => {
            if (variable.startsWith('/') && /\/[ADJUgimux]*$/u.test(variable)) {
                newMessage = newMessage.replace(
                    new RegExp(
                        `{{${variable.replace(/^\/|\/[ADJUgimux]*$/gu, '')}}}`,
                        'g'
                    ),
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
    dropdown.style.setProperty('width', 'max-content');

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
                        a.append(icon);

                        if (editable) {
                            icon.style.setProperty('margin-right', '12px');
                            icon.style.setProperty('margin-left', '1ch');
                            a.append(createEditBtn(editBtnClass));
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
                replyField.dispatchEvent(new Event('input'));
                if (allianceChatCheckbox) {
                    allianceChatCheckbox.checked =
                        liElement.dataset.post === 'true';
                }
            }
        });
        addon.append(btn, dropdown);
        replyField.before(addon);

        replyField.addEventListener('keydown', e => {
            if (
                e.key !== 'Enter' ||
                replyField.dataset.userChoiceOpen === 'true'
            )
                return;
            e.preventDefault();
            replyField.nextElementSibling
                ?.querySelector<HTMLButtonElement>('button[type="submit"]')
                ?.click();
        });
    } else {
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group', 'flex-row', 'flex-nowrap');

        const phoneIcon = createIcon('phone-alt', 'fas', 'fa-fw');
        const shareIcon = createIcon('share-alt', 'fas', 'fa-fw');
        const commentIcon = createIcon('comment-dots', 'fas', 'fa-fw');
        const arrowIcon = createIcon('arrow-alt-circle-right', 'fas', 'fa-fw');

        const alarmSharePostGroup = document.createElement('div');
        alarmSharePostGroup.classList.add('btn-group', 'dropup');
        alarmSharePostGroup.style.setProperty('margin-right', '0');
        alarmSharePostGroup.id = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}_alarm-share-post`,
            true
        );
        const alarmSharePostBtn = btn.cloneNode(true) as HTMLButtonElement;
        alarmSharePostBtn.style.setProperty('font-size', '100%');
        alarmSharePostBtn.classList.add('btn', 'btn-success', 'btn-sm');
        alarmSharePostBtn.innerHTML = '';
        alarmSharePostBtn.append(phoneIcon, shareIcon, commentIcon);
        const alarmSharePostDropdown = dropdown.cloneNode(
            true
        ) as HTMLUListElement;
        alarmSharePostGroup.append(alarmSharePostBtn, alarmSharePostDropdown);

        const alarmSharePostNextGroup = document.createElement('div');
        alarmSharePostNextGroup.classList.add('btn-group', 'dropup');
        alarmSharePostNextGroup.id = LSSM.$stores.root.nodeAttribute(
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

        let sortedMissionClass = LSSM.$stores.root.nodeAttribute(
            'extendedCallList_sort-missions_alert_next_sorted'
        );
        let missionsSorted =
            document.querySelector<HTMLInputElement>(
                `#${LSSM.$stores.root.nodeAttribute(
                    'extendedCallList_sort_toggle-mission-buttons-mode',
                    true
                )}`
            )?.checked ?? false;
        if (missionsSorted) {
            alarmSharePostNextBtn.classList.replace(
                'btn-success',
                'btn-primary'
            );
        }
        LSSM.$stores.event.addListener({
            name: `extendedCallList_sorted-missions_toggle-missionwindow`,
            listener({ detail: { sorted, alertNextBtnClass } }: CustomEvent) {
                missionsSorted = sorted;
                sortedMissionClass = alertNextBtnClass;
                let classes: [string, string] = ['btn-primary', 'btn-success'];
                if (missionsSorted)
                    classes = classes.reverse() as [string, string];
                alarmSharePostNextBtn.classList.replace(...classes);
            },
        });

        const inputGroupClass = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}_edit-msg_input-group`
        );

        btnGroup.addEventListener(
            'click',
            getDropdownClickHandler(
                inputGroupClass,
                editBtnClass,
                (liElement, sendMessage) => {
                    alarmSharePostBtn.disabled = true;
                    alarmSharePostNextBtn.disabled = true;

                    shareMission(LSSM, missionId)
                        .then(
                            () =>
                                new Promise<Response | void>(resolve => {
                                    if (sendMessage) {
                                        sendReply(
                                            LSSM,
                                            missionId,
                                            liElement.dataset.message ?? '',
                                            liElement.dataset.post === 'true',
                                            authToken
                                        ).then(resolve);
                                    } else {
                                        resolve();
                                    }
                                })
                        )
                        .then(() =>
                            document
                                .querySelector<HTMLAnchorElement>(
                                    liElement.closest(
                                        `#${alarmSharePostGroup.id}`
                                    )
                                        ? '#mission_alarm_btn'
                                        : missionsSorted
                                          ? `.${sortedMissionClass}`
                                          : '#alert_next_btn'
                                )
                                ?.click()
                        );
                }
            )
        );

        if (CSS.supports('selector(*:has(*))')) {
            Array.from(
                document.querySelectorAll(
                    '.flex-row:has(~ #navbar-alarm-spacer)'
                )
            )
                .at(-1)
                ?.after(btnGroup);
        } else {
            const flexRows = Array.from(
                document.querySelectorAll<HTMLDivElement>(
                    '#container_navbar_alarm .flex-row'
                )
            );
            let i = 0;
            for (const flexRow of flexRows) {
                if (flexRow.matches('#navbar-alarm-spacer ~ .flex-row')) {
                    flexRows[i - 1]?.after(btnGroup);
                    continue;
                }
                i++;
            }
        }
    }
};
