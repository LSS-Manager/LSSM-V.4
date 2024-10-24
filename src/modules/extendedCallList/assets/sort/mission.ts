import type { Sort } from './callList';
import type { $m, ModuleMainFunction } from 'typings/Module';

export enum SortedMissionsRawButtonClasses {
    alert_next = 'alert_next_sorted',
    prev = 'prev_sorted',
    next = 'next_sorted',
    alert_share_next = 'alert_share_next_sorted',
}

export default async (
    LSSM: Vue,
    MODULE_ID: string,
    $m: $m,
    sort: Sort,
    checked: boolean,
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting']
) => {
    if (sort === 'default') return;
    const order: Record<string, string[]> = await getSetting(
        'sortMissionsOrder',
        {}
    );
    const missionId = window.location.pathname.split('/')[2];
    let missionList = '';
    let missionListPosition = -1;
    const found = Object.entries(order).find(([list, missions]) => {
        missionListPosition = missions.indexOf(missionId);
        if (missionListPosition < 0) return false;
        missionList = list;
        return true;
    });

    const insertPoint =
        document.querySelector<HTMLDivElement>(
            '#mission_alarm_btn'
        )?.parentElement;
    if (!insertPoint) return;

    const flashStorageKey = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}_sort_mission-flash-msg`
    );

    const flashStorage = sessionStorage.getItem(flashStorageKey);
    if (flashStorage) {
        document
            .querySelector<HTMLSpanElement>('#flash_insert_point')
            ?.insertAdjacentHTML('afterend', flashStorage);
        sessionStorage.removeItem(flashStorageKey);
    }

    const toggleWrapper = document.createElement('div');
    toggleWrapper.classList.add('checkbox');
    toggleWrapper.style.setProperty('margin', '0');
    toggleWrapper.style.setProperty('display', 'inline-block');

    if (found) {
        const alarm = (publish = false) => {
            const form = document.getElementById('mission-form');
            if (!form) return;
            const nextMissionIdInput =
                form.querySelector<HTMLInputElement>('#next_mission_id');
            if (nextMissionIdInput) {
                nextMissionIdInput.value =
                    order[missionList][missionListPosition + 1];
            }
            const publishInput = form.querySelector<HTMLInputElement>(
                '#alliance_mission_publish'
            );
            if (publishInput) publishInput.value = Number(publish).toString();

            // we've set the next mission id and the publishing value, so we can easily submit the form with normal alarm button
            document.getElementById('mission_alarm_btn')?.click();
        };

        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}_sort_toggle-mission-buttons-mode`,
            true
        );
        toggleInput.style.setProperty('position', 'relative');
        toggleInput.style.setProperty('margin-left', '0');
        const toggleLabel = document.createElement('label');
        toggleLabel.classList.add('checkbox');
        toggleLabel.setAttribute('for', toggleInput.id);
        toggleLabel.style.setProperty('padding-left', '0.1em');
        toggleLabel.style.setProperty('display', 'inline-block');
        const labelIcon = document.createElement('i');
        labelIcon.classList.add('fas', 'fa-sort-amount-down');
        toggleLabel.append(labelIcon);
        toggleWrapper.append(toggleInput, toggleLabel);

        const isLastMission =
            missionListPosition === order[missionList].length - 1;

        const alertNextBtnClass = LSSM.$stores.root.nodeAttribute(
            `${MODULE_ID}_sort-missions_${SortedMissionsRawButtonClasses['alert_next']}`
        );
        const alertNextBtns: [HTMLAnchorElement, HTMLAnchorElement][] =
            Array.from(
                document?.querySelectorAll<HTMLAnchorElement>('.alert_next')
            ).map(btn => {
                const newBtn = document.createElement('a');
                newBtn.href = '#';
                newBtn.classList.add(
                    'hidden',
                    ...btn.classList,
                    alertNextBtnClass
                );
                newBtn.innerHTML = btn.innerHTML;
                newBtn.classList.replace(
                    'btn-success',
                    isLastMission ? 'btn-default' : 'btn-primary'
                );
                newBtn.addEventListener('click', () => alarm());
                btn.after(newBtn);
                return [btn, newBtn];
            });

        const prevBtns: [HTMLAnchorElement, HTMLAnchorElement][] = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
                '#mission_previous_mission_btn'
            )
        ).map(btn => {
            const newBtn = document.createElement('a');
            if (!missionListPosition) {
                newBtn.classList.add('disabled');
            } else {
                newBtn.href = `/missions/${
                    order[missionList][missionListPosition - 1]
                }`;
            }
            newBtn.classList.add(
                'hidden',
                ...btn.classList,
                LSSM.$stores.root.nodeAttribute(
                    `${MODULE_ID}_sort-missions_${SortedMissionsRawButtonClasses['prev']}`
                )
            );
            newBtn.classList.remove('btn-success', 'btn-default');
            newBtn.classList.add(
                missionListPosition ? 'btn-primary' : 'btn-default'
            );
            const icon = document.createElement('span');
            icon.classList.add('glyphicon', 'glyphicon-arrow-left');
            icon.style.setProperty('margin-left', '0.1em');
            const counter = document.createElement('span');
            if (window.user_premium)
                counter.textContent = missionListPosition.toLocaleString();

            newBtn.append(counter, icon);
            btn.after(newBtn);
            return [btn, newBtn];
        });

        const nextBtns: [HTMLAnchorElement, HTMLAnchorElement][] = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
                '#mission_next_mission_btn'
            )
        ).map(btn => {
            const newBtn = document.createElement('a');
            if (isLastMission) {
                newBtn.classList.add('disabled');
            } else {
                newBtn.href = `/missions/${
                    order[missionList][missionListPosition + 1]
                }`;
            }
            newBtn.classList.add(
                'hidden',
                ...btn.classList,
                LSSM.$stores.root.nodeAttribute(
                    `${MODULE_ID}_sort-missions_${SortedMissionsRawButtonClasses['next']}`
                )
            );
            newBtn.classList.remove('btn-success', 'btn-default');
            newBtn.classList.add(isLastMission ? 'btn-default' : 'btn-primary');
            const icon = document.createElement('span');
            icon.classList.add('glyphicon', 'glyphicon-arrow-right');
            icon.style.setProperty('margin-right', '0.1em');
            const counter = document.createElement('span');
            if (window.user_premium) {
                counter.textContent = (
                    order[missionList].length -
                    missionListPosition -
                    1
                ).toLocaleString();
            }
            newBtn.append(icon, counter);
            btn.after(newBtn);
            return [btn, newBtn];
        });

        const alertNextShareBtns: [HTMLAnchorElement, HTMLAnchorElement][] =
            Array.from(
                document.querySelectorAll<HTMLAnchorElement>(
                    '.alert_next_alliance'
                )
            ).map(btn => {
                const newBtn = document.createElement('a');
                newBtn.href = '#';
                newBtn.innerHTML = btn.innerHTML;
                newBtn.classList.add(
                    'hidden',
                    isLastMission ? 'btn-default' : 'btn-primary',
                    ...btn.classList,
                    LSSM.$stores.root.nodeAttribute(
                        `${MODULE_ID}_sort-missions_${SortedMissionsRawButtonClasses['alert_share_next']}`
                    )
                );
                newBtn.classList.remove('btn-success');
                newBtn.addEventListener('click', () => alarm(true));
                btn.after(newBtn);
                return [btn, newBtn];
            });

        toggleInput.addEventListener('change', async () => {
            [
                ...alertNextBtns,
                ...prevBtns,
                ...nextBtns,
                ...alertNextShareBtns,
            ].forEach(([origBtn, sortedBtn]) => {
                origBtn.classList[toggleInput.checked ? 'add' : 'remove'](
                    'hidden'
                );
                sortedBtn.classList[toggleInput.checked ? 'remove' : 'add'](
                    'hidden'
                );
            });
            await setSetting(
                'sortMissionsInMissionwindowChecked',
                toggleInput.checked
            );
            LSSM.$stores.event.createAndDispatchEvent({
                name: `${MODULE_ID}_sorted-missions_toggle-missionwindow`,
                detail: {
                    sorted: toggleInput.checked,
                    alertNextBtnClass,
                },
            });
        });

        if (checked) {
            toggleInput.checked = true;
            toggleInput.dispatchEvent(new Event('change'));
        }
    }

    insertPoint.before(toggleWrapper);
};
