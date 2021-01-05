export default async (
    LSSM: Vue,
    saveLastBuildingType: boolean,
    saveLastDispatchCenter: boolean,
    getSetting: <returnType>(settingId: string) => Promise<returnType>,
    MODULE_ID: string
): Promise<void> => {
    let isBuildingMenu = false;
    let lastBuildingType =
        (await getSetting<string>('lastSavedBuildingType')) ?? '';
    let lastDispatchCenter =
        (await getSetting<string>('lastSavedDispatchCenter')) ?? '';

    // Reset Marker for new building
    const resetNewBuildingMarker = () => {
        if (isBuildingMenu) {
            if (
                window.building_new_marker &&
                !window.map
                    .getBounds()
                    .contains(window.building_new_marker.getLatLng()) &&
                window.building_new_marker.setLatLng(window.map.getCenter())
            )
                window.building_new_dragend();
        }
    };
    window.map.addEventListener('moveend', resetNewBuildingMarker);

    const checkFormValidity = (form: HTMLFormElement) => {
        const validForm =
            (form.querySelector<HTMLInputElement>('#building_name')?.value
                .length ?? 0) >= 2;
        form.querySelectorAll<HTMLInputElement>(
            '.coins_activate, .build_with_credits_step, .alliance_activate'
        ).forEach(btn => {
            btn.classList[validForm ? 'remove' : 'add']('disabled');
            btn.disabled = !validForm;
        });
    };

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const form = (mutation.target as HTMLElement).querySelector<
                HTMLFormElement
            >('#new_building[action="/buildings"]');
            if (!form) {
                isBuildingMenu = false;
                return;
            }
            if (isBuildingMenu) return;
            isBuildingMenu = true;

            checkFormValidity(form);

            if (saveLastBuildingType) {
                const buildingTypeSelect = form.querySelector<
                    HTMLSelectElement
                >('#building_building_type');
                if (buildingTypeSelect) {
                    buildingTypeSelect.value = lastBuildingType;
                    buildingTypeSelect.dispatchEvent(new Event('change'));

                    buildingTypeSelect.addEventListener('change', () => {
                        LSSM.$store.dispatch('settings/setSetting', {
                            moduleId: MODULE_ID,
                            settingId: 'lastSavedBuildingType',
                            value: buildingTypeSelect.value,
                        });
                        lastBuildingType = buildingTypeSelect.value;
                    });
                }
            }
            if (saveLastDispatchCenter) {
                const dispatchCenterSelect = form.querySelector<
                    HTMLSelectElement
                >('#building_leitstelle_building_id');
                if (dispatchCenterSelect) {
                    dispatchCenterSelect.value = lastDispatchCenter;
                    dispatchCenterSelect.dispatchEvent(new Event('change'));

                    dispatchCenterSelect.addEventListener('change', () => {
                        LSSM.$store.dispatch('settings/setSetting', {
                            moduleId: MODULE_ID,
                            settingId: 'lastSavedDispatchCenter',
                            value: dispatchCenterSelect.value,
                        });
                        lastDispatchCenter = dispatchCenterSelect.value;
                    });
                }
            }

            form.addEventListener('submit', e => e.preventDefault());
            form.addEventListener('keyup', () => checkFormValidity(form));

            form.addEventListener('click', e => {
                const btn = (e.target as HTMLElement | null)?.closest(
                    '.coins_activate, .build_with_credits_step, .alliance_activate'
                );
                if (!btn) return;
                e.preventDefault();
                btn.removeAttribute('type');
                if (btn.matches('.coins_activate'))
                    form.build_with_coins.value = '1';
                if (btn.matches('.alliance_activate'))
                    form.build_as_alliance.value = '1';
                const url = new URL(form.action);
                (Array.from(form.elements) as HTMLInputElement[]).forEach(
                    ({ name, value }) => {
                        if (name === 'commit') return;
                        url.searchParams.append(name, value);
                    }
                );
                LSSM.$store
                    .dispatch('api/request', {
                        url: '/buildings',
                        init: {
                            credentials: 'include',
                            headers: {
                                'X-CSRF-Token': form.authenticity_token.value,
                                'Content-Type':
                                    'application/x-www-form-urlencoded; charset=UTF-8',
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                            method: 'POST',
                            mode: 'cors',
                            body: url.searchParams.toString(),
                        },
                    })
                    .then(res => res.text())
                    .then(res => {
                        const response = document
                            .createRange()
                            .createContextualFragment(res);
                        const successAlert = response.querySelector<
                            HTMLDivElement
                        >('#building_panel_body .alert');
                        if (!successAlert) return;
                        form.insertAdjacentElement('beforebegin', successAlert);
                        btn.setAttribute('type', 'submit');
                        form['building[name]'].value = '';
                        form.build_with_coins.removeAttribute('value');
                        form.build_as_alliance.removeAttribute('value');

                        const buildingId = parseInt(
                            successAlert
                                .querySelector<HTMLAnchorElement>(
                                    'a.lightbox-open.btn[href^="/buildings/"]'
                                )
                                ?.href.match(/\d+\/?$/)?.[0] ?? '-1'
                        );
                        const script = response.querySelector('script');
                        if (!script) return;
                        window.buildingMarkerAdd(
                            JSON.parse(
                                script.innerHTML.match(
                                    new RegExp(
                                        `(?<=buildingMarkerAdd\\(){"id":${buildingId}.*}(?=\\);$)`,
                                        'm'
                                    )
                                )?.[0] ?? '{}'
                            )
                        );
                        window.buildingMarkerBulkContentCacheDraw();
                        window.building_maps_redraw();
                        const currentCredits = parseInt(
                            script.innerHTML.match(
                                /(?<=creditsUpdate\()\d+(?=\)$)/m
                            )?.[0] ?? '-1'
                        );
                        window.creditsUpdate(currentCredits);
                        const currentCoins = parseInt(
                            script.innerHTML.match(
                                /(?<=coinsUpdate\()\d+(?=\);$)/m
                            )?.[0] ?? '-1'
                        );
                        window.coinsUpdate(currentCoins);
                        form.querySelectorAll<HTMLInputElement>(
                            '.build_with_credits_step'
                        ).forEach(creditsBtn => {
                            const credits = parseInt(
                                creditsBtn.value
                                    .match(/\d{1,3}(\.\d{3})*/)?.[0]
                                    .replace(/\./, '') ?? '-1'
                            );
                            if (credits <= currentCredits) return;
                            creditsBtn.classList.replace(
                                'btn-success',
                                'btn-danger'
                            );
                            creditsBtn.classList.add('disabled');
                        });
                        form.querySelectorAll<HTMLInputElement>(
                            '.coins_activate'
                        ).forEach(coinsBtn => {
                            const coins = parseInt(
                                coinsBtn.value
                                    .match(/\d{1,3}(\.\d{3})*/)?.[0]
                                    .replace(/\./, '') ?? '-1'
                            );
                            if (coins <= currentCoins) return;
                            coinsBtn.classList.replace(
                                'btn-success',
                                'btn-danger'
                            );
                            coinsBtn.classList.add('disabled');
                        });
                        checkFormValidity(form);
                    });
            });
        });
    });

    const buildingsElement = document.getElementById('buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });
};
