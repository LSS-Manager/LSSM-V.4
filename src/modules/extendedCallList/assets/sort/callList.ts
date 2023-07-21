import {
    getCityFromAddress,
    getZipFromCity,
} from '../../../shareAlliancePost/assets/util';

import type { Building } from 'typings/Building';
import type { LatLng } from 'leaflet';
import type { $m, ModuleMainFunction } from 'typings/Module';
import type {
    MissionMarkerAdd,
    PatientMarkerAdd,
    PatientMarkerAddCombined,
} from 'typings/Ingame';

export type Sort =
    | 'alphabet'
    | 'credits'
    | 'default'
    | 'distance_dispatch'
    | 'distance_station'
    | 'id'
    | 'remaining_patients'
    | 'remaining_prisoners'
    | 'zip_code';

interface StringSorting {
    items: string[];
    order: number[];
}

export default (
    LSSM: Vue,
    MODULE_ID: string,
    sort: Sort,
    direction: 'asc' | 'desc',
    buttonColor: string,
    sortBtnId: string,
    starredMissionPanelClass: string,
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'],
    $m: $m
) => {
    const sorts: Sort[] = [
        'default',
        'id',
        'credits',
        'remaining_patients',
        'remaining_prisoners',
        'alphabet',
        'distance_dispatch',
        'distance_station',
        'zip_code',
    ];
    let sortingType = sort;
    const sortingDirection = direction;
    let updateOrderListTimeout = 0;

    const missionOrderValuesById: Record<
        string,
        Record<string, { order: number; el: HTMLDivElement }>
    > = {};

    const missionsById = LSSM.$stores.api.missions;
    const missionIdsByAlphabet: Record<string, number> = Object.fromEntries(
        Object.values(missionsById)
            .sort(({ name: nameA }, { name: nameB }) =>
                nameA > nameB ? 1 : nameA < nameB ? -1 : 0
            )
            .map(({ id }, index) => [id, index])
    );

    const dispatchCenters: Building[] = [];
    const dispatchCenterLatLngs: LatLng[] = [];
    const vehicleBuildings: Building[] = [];
    const vehicleBuildingLatLngs: LatLng[] = [];

    LSSM.$stores.api.getBuildings('ecl-sort-missions').then(() => {
        dispatchCenters.splice(
            0,
            dispatchCenters.length,
            ...LSSM.$stores.translations.dispatchCenterBuildings
                .flatMap(type => LSSM.$stores.api.buildingsByType[type])
                .filter(b => !!b)
        );
        dispatchCenterLatLngs.splice(
            0,
            dispatchCenterLatLngs.length,
            ...dispatchCenters.map(
                ({ latitude, longitude }) =>
                    new window.L.LatLng(latitude, longitude)
            )
        );

        vehicleBuildings.splice(
            0,
            vehicleBuildings.length,
            ...LSSM.$stores.translations.vehicleBuildings
                .flatMap(type => LSSM.$stores.api.buildingsByType[type])
                .filter(b => !!b)
        );
        vehicleBuildingLatLngs.splice(
            0,
            vehicleBuildingLatLngs.length,
            ...vehicleBuildings.map(
                ({ latitude, longitude }) =>
                    new window.L.LatLng(latitude, longitude)
            )
        );
        if (sort === 'distance_dispatch' || sort === 'remaining_patients')
            resetOrder();
    });

    const reverseClass = LSSM.$stores.root.nodeAttribute(
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

    const maxListOrderDistance = Math.floor(Math.sqrt(maxCSSInteger));

    const numToCSSRange = (num: number): number => {
        if (!num) return 0;
        return num % maxCSSInteger;
    };

    const maxWorldDistance = new window.L.LatLng(-85, -180).distanceTo(
        new window.L.LatLng(85, 180)
    );

    const distanceToCSSRange = (distance: number) =>
        Math.floor((maxWorldDistance / maxCSSInteger) * distance);

    const zipCodes: StringSorting = {
        items: [],
        order: [],
    };

    const findStringOrder = (str: string, sorting: StringSorting) => {
        if (sorting.items.includes(str))
            return sorting.order[sorting.items.indexOf(str)];

        if (sorting.items.length === 0) {
            sorting.items.push(str);
            sorting.order.push(maxListOrderDistance);
            return maxListOrderDistance;
        }

        for (let i = 0; i < sorting.items.length; i++) {
            const item = sorting.items[i];
            if (str.localeCompare(item) < 0) {
                const lastOrderNr = i ? sorting.order[i - 1] : 0;
                const nextOrderNr = sorting.order[i];
                let thisOrderNr = Math.floor(
                    lastOrderNr + (nextOrderNr - lastOrderNr) / 2
                );
                if (Number.isNaN(thisOrderNr))
                    thisOrderNr = lastOrderNr + maxListOrderDistance;
                sorting.items.splice(i, 0, str);
                sorting.order.splice(i, 0, thisOrderNr);
                return thisOrderNr;
            }
        }

        const lastOrderNr = sorting.order.at(-1) ?? 0;
        const nextOrderNr = lastOrderNr + maxListOrderDistance;
        sorting.items.push(str);
        sorting.order.push(nextOrderNr);
        return nextOrderNr;
    };

    enum faSortIcon {
        alphabet = 'font',
        credits = 'dollar-sign',
        default = 'face-rolling-eyes',
        distance_dispatch = 'tower-broadcast',
        distance_station = 'building',
        id = 'clock-rotate-left',
        remaining_patients = 'user-injured',
        remaining_prisoners = 'handcuffs',
        zip_code = 'map-location-dot',
    }

    enum faDirectionIcon {
        desc = 'arrow-down-wide-short',
        asc = 'arrow-down-short-wide',
    }

    const sortBtn = document.createElement('button');
    sortBtn.id = sortBtnId;
    sortBtn.classList.add(
        'btn',
        'btn-xs',
        `btn-${buttonColor}`,
        'dropdown-toggle'
    );
    sortBtn.dataset.toggle = 'dropdown';
    const sortIcon = document.createElement('i');
    sortIcon.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-missionlist-sortingType-type`,
        true
    );
    sortIcon.classList.add('fas', `fa-${faSortIcon[sortingType]}`);
    const directionIcon = document.createElement('i');
    directionIcon.id = LSSM.$stores.root.nodeAttribute(
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
    sortSelectionList.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-missionlist-sorting-selection-list`,
        true
    );
    sortSelectionList.classList.add('dropdown-menu', 'pull-right');
    sorts.forEach(sort => {
        const listElement = document.createElement('li');
        listElement.dataset.sort = sort;
        const link = document.createElement('a');
        link.setAttribute('href', '#');

        const icon = document.createElement('i');
        icon.classList.add('fas', `fa-${faSortIcon[sort]}`, 'fa-fw');
        icon.style.setProperty('margin-right', '0.2em');

        const ascBtn = document.createElement('button');
        ascBtn.classList.add('btn', 'btn-xs', 'btn-default');
        ascBtn.dataset.direction = 'asc';
        const ascIcon = document.createElement('i');
        ascIcon.classList.add('fas', `fa-${faDirectionIcon['asc']}`);
        ascBtn.append(ascIcon);

        const descBtn = document.createElement('button');
        descBtn.classList.add('btn', 'btn-xs', 'btn-default');
        descBtn.dataset.direction = 'desc';
        const descIcon = document.createElement('i');
        descIcon.classList.add('fas', `fa-${faDirectionIcon['desc']}`);
        descBtn.append(descIcon);

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group', 'pull-right');
        btnGroup.append(ascBtn, descBtn);
        btnGroup.style.setProperty('margin-left', '1em');

        if (sort === sortingType) {
            if (sortingDirection === 'asc') ascBtn.setAttribute('disabled', '');
            else descBtn.setAttribute('disabled', '');
        }

        link.append(icon, $m(`sort.types.${sort}`).toString(), btnGroup);
        listElement.append(link);
        sortSelectionList.append(listElement);
    });
    sortSelectionList.addEventListener('click', async event => {
        event.preventDefault();
        const target = event.target as HTMLElement | null;
        const sorter = target?.closest<HTMLLIElement>('li[data-sort]');
        const directionBtn = target?.closest<HTMLButtonElement>(
            'li[data-sort] button[data-direction]'
        );
        if (!sorter) return;
        sortSelectionList
            .querySelector<HTMLButtonElement>('button[data-direction]:disabled')
            ?.removeAttribute('disabled');

        sortingType = sorter.dataset.sort as Sort;
        const sortDirection = (directionBtn?.dataset.direction ?? 'asc') as
            | 'asc'
            | 'desc';
        panelBody.classList[sortDirection === 'desc' ? 'add' : 'remove'](
            reverseClass
        );
        document
            .querySelector<SVGElement>(`#${sortIcon.id}`)
            ?.setAttribute('data-icon', faSortIcon[sortingType]);
        document
            .querySelector<SVGElement>(`#${directionIcon.id}`)
            ?.setAttribute('data-icon', faDirectionIcon[sortDirection]);
        sorter
            .querySelector<HTMLButtonElement>(
                `button[data-direction="${sortDirection}"]`
            )
            ?.setAttribute('disabled', 'disabled');
        await setSetting('sortMissionsType', sortingType);
        await setSetting('sortMissionsDirection', sortDirection);
        if (updateOrderListTimeout) window.clearTimeout(updateOrderListTimeout);
        updateOrderListTimeout = window.setTimeout(updateOrderList, 100);
        resetOrder();
    });

    LSSM.$stores.root.addStyles([
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
        {
            selectorText: `#${sortIcon.id}[data-icon="face-rolling-eyes"], #${sortSelectionList.id} [data-icon="face-rolling-eyes"]`,
            style: {
                display: 'none',
            },
        },
    ]);

    const getLatLngFromMission = (mission: HTMLDivElement) =>
        new window.L.LatLng(
            parseFloat(mission.getAttribute('latitude') ?? '0'),
            parseFloat(mission.getAttribute('longitude') ?? '0')
        );

    const orderFunctions: Record<
        Sort,
        (mission: HTMLDivElement) => number | undefined
    > = {
        default: () => 0,
        id: mission => parseInt(mission.getAttribute('mission_id') ?? '0'),
        credits: mission => {
            let missionType = mission.getAttribute('mission_type_id') ?? '-1';
            if (missionType === '-1' || missionType === 'null')
                return maxCSSInteger - 1;
            const overlayIndex =
                mission.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex && overlayIndex !== 'null')
                missionType += `-${overlayIndex}`;
            const additionalOverlay =
                mission.getAttribute('data-additive-overlays') ?? 'null';
            if (additionalOverlay && additionalOverlay !== 'null')
                missionType += `/${additionalOverlay}`;
            return missionsById[missionType]?.average_credits;
        },
        remaining_patients: mission => {
            if (
                mission.querySelector(
                    '[id^="mission_patients_"] [id^="patient_"]'
                )
            )
                return mission.querySelectorAll('.patient_progress').length;

            if (
                mission
                    .querySelector<HTMLDivElement>(
                        '[id^="mission_patient_summary_"]'
                    )
                    ?.style.getPropertyValue('display') !== 'none'
            ) {
                return LSSM.$utils.getNumberFromText(
                    mission.querySelector('.mission_list_patient_icon + strong')
                        ?.textContent ?? '0'
                );
            }
            return 0;
        },
        remaining_prisoners: mission => {
            return mission
                .querySelector('.mission_prisoners[id^="mission_prisoners_"]')
                ?.querySelectorAll('.small[id^="prisoner_"]').length;
        },
        alphabet: mission => {
            let missionType = mission.getAttribute('mission_type_id') ?? '-1';
            const overlayIndex =
                mission.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex && overlayIndex !== 'null')
                missionType += `-${overlayIndex}`;
            const additionalOverlay =
                mission.getAttribute('data-additive-overlays') ?? 'null';
            if (additionalOverlay && additionalOverlay !== 'null')
                missionType += `/${additionalOverlay}`;
            return missionIdsByAlphabet[missionType];
        },
        distance_dispatch: mission => {
            const latLng = getLatLngFromMission(mission);
            return distanceToCSSRange(
                Math.min(
                    ...dispatchCenterLatLngs.map(dc => latLng.distanceTo(dc))
                )
            );
        },
        distance_station: mission => {
            const latLng = getLatLngFromMission(mission);
            return distanceToCSSRange(
                Math.min(
                    ...vehicleBuildingLatLngs.map(dc => latLng.distanceTo(dc))
                )
            );
        },
        zip_code: mission => {
            const address =
                mission
                    .querySelector<HTMLSpanElement>(
                        `#mission_address_${mission.getAttribute('mission_id')}`
                    )
                    ?.textContent?.trim() ?? '–';
            const zip = getZipFromCity(getCityFromAddress(address));

            return findStringOrder(zip, zipCodes);
        },
    };

    const updateOrderList = () =>
        localStorage.setItem(
            `${PREFIX}_${MODULE_ID}_sort_order`,
            JSON.stringify(
                Object.fromEntries(
                    Object.entries(missionOrderValuesById).map(
                        ([list, missions]) => [
                            list,
                            Object.entries(missions)
                                .sort(
                                    (
                                        [, { order: valueA, el: elA }],
                                        [, { order: valueB, el: elB }]
                                    ) => {
                                        const position =
                                            elA.compareDocumentPosition(elB);
                                        return panelBody.classList.contains(
                                            reverseClass
                                        )
                                            ? valueB === valueA
                                                ? position &
                                                  Node.DOCUMENT_POSITION_FOLLOWING
                                                    ? 1
                                                    : position &
                                                      Node.DOCUMENT_POSITION_PRECEDING
                                                    ? -1
                                                    : 0
                                                : valueB - valueA
                                            : valueB === valueA
                                            ? position &
                                              Node.DOCUMENT_POSITION_FOLLOWING
                                                ? -1
                                                : position &
                                                  Node.DOCUMENT_POSITION_PRECEDING
                                                ? 1
                                                : 0
                                            : valueA - valueB;
                                    }
                                )
                                .map(([mission]) => mission),
                        ]
                    )
                )
            )
        );

    const setMissionOrder = (mission: HTMLDivElement) => {
        const missionId = mission.getAttribute('mission_id') ?? '0';
        const order = numToCSSRange(
            orderFunctions[sortingType]?.(mission) ?? 0
        );
        mission.style.setProperty('order', order.toString());
        const list =
            mission.parentElement?.id?.replace(/^mission_list_?/u, '') ?? '';
        if (!missionOrderValuesById.hasOwnProperty(list))
            missionOrderValuesById[list] = {};
        if (mission.classList.contains('mission_deleted')) {
            delete missionOrderValuesById[list][missionId];
        } else if (
            !missionOrderValuesById[list].hasOwnProperty(missionId) ||
            missionOrderValuesById[list][missionId].order !== order
        ) {
            missionOrderValuesById[list][missionId] = {
                order,
                el: mission,
            };
            if (updateOrderListTimeout)
                window.clearTimeout(updateOrderListTimeout);
            updateOrderListTimeout = window.setTimeout(updateOrderList, 100);
        }
    };

    const resetOrder = () => {
        document
            .querySelectorAll<HTMLDivElement>(
                '#missions-panel-body .missionSideBarEntry'
            )
            .forEach(panel => setMissionOrder(panel));
        window.missionScrollUpdate();
    };

    resetOrder();

    document
        .querySelector<HTMLDivElement>('#btn-group-mission-select')
        ?.append(sortBtn, sortSelectionList);

    LSSM.$stores.root.hook({
        event: 'missionMarkerAdd',
        callback(marker: MissionMarkerAdd) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.id}`
            );
            if (panel) setMissionOrder(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'missionDelete',
        callback(missionId: number) {
            Object.keys(missionOrderValuesById).forEach(
                list => delete missionOrderValuesById[list][missionId]
            );
            updateOrderList();
        },
    });

    LSSM.$stores.root.hook({
        event: 'patientMarkerAdd',
        post: true,
        callback(marker: PatientMarkerAdd) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.mission_id}`
            );
            if (panel) setMissionOrder(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'patientMarkerAddCombined',
        post: true,
        callback(marker: PatientMarkerAddCombined) {
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${marker.mission_id}`
            );
            if (panel) setMissionOrder(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'patientDelete',
        callback(patientId: number) {
            const missionId = window.patient_timers.find(
                ({ patient_id }) => patient_id === patientId
            )?.params.mission_id;
            if (!missionId) return;
            const panel = document.querySelector<HTMLDivElement>(
                `#mission_${missionId}`
            );
            if (panel) setMissionOrder(panel);
        },
    });

    LSSM.$stores.root.hook({
        event: 'missionSelectionActive',
        callback(toggleBtn: JQuery<HTMLAnchorElement>) {
            document
                .querySelector<HTMLDivElement>(
                    `#${toggleBtn.attr('classShow')}`
                )
                ?.style.setProperty('display', 'flex');
        },
    });
};
