import { Building } from 'typings/Building';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m, MODULE_ID: string): void => {
    LSSM.$store.commit('useFontAwesome');

    const path = window.location.pathname.split('/').filter(s => !!s);
    const buildingId = parseInt(path[path.length - 1]);
    const building = (LSSM.$store.state.api.buildings as Building[]).find(
        ({ id }) => id === buildingId
    );
    if (!building) return;
    const buildings = [
        { caption: $m('fastDispatchChooser.noDispatch'), id: 0 },
    ] as Building[];
    const buildingsByType = LSSM.$store.getters['api/buildingsByType'] as {
        [type: number]: Building[];
    };
    (Object.values(
        LSSM.$t('dispatchCenterBuildings')
    ) as number[]).forEach(type =>
        buildings.push(...(buildingsByType[type] ?? []))
    );
    const dispatchBtn = document.querySelector(
        `#building-navigation-container a${
            building.leitstelle_building_id
                ? `[href="/buildings/${building.leitstelle_building_id}"]`
                : ':nth-of-type(2)'
        }`
    );
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
    dropdownBtn.appendChild(dropdownCaret);
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
            setBtn.classList.add('btn', 'btn-xs', 'btn-success', 'pull-right');
            setBtn.style.marginLeft = '1ch';
            setBtn.addEventListener('click', e => {
                e.preventDefault();
                LSSM.$store
                    .dispatch('api/request', {
                        url: `/buildings/${buildingId}/leitstelle-set/${building.id}`,
                        feature: `${MODULE_ID}-fastDispatchChooser`,
                    })
                    .then(() => {
                        dispatchBtn.setAttribute(
                            'href',
                            building.id ? `/buildings/${building.id}` : '#'
                        );
                        dispatchBtn.textContent = building.caption;
                    });
            });
            const setCheck = document.createElement('i');
            setCheck.classList.add('fas', 'fa-check');
            setBtn.appendChild(setCheck);
            link.appendChild(setBtn);
            wrapper.appendChild(link);
            dropdown.appendChild(wrapper);
        });
    dispatchBtn.after(dropdownBtn, dropdown);
};
