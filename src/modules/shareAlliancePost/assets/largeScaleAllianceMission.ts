import { createIcon, sendReply } from './util';

import type { Message } from './missionWindow';
import type { ModuleMainFunction } from 'typings/Module';

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

    let selectedMessage = -1;

    let isLSAMenu = false;

    const observer = new MutationObserver(mutations =>
        mutations.forEach(mutation => {
            const form = (
                mutation.target as HTMLElement
            ).querySelector<HTMLFormElement>(
                '#new_mission_position[action="/missionAllianceCreate"]'
            );
            if (!form) {
                isLSAMenu = false;
                const successBtn = (
                    mutation.target as HTMLElement
                ).querySelector<HTMLAnchorElement>(
                    '.alert.alert-success a[href^="/missions/"]'
                );
                if (successBtn && selectedMessage > 0) {
                    const missionId =
                        successBtn
                            .getAttribute('href')
                            ?.match(/(?<=\/missions\/)\d+(?=\/?$)/u)?.[0] ?? -1;
                    const message = messages[selectedMessage];
                    sendReply(
                        LSSM,
                        missionId,
                        message.message,
                        message.postInChat,
                        authToken
                    ).then(() => (selectedMessage = -1));
                }

                return;
            }
            if (isLSAMenu) return;
            isLSAMenu = true;

            const btnGroup = document.createElement('div');
            btnGroup.classList.add('btn-group', 'pull-right');

            const selectorBtn = document.createElement('button');
            selectorBtn.classList.add(
                'btn',
                'btn-xs',
                'btn-default',
                'dropdown-toggle'
            );
            selectorBtn.dataset.toggle = 'dropdown';
            const selectSpan = document.createElement('span');
            const msgIcon = document.createElement('i');
            msgIcon.classList.add('fas', 'fa-comment-dots');
            msgIcon.style.setProperty('margin-left', '5px');
            msgIcon.style.setProperty('margin-right', '5px');
            const caret = document.createElement('span');
            caret.classList.add('caret');
            selectorBtn.append(selectSpan, msgIcon, caret);

            const dropdownMenu = document.createElement('ul');
            dropdownMenu.classList.add('dropdown-menu');

            const noMessageLi = createDropdownElement(
                $m('noMessage').toString()
            );
            noMessageLi.dataset.message = '-1';

            const separatorLi = document.createElement('li');
            separatorLi.classList.add('divider');
            separatorLi.dataset.message = '-1';

            dropdownMenu.append(noMessageLi, separatorLi);

            messages.forEach((message, index) => {
                const li = createDropdownElement(
                    message.name,
                    message.postInChat ? 'comment' : 'comment-slash'
                );
                li.dataset.message = index.toString();
                dropdownMenu.append(li);
            });

            btnGroup.append(selectorBtn, dropdownMenu);

            dropdownMenu.addEventListener('click', e => {
                const target = e.target;
                if (!(target instanceof HTMLElement)) return;
                const li = target.closest('li');
                if (li) {
                    selectSpan.textContent = li.textContent ?? '';
                    selectedMessage = parseInt(li.dataset.message ?? '-1');
                }
            });

            const clearfix = document.createElement('div');
            clearfix.classList.add('clearfix');

            form.before(btnGroup, clearfix);
        })
    );

    const buildingsElement =
        document.querySelector<HTMLDivElement>('#buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });
};
