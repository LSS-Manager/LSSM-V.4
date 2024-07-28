import type { $m } from 'typings/Module';
import type { Building } from 'typings/Building';

export default async (
    LSSM: Vue,
    BUILDING_MODE: 'building' | 'dispatch' | 'schooling',
    $m: $m,
    MODULE_ID: string
): Promise<void> => {
    const path = window.location.pathname.split('/').filter(s => !!s);
    const buildingId = parseInt(path.at(-1) ?? '-1');
    await LSSM.$stores.api.getBuildings(`${MODULE_ID}_fdc`);

    const callback = () => {
        const buildingIds = BUILDING_MODE === 'dispatch' ? [] : [buildingId];
        Array.from(
            document.querySelectorAll<HTMLTableRowElement>(
                '#tab_buildings #building_table tbody tr'
            )
        ).forEach(row => {
            const id = parseInt(
                (
                    row.querySelector(
                        'a[href*="/buildings/"]'
                    ) as HTMLAnchorElement
                ).href.split('/buildings/')[1]
            );
            if (!id) return;
            buildingIds.push(id);
        });

        if (buildingIds.length === 0) return;
        const buildings = [
            { caption: $m('fastDispatchChooser.noDispatch'), id: 0 },
        ] as Building[];
        const buildingsByType = LSSM.$stores.api.buildingsByType;
        LSSM.$stores.translations.dispatchCenterBuildings.forEach(type =>
            buildings.push(...Object.values(buildingsByType[type] ?? []))
        );
        buildingIds.forEach(buildingID => {
            const building = LSSM.$stores.api.buildings[buildingID];
            if (!building) return;
            const dispatchBtn = (
                BUILDING_MODE !== 'dispatch'
                    ? document.querySelector(
                          `#building-navigation-container a${
                              building.leitstelle_building_id
                                  ? `[href="/buildings/${building.leitstelle_building_id}"]`
                                  : ':nth-of-type(2)'
                          }`
                      )
                    : document.createElement('a')
            ) as HTMLAnchorElement;
            if (BUILDING_MODE === 'dispatch') {
                document
                    .querySelectorAll(`.building_leitstelle_set_${buildingID}`)
                    .forEach(btn => {
                        btn.classList.add('hidden');
                    });
                dispatchBtn.classList.add(
                    'btn',
                    'btn-default',
                    'btn-xs',
                    'lightbox-open'
                );
                const dispatchId = (
                    document.querySelector(
                        `.building_leitstelle_set_${buildingID}.btn-success`
                    ) as HTMLAnchorElement
                ).href.split('/leitstelle-set/')[1];
                dispatchBtn.href =
                    parseInt(dispatchId) !== 0
                        ? `/buildings/${dispatchId}`
                        : '#';
                dispatchBtn.innerHTML =
                    parseInt(dispatchId) !== 0
                        ? (buildings.find(b => b.id === parseInt(dispatchId))
                              ?.caption ?? '')
                        : $m('fastDispatchChooser.noDispatch').toString();
                (
                    document.querySelector(
                        `.building_leitstelle_set_${buildingID}`
                    ) as HTMLAnchorElement
                ).before(dispatchBtn);
            }

            if (!dispatchBtn) return;
            const dropdownBtn = document.createElement('button');
            dropdownBtn.type = 'button';
            dropdownBtn.classList.add(
                'btn',
                'btn-default',
                'btn-xs',
                'dropdown-toggle'
            );
            dropdownBtn.setAttribute('data-toggle', 'dropdown');
            dropdownBtn.setAttribute('aria-haspopup', 'true');
            dropdownBtn.setAttribute('aria-expanded', 'false');
            const dropdownCaret = document.createElement('span');
            dropdownCaret.classList.add('caret');
            dropdownBtn.append(dropdownCaret);
            const dropdown = document.createElement('ul');
            dropdown.classList.add('dropdown-menu');
            buildings
                .sort((a, b) =>
                    !a.id
                        ? 1
                        : a.caption < b.caption
                          ? -1
                          : a.caption > b.caption
                            ? 1
                            : 0
                )
                .forEach(building => {
                    const wrapper = document.createElement('li');
                    const link = document.createElement('a');
                    link.setAttribute(
                        'href',
                        building.id ? `/buildings/${building.id}` : '#'
                    );
                    link.textContent = building.caption;
                    const setBtn = document.createElement('button');
                    setBtn.classList.add(
                        'btn',
                        'btn-xs',
                        'btn-success',
                        'pull-right'
                    );
                    setBtn.style.marginLeft = '1ch';
                    setBtn.addEventListener('click', e => {
                        e.preventDefault();
                        LSSM.$stores.api
                            .request(
                                `/buildings/${buildingID}/leitstelle-set/${building.id}`,
                                `${MODULE_ID}-fastDispatchChooser`
                            )
                            .then(() => {
                                dispatchBtn.setAttribute(
                                    'href',
                                    building.id
                                        ? `/buildings/${building.id}`
                                        : '#'
                                );
                                dispatchBtn.textContent = building.caption;
                            });
                    });
                    const setCheck = document.createElement('i');
                    setCheck.classList.add('fas', 'fa-check');
                    setBtn.append(setCheck);
                    link.append(setBtn);
                    wrapper.append(link);
                    dropdown.append(wrapper);
                });
            dispatchBtn.after(dropdownBtn, dropdown);
        });
    };
    callback();

    LSSM.$stores.root.observeAsyncTab({
        tabSelector: '#tab_buildings',
        callback,
    });
};
