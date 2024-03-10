import {
    addHoursToNow,
    createIcon,
    dateToTime,
    getCityFromAddress,
    getDateFromToday,
    getTimeReplacers,
    removeZipFromCity,
    sendReply,
} from './util';

import type { Message } from './missionWindow';
import type { Mission } from 'typings/Mission';
import type { ModuleMainFunction } from 'typings/Module';

const getTimeModifiedMessage = (raw: string) => {
    let modified = raw;
    Object.entries(getTimeReplacers()).forEach(
        ([regex, replacer]) =>
            (modified = modified.replace(
                new RegExp(
                    `{{${regex.replace(/^\/|\/[ADJUgimux]*$/gu, '')}}}`,
                    'g'
                ),
                replacer
            ))
    );
    return modified;
};

const getModifiedMessage = (
    raw: string,
    LSSM: Vue,
    mission: HTMLDivElement,
    missionId: number | string,
    missionSpecs: Mission | undefined
) => {
    const address =
        mission
            .querySelector<HTMLSpanElement>(`#mission_address_${missionId}`)
            ?.textContent?.trim() ?? '–';
    const city = getCityFromAddress(address);
    const cityWithoutZip = removeZipFromCity(city);
    const remaining =
        mission
            .querySelector<HTMLDivElement>(`#mission_missing_${missionId}`)
            ?.textContent?.trim()
            ?.replace(/^.*?:/u, '')
            .trim() ?? '–';

    const replacements: Record<string, string> = {
        credits: missionSpecs?.average_credits?.toLocaleString() ?? '–',
        patients: (
            (mission.querySelector('[id^="mission_patients_"] [id^="patient_"]')
                ? mission.querySelectorAll('.patient_progress').length
                : mission
                        .querySelector<HTMLDivElement>(
                            '[id^="mission_patient_summary_"]'
                        )
                        ?.style.getPropertyValue('display') !== 'none'
                  ? LSSM.$utils.getNumberFromText(
                        mission.querySelector(
                            '.mission_list_patient_icon + strong'
                        )?.textContent ?? '0'
                    )
                  : 0) || '–'
        ).toLocaleString(),
        remaining,
        remainingSpecial: remaining,
        address,
        city,
        cityWithoutZip,
        beginAt: dateToTime(
            addHoursToNow(
                parseInt(
                    mission
                        .querySelector<HTMLDivElement>(
                            `#mission_overview_countdown_${missionId}`
                        )
                        ?.getAttribute('timeleft') ?? '0'
                ) /
                    1000 /
                    60 /
                    60
            )
        ),
        name:
            missionSpecs?.name ??
            Array.from(
                mission.querySelector<HTMLAnchorElement>(
                    `#mission_caption_${missionId}`
                )?.childNodes ?? []
            )
                .find(
                    n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
                )
                ?.textContent?.replace(/,$/u, '')
                .trim() ??
            '',
        today: getDateFromToday(),
        tomorrow: getDateFromToday(1),
        totalDuration: missionSpecs?.additional?.duration_text ?? '–',
    };

    let modifiedMessage = raw;
    Object.entries(replacements).forEach(
        ([variable, value]) =>
            (modifiedMessage = modifiedMessage.replace(
                new RegExp(`{{${variable}}}`, 'g'),
                value
            ))
    );
    return getTimeModifiedMessage(modifiedMessage);
};

const createDropdownElement = <I extends 'comment-slash' | 'comment'>(
    content: string,
    icon?: I
) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.style.setProperty('margin', '0');
    a.style.setProperty('cursor', 'pointer');
    a.textContent = content;
    if (icon) {
        const iconEl = createIcon(icon, 'fas', 'fa-fw', 'pull-right');
        iconEl.style.setProperty('margin-right', '7px');
        a.append(iconEl);
    }
    li.append(a);
    return li;
};

