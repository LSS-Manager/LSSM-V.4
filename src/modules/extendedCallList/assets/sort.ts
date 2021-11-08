import { $m } from 'typings/Module';
import { Mission } from 'typings/Mission';
import { MissionMarkerAdd } from 'typings/Ingame';

export type Sort = 'id' | 'credits' | 'remaining_patients';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    sort: Sort,
    direction: 'asc' | 'desc',
    starredMissionPanelClass: string,
    $m: $m
) => {
    LSSM.$store.commit('useFontAwesome');

    const sorts: Sort[] = ['id', 'credits', 'remaining_patients'];
    let sortingType = sort;
    const sortingDirection = direction;

    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];

    const reverseClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-missionlist-order-desc`
    );

    const panelBodyId = 'missions-panel-body';
    const panelBody = document.querySelector<HTMLDivElement>(`#${panelBodyId}`);

    if (!panelBody) return;

    if (sortingDirection === 'desc') panelBody.classList.add(reverseClass);

    const cssMaxIntDummy = document.createElement('span');
    cssMaxIntDummy.style.setProperty(
        'order',
        Number.MAX_SAFE_INTEGER.toString()
    );
    document.body.append(cssMaxIntDummy);
    const maxCSSInteger = Number(getComputedStyle(cssMaxIntDummy).order);
    cssMaxIntDummy.remove();

    const numToCSSRange = (num: number): number => {
        let rangedNum = num;
        while (rangedNum > maxCSSInteger) rangedNum -= maxCSSInteger;
        while (rangedNum < -maxCSSInteger) rangedNum += maxCSSInteger;
        return rangedNum;
    };

    enum faSortIcon {
        id = 'history',
        credits = 'dollar-sign',
        remaining_patients = 'user-injured',
    }

    enum faDirectionIcon {
        desc = 'sort-amount-down',
        asc = 'sort-amount-down-alt',
    }

    const sortBtn = document.createElement('button');
    sortBtn.classList.add('btn', 'btn-xs', 'btn-default', 'dropdown-toggle');
    sortBtn.dataset.toggle = 'dropdown';
    const sortIcon = document.createElement('i');
    sortIcon.id = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-missionlist-sortingType-type`,
        true
    );
    sortIcon.classList.add('fas', `fa-${faSortIcon[sortingType]}`);
    const directionIcon = document.createElement('i');
    directionIcon.id = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-missionlist-sortingType-direction`,
        true
    );
    directionIcon.classList.add(
        'fas',
        `fa-${faDirectionIcon[sortingDirection]}`
    );
    const caret = document.createElement('span');
    caret.classList.add('caret');
    sortBtn.append(sortIcon, directionIcon, caret);

    const sortSelectionList = document.createElement('ul');
    sortSelectionList.classList.add('dropdown-menu', 'pull-right');
    sorts.forEach(sort => {
        const liAsc = document.createElement('li');
        liAsc.dataset.sort = sort;
        liAsc.dataset.direction = 'asc';
        const liDesc = document.createElement('li');
        liDesc.dataset.sort = sort;
        liDesc.dataset.direction = 'desc';
        const aAsc = document.createElement('a');
        aAsc.setAttribute('href', '#');
        liAsc.append(aAsc);
        const title = document.createTextNode(
            $m(`sort.types.${sort}`).toString()
        );
        const directionIcon = document.createElement('i');
        directionIcon.classList.add('fas', `fa-${faDirectionIcon['asc']}`);
        const aDesc = document.createElement('a');
        aDesc.setAttribute('href', '#');
        liDesc.append(aDesc);
        const icon = document.createElement('i');
        icon.classList.add('fas', `fa-${faSortIcon[sort]}`);
        icon.style.setProperty('margin-right', '0.2em');
        directionIcon.style.setProperty('margin-left', '0.2em');
        aAsc.append(icon, title, directionIcon.cloneNode(true));
        directionIcon.classList.replace(
            `fa-${faDirectionIcon['asc']}`,
            `fa-${faDirectionIcon['desc']}`
        );
        aDesc.append(
            icon.cloneNode(true),
            title.cloneNode(true),
            directionIcon
        );
        sortSelectionList.append(liAsc, liDesc);
    });
    sortSelectionList.addEventListener('click', async event => {
        event.preventDefault();
        const target = event.target as HTMLElement | null;
        const sorter = target?.closest<HTMLLIElement>(
            'li[data-sort][data-direction]'
        );
        if (!sorter) return;
        sortingType = sorter.dataset.sort as Sort;
        const sortDirection = sorter.dataset.direction as 'asc' | 'desc';
        panelBody.classList[sortDirection === 'desc' ? 'add' : 'remove'](
            reverseClass
        );
        document
            .querySelector<SVGElement>(`#${sortIcon.id}`)
            ?.setAttribute('data-icon', faSortIcon[sortingType]);
        document
            .querySelector<SVGElement>(`#${directionIcon.id}`)
            ?.setAttribute('data-icon', faDirectionIcon[sortDirection]);
        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'sortMissionsType',
            value: sortingType,
        });
        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'sortMissionsDirection',
            value: sortDirection,
        });
        resetOrder();
    });

    LSSM.$store
        .dispatch('addStyles', [
            {
                selectorText: `#${panelBodyId} > #mission_list, #${panelBodyId} > [id^="mission_list_"]`,
                style: {
                    'display': 'flex',
                    'flex-flow': 'column',
                },
            },
            {
                selectorText: `#${panelBodyId}.${reverseClass} > #mission_list, #${panelBodyId}.${reverseClass} > [id^="mission_list_"]`,
                style: {
                    'flex-flow': 'column-reverse',
                },
            },
            {
                selectorText: `#${panelBodyId} .${starredMissionPanelClass}`,
                style: {
                    order: `-${maxCSSInteger} !important`,
                },
            },
            {
                selectorText: `#${panelBodyId}.${reverseClass} .${starredMissionPanelClass}`,
                style: {
                    order: `${maxCSSInteger} !important`,
                },
            },
            {
                selectorText: `#${sortIcon.id}`,
                style: {
                    'margin-right': '0.2em',
                },
            },
        ])
        .then();

    const orderFunctions: Record<
        string,
        (mission: HTMLDivElement) => string
    > = {
        id: mission =>
            numToCSSRange(
                parseInt(mission.getAttribute('mission_id') ?? '0')
            ).toString(),
        credits: mission => {
            let missionType = mission.getAttribute('mission_type_id') ?? '-1';
            if (missionType === '-1') return maxCSSInteger.toString();
            const overlayIndex =
                mission.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex !== 'null') missionType += `-${overlayIndex}`;
            return numToCSSRange(
                missionsById[missionType].average_credits ?? 0
            ).toString();
        },
        remaining_patients: mission => {
            if (mission.querySelector('.mission_list_patient_icon')) {
                return LSSM.$utils
                    .getNumberFromText(
                        mission.querySelector(
                            '.mission_list_patient_icon + strong'
                        )?.textContent ?? '0'
                    )
                    .toString();
            }
            return mission
                .querySelectorAll('.patient_progress')
                .length.toString();
        },
    };

    const setMissionOrder = (mission: HTMLDivElement) =>
        mission.style.setProperty(
            'order',
            orderFunctions[sortingType]?.(mission) ?? orderFunctions.id(mission)
        );

    const resetOrder = () =>
        document
            .querySelectorAll<HTMLDivElement>(
                '#missions-panel-body .missionSideBarEntry'
            )
            .forEach(panel => setMissionOrder(panel));

    resetOrder();

    document
        .querySelector<HTMLDivElement>('#btn-group-mission-select')
        ?.append(sortBtn, sortSelectionList);

    LSSM.$store
        .dispatch('hook', {
            event: 'missionMarkerAdd',
            callback(marker: MissionMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.id}`
                );
                if (panel) setMissionOrder(panel);
            },
        })
        .then();
};
