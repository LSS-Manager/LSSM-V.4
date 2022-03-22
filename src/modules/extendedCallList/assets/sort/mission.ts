import type { $m } from 'typings/Module';
import type { Sort } from './callList';

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
    checked: boolean
) => {
    if (sort === 'default') return;
    const order: Record<string, string[]> = JSON.parse(
        localStorage.getItem(`${PREFIX}_${MODULE_ID}_sort_order`) ?? '{}'
    );
    const missionId = window.location.pathname.split('/')[2];
    let missionList = '';
    let missionListPosition = -1;
    const found = Object.entries(order).find(([list, missions]) => {
        missionListPosition = missions.findIndex(
            mission => mission === missionId
        );
        if (missionListPosition < 0) return false;
        missionList = list;
        return true;
    });

    const navHeader = document.querySelector<HTMLDivElement>(
        '#container_navbar_alarm .navbar-header'
    );
    if (!navHeader) return;

    const flashStorageKey = LSSM.$store.getters.nodeAttribute(
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
        await LSSM.$store.dispatch('api/registerSettings', {
            feature: `${MODULE_ID}_sort-missions_mission-window`,
        });

        const alarm = (publish = false) => {
            const url = new URL(
                `/missions/${missionId}/alarm`,
                window.location.origin
            );
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                document.querySelector<HTMLMetaElement>(
                    'meta[name="csrf-token"]'
                )?.content ?? ''
            );
            url.searchParams.append('next_mission', '0');
            url.searchParams.append(
                'alliance_mission_publish',
                publish ? '1' : '0'
            );
            document
                .querySelectorAll<HTMLInputElement>(
                    '#vehicle_show_table_body_all .vehicle_checkbox:checked, #vehicle_show_table_body_occupied .vehicle_checkbox:checked'
                )
                ?.forEach(vehicle =>
                    url.searchParams.append('vehicle_ids[]', vehicle.value)
                );
            return LSSM.$store
                .dispatch('api/request', {
                    url: url.pathname,
                    feature: `${MODULE_ID}_sort-missions_alarm`,
                    init: {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `/missions/${missionId}`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                })
                .then((res: Response) => res.text())
                .then(html => {
                    const flashs = Array.from(
                        new DOMParser()
                            .parseFromString(html, 'text/html')
                            .querySelectorAll<HTMLDivElement>(
                                // possible flashs: red, green, red+green
                                '#flash_insert_point + .alert.alert-danger:not(.alert-missing-vehicles), #flash_insert_point + .alert.alert-success, #flash_insert_point + .alert.alert-danger:not(.alert-missing-vehicles) + .alert.alert-success'
                            )
                    );

                    if (flashs.length) {
                        sessionStorage.setItem(
                            flashStorageKey,
                            flashs.map(flash => flash.outerHTML).join('\n')
                        );
                        if (
                            flashs.some(flash =>
                                flash.classList.contains('alert-danger')
                            )
                        )
                            return window.location.reload();
                    }

                    if (!isLastMission) {
                        window.location.replace(
                            `/missions/${
                                order[missionList][missionListPosition + 1]
                            }`
                        );
                    } else if (
                        LSSM.$store.state.api.settings
                            .mission_alarmed_successfull_close_window
                    ) {
                        window.location.replace('/missions/close');
                    } else {
                        window.location.reload();
                    }
                });
        };

        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = LSSM.$store.getters.nodeAttribute(
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

        const alertNextBtnClass = LSSM.$store.getters.nodeAttribute(
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
                LSSM.$store.getters.nodeAttribute(
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
                LSSM.$store.getters.nodeAttribute(
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
                    LSSM.$store.getters.nodeAttribute(
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
            await LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'sortMissionsInMissionwindowChecked',
                value: toggleInput.checked,
            });
            LSSM.$store
                .dispatch('event/createEvent', {
                    name: `${MODULE_ID}_sorted-missions_toggle-missionwindow`,
                    detail: {
                        sorted: toggleInput.checked,
                        alertNextBtnClass,
                    },
                })
                .then(event =>
                    LSSM.$store.dispatch('event/dispatchEvent', event)
                );
        });

        if (checked) {
            toggleInput.checked = true;
            toggleInput.dispatchEvent(new Event('change'));
        }
    }

    navHeader.prepend(toggleWrapper);
};