export default async ({
    LSSM,
    getSetting,
    $m,
}: Parameters<ModuleMainFunction>[0]) => {
    const messages = (
        await getSetting<{ value: Message[]; enabled: boolean }>('messages')
    ).value;
    const authToken =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? '';

    const replyMessage: Record<string, string> = { '': '' };
    const postInChat: Record<string, boolean> = { '': false };

    let isLSAMenu = false;
    const replyInProgress = new Set<string | -1>();

    const observedGroups = new Set<string>();

    const missionsById = await LSSM.$stores.api.getMissionTypes(
        'sap-largeScaleAllianceMission'
    );

    const observer = new MutationObserver(mutations =>
        mutations.forEach(mutation => {
            const target = mutation.target;
            if (!(target instanceof HTMLElement)) return;
            const form = target.querySelector<HTMLFormElement>(
                '#new_mission_position[action="/missionAllianceCreate"]'
            );
            if (!form) {
                isLSAMenu = false;
                const successBtn = target.querySelector<HTMLAnchorElement>(
                    '.alert.alert-success a[href^="/missions/"]'
                );

                const sendForMission = (
                    missionId: string | -1,
                    missionGroup = ''
                ) => {
                    const missionElement =
                        document.querySelector<HTMLDivElement>(
                            `#mission_${missionId}`
                        );
                    if (replyInProgress.has(missionId)) return;

                    replyInProgress.add(missionId);
                    const doTheSendStuff = (el = missionElement) => {
                        if (!el) return;
                        sendReply(
                            LSSM,
                            missionId,
                            getModifiedMessage(
                                replyMessage[missionGroup],
                                LSSM,
                                el,
                                missionId,
                                missionsById[
                                    el.getAttribute('mission_type_id') ?? '-1'
                                ]
                            ),
                            postInChat[missionGroup],
                            authToken
                        ).then(() => {
                            if (missionGroup === '') replyMessage[''] = '';
                            replyInProgress.delete(missionId);
                        });
                    };

                    if (missionElement) {
                        doTheSendStuff();
                    } else {
                        LSSM.$stores.root.hook({
                            event: 'missionMarkerAdd',
                            post: true,
                            callback(mission: Mission) {
                                if (
                                    mission.id.toString() ===
                                    missionId.toString()
                                ) {
                                    doTheSendStuff(
                                        document.querySelector<HTMLDivElement>(
                                            `#mission_${missionId}`
                                        )
                                    );
                                }
                            },
                        });
                    }
                };

                if (successBtn && replyMessage['']) {
                    const missionId =
                        successBtn
                            .getAttribute('href')
                            ?.match(/(?<=\/missions\/)\d+(?=\/?$)/u)?.[0] ?? -1;
                    sendForMission(missionId);
                }

                const multipleMissionsCreated =
                    target.querySelector<HTMLSpanElement>(
                        '#custom_missions_created'
                    );
                const missionGroup =
                    multipleMissionsCreated?.dataset.missionGroupIdentifier;

                if (missionGroup) {
                    if (!observedGroups.has(missionGroup)) {
                        // .toString and Boolean to avoid reference issues
                        replyMessage[missionGroup] =
                            replyMessage[''].toString();
                        replyMessage[''] = '';
                        postInChat[missionGroup] = Boolean(postInChat['']);
                        postInChat[''] = false;

                        LSSM.$stores.root.hook({
                            event: 'associate_mission_with_group',
                            post: true,
                            callback(missionId: number, groupId: string) {
                                if (groupId === missionGroup) {
                                    sendForMission(
                                        missionId.toString(),
                                        missionGroup
                                    );
                                }
                            },
                        });
                        observedGroups.add(missionGroup);
                    }
                }

                return;
            }
            if (isLSAMenu) return;
            isLSAMenu = true;

            const previewField = document.createElement('div');
            previewField.classList.add('form-group');
            previewField.style.setProperty('padding-left', '1em');
            previewField.style.setProperty('padding-right', '1em');

            const previewGroup = document.createElement('div');
            previewGroup.classList.add('input-group');

            const btnSpan = document.createElement('div');
            btnSpan.classList.add('input-group-btn');

            const dropdownBtn = document.createElement('button');
            dropdownBtn.classList.add('btn', 'dropdown-toggle', 'btn-default');
            dropdownBtn.dataset.toggle = 'dropdown';
            const icon = createIcon('comment-dots', 'fas');
            icon.style.setProperty('margin-right', '4px');
            const caret = document.createElement('span');
            caret.classList.add('caret');
            dropdownBtn.append(icon, caret);

            btnSpan.append(dropdownBtn);

            const previewInput = document.createElement('input');
            previewInput.classList.add('form-control');
            previewInput.addEventListener(
                'input',
                () => (replyMessage[''] = previewInput.value)
            );

            const chatWrapper = document.createElement('label');
            chatWrapper.classList.add('input-group-addon');
            const chatSpan = document.createElement('span');
            chatSpan.style.setProperty('display', 'flex');
            const chatInput = document.createElement('input');
            chatInput.type = 'checkbox';
            const postIcon = createIcon(
                'comment',
                'fas',
                'fa-fw',
                'pull-right'
            );
            chatSpan.append(chatInput, postIcon);
            chatWrapper.append(chatSpan);
            chatWrapper.addEventListener('click', e => {
                e.stopPropagation();
                e.stopImmediatePropagation();
            });
            chatInput.addEventListener(
                'change',
                () => (postInChat[''] = chatInput.checked)
            );

            previewGroup.append(btnSpan, previewInput, chatWrapper);

            const helpBlock = document.createElement('p');
            helpBlock.classList.add('help-block');
            helpBlock.textContent = $m('lsam.help').toString();

            previewField.append(previewGroup, helpBlock);

            const dropdownMenu = document.createElement('ul');
            dropdownMenu.classList.add('dropdown-menu');

            const noMessageLi = createDropdownElement(
                $m('noMessage').toString()
            );
            noMessageLi.dataset.message = '';

            const separatorLi = document.createElement('li');
            separatorLi.classList.add('divider');
            separatorLi.dataset.message = '';

            dropdownMenu.append(noMessageLi, separatorLi);

            messages.forEach(message => {
                const li = createDropdownElement(
                    message.name,
                    message.postInChat ? 'comment' : 'comment-slash'
                );
                li.dataset.message = getTimeModifiedMessage(message.message);
                li.dataset.post = message.postInChat.toString();
                li.setAttribute('title', message.message);
                dropdownMenu.append(li);
            });

            dropdownMenu.addEventListener('click', e => {
                const target = e.target;
                if (!(target instanceof HTMLElement)) return;
                const li = target.closest('li');
                if (li) {
                    replyMessage[''] = li.dataset.message ?? '';
                    previewInput.value = replyMessage[''];
                    postInChat[''] = li.dataset.post === 'true';
                    chatInput.checked = postInChat[''];
                }
            });
            dropdownBtn.after(dropdownMenu);

            form.querySelector('.form-actions')?.before(previewField);
        })
    );

    const buildingsElement =
        document.querySelector<HTMLDivElement>('#buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });
};
