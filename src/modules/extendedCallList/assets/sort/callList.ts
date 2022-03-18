import type { $m } from 'typings/Module';
import type { Building } from 'typings/Building';
import type { LatLng } from 'leaflet';
import type { Mission } from 'typings/Mission';
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
    | 'remaining_patients';

export default (
    LSSM: Vue,
    MODULE_ID: string,
    sort: Sort,
    direction: 'asc' | 'desc',
    buttonColor: string,
    sortBtnId: string,
    starredMissionPanelClass: string,
    $m: $m
) => {
    LSSM.$store.commit('useFontAwesome');

    const sorts: Sort[] = [
        'default',
        'id',
        'credits',
        'remaining_patients',
        'alphabet',
        'distance_dispatch',
        'distance_station',
    ];
    let sortingType = sort;
    const sortingDirection = direction;
    let updateOrderListTimeout = 0;

    const missionOrderValuesById: Record<
        string,
        Record<string, { order: number; el: HTMLDivElement }>
    > = {};

    const missionsById: Record<string, Mission> =
        LSSM.$store.getters['api/missionsById'];
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

    LSSM.$store
        .dispatch('api/registerBuildingsUsage', {
            feature: 'ecl-sort-missions',
        })
        .then(() => {
            dispatchCenters.splice(
                0,
                dispatchCenters.length,
                ...Object.values(
                    LSSM.$t('dispatchCenterBuildings') as unknown as Record<
                        number,
                        number
                    >
                )
                    .flatMap(
                        type =>
                            (
                                LSSM.$store.getters[
                                    'api/buildingsByType'
                                ] as Record<number, Building[]>
                            )[type]
                    )
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
                ...Object.values(
                    LSSM.$t('vehicleBuildings') as unknown as Record<
                        number,
                        number
                    >
                )
                    .flatMap(
                        type =>
                            (
                                LSSM.$store.getters[
                                    'api/buildingsByType'
                                ] as Record<number, Building[]>
                            )[type]
                    )
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

    const maxWorldDistance = new window.L.LatLng(-85, -180).distanceTo(
        new window.L.LatLng(85, 180)
    );

    const distanceToCSSRange = (distance: number) =>
        Math.floor((maxWorldDistance / maxCSSInteger) * distance);

    enum faSortIcon {
        alphabet = 'font',
        credits = 'dollar-sign',
        default = 'face-rolling-eyes',
        distance_dispatch = 'tower-broadcast',
        distance_station = 'building',
        id = 'clock-rotate-left',
        remaining_patients = 'user-injured',
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
    sortSelectionList.id = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}-missionlist-sorting-selection-list`,
        true
    );
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
        icon.classList.add('fas', `fa-${faSortIcon[sort]}`, 'fa-fw');
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
        if (updateOrderListTimeout) window.clearTimeout(updateOrderListTimeout);
        updateOrderListTimeout = window.setTimeout(updateOrderList, 100);
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
            {
                selectorText: `#${sortIcon.id}[data-icon="face-rolling-eyes"], #${sortSelectionList.id} [data-icon="face-rolling-eyes"]`,
                style: {
                    display: 'none',
                },
            },
        ])
        .then();

    const getLatLngFromMission = (mission: HTMLDivElement) =>
        new window.L.LatLng(
            parseFloat(mission.getAttribute('latitude') ?? '0'),
            parseFloat(mission.getAttribute('longitude') ?? '0')
        );

    const orderFunctions: Record<Sort, (mission: HTMLDivElement) => string> = {
        default: () => '0',
        id: mission =>
            numToCSSRange(
                parseInt(mission.getAttribute('mission_id') ?? '0')
            ).toString(),
        credits: mission => {
            let missionType = mission.getAttribute('mission_type_id') ?? '-1';
            if (missionType === '-1' || missionType === 'null')
                return maxCSSInteger.toString();
            const overlayIndex =
                mission.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex && overlayIndex !== 'null')
                missionType += `-${overlayIndex}`;
            const additionalOverlay =
                mission.getAttribute('data-additive-overlays') ?? 'null';
            if (additionalOverlay && additionalOverlay !== 'null')
                missionType += `/${additionalOverlay}`;
            return numToCSSRange(
                missionsById[missionType]?.average_credits ?? 0
            ).toString();
        },
        remaining_patients: mission => {
            if (
                mission.querySelector(
                    '[id^="mission_patients_"] [id^="patient_"]'
                )
            ) {
                return mission
                    .querySelectorAll('.patient_progress')
                    .length.toString();
            }
            if (
                mission
                    .querySelector<HTMLDivElement>(
                        '[id^="mission_patient_summary_"]'
                    )
                    ?.style.getPropertyValue('display') !== 'none'
            ) {
                return LSSM.$utils
                    .getNumberFromText(
                        mission.querySelector(
                            '.mission_list_patient_icon + strong'
                        )?.textContent ?? '0'
                    )
                    .toString();
            }
            return '0';
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
            return numToCSSRange(
                missionIdsByAlphabet[missionType] ?? 0
            ).toString();
        },
        distance_dispatch: mission => {
            const latLng = getLatLngFromMission(mission);
            return distanceToCSSRange(
                Math.min(
                    ...dispatchCenterLatLngs.map(dc => latLng.distanceTo(dc))
                )
            ).toString();
        },
        distance_station: mission => {
            const latLng = getLatLngFromMission(mission);
            return distanceToCSSRange(
                Math.min(
                    ...vehicleBuildingLatLngs.map(dc => latLng.distanceTo(dc))
                )
            ).toString();
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
        const orderValue =
            orderFunctions[sortingType]?.(mission) ??
            orderFunctions.id(mission);
        mission.style.setProperty('order', orderValue);
        const list =
            mission.parentElement?.id?.replace(/^mission_list_?/u, '') ?? '';
        if (!missionOrderValuesById.hasOwnProperty(list))
            missionOrderValuesById[list] = {};
        if (mission.classList.contains('mission_deleted')) {
            delete missionOrderValuesById[list][missionId];
        } else if (
            !missionOrderValuesById[list].hasOwnProperty(missionId) ||
            missionOrderValuesById[list][missionId].order !==
                parseInt(orderValue)
        ) {
            missionOrderValuesById[list][missionId] = {
                order: parseInt(orderValue),
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

    LSSM.$store
        .dispatch('hook', {
            event: 'missionDelete',
            callback(missionId: number) {
                Object.keys(missionOrderValuesById).forEach(
                    list => delete missionOrderValuesById[list][missionId]
                );
                updateOrderList();
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'patientMarkerAdd',
            post: true,
            callback(marker: PatientMarkerAdd) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.mission_id}`
                );
                if (panel) setMissionOrder(panel);
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'patientMarkerAddCombined',
            post: true,
            callback(marker: PatientMarkerAddCombined) {
                const panel = document.querySelector<HTMLDivElement>(
                    `#mission_${marker.mission_id}`
                );
                if (panel) setMissionOrder(panel);
            },
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
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
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'missionSelectionActive',
            callback(toggleBtn: JQuery<HTMLAnchorElement>) {
                document
                    .querySelector<HTMLDivElement>(
                        `#${toggleBtn.attr('classShow')}`
                    )
                    ?.style.setProperty('display', 'flex');
            },
        })
        .then();
};
