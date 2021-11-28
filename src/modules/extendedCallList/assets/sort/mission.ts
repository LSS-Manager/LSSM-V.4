import { $m } from 'typings/Module';
import { Sort } from './callList';

export default async (LSSM: Vue, MODULE_ID: string, $m: $m, sort: Sort) => {
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
                    '#vehicle_show_table_body_all .vehicle_checkbox:checked'
                )
                ?.forEach(vehicle =>
                    url.searchParams.append('vehicle_ids[]', vehicle.value)
                );
            return LSSM.$store.dispatch('api/request', {
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
            });
        };

        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_sort_toggle-mission-buttons-mode`
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

        const alertNextBtns: [
            HTMLAnchorElement,
            HTMLAnchorElement
        ][] = Array.from(
            document?.querySelectorAll<HTMLAnchorElement>('.alert_next')
        ).map(btn => {
            const newBtn = document.createElement('a');
            newBtn.href = '#';
            newBtn.classList.add('hidden', ...btn.classList);
            newBtn.innerHTML = btn.innerHTML;
            newBtn.classList.replace(
                'btn-success',
                isLastMission ? 'btn-default' : 'btn-primary'
            );
            newBtn.addEventListener('click', () => {
                alarm().then(() => {
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
            });
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
            newBtn.classList.add('hidden', ...btn.classList);
            newBtn.classList.replace(
                'btn-success',
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
            newBtn.classList.add('hidden', ...btn.classList);
            newBtn.classList.replace(
                'btn-success',
                isLastMission ? 'btn-default' : 'btn-primary'
            );
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

        let btnColors: [string, string] = ['btn-primary', 'btn-success'];
        toggleInput.addEventListener('change', () => {
            btnColors = btnColors.reverse() as [string, string];
            [...alertNextBtns, ...prevBtns, ...nextBtns].forEach(
                ([origBtn, sortedBtn]) => {
                    origBtn.classList[toggleInput.checked ? 'add' : 'remove'](
                        'hidden'
                    );
                    sortedBtn.classList[toggleInput.checked ? 'remove' : 'add'](
                        'hidden'
                    );
                }
            );
        });
    }

    navHeader.prepend(toggleWrapper);
};
